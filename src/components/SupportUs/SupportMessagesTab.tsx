import React, { useState } from "react";
import "./SupportMessagesTab.scss";
import { ArrowLeftIcon } from "lucide-react";
import ChatView from "./ChatView";
import { useSupportPanelContext } from "../../contexts/SupportPanelContext";
import { useChat } from "../../contexts/ChatContext";

const SupportMessagesTab: React.FC = () => {
  const { handleTabChange } = useSupportPanelContext();
  const [input, setInput] = useState("");

  // Define a default message for ChatView
  const defaultMsg = {
    id: 0,
    avatar: "https://static.intercomassets.com/avatars/7986453/square_128/Screenshot_2025-01-07_164341-1736248445.png",
    sender: "GS365 Customer Service",
    text: "Welcome to support chat.",
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    preview: false,
    chat: [],
    isRead: true,
  };

  const handleBack = () => {
    handleTabChange("home");
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

  return (
    <ChatView
      msg={defaultMsg}
      handleBack={handleBack}
      input={input}
      handleInput={handleInput}
      handleSend={handleSend}
    />
  );
};

export default SupportMessagesTab;
