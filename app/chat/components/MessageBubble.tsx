'use client';

import { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../../lib/api';
import { ChatMessage } from '../../../lib/chat/types';

function StatusTicks({ message }: { message: ChatMessage }) {
  if (message.status === 'uploading') {
    return <span className="opacity-60">{message.uploadProgress ?? 0}%</span>;
  }
  if (message.status === 'pending') {
    return <span className="opacity-60">·</span>;
  }
  if (message.status === 'failed') {
    return <span className="text-red-300">! failed</span>;
  }
  if (message.readAt) {
    return <span className="text-sky-300">✓✓</span>;
  }
  if (message.deliveredAt) {
    return <span className="opacity-70">✓✓</span>;
  }
  return <span className="opacity-70">✓</span>;
}

function ImageContent({ message }: { message: ChatMessage }) {
  const [src, setSrc] = useState(message.localPreviewUrl || message.attachmentUrl || '');
  const [refreshed, setRefreshed] = useState(false);

  async function handleError() {
    if (refreshed || !message.attachmentKey) {
      return;
    }
    setRefreshed(true);
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get(
        `${API_URL}/uploads/sign-read?key=${encodeURIComponent(message.attachmentKey)}`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      if (data?.url) {
        setSrc(data.url);
      }
    } catch {
      // give up; broken image shows
    }
  }

  return (
    <div className="relative">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt="Shared image"
        onError={handleError}
        className="max-h-72 max-w-full rounded-xl object-cover"
      />
      {message.status === 'uploading' && (
        <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-black/40">
          <span className="text-sm font-semibold text-white">
            {message.uploadProgress ?? 0}%
          </span>
        </div>
      )}
    </div>
  );
}

export default function MessageBubble({
  message,
  isMine,
  onRetry,
}: {
  message: ChatMessage;
  isMine: boolean;
  onRetry?: (clientTempId: string) => void;
}) {
  const isImage = Boolean(message.attachmentUrl || message.localPreviewUrl);
  return (
    <div className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
          isMine ? 'bg-pink-500 text-white' : 'bg-zinc-800 text-white'
        }`}
      >
        {isImage ? (
          <ImageContent message={message} />
        ) : (
          <div className="whitespace-pre-wrap break-words">{message.content}</div>
        )}
        <div className="mt-2 flex items-center justify-end gap-2 text-xs opacity-70">
          <span>
            {new Date(message.createdAt).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
          {isMine && <StatusTicks message={message} />}
          {isMine &&
            !isImage &&
            message.status === 'failed' &&
            message.clientTempId &&
            onRetry && (
              <button onClick={() => onRetry(message.clientTempId!)} className="underline">
                Retry
              </button>
            )}
        </div>
      </div>
    </div>
  );
}
