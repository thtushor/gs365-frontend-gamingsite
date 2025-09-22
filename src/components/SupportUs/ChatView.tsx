import React from "react";
import { ArrowLeft, SendIcon } from "lucide-react";

interface ChatViewProps {
  msg: {
    id: number;
    avatar: string;
    sender: string;
    text: string;
    time: string;
    preview: boolean;
    chat: { from: string; text: string; time: string }[];
    isRead: boolean;
  } | undefined;
  handleBack: () => void;
  input: string;
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSend: () => void;
}

const ChatView: React.FC<ChatViewProps> = ({
  msg,
  handleBack,
  input,
  handleInput,
  handleSend,
}) => {
  return (
    <div className="support-messages-tab chat-view">
      <div className="chat-header">

        <div className="header-content">
        <div className="flex items-center gap-2">
            <img className="avatar" src={msg?.avatar} alt="avatar" />
          <div className="sender-info">
            <div className="sender">
              {msg?.sender
                ? msg.sender.length > 20
                  ? msg.sender.slice(0, 20) + "..."
                  : msg.sender
                : "Customer Care"}
            </div>
            <div className="meta">Online</div>
          </div>
        </div>

          <span className="back-btn" onClick={handleBack}>
            <ArrowLeft />
          </span>
        </div>
      </div>
      <div className="chat-body overflow-y-auto">
        {msg?.chat.map((c, i) => (
          <div
            key={i}
            className={`chat-bubble ${c.from === "support" ? "support text-left" : "user text-right"
              }`}
          >
            <div className="bubble-text">{c.text}</div>
            <div
              className={`bubble-time ${c.from === "support" ? "text-right pr-1" : " text-left pl-1"
                }`}
            >
              {c.time}
            </div>
          </div>
        ))}
      </div>
      <div className="chat-input-bar">
        <input
          type="text"
          onFocus={() => {
            console.log("focus", "hello");
          }}
          placeholder="Type your message..."
          value={input}
          onChange={handleInput}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          name="text"
        />
        <button className="send-btn" onClick={handleSend}>
          <SendIcon className="" />
        </button>
      </div>
    </div>
  );
};

export default ChatView;
