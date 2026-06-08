export type MessageStatus = 'pending' | 'uploading' | 'sent' | 'failed';

/** A message exactly as the server sends it (over socket or REST). */
export interface ServerMessage {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  createdAt: string;
  deliveredAt: string | null;
  readAt: string | null;
  attachmentUrl?: string | null;
  attachmentType?: string | null;
  attachmentKey?: string | null;
}

/** A message in UI state: server fields plus client-only tracking. */
export interface ChatMessage extends ServerMessage {
  clientTempId?: string;
  status: MessageStatus;
  localPreviewUrl?: string;
  uploadProgress?: number;
}

export interface SendAck {
  id: string;
  createdAt: string;
  clientTempId: string;
}

export interface PresenceState {
  online: boolean;
  lastSeen?: string | null;
}

export interface ReadEvent {
  byUserId: string;
  conversationWith: string;
  readAt: string;
}

export interface TypingEvent {
  fromUserId: string;
}

export interface PresenceEvent {
  userId: string;
  online: boolean;
  lastSeen?: string | null;
}

export interface ErrorEvent {
  event: string;
  message: string;
}

export interface ServerToClientEvents {
  'message:new': (m: ServerMessage) => void;
  'message:read': (e: ReadEvent) => void;
  'typing:start': (e: TypingEvent) => void;
  'typing:stop': (e: TypingEvent) => void;
  'presence:update': (e: PresenceEvent) => void;
  error: (e: ErrorEvent) => void;
}

export interface ClientToServerEvents {
  'message:send': (
    payload: {
      receiverId: string;
      content?: string;
      attachmentKey?: string;
      attachmentType?: string;
      clientTempId: string;
    },
    ack: (res: SendAck) => void,
  ) => void;
  'message:read': (payload: { otherUserId: string }) => void;
  'typing:start': (payload: { receiverId: string }) => void;
  'typing:stop': (payload: { receiverId: string }) => void;
}
