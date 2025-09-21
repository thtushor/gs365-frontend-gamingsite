import React, { createContext, useContext, useState, ReactNode } from "react";

interface SupportPanelContextType {
  activeTab: string;
  handleTabChange: (tab: string) => void;
  parenScroll: boolean;
  setParentScroll: (scroll: boolean) => void;
}

const SupportPanelContext = createContext<SupportPanelContextType | undefined>(
  undefined
);

interface SupportPanelProviderProps {
  children: ReactNode;
  initialTab?: string;
}

export const SupportPanelProvider: React.FC<SupportPanelProviderProps> = ({
  children,
  initialTab = "home",
}) => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [parenScroll, setParentScroll] = useState(true);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <SupportPanelContext.Provider
      value={{ activeTab, handleTabChange, parenScroll, setParentScroll }}
    >
      {children}
    </SupportPanelContext.Provider>
  );
};

export const useSupportPanelContext = () => {
  const context = useContext(SupportPanelContext);
  if (context === undefined) {
    throw new Error(
      "useSupportPanelContext must be used within a SupportPanelProvider"
    );
  }
  return context;
};
