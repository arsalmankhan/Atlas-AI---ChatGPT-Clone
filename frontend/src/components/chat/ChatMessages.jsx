import React, { useEffect, useRef } from "react";

const ChatMessages = ({ messages, isSending }) => {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length, isSending]);

  return (
    <div
      className="flex flex-col flex-1 w-full overflow-y-auto gap-5 max-w-[820px] px-4 py-4 scrollbar-hide"
      aria-live="polite"
    >
      {messages.map((m, index) => (
        <div
          key={index}
          className={`group flex flex-col max-w-[780px] relative ${
            m.type === "user" ? "self-end" : "self-start"
          }`}
        >
          <div className="text-[0.65rem] uppercase tracking-wide text-gray-500 mb-1 font-semibold">
            {m.type === "user" ? "You" : "AI"}
          </div>

          <div
            className={`msg-bubble rounded-[14px] px-4 py-3 text-sm leading-relaxed border whitespace-pre-wrap break-words ${
              m.type === "user"
                ? "bg-gradient-to-b from-[#1f1f1f] to-[#161616] text-gray-100 border-[#2a2a2a]"
                : m.type === "ai"
                ? "bg-[#0d0d0d] border-[#1e1e1e] text-gray-100 animate-fadeIn"
                : "border-red-500 text-red-500"
            }`}
          >
            {m.content}
          </div>

          <div className="flex items-center gap-1.5 mt-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-200">
            <button
              type="button"
              aria-label="Copy message"
              onClick={() => navigator.clipboard.writeText(m.content)}
              className="w-[30px] h-[30px] bg-[#0d0d0d] border border-[#1e1e1e] rounded-md flex items-center justify-center text-[#6a6a6a] hover:bg-[#151515] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="w-4 h-4 stroke-[1.75]"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
            </button>

            {m.type === "ai" && (
              <>
                <button
                  type="button"
                  aria-label="Like response"
                  className="w-[30px] h-[30px] bg-[#0d0d0d] border border-[#1e1e1e] rounded-md flex items-center justify-center text-[#6a6a6a] hover:bg-[#151515] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    className="w-4 h-4 stroke-[1.75]"
                  >
                    <path d="M7 10v11" />
                    <path d="M15 21H9a2 2 0 0 1-2-2v-9l5-7 1 1a2 2 0 0 1 .5 1.3V9h5a2 2 0 0 1 2 2l-2 8a2 2 0 0 1-2 2Z" />
                  </svg>
                </button>

                <button
                  type="button"
                  aria-label="Dislike response"
                  className="w-[30px] h-[30px] bg-[#0d0d0d] border border-[#1e1e1e] rounded-md flex items-center justify-center text-[#6a6a6a] hover:bg-[#151515] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    className="w-4 h-4 stroke-[1.75]"
                  >
                    <path d="M17 14V3" />
                    <path d="M9 3h6a2 2 0 0 1 2 2v9l-5 7-1-1a2 2 0 0 1-.5-1.3V15H5a2 2 0 0 1-2-2l2-8a2 2 0 0 1 2-2Z" />
                  </svg>
                </button>
                <button
                  type="button"
                  aria-label="Speak message"
                  onClick={() => {
                    try {
                      const u = new SpeechSynthesisUtterance(m.content);
                      speechSynthesis.speak(u);
                    } catch {
                      /* unsupported */
                    }
                  }}
                  className="w-[30px] h-[30px] bg-[#0d0d0d] border border-[#1e1e1e] rounded-md flex items-center justify-center text-[#6a6a6a] hover:bg-[#151515] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    className="w-4 h-4 stroke-[1.75]"
                  >
                    <path d="M5 8v8" />
                    <path d="M8 4v16" />
                    <path d="M12 2v20" />
                    <path d="M19 5c1.5 2 1.5 12 0 14" />
                    <path d="M16 8c.8 1 1 7 0 8" />
                  </svg>
                </button>

                <button
                  type="button"
                  aria-label="Regenerate"
                  onClick={() => {}}
                  className="w-[30px] h-[30px] bg-[#0d0d0d] border border-[#1e1e1e] rounded-md flex items-center justify-center text-[#6a6a6a] hover:bg-[#151515] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    className="w-4 h-4 stroke-[1.75]"
                  >
                    <path d="M2 12A10 10 0 0 1 12 2c2.5 0 4.8 1 6.5 2.5L22 8" />
                    <path d="M22 2v6h-6" />
                    <path d="M22 12a10 10 0 0 1-10 10c-2.5 0-4.8-1-6.5-2.5L2 16" />
                    <path d="M2 22v-6h6" />
                  </svg>
                </button>
              </>
            )}
          </div>
        </div>
      ))}

      {isSending && (
        <div className="self-start flex flex-col animate-fadeIn">
          <div className="text-[0.65rem] uppercase tracking-wide text-gray-500 mb-1 font-semibold">
            AI
          </div>
          <div
            className="rounded-[14px] px-4 py-3 text-sm leading-relaxed border border-[#1e1e1e] bg-[#0d0d0d] text-gray-100 inline-flex gap-[6px]"
            aria-label="AI is typing"
          >
            <span className="w-[6px] h-[6px] bg-current opacity-60 rounded-full animate-blink" />
            <span className="w-[6px] h-[6px] bg-current opacity-60 rounded-full animate-blink [animation-delay:0.2s]" />
            <span className="w-[6px] h-[6px] bg-current opacity-60 rounded-full animate-blink [animation-delay:0.4s]" />
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
};

export default ChatMessages;
