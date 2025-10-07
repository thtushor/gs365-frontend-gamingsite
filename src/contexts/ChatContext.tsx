import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  // useCallback,
  useRef,
  ReactNode,
} from "react";
import { useQuery, useMutation, useQueryClient, UseMutationResult, UseQueryResult } from "@tanstack/react-query";
import { API_ENDPOINTS, API_CONFIG } from "../lib/api/config";
import Axios from "../lib/api/axios";
import { useAuth } from "./auth-context";
import { UserProfile } from "../lib/api/services"; // Import UserProfile type
import axios from "axios";
import { useSocket } from "../socket"; // Import useSocket
import { AxiosError } from "axios";
import { getOrCreateGuestId } from "../lib/utils";

// Define types for Chat and Message
interface UserProfileForMessage {
  id: number;
  username: string;
  fullname: string;
  phone: string;
  email: string;
  password: string;
  currency_id: number;
  country_id: string | null;
  refer_code: string;
  created_by: string | null;
  status: string;
  isAgreeWithTerms: boolean;
  isLoggedIn: boolean;
  isVerified: boolean;
  lastIp: string;
  lastLogin: string;
  tokenVersion: number;
  device_type: string;
  device_name: string;
  os_version: string;
  browser: string;
  browser_version: string;
  ip_address: string;
  device_token: string;
  referred_by: string | null;
  referred_by_admin_user: string | null;
  created_at: string;
  kyc_status: string;
}

interface AdminProfileForMessage {
  id: number;
  username: string;
  fullname: string;
  phone: string;
  email: string;
  password: string;
  country: string;
  city: string;
  street: string;
  remainingBalance: number | null;
  minTrx: string;
  maxTrx: string;
  currency: number;
  designation: string | null;
  role: string;
  status: string;
  refCode: string;
  isLoggedIn: boolean;
  isVerified: boolean;
  lastIp: string;
  lastLogin: string;
  commission_percent: number | null;
  main_balance: number;
  downline_balance: number;
  withdrawable_balance: number;
  device_type: string;
  device_name: string;
  os_version: string;
  browser: string;
  browser_version: string;
  ip_address: string;
  device_token: string;
  createdBy: number;
  referred_by: string | null;
  created_at: string;
  kyc_status: string;
}

export interface Message { // Exported for use in other components
  id: number;
  chatId: number;
  senderId: number;
  senderType: "user" | "admin" | "guest";
  messageType: "text" | "attachment";
  content: string;
  attachmentUrl: string | null;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
  senderUser?: UserProfileForMessage;
  senderAdmin?: AdminProfileForMessage;
  guestSenderId?: string;
}

export interface Chat { // Exported for use in other components
  id: number;
  userId: number;
  adminUserId: number;
  messages: Message[];
  createdAt: string;
  updatedAt: string;
}

// Extend UserProfile for chat context to include chats array
export interface ChatUser extends UserProfile { // Exported for use in other components
  chats?: Chat[];
}

interface ChatContextType {
  selectedChat: ChatUser | null;
  setSelectedChat: React.Dispatch<React.SetStateAction<ChatUser | null>>;
  activeConversation: Chat | null;
  messages: Message[];
  loading: boolean;
  error: Error | AxiosError | null;
  createChat: (data: {
    initialMessageContent: string;
    targetUserId?: string;
    targetAdminId?: number;
    targetAffiliateId?: number;
    attachmentUrl?: string;
    senderType: "user" | "admin";
  }) => Promise<Chat>;
  sendMessage: (data: {
    chatId: number;
    content: string;
    attachmentUrl?: string;
  }) => Promise<Message>;
  readMessages: (chatId: number) => void;
  uploadAttachment: (file: File) => Promise<string>;
  refetchMessages: UseQueryResult<Message[], Error>['refetch'];
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

interface ChatProviderProps {
  children: ReactNode;
  onOpen?: ()=>void;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ children,onOpen }) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const [selectedChatUser, setSelectedChatUser] = useState<ChatUser | null>(null);
  const [activeConversation, setActiveConversation] = useState<Chat | null>(null);

  const { socket,
    emitEvent,
    joinChat } = useSocket();



  const {
    data: messages = [],
    isLoading: messagesLoading,
    error: messagesError,
    refetch: refetchMessages,
  } = useQuery<Message[], Error>({
    queryKey: ["chatMessages", user?.id],
    queryFn: async () => {
      let url = `${API_ENDPOINTS.CHAT.GUEST_USER_MESSAGES}`.replace(":guestSenderId", getOrCreateGuestId())
      if (user?.id)
        url = `${API_ENDPOINTS.CHAT.ADMIN_USER_MESSAGES}/${user.id}/user`;
      const response = await Axios.get(url);
      return response.data.data;
    },
    enabled: !!user?.id || !!getOrCreateGuestId(),
    // refetchInterval: 2 * 1000,
  });


  const lastMessage = messages[messages?.length - 1];

  useEffect(() => {
    if(!lastMessage?.chatId)
      return;
    socket?.on(`newMessage`, (data) => {
      console.log("New message found", data)

      onOpen?.();
      queryClient.invalidateQueries({ queryKey: ["chatMessages", user?.id] });
      queryClient.invalidateQueries({ queryKey: ["userChats"] });
      queryClient.invalidateQueries({ queryKey: ["chats"] });
    })

    return () => {
      socket?.removeListener(`newMessage`)
    }
  }, [lastMessage?.chatId, socket])

  useEffect(() => {
    if (lastMessage?.chatId)
      joinChat(String(lastMessage.chatId));

  }, [lastMessage?.chatId]);

  const createChatMutation: UseMutationResult<
    Chat,
    Error,
    {
      initialMessageContent: string;
      targetUserId?: string;
      targetAdminId?: number;
      targetAffiliateId?: number;
      attachmentUrl?: string;
      senderType: "user" | "admin";
    }
  > = useMutation({
    mutationFn: async ({
      initialMessageContent,
      targetUserId,
      targetAdminId,
      // targetAffiliateId,
      attachmentUrl,
      senderType,
    }) => {
      const payload: any = { initialMessageContent, attachmentUrl, senderType };
      if (targetUserId) payload.userId = targetUserId;
      if (targetAdminId) payload.adminUserId = targetAdminId;
      // if (targetAffiliateId) payload.targetAffiliateId = targetAffiliateId;

      // if no user/admin, fallback to guest
      if (!targetUserId && !targetAdminId) {
        (payload as any).guestId = getOrCreateGuestId();
      }

      if (payload.guestId) {
        payload.senderType = "guest"
      }

      const response = await Axios.post(API_ENDPOINTS.CHAT.CREATE_CHAT, payload);
      return response.data.data;
    },
    onSuccess: (newChat,arg) => {
      setActiveConversation(newChat);
        emitEvent('sendMessage', {
        ...arg,
        // chatId: String(arg.chatId)
      });
      queryClient.invalidateQueries({ queryKey: ["chatMessages", user?.id] });
      queryClient.invalidateQueries({ queryKey: ["userChats"] });
      queryClient.invalidateQueries({ queryKey: ["chats"] });
    },
    onError: (err) => {
      console.error("Error creating chat:", err);
    },
  });

  const sendMessageMutation: UseMutationResult<
    Message,
    Error,
    { chatId: number; content: string; attachmentUrl?: string }
  > = useMutation({
    mutationFn: async ({ chatId, content, attachmentUrl }) => {
      if (!user?.id && !getOrCreateGuestId()) throw new Error("User not authenticated");
      const response = await Axios.post(API_ENDPOINTS.CHAT.SEND_MESSAGE, {
        chatId,
        senderId: user?.id,
        senderType: user?.id ? "user" : getOrCreateGuestId() ? "guest" : undefined,
        guestSenderId: getOrCreateGuestId(),
        content,
        attachmentUrl,
      });
      return response.data.data;
    },
    onSuccess: (_, arg) => {
      emitEvent('sendMessage', {
        ...arg,
        chatId: String(arg.chatId)
      });
      queryClient.invalidateQueries({ queryKey: ["chatMessages", user?.id] });
      queryClient.invalidateQueries({ queryKey: ["chats"] });
      
    },
    onError: (err) => {
      console.error("Error sending message:", err);
    },
  });

  const readMessagesMutation: UseMutationResult<void, Error, number> = useMutation({
    mutationFn: async (chatId) => {
      if (!chatId || !user?.role) return;
      await Axios.post(`${API_ENDPOINTS.CHAT.READ_MESSAGES}/${chatId}`, {
        senderType: user.role === "admin" ? "admin" : "user",
      });
    },
    onError: (err) => {
      console.error("Error marking messages as read:", err);
    },
  });

  const uploadAttachmentMutation: UseMutationResult<string, Error, File> = useMutation({
    mutationFn: async (file) => {
      const formData = new FormData();
      formData.append("file", file);
      const response = await axios.post(API_CONFIG.SINGLE_IMAGE_UPLOAD_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data.data.original;
    },
    onError: (err) => {
      console.error("Error uploading attachment:", err);
    },
  });

  const lastReadChatIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (activeConversation?.id && activeConversation.id !== lastReadChatIdRef.current) {
      readMessagesMutation.mutate(activeConversation.id);
      lastReadChatIdRef.current = activeConversation.id;
    }
  }, [activeConversation, readMessagesMutation]);

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (message: Message) => {
      console.log("New message received via socket:", message);
      queryClient.invalidateQueries({ queryKey: ["chatMessages", user?.id] });
      queryClient.invalidateQueries({ queryKey: ["chats"] });
      if (activeConversation?.id === message.chatId) {
        readMessagesMutation.mutate(activeConversation.id);
      }
    };

    const handleChatUpdated = (chatUpdate: Chat) => {
      console.log("Chat updated via socket:", chatUpdate);
      queryClient.invalidateQueries({ queryKey: ["userChats"] });
      queryClient.invalidateQueries({ queryKey: ["chatMessages", user?.id] });
      queryClient.invalidateQueries({ queryKey: ["chats"] });
    };

    socket.on("newMessage", handleNewMessage);
    socket.on("chatUpdated", handleChatUpdated);

    return () => {
      socket.off("newMessage", handleNewMessage);
      socket.off("chatUpdated", handleChatUpdated);
    };
  }, [socket, activeConversation?.id, queryClient, readMessagesMutation]);

  const value: ChatContextType = {
    selectedChat: selectedChatUser,
    setSelectedChat: setSelectedChatUser,
    activeConversation,
    messages,
    loading:
      messagesLoading ||
      createChatMutation.isPending ||
      sendMessageMutation.isPending ||
      readMessagesMutation.isPending ||
      uploadAttachmentMutation.isPending,
    error:
      messagesError ||
      createChatMutation.error ||
      sendMessageMutation.error ||
      readMessagesMutation.error ||
      uploadAttachmentMutation.error,
    createChat: createChatMutation.mutateAsync,
    sendMessage: sendMessageMutation.mutateAsync,
    readMessages: readMessagesMutation.mutate,
    uploadAttachment: uploadAttachmentMutation.mutateAsync,
    refetchMessages,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
