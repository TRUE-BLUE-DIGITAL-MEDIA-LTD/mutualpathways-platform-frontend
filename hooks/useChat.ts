'use client';

import { useEffect } from 'react';
import { useChatContext } from '../app/chat/ChatProvider';

export function useChat(otherUserId: string | null) {
  const ctx = useChatContext();

  useEffect(() => {
    if (!otherUserId) {
      ctx.setActive(null);
      return;
    }
    ctx.setActive(otherUserId);
    ctx.loadConversation(otherUserId);
    ctx.markRead(otherUserId);
    return () => ctx.setActive(null);
    // ctx methods are stable (useCallback)
  }, [otherUserId, ctx]);

  return {
    messages: otherUserId ? ctx.state.conversations[otherUserId] ?? [] : [],
    status: ctx.state.status,
    typing: otherUserId ? Boolean(ctx.state.typing[otherUserId]) : false,
    send: (content: string) =>
      otherUserId ? ctx.sendMessage(otherUserId, content) : Promise.resolve(),
    loadOlder: () =>
      otherUserId ? ctx.loadOlder(otherUserId) : Promise.resolve(),
    retry: (clientTempId: string) =>
      otherUserId ? ctx.retry(otherUserId, clientTempId) : Promise.resolve(),
    emitTyping: (isTyping: boolean) =>
      otherUserId && ctx.emitTyping(otherUserId, isTyping),
  };
}
