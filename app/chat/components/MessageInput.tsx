'use client';

import { useRef, useState } from 'react';

export default function MessageInput({
  disabled,
  onSend,
  onTyping,
  onSendImage,
}: {
  disabled: boolean;
  onSend: (content: string) => void;
  onTyping: (isTyping: boolean) => void;
  onSendImage: (file: File) => void;
}) {
  const [value, setValue] = useState('');
  const typingRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function stopTyping() {
    if (typingRef.current) {
      typingRef.current = false;
      onTyping(false);
    }
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }

  function handleChange(next: string) {
    setValue(next);
    if (!typingRef.current && next.length > 0) {
      typingRef.current = true;
      onTyping(true);
    }
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(stopTyping, 2000);
  }

  function handleSend() {
    const trimmed = value.trim();
    if (!trimmed) {
      return;
    }
    onSend(trimmed);
    setValue('');
    stopTyping();
  }

  function handlePickImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      onSendImage(file);
    }
    e.target.value = '';
  }

  return (
    <div className="mt-4 flex items-center gap-3">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        onChange={handlePickImage}
      />
      <button
        type="button"
        disabled={disabled}
        onClick={() => fileInputRef.current?.click()}
        className="rounded-2xl border border-zinc-700 bg-zinc-800 px-4 py-4 text-lg disabled:opacity-50"
        aria-label="Send image"
      >
        🖼️
      </button>
      <input
        type="text"
        placeholder="Type a message..."
        value={value}
        disabled={disabled}
        onChange={(e) => handleChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSend();
          }
        }}
        className="flex-1 rounded-2xl border border-zinc-700 bg-zinc-800 px-4 py-4 outline-none disabled:opacity-50"
      />
      <button
        onClick={handleSend}
        disabled={disabled}
        className="rounded-2xl bg-white px-6 font-bold text-black disabled:opacity-50"
      >
        Send
      </button>
    </div>
  );
}
