// import { useContext } from "react";
import { useSupportPanelContext } from "../../contexts/SupportPanelContext";

interface UseSupportPanelProps {
  onClose: () => void;
}

const useSupportPanel = ({ onClose }: UseSupportPanelProps) => {
  const { activeTab, handleTabChange, parenScroll, setParentScroll } =
    useSupportPanelContext();

  return {
    activeTab,
    handleTabChange,
    parenScroll,
    setParentScroll,
    onClose,
  };
};

export default useSupportPanel;
