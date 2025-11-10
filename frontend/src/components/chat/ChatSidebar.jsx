import React from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";

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
        "http://localhost:3000/api/auth/logout",
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
          className="fixed inset-0 bg-black/40 cursor-pointer z-30 md:hidden"
          onClick={onToggleSidebar}
          aria-label="Close sidebar"
        />
      )}
      <aside
        className={`fixed md:static top-0 bottom-0 left-0 z-40 flex flex-col w-[250px] bg-[#0d0d0d]/95 backdrop-blur-md border-r border-[#1e1e1e] transform transition-transform duration-200 ${
          open ? "translate-x-0" : "-translate-x-[270px]"
        } md:translate-x-0 md:pt-0 pt-[52px]`}
        aria-label="Previous chats"
      >
        <div className="flex items-center justify-between gap-2 px-4 py-3 border-b border-[#1e1e1e]">
          <h2 className="text-base font-medium text-white">Chats</h2>

          <div className="flex items-center gap-2">
            <button
              className="px-3 py-1.5 text-[0.75rem] font-semibold uppercase tracking-wide rounded-md border border-[#252525] bg-[#111] text-white hover:bg-[#181818] transition-colors"
              onClick={onNewChat}
            >
              New
            </button>

            <button
              className="px-3 py-1.5 text-[0.75rem] font-semibold uppercase tracking-wide rounded-md border border-[#252525] bg-[#111] text-white hover:bg-red-600 transition-colors"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>

        <nav
          className="flex flex-col gap-1 p-3 overflow-y-auto scrollbar-hide"
          aria-live="polite"
        >
          {Array.isArray(chats) && chats.length > 0 ? (
            chats.map((c) => (
              <button
                key={c._id || c.id}
                className={`text-left border px-4 py-3 rounded-xl flex flex-col gap-1 transition-all duration-200 hover:bg-[#151515] hover:scale-[1.02] active:scale-[0.99] ${
                  c._id === activeChatId || c.id === activeChatId
                    ? "bg-[#151515] border-[#2a2a2a]"
                    : "bg-[#0d0d0d] border-[#1c1c1c]"
                }`}
                onClick={() => onSelectChat(c._id || c.id)}
              >
                <span className="text-sm font-medium leading-snug text-white">
                  {c.title || "Untitled Chat"}
                </span>
                <span className="text-[0.65rem] text-gray-400">
                  {(c.messages?.length || 0)} msg
                  {(c.messages?.length || 0) !== 1 && "s"}
                </span>
              </button>
            ))
          ) : (
            <p className="m-4 text-sm text-gray-500">No chats yet.</p>
          )}
        </nav>
      </aside>
    </>
  );
};

export default ChatSidebar;
