import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
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

// Define types for Chat and Message
interface Message {
  id: string;
  chatId: string;
  senderId: string;
  senderType: "user" | "admin";
  content: string;
  attachmentUrl?: string;
  read: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Chat {
  id: string;
  userId: string;
  adminUserId: string;
  messages: Message[];
  createdAt: string;
  updatedAt: string;
}

// Extend UserProfile for chat context to include chats array
interface ChatUser extends UserProfile {
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
    targetAdminId?: string;
    targetAffiliateId?: string;
    attachmentUrl?: string;
    senderType: "user" | "admin";
  }) => Promise<Chat>;
  sendMessage: (data: {
    chatId: string;
    content: string;
    attachmentUrl?: string;
  }) => Promise<Message>;
  readMessages: (chatId: string) => void;
  uploadAttachment: (file: File) => Promise<string>;
  refetchMessages: UseQueryResult<Message[], Error>['refetch'];
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

interface ChatProviderProps {
  children: ReactNode;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // const isAffiliate = ["superAffiliate", "affiliate"].includes(user?.role || "");

  const [selectedChatUser, setSelectedChatUser] = useState<ChatUser | null>(null); // This will hold the selected user object with its chats array
  const [activeConversation, setActiveConversation] = useState<Chat | null>(null); // This will hold the specific active chat conversation

  const { socket, emitEvent, joinChat, leaveChat } = useSocket(); // Initialize socket without chatId

  // Effect to determine the active conversation when selectedChatUser changes and handle joining/leaving chat rooms
  useEffect(() => {
    let previousChatId: string | null = null;
    if (activeConversation?.id) {
      previousChatId = activeConversation.id;
    }

    if (selectedChatUser && selectedChatUser.chats && selectedChatUser.chats.length > 0) {
      const latestChat = selectedChatUser.chats.reduce((prev, current) =>
        (prev.id > current.id) ? prev : current
      );
      setActiveConversation(latestChat);
      if (latestChat.id && latestChat.id !== previousChatId) {
        joinChat(latestChat.id);
      }
    } else {
      setActiveConversation(null);
      if (previousChatId) {
        leaveChat(previousChatId);
      }
    }

    return () => {
      if (previousChatId) {
        leaveChat(previousChatId);
      }
    };
  }, [selectedChatUser, joinChat, leaveChat, activeConversation]);

  // Fetch messages using useQuery
  const {
    data: messages = [],
    isLoading: messagesLoading,
    error: messagesError,
    refetch: refetchMessages,
  } = useQuery<Message[], Error>({
    queryKey: ["chatMessages", user?.id],
    queryFn: async () => {
      if (!user?.id) return []; // Ensure user is defined
      // const isSelectedAdminChat = Boolean(selectedChatUser?.role);
      const url = `${API_ENDPOINTS.CHAT.ADMIN_USER_MESSAGES}/${user.id}/user`; // Use GET_MESSAGES for user chats
      const response = await Axios.get(url);
      return response.data.data;
    },
    enabled: !!user?.id,
  });

  // Create chat using useMutation
  const createChatMutation: UseMutationResult<
    Chat,
    Error,
    {
      initialMessageContent: string;
      targetUserId?: string;
      targetAdminId?: string;
      targetAffiliateId?: string;
      attachmentUrl?: string;
      senderType: "user" | "admin";
    }
  > = useMutation({
    mutationFn: async ({
      initialMessageContent,
      targetUserId,
      targetAdminId,
      targetAffiliateId,
      attachmentUrl,
      senderType,
    }) => {
      const payload: any = { initialMessageContent, attachmentUrl, senderType };
      if (targetUserId) payload.userId = targetUserId;
      if (targetAdminId) payload.adminUserId = targetAdminId;
      if (targetAffiliateId) payload.targetAffiliateId = targetAffiliateId;

      const response = await Axios.post(API_ENDPOINTS.CHAT.CREATE_CHAT, payload);
      return response.data.data;
    },
    onSuccess: (newChat) => {
      setActiveConversation(newChat);
      queryClient.invalidateQueries({ queryKey: ["chatMessages", newChat.id] });
      queryClient.invalidateQueries({ queryKey: ["userChats"] });
      queryClient.invalidateQueries({ queryKey: ["chats"] });
    },
    onError: (err) => {
      console.error("Error creating chat:", err);
    },
  });

  // Send message using useMutation
  const sendMessageMutation: UseMutationResult<
    Message,
    Error,
    { chatId: string; content: string; attachmentUrl?: string }
  > = useMutation({
    mutationFn: async ({ chatId, content, attachmentUrl }) => {
      if (!user?.id) throw new Error("User not authenticated");
      const response = await Axios.post(API_ENDPOINTS.CHAT.SEND_MESSAGE, {
        chatId,
        senderId: user.id,
        senderType: ["superAdmin", "admin", "superAgent", "agent", "superAffiliate", "affiliate"].includes(user.role || "")
          ? "admin"
          : "user",
        content,
        attachmentUrl,
      });
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chatMessages", activeConversation?.id] });
      queryClient.invalidateQueries({ queryKey: ["chats"] });
    },
    onError: (err) => {
      console.error("Error sending message:", err);
    },
  });

  // Read messages using useMutation
  const readMessagesMutation: UseMutationResult<void, Error, string> = useMutation({
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

  // Upload attachment using useMutation
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

  // Use a ref to track the last chat ID for which messages were marked as read
  const lastReadChatIdRef = useRef<string | null>(null);

  // Effect to mark messages as read when activeConversation changes
  useEffect(() => {
    if (activeConversation?.id && activeConversation.id !== lastReadChatIdRef.current) {
      readMessagesMutation.mutate(activeConversation.id);
      lastReadChatIdRef.current = activeConversation.id;
    }
  }, [activeConversation, readMessagesMutation]);

  // Effect to handle socket events
  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (message: Message) => {
      console.log("New message received via socket:", message);
      queryClient.invalidateQueries({ queryKey: ["chatMessages", activeConversation?.id] });
      queryClient.invalidateQueries({ queryKey: ["chats"] });
      if (activeConversation?.id === message.chatId) {
        readMessagesMutation.mutate(activeConversation.id);
      }
    };

    const handleChatUpdated = (chatUpdate: Chat) => {
      console.log("Chat updated via socket:", chatUpdate);
      queryClient.invalidateQueries({ queryKey: ["userChats"] });
      queryClient.invalidateQueries({ queryKey: ["chatMessages", chatUpdate.id] });
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
