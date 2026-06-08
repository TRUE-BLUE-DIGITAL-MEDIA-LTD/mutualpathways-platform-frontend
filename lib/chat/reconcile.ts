import { ChatMessage, SendAck, ServerMessage } from './types';

export function sortByCreatedAt(messages: ChatMessage[]): ChatMessage[] {
  return [...messages].sort((a, b) => a.createdAt.localeCompare(b.createdAt));
}

export function addOptimistic(
  messages: ChatMessage[],
  draft: {
    clientTempId: string;
    senderId: string;
    receiverId: string;
    content: string;
    createdAt: string;
  },
): ChatMessage[] {
  const optimistic: ChatMessage = {
    id: draft.clientTempId,
    clientTempId: draft.clientTempId,
    senderId: draft.senderId,
    receiverId: draft.receiverId,
    content: draft.content,
    createdAt: draft.createdAt,
    deliveredAt: null,
    readAt: null,
    status: 'pending',
  };
  return sortByCreatedAt([...messages, optimistic]);
}

export function applyAck(messages: ChatMessage[], ack: SendAck): ChatMessage[] {
  const realExists = messages.some((m) => m.id === ack.id);
  if (realExists) {
    return messages.filter((m) => m.clientTempId !== ack.clientTempId);
  }
  return sortByCreatedAt(
    messages.map((m) =>
      m.clientTempId === ack.clientTempId
        ? { ...m, id: ack.id, createdAt: ack.createdAt, status: 'sent' as const }
        : m,
    ),
  );
}

export function applyIncoming(
  messages: ChatMessage[],
  incoming: ServerMessage,
): ChatMessage[] {
  if (messages.some((m) => m.id === incoming.id)) {
    return messages;
  }
  return sortByCreatedAt([...messages, { ...incoming, status: 'sent' }]);
}

export function applyRead(
  messages: ChatMessage[],
  currentUserId: string,
  readAt: string,
): ChatMessage[] {
  return messages.map((m) =>
    m.senderId === currentUserId && m.readAt === null ? { ...m, readAt } : m,
  );
}

export function markFailed(
  messages: ChatMessage[],
  clientTempId: string,
): ChatMessage[] {
  return messages.map((m) =>
    m.clientTempId === clientTempId ? { ...m, status: 'failed' as const } : m,
  );
}

export function fromServer(messages: ServerMessage[]): ChatMessage[] {
  return sortByCreatedAt(messages.map((m) => ({ ...m, status: 'sent' as const })));
}

export function mergeHistory(
  existing: ChatMessage[],
  history: ServerMessage[],
): ChatMessage[] {
  const byId = new Map<string, ChatMessage>();
  for (const m of history) {
    byId.set(m.id, { ...m, status: 'sent' });
  }
  for (const m of existing) {
    if (m.status === 'pending') {
      byId.set(m.id, m);
    } else if (!byId.has(m.id)) {
      byId.set(m.id, m);
    }
  }
  return sortByCreatedAt(Array.from(byId.values()));
}

export function addOptimisticImage(
  messages: ChatMessage[],
  draft: {
    clientTempId: string;
    senderId: string;
    receiverId: string;
    localPreviewUrl: string;
    attachmentType: string;
    createdAt: string;
  },
): ChatMessage[] {
  const optimistic: ChatMessage = {
    id: draft.clientTempId,
    clientTempId: draft.clientTempId,
    senderId: draft.senderId,
    receiverId: draft.receiverId,
    content: '',
    createdAt: draft.createdAt,
    deliveredAt: null,
    readAt: null,
    attachmentUrl: null,
    attachmentType: draft.attachmentType,
    localPreviewUrl: draft.localPreviewUrl,
    uploadProgress: 0,
    status: 'uploading',
  };
  return sortByCreatedAt([...messages, optimistic]);
}

export function setUploadProgress(
  messages: ChatMessage[],
  clientTempId: string,
  progress: number,
): ChatMessage[] {
  return messages.map((m) =>
    m.clientTempId === clientTempId ? { ...m, uploadProgress: progress } : m,
  );
}

export function prependOlder(
  existing: ChatMessage[],
  older: ServerMessage[],
): ChatMessage[] {
  const ids = new Set(existing.map((m) => m.id));
  const add = older
    .filter((m) => !ids.has(m.id))
    .map((m) => ({ ...m, status: 'sent' as const }));
  return sortByCreatedAt([...add, ...existing]);
}
