import React from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react"; 

const ChatSidebar = ({
  chats = [],
  activeChatId,
  onSelectChat,
  onNewChat,
  onToggleSidebar,
  open,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        "https://atlas-ai-chatgpt-clone.onrender.com/api/auth/logout",
        {},
        { withCredentials: true }
      );

      dispatch(logout());
      navigate("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <>
      {open && (
        <button
          className="fixed inset-0 bg-[var(--bg)]/40 cursor-pointer z-30 md:hidden"
          onClick={onToggleSidebar}
          aria-label="Close sidebar"
        />
      )}

      <aside
        className={`fixed md:static top-0 bottom-0 left-0 z-40 flex flex-col w-[250px] 
          bg-[var(--card)]/95 backdrop-blur-md border-r border-[var(--input-border)] 
          transform transition-transform duration-200 ${
            open ? "translate-x-0" : "-translate-x-[270px]"
          } md:translate-x-0 md:pt-0 pt-[52px]`}
        aria-label="Previous chats"
      >
        <div className="flex items-center justify-between gap-2 px-4 py-3 border-b border-[var(--input-border)]">
          <h2 className="text-base font-medium">Chats</h2>

          <button
            className="px-3 py-1.5 text-[0.75rem] font-semibold uppercase tracking-wide rounded-md 
              border border-[var(--input-border)] bg-[var(--input-bg)] text-text 
              hover:bg-[var(--bg)] transition-colors"
            onClick={onNewChat}
          >
            New
          </button>
        </div>
        <nav
          className="flex flex-col gap-1 p-3 overflow-y-auto scrollbar-hide flex-1 pb-16" 
          aria-live="polite"
        >
          {Array.isArray(chats) && chats.length > 0 ? (
            chats.map((c) => (
              <button
                key={c._id || c.id}
                className={`text-left px-4 py-3 rounded-xl flex flex-col gap-1 transition-all duration-200 hover:scale-[1.02] active:scale-[0.99] 
                  ${
                    c._id === activeChatId || c.id === activeChatId
                      ? "bg-[var(--primary)] text-[var(--primary-contrast)] shadow-md"
                      : "bg-[var(--input-bg)] border border-[var(--input-border)] hover:bg-[var(--bg)] text-[var(--text)]"
                  }`}
                onClick={() => onSelectChat(c._id || c.id)}
              >
                <span className="text-sm font-medium leading-snug">
                  {c.title || "Untitled Chat"}
                </span>
                <span className={`text-[0.65rem] ${c._id === activeChatId || c.id === activeChatId ? "text-white/80" : "text-muted"}`}>
                  {c.messages?.length || 0} msg
                  {(c.messages?.length || 0) !== 1 && "s"}
                </span>
              </button>
            ))
          ) : (
            <p className="m-4 text-sm text-muted">No chats yet.</p>
          )}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-[var(--input-border)] bg-[var(--card)]/95 backdrop-blur-sm">
          <button
            className="flex items-center justify-center w-full px-3 py-2 text-sm font-semibold rounded-lg 
              bg-red-600 text-white hover:bg-red-700 transition-colors gap-2"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4" /> 
            Log Out
          </button>
        </div>
      </aside>
    </>
  );
};

export default ChatSidebar;