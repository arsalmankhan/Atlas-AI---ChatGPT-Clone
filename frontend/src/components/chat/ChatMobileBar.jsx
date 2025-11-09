import React from "react";
import { Plus, Menu } from "lucide-react"; // optional icons for better UI (you can remove if not using lucide-react)

const ChatMobileBar = ({ onToggleSidebar, onNewChat }) => {
  return (
    <header
      className="
        fixed top-0 left-0 right-0 
        flex items-center justify-between
        h-[52px] px-4 gap-3
        border-b border-[#1e1e1e]
        bg-black/90 backdrop-blur-md
        z-30 md:hidden
      "
    >
      {/* Sidebar Toggle */}
      <button
        onClick={onToggleSidebar}
        aria-label="Toggle chat history"
        className="
          flex items-center justify-center
          bg-[#0d0d0d] border border-[#1e1e1e]
          px-3 py-2 rounded-lg text-[#d0d0d0]
          hover:bg-[#181818] hover:text-white
          transition-colors duration-150
        "
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Title */}
      <h1 className="text-center flex-1 text-[1.1rem] font-medium text-white select-none">
        ChatGPT Clone
      </h1>

      {/* New Chat Button */}
      <button
        onClick={onNewChat}
        aria-label="New chat"
        className="
          flex items-center justify-center
          bg-[#0d0d0d] border border-[#1e1e1e]
          px-3 py-2 rounded-lg text-[#d0d0d0]
          hover:bg-[#181818] hover:text-white
          transition-colors duration-150
        "
      >
        <Plus className="w-5 h-5" />
      </button>
    </header>
  );
};

export default ChatMobileBar;
