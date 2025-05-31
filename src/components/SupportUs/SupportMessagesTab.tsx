import React, { useState } from "react";
import "./SupportMessagesTab.scss";
import { ArrowLeftIcon, SendIcon } from "lucide-react";

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
  },
  // Add more messages here if needed
];

const SupportMessagesTab: React.FC = () => {
  const [selectedMessage, setSelectedMessage] = useState<number | null>(null);
  const [input, setInput] = useState("");

  const handleSelect = (id: number) => setSelectedMessage(id);
  const handleBack = () => setSelectedMessage(null);
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInput(e.target.value);
  const handleSend = () => {
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
              <div className="sender">{msg?.sender}</div>
              <div className="meta">Online</div>
            </div>
          </div>
        </div>
        <div className="chat-body">
          {msg?.chat.map((c, i) => (
            <div
              key={i}
              className={`chat-bubble ${
                c.from === "support" ? "support" : "user"
              }`}
            >
              <div className="bubble-text">{c.text}</div>
              <div className="bubble-time">{c.time}</div>
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
          />
          <button className="send-btn" onClick={handleSend}>
            <SendIcon className="" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="support-messages-tab">
      <h2>Messages</h2>
      <div className="message-list">
        {messages.map((msg) => (
          <div
            className="message-item"
            key={msg.id}
            onClick={() => handleSelect(msg.id)}
          >
            <img className="avatar" src={msg.avatar} alt="avatar" />
            <div className="message-info">
              <div className="sender">{msg.sender}</div>
              <div className="text">{msg.text}</div>
              <div className="meta">{msg.time}</div>
            </div>
          </div>
        ))}
      </div>
      <button className="send-message-btn">Send us a message</button>
    </div>
  );
};

export default SupportMessagesTab;
