import React, { useCallback, useRef, useLayoutEffect } from "react";

const ChatComposer = ({ input, setInput, onSend, isSending }) => {
  const textareaRef = useRef(null);

  // Auto-grow textarea height up to max-height
  useLayoutEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 320) + "px";
  }, [input]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        if (input.trim()) onSend();
      }
    },
    [onSend, input]
  );

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (input.trim()) onSend();
      }}
      className="sticky bottom-0 w-full flex justify-center bg-gradient-to-t from-black/85 to-transparent backdrop-blur-md py-6 md:py-8"
    >
      <div
        className={`flex items-end gap-2 w-full max-w-[820px] mx-4 md:mx-8 bg-[#1f1f20] border border-[#3a3a3c] rounded-3xl px-4 md:px-5 pt-3 pb-4 relative transition-all duration-150 ${
          isSending
            ? ""
            : "focus-within:bg-[#232324] focus-within:border-[#565759] focus-within:shadow-[0_0_0_1px_#565759,0_0_0_4px_rgba(86,87,89,0.25)]"
        }`}
      >
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            className="w-full resize-none border-0 outline-none bg-transparent text-[#f5f5f5] text-base leading-relaxed max-h-[260px] pb-4 placeholder:text-[#8d8d91]"
            placeholder="Message ChatGPT…"
            aria-label="Message"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
            spellCheck
            autoComplete="off"
          />
          <div className="absolute left-[2px] bottom-[2px] text-[11px] text-[#5f6165] select-none pointer-events-none font-medium leading-tight max-[420px]:hidden">
            Enter ↵ to send • Shift+Enter = newline
          </div>
        </div>

        <button
          type="submit"
          disabled={!input.trim() || isSending}
          aria-label={isSending ? "Sending…" : "Send message"}
          className="w-10 h-10 md:w-[40px] md:h-[40px] flex items-center justify-center rounded-full bg-[#3a3a3c] border border-[#525255] text-[#f1f1f2] flex-shrink-0 transition-all duration-150 disabled:opacity-35 disabled:cursor-default hover:enabled:bg-[#4a4a4d] active:enabled:bg-[#343436] active:enabled:translate-y-[1px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        >
          <span
            className="inline-flex transition-transform duration-150 group-hover:translate-x-[1px]"
            aria-hidden="true"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="M12 5l7 7-7 7" />
            </svg>
          </span>
        </button>
      </div>
    </form>
  );
};

export default ChatComposer;
