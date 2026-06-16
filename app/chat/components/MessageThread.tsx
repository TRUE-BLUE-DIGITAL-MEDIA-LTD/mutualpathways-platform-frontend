"use client";

import { useEffect, useRef, useState } from "react";
import { ChatMessage } from "../../../lib/chat/types";
import { dayLabel } from "../../../lib/chat/grouping";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";

export default function MessageThread({
  messages,
  currentUserId,
  typing,
  onLoadOlder,
  onRetry,
}: {
  messages: ChatMessage[];
  currentUserId: string;
  typing: boolean;
  onLoadOlder: () => void;
  onRetry: (clientTempId: string) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [showNewPill, setShowNewPill] = useState(false);
  const lastCountRef = useRef(0);

  function isAtBottom(): boolean {
    const el = containerRef.current;
    if (!el) return true;
    return el.scrollHeight - el.scrollTop - el.clientHeight < 80;
  }

  // Auto-scroll on new messages only when already near the bottom.
  useEffect(() => {
    if (messages.length > lastCountRef.current) {
      if (isAtBottom()) {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      } else {
        setShowNewPill(true);
      }
    }
    lastCountRef.current = messages.length;
  }, [messages]);

  function handleScroll() {
    const el = containerRef.current;
    if (!el) return;
    if (el.scrollTop < 40) {
      onLoadOlder();
    }
    if (isAtBottom()) {
      setShowNewPill(false);
    }
  }

  function jumpToBottom() {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    setShowNewPill(false);
  }

  let lastLabel = "";

  return (
    <div className="relative flex-1 overflow-hidden">
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="h-full space-y-3 overflow-y-auto pr-1"
      >
        {messages.map((message) => {
          const label = dayLabel(message.createdAt);
          const showSeparator = label !== lastLabel;
          lastLabel = label;
          return (
            <div key={message.id} className="space-y-3">
              {showSeparator && (
                <div className="my-2 text-center text-xs text-zinc-500">
                  {label}
                </div>
              )}
              <MessageBubble
                message={message}
                isMine={message.senderId === currentUserId}
                onRetry={onRetry}
              />
            </div>
          );
        })}
        {typing && <TypingIndicator />}
        <div ref={bottomRef} />
      </div>

      {showNewPill && (
        <button
          onClick={jumpToBottom}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-pink-500 px-4 py-1 text-sm font-semibold text-white shadow-lg"
        >
          ↓ New messages
        </button>
      )}
    </div>
  );
}
