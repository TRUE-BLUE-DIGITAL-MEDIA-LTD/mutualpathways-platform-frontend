'use client';

import { useChatContext } from '../app/chat/ChatProvider';
import { PresenceState } from '../lib/chat/types';

export function usePresence(userId: string | null): PresenceState {
  const ctx = useChatContext();
  if (!userId) {
    return { online: false };
  }
  return ctx.state.presence[userId] ?? { online: false };
}
