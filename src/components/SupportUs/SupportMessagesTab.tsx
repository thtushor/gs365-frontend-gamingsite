import React, { useState } from "react";
import "./SupportMessagesTab.scss";
import { ArrowLeftIcon, SendIcon } from "lucide-react";
import { useSupportPanelContext } from "../../contexts/SupportPanelContext";

const messages = [
  {
    id: 1,
    avatar:
      "https://static.intercomassets.com/avatars/7986453/square_128/Screenshot_2025-01-07_164341-1736248445.png",
    sender: "GS365 Customer Service",
    text: "প্রিয় গ্রাহক , কিভাবে আপনাকে সহায়তা করতে পারি...",
    time: "1h ago",
    preview: true,
    chat: [
      {
        from: "support",
        text: "Dear Valued Customer,\nDue to some technical issue, we are unable to reply in Facebook Messenger today. Thanks for your understanding.",
        time: "1h ago",
      },
      {
        from: "user",
        text: "Hi, welcome to GS365! Please select a language to continue. পরবর্তী ধাপে যেতে একটি ভাষা সিলেক্ট করুন।",
        time: "1h ago",
      },
      {
        from: "support",
        text: "প্রিয় গ্রাহক, কিভাবে আপনাকে সহায়তা করতে পারি? আপনার অনুসন্ধানটি ভালোভাবে বুঝার জন্য নিচের বিকল্পগুলির মধ্যে থেকে যে কোনো একটি অপশন সিলেক্ট করুন।",
        time: "1h ago",
      },
    ],
    isRead: false,
  },
  {
    id: 2,
    avatar:
      "https://static.intercomassets.com/avatars/7986453/square_128/Screenshot_2025-01-07_164341-1736248445.png",
    sender: "GS365 Customer Service",
    text: "প্রিয় গ্রাহক , কিভাবে আপনাকে সহায়তা করতে পারি...",
    time: "1h ago",
    preview: true,
    chat: [
      {
        from: "support",
        text: "Dear Valued Customer,\nDue to some technical issue, we are unable to reply in Facebook Messenger today. Thanks for your understanding.",
        time: "1h ago",
      },
      {
        from: "support",
        text: "Hi, welcome to GS365! Please select a language to continue. পরবর্তী ধাপে যেতে একটি ভাষা সিলেক্ট করুন।",
        time: "1h ago",
      },
      {
        from: "support",
        text: "প্রিয় গ্রাহক, কিভাবে আপনাকে সহায়তা করতে পারি? আপনার অনুসন্ধানটি ভালোভাবে বুঝার জন্য নিচের বিকল্পগুলির মধ্যে থেকে যে কোনো একটি অপশন সিলেক্ট করুন।",
        time: "1h ago",
      },
    ],
    isRead: true,
  },
];
interface SupportMessagesTabProps {
  // setParentScroll: (scroll: boolean) => void; // No longer needed as it's from context
}
const SupportMessagesTab: React.FC<SupportMessagesTabProps> = () => {
  const { setParentScroll } = useSupportPanelContext();
  const [selectedMessage, setSelectedMessage] = useState<number | null>(null);
  console.log(selectedMessage);
  const [input, setInput] = useState("");

  const handleSelect = (id: number) => {
    setSelectedMessage(id);
    setParentScroll(false);
  };
  const handleBack = () => {
    setSelectedMessage(null);
    setParentScroll(true);
  };
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setInput(e.target.value);
  };
  console.log(input);
  const handleSend = () => {
    console.log("click me")
    // Implement send logic here
    setInput("");
  };

  if (selectedMessage !== null) {
    const msg = messages.find((m) => m.id === selectedMessage);
    return (
      <div className="support-messages-tab chat-view">
        <div className="chat-header">
          <button className="back-btn" onClick={handleBack}>
            <ArrowLeftIcon />
          </button>
          <div className="header-content">
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
        </div>
        <div className="chat-body overflow-y-auto">
          {msg?.chat.map((c, i) => (
            <div
              key={i}
              className={`chat-bubble ${
                c.from === "support" ? "support text-left" : "user text-right"
              }`}
            >
              <div className="bubble-text">{c.text}</div>
              <div
                className={`bubble-time ${
                  c.from === "support" ? "text-right pr-1" : " text-left pl-1"
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
  } else {
    return (
      <div
        className={`support-messages-tab ${
          selectedMessage !== null ? "hidden" : ""
        }`}
      >
        <h2>Messages</h2>
        <div className="message-list">
          {messages.map((msg, i) => (
            <div
              className="bg-white relative duration-150 flex cursor-pointer items-center gap-1 p-2 rounded-[10px]"
              key={i}
              onClick={() => handleSelect(msg.id)}
            >
              <img
                className="w-[35px] h-[35px] rounded-full border-[3px] border-gray-300"
                src={msg.avatar}
                alt="avatar"
              />
              <div className="flex items-start text-left text-black flex-col">
                <div className="text-[12px] text-black font-semibold max-w-[240px] truncate">
                  {msg.text}
                </div>
                <div className="text-[10px] opacity-70 font-medium text-black flex items-center gap-2">
                  <div className="max-w-[100px] truncate">{msg.sender} </div>
                  <div className="w-[5px] h-[5px] bg-black rounded-full" />{" "}
                  {msg.time}
                </div>
              </div>
              {!msg?.isRead && (
                <div className="w-[8px] h-[8px] bg-blue-600 rounded-full absolute bottom-[10px] right-2" />
              )}
            </div>
          ))}
        </div>
        <button className="send-message-btn">Send us a message</button>
      </div>
    );
  }
};

export default SupportMessagesTab;
