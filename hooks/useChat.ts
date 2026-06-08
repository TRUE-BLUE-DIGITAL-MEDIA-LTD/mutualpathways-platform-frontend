'use client';

import { useEffect } from 'react';
import { useChatContext } from '../app/chat/ChatProvider';

export function useChat(otherUserId: string | null) {
  const ctx = useChatContext();
  // Depend on the individual callbacks (stable via useCallback), NOT the whole
  // ctx object. ctx is recreated on every ChatProvider render (state changes),
  // so depending on it would re-run this effect on every render — and markRead
  // dispatches a state change, causing an infinite update loop.
  const { setActive, loadConversation, markRead } = ctx;

  useEffect(() => {
    if (!otherUserId) {
      setActive(null);
      return;
    }
    setActive(otherUserId);
    loadConversation(otherUserId);
    markRead(otherUserId);
    return () => setActive(null);
  }, [otherUserId, setActive, loadConversation, markRead]);

  return {
    messages: otherUserId ? ctx.state.conversations[otherUserId] ?? [] : [],
    status: ctx.state.status,
    typing: otherUserId ? Boolean(ctx.state.typing[otherUserId]) : false,
    send: (content: string) =>
      otherUserId ? ctx.sendMessage(otherUserId, content) : Promise.resolve(),
    sendImage: (file: File) =>
      otherUserId ? ctx.sendImage(otherUserId, file) : Promise.resolve(),
    loadOlder: () =>
      otherUserId ? ctx.loadOlder(otherUserId) : Promise.resolve(),
    retry: (clientTempId: string) =>
      otherUserId ? ctx.retry(otherUserId, clientTempId) : Promise.resolve(),
    emitTyping: (isTyping: boolean) =>
      otherUserId && ctx.emitTyping(otherUserId, isTyping),
  };
}
