'use client';

import { ChatMessage } from '../../../lib/chat/types';

function StatusTicks({ message }: { message: ChatMessage }) {
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

export default function MessageBubble({
  message,
  isMine,
  onRetry,
}: {
  message: ChatMessage;
  isMine: boolean;
  onRetry?: (clientTempId: string) => void;
}) {
  return (
    <div className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
          isMine ? 'bg-pink-500 text-white' : 'bg-zinc-800 text-white'
        }`}
      >
        <div className="whitespace-pre-wrap break-words">{message.content}</div>
        <div className="mt-2 flex items-center justify-end gap-2 text-xs opacity-70">
          <span>
            {new Date(message.createdAt).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
          {isMine && <StatusTicks message={message} />}
          {isMine &&
            message.status === 'failed' &&
            message.clientTempId &&
            onRetry && (
              <button
                onClick={() => onRetry(message.clientTempId!)}
                className="underline"
              >
                Retry
              </button>
            )}
        </div>
      </div>
    </div>
  );
}
