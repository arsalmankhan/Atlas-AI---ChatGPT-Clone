import React from "react";
import { Plus, Menu } from "lucide-react";

const ChatMobileBar = ({ onToggleSidebar, onNewChat }) => {
  return (
    <header
      className="
        fixed top-0 left-0 right-0 
        flex items-center justify-between
        h-[52px] px-4 gap-3
        
        /* CHANGE 1: Hardcoded border/bg replaced by thematic colors and backdrop */
        border-b border-[var(--input-border)] 
        bg-[var(--bg)]/90 backdrop-blur-md
        
        z-30 md:hidden
      "
    >
      <button
        onClick={onToggleSidebar}
        aria-label="Toggle chat history"
        className="
          flex items-center justify-center
          
          /* CHANGE 2: Hardcoded button colors replaced by thematic variables */
          bg-[var(--card)] border border-[var(--input-border)]
          px-3 py-2 rounded-lg text-muted
          hover:bg-[var(--input-bg)] hover:text-[var(--text)]
          
          transition-colors duration-150
        "
      >
        <Menu className="w-5 h-5" />
      </button>
      <h1 className="text-center flex-1 text-[1.1rem] font-medium text-[var(--text)] select-none">
        ChatGPT Clone
      </h1>

      <button
        onClick={onNewChat}
        aria-label="New chat"
        className="
          flex items-center justify-center
          
          /* CHANGE 4: Hardcoded button colors replaced by thematic variables */
          bg-[var(--card)] border border-[var(--input-border)]
          px-3 py-2 rounded-lg text-muted
          hover:bg-[var(--input-bg)] hover:text-[var(--text)]
          
          transition-colors duration-150
        "
      >
        <Plus className="w-5 h-5" />
      </button>
    </header>
  );
};

export default ChatMobileBar;
