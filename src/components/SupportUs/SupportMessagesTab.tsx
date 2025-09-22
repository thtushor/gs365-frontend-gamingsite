import React, { useState, useEffect, useRef } from "react";
import ChatAvatar from "/assets/cs-image.jpg";
import { LuSend } from "react-icons/lu";
import moment from "moment";
import { useAuth } from "../../contexts/auth-context";
import { useChat, Message, ChatUser } from "../../contexts/ChatContext";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useSupportPanelContext } from "../../contexts/SupportPanelContext";
import './SupportMessagesTab.scss'

interface SupportRightProps {
  isAffiliate: boolean;
  showLeftPanelMobile: boolean;
  setShowLeftPanelMobile: (show: boolean) => void;
}

const SupportRight: React.FC<SupportRightProps> = ({ isAffiliate, showLeftPanelMobile, setShowLeftPanelMobile }) => {
  const { user } = useAuth();
  const { selectedChat, setSelectedChat, activeConversation, messages, loading, sendMessage, createChat } = useChat();
  const navigate = useNavigate();
  const { handleTabChange } = useSupportPanelContext();

  const [messageInput, setMessageInput] = useState("");
  const [sendingMessage, setSendingMessage] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ block: "end", behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (messageInput.trim() === "") return;
    setSendingMessage(true);

    try {
      const senderType = ["superAdmin", "admin", "superAgent", "agent", "superAffiliate", "affiliate"].includes(user?.role || "") ? "admin" : "user";

      const hasMessage = Boolean(messages?.length)

      const chatid = activeConversation?.id ? activeConversation?.id : hasMessage ? messages[messages.length - 1].chatId : undefined

      if (!chatid) {
        const isSelectedAdminChat = Boolean(selectedChat?.role)
        await createChat({
          initialMessageContent: messageInput,
          targetUserId: !isSelectedAdminChat && selectedChat?.id ? String(selectedChat.id) : undefined,
          targetAffiliateId: isSelectedAdminChat && selectedChat?.id ? Number(selectedChat.id) : undefined,
          targetAdminId: user?.id ? Number(user.id) : undefined,
          attachmentUrl: undefined,
          senderType,
        });
      } else {
        await sendMessage({ chatId: chatid, content: messageInput, attachmentUrl: undefined });
      }
      setMessageInput("");
    } catch (error) {
      console.error("Failed to send message:", error);
      // Handle error (e.g., show a toast notification)
    } finally {
      setSendingMessage(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const getSenderName = (message: Message) => {
    if (message.senderType === "user" && message.senderUser) {
      return message.senderUser.fullname || message.senderUser.username;
    }
    if (message.senderType === "admin" && message.senderAdmin) {
      return message.senderAdmin.fullname || message.senderAdmin.username;
    }
    return "Unknown";
  };

  // if (!selectedChat && !isAffiliate) {
  //   return (
  //     <div className="text-[#07122b] w-full relative flex items-center justify-center h-full">
  //       <p className="text-white/70">Select a chat to start messaging</p>
  //     </div>
  //   );
  // }

  return (
    <>
      <div className={`text-[#07122b] w-full relative flex flex-col h-full ${showLeftPanelMobile ? "hidden md:flex" : "block"}`}>
        {/* top */}
        <div className="p-4 py-[9.5px] w-full flex items-center justify-between gap-2 border-b-2 border-[#ffd93d] text-white bg-[#07122b] flex-shrink-0">
          <div
            className="flex items-center gap-2 cursor-pointer"
          >
            <img
              src={ChatAvatar}
              alt="image avatar"
              className="w-[35px] h-[35px] border rounded-md bg-white border-white"
            />
            <div>
              <h1 className="flex text-base items-center mt-[-2px] text-[#ffd93d] gap-1 font-semibold">
                Customer Support
              </h1>
            </div>
          </div>

          <span className="text-[#ffd93d] cursor-pointer" onClick={() => handleTabChange("home")}>
            <ArrowLeft />
          </span>
        </div>

        {/* center */}
        <div className="p-4 py-2 flex-1 overflow-y-auto space-y-1">
          {loading && <p className="text-[#ffd93d] text-center">Loading messages...</p>}

          {messages.map((message) => {
            console.log({message})
            const isCurrentUser = user?.id === message?.senderUser?.id && message?.senderType === "user";
            const senderName = getSenderName(message);
            return (
              <div
                key={message?.id}
                className={`flex flex-col ${isCurrentUser ? "items-end" : "items-start"
                  }`}
              >
                <div
                  className={`${isCurrentUser
                    ? "bg-[#ffd93d] text-white"
                    : "bg-gray-200 text-black"
                    } px-4 py-2 rounded-lg max-w-[80%] md:max-w-sm relative group`}
                >
                  {message?.content && <p>{message?.content}</p>}
                </div>
                <span
                  className={`text-xs mt-1 ${isCurrentUser ? "text-gray-400" : "text-gray-500"
                    }`}
                >
                  {moment(message?.createdAt?.replace("Z", "")).calendar()}
                </span>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* bottom */}
        <div className="p-2 py-2 flex items-center gap-2 w-full bg-[#07122b] border-t-2 border-[#ffd93d] flex-shrink-0">
          <div className="flex w-full">
            <input
              placeholder="What's on your mind?"
              className="border border-[#ffd93d] text-white placeholder:text-white/70 placeholder:font-normal w-full rounded-l-md px-3 outline-none font-medium"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={sendingMessage} // Disable input while sending
            />
            <div className="header-auth">
              <button
                className="send-btn !cursor-pointer !min-w-[40px] !rounded-l-none !rounded-md !max-w-[40px] !p-0 flex items-center justify-center !border-[2px] !max-h-[40px] !min-h-[40px]"
                onClick={handleSendMessage}
                disabled={sendingMessage} // Disable button while sending
              >
                {sendingMessage ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div> // Spinner
                ) : (
                  <LuSend />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SupportRight;
