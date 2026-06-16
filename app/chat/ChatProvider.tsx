"use client";

import axios from "axios";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useRef,
  ReactNode,
} from "react";
import { API_URL } from "../../lib/api";
import { socket, connectSocket, disconnectSocket } from "../../lib/socket";
import {
  ChatMessage,
  PresenceState,
  ServerMessage,
} from "../../lib/chat/types";
import {
  addOptimistic,
  addOptimisticImage,
  applyAck,
  applyIncoming,
  applyRead,
  markFailed,
  mergeHistory,
  prependOlder,
  setUploadProgress,
} from "../../lib/chat/reconcile";
import { uploadImage } from "../../lib/upload/uploadImage";

type ConnectionStatus = "connecting" | "connected" | "disconnected";

interface State {
  currentUserId: string;
  status: ConnectionStatus;
  conversations: Record<string, ChatMessage[]>;
  presence: Record<string, PresenceState>;
  unread: Record<string, number>;
  typing: Record<string, boolean>;
}

type Action =
  | { type: "SET_USER"; userId: string }
  | { type: "SET_STATUS"; status: ConnectionStatus }
  | {
      type: "LOAD_CONVERSATION";
      otherUserId: string;
      messages: ServerMessage[];
    }
  | { type: "PREPEND"; otherUserId: string; messages: ServerMessage[] }
  | {
      type: "ADD_OPTIMISTIC";
      otherUserId: string;
      draft: {
        clientTempId: string;
        senderId: string;
        receiverId: string;
        content: string;
        createdAt: string;
      };
    }
  | {
      type: "ADD_OPTIMISTIC_IMAGE";
      otherUserId: string;
      draft: {
        clientTempId: string;
        senderId: string;
        receiverId: string;
        localPreviewUrl: string;
        attachmentType: string;
        createdAt: string;
      };
    }
  | {
      type: "UPLOAD_PROGRESS";
      otherUserId: string;
      clientTempId: string;
      progress: number;
    }
  | {
      type: "ACK";
      otherUserId: string;
      ack: { id: string; createdAt: string; clientTempId: string };
    }
  | { type: "FAIL"; otherUserId: string; clientTempId: string }
  | { type: "INCOMING"; message: ServerMessage; activeId: string | null }
  | { type: "READ"; otherUserId: string; readAt: string }
  | { type: "PRESENCE"; userId: string; presence: PresenceState }
  | { type: "TYPING"; userId: string; typing: boolean }
  | { type: "CLEAR_UNREAD"; otherUserId: string }
  | { type: "SET_UNREAD"; counts: { userId: string; count: number }[] };

const initialState: State = {
  currentUserId: "",
  status: "connecting",
  conversations: {},
  presence: {},
  unread: {},
  typing: {},
};

function setConv(
  state: State,
  otherUserId: string,
  next: ChatMessage[],
): State {
  return {
    ...state,
    conversations: { ...state.conversations, [otherUserId]: next },
  };
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_USER":
      return { ...state, currentUserId: action.userId };
    case "SET_STATUS":
      return { ...state, status: action.status };
    case "LOAD_CONVERSATION": {
      const existing = state.conversations[action.otherUserId] ?? [];
      return setConv(
        state,
        action.otherUserId,
        mergeHistory(existing, action.messages),
      );
    }
    case "PREPEND": {
      const existing = state.conversations[action.otherUserId] ?? [];
      return setConv(
        state,
        action.otherUserId,
        prependOlder(existing, action.messages),
      );
    }
    case "ADD_OPTIMISTIC": {
      const existing = state.conversations[action.otherUserId] ?? [];
      return setConv(
        state,
        action.otherUserId,
        addOptimistic(existing, action.draft),
      );
    }
    case "ADD_OPTIMISTIC_IMAGE": {
      const existing = state.conversations[action.otherUserId] ?? [];
      return setConv(
        state,
        action.otherUserId,
        addOptimisticImage(existing, action.draft),
      );
    }
    case "UPLOAD_PROGRESS": {
      const existing = state.conversations[action.otherUserId] ?? [];
      return setConv(
        state,
        action.otherUserId,
        setUploadProgress(existing, action.clientTempId, action.progress),
      );
    }
    case "ACK": {
      const existing = state.conversations[action.otherUserId] ?? [];
      return setConv(state, action.otherUserId, applyAck(existing, action.ack));
    }
    case "FAIL": {
      const existing = state.conversations[action.otherUserId] ?? [];
      return setConv(
        state,
        action.otherUserId,
        markFailed(existing, action.clientTempId),
      );
    }
    case "INCOMING": {
      const { message, activeId } = action;
      const other =
        message.senderId === state.currentUserId
          ? message.receiverId
          : message.senderId;
      const existing = state.conversations[other] ?? [];
      let next = setConv(state, other, applyIncoming(existing, message));
      const isInbound = message.senderId !== state.currentUserId;
      if (isInbound && other !== activeId) {
        next = {
          ...next,
          unread: { ...next.unread, [other]: (next.unread[other] ?? 0) + 1 },
        };
      }
      return next;
    }
    case "READ": {
      const existing = state.conversations[action.otherUserId] ?? [];
      return setConv(
        state,
        action.otherUserId,
        applyRead(existing, state.currentUserId, action.readAt),
      );
    }
    case "PRESENCE":
      return {
        ...state,
        presence: { ...state.presence, [action.userId]: action.presence },
      };
    case "TYPING":
      return {
        ...state,
        typing: { ...state.typing, [action.userId]: action.typing },
      };
    case "CLEAR_UNREAD":
      return {
        ...state,
        unread: { ...state.unread, [action.otherUserId]: 0 },
      };
    case "SET_UNREAD": {
      const unread: Record<string, number> = {};
      for (const c of action.counts) {
        unread[c.userId] = c.count;
      }
      return { ...state, unread };
    }
    default:
      return state;
  }
}

interface ChatContextValue {
  state: State;
  setActive: (otherUserId: string | null) => void;
  loadConversation: (otherUserId: string) => Promise<void>;
  loadOlder: (otherUserId: string) => Promise<void>;
  sendMessage: (otherUserId: string, content: string) => Promise<void>;
  sendImage: (otherUserId: string, file: File) => Promise<void>;
  retry: (otherUserId: string, clientTempId: string) => Promise<void>;
  markRead: (otherUserId: string) => void;
  emitTyping: (otherUserId: string, isTyping: boolean) => void;
}

const ChatContext = createContext<ChatContextValue | null>(null);

export function useChatContext(): ChatContextValue {
  const ctx = useContext(ChatContext);
  if (!ctx) {
    throw new Error("useChatContext must be used within ChatProvider");
  }
  return ctx;
}

function authHeaders() {
  const token = localStorage.getItem("token");
  return { headers: { Authorization: `Bearer ${token}` } };
}

export function ChatProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const activeRef = useRef<string | null>(null);
  const loadedRef = useRef<Set<string>>(new Set());
  // Mirror reducer state into refs so the context callbacks below stay
  // identity-stable ([] deps). Otherwise callbacks that read conversations or
  // the current user id would be recreated on every message, changing the
  // context value and re-running useChat's effect (which re-emits message:read).
  const conversationsRef = useRef<Record<string, ChatMessage[]>>({});
  conversationsRef.current = state.conversations;
  const currentUserIdRef = useRef("");
  currentUserIdRef.current = state.currentUserId;

  const setActive = useCallback((otherUserId: string | null) => {
    activeRef.current = otherUserId;
  }, []);

  useEffect(() => {
    let mounted = true;

    async function init() {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }
      try {
        const me = await axios.get(`${API_URL}/auth/me`, authHeaders());
        if (!mounted) return;
        dispatch({ type: "SET_USER", userId: me.data.user.id });
      } catch {
        return;
      }

      try {
        const counts = await axios.get(
          `${API_URL}/messages/unread/counts`,
          authHeaders(),
        );
        if (mounted) {
          dispatch({ type: "SET_UNREAD", counts: counts.data || [] });
        }
      } catch {
        // non-fatal
      }

      connectSocket(token);
    }

    init();

    const onConnect = () =>
      dispatch({ type: "SET_STATUS", status: "connected" });
    const onDisconnect = () =>
      dispatch({ type: "SET_STATUS", status: "disconnected" });
    const onNewMessage = (m: ServerMessage) =>
      dispatch({ type: "INCOMING", message: m, activeId: activeRef.current });
    const onRead = (e: { conversationWith: string; readAt: string }) =>
      dispatch({
        type: "READ",
        otherUserId: e.conversationWith,
        readAt: e.readAt,
      });
    const onTypingStart = (e: { fromUserId: string }) =>
      dispatch({ type: "TYPING", userId: e.fromUserId, typing: true });
    const onTypingStop = (e: { fromUserId: string }) =>
      dispatch({ type: "TYPING", userId: e.fromUserId, typing: false });
    const onPresence = (e: {
      userId: string;
      online: boolean;
      lastSeen?: string | null;
    }) =>
      dispatch({
        type: "PRESENCE",
        userId: e.userId,
        presence: { online: e.online, lastSeen: e.lastSeen ?? null },
      });

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("message:new", onNewMessage);
    socket.on("message:read", onRead);
    socket.on("typing:start", onTypingStart);
    socket.on("typing:stop", onTypingStop);
    socket.on("presence:update", onPresence);

    return () => {
      mounted = false;
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("message:new", onNewMessage);
      socket.off("message:read", onRead);
      socket.off("typing:start", onTypingStart);
      socket.off("typing:stop", onTypingStop);
      socket.off("presence:update", onPresence);
      disconnectSocket();
    };
  }, []);

  const loadConversation = useCallback(async (otherUserId: string) => {
    if (loadedRef.current.has(otherUserId)) {
      return;
    }
    loadedRef.current.add(otherUserId);
    try {
      const res = await axios.get(
        `${API_URL}/messages/${otherUserId}?limit=30`,
        authHeaders(),
      );
      dispatch({
        type: "LOAD_CONVERSATION",
        otherUserId,
        messages: res.data || [],
      });
    } catch {
      loadedRef.current.delete(otherUserId);
    }
  }, []);

  const loadOlder = useCallback(async (otherUserId: string) => {
    const existing = conversationsRef.current[otherUserId] ?? [];
    const oldest = existing.find((m) => m.status === "sent");
    if (!oldest) {
      return;
    }
    try {
      const res = await axios.get(
        `${API_URL}/messages/${otherUserId}?limit=30&before=${encodeURIComponent(oldest.createdAt)}`,
        authHeaders(),
      );
      dispatch({ type: "PREPEND", otherUserId, messages: res.data || [] });
    } catch {
      // non-fatal
    }
  }, []);

  const sendMessage = useCallback(
    async (otherUserId: string, content: string) => {
      const trimmed = content.trim();
      if (!trimmed) {
        return;
      }
      const clientTempId =
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.round(Math.random() * 1e6)}`;
      const createdAt = new Date().toISOString();
      dispatch({
        type: "ADD_OPTIMISTIC",
        otherUserId,
        draft: {
          clientTempId,
          senderId: currentUserIdRef.current,
          receiverId: otherUserId,
          content: trimmed,
          createdAt,
        },
      });
      try {
        const ack = await socket.timeout(5000).emitWithAck("message:send", {
          receiverId: otherUserId,
          content: trimmed,
          clientTempId,
        });
        if (ack && ack.id) {
          dispatch({ type: "ACK", otherUserId, ack });
        } else {
          dispatch({ type: "FAIL", otherUserId, clientTempId });
        }
      } catch {
        dispatch({ type: "FAIL", otherUserId, clientTempId });
      }
    },
    [],
  );

  const sendImage = useCallback(async (otherUserId: string, file: File) => {
    const clientTempId =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.round(Math.random() * 1e6)}`;
    const createdAt = new Date().toISOString();
    const localPreviewUrl = URL.createObjectURL(file);

    dispatch({
      type: "ADD_OPTIMISTIC_IMAGE",
      otherUserId,
      draft: {
        clientTempId,
        senderId: currentUserIdRef.current,
        receiverId: otherUserId,
        localPreviewUrl,
        attachmentType: file.type,
        createdAt,
      },
    });

    try {
      const { key, contentType } = await uploadImage(file, "chat", {
        receiverId: otherUserId,
        onProgress: (progress) =>
          dispatch({
            type: "UPLOAD_PROGRESS",
            otherUserId,
            clientTempId,
            progress,
          }),
      });
      const ack = await socket.timeout(10000).emitWithAck("message:send", {
        receiverId: otherUserId,
        attachmentKey: key,
        attachmentType: contentType,
        clientTempId,
      });
      if (ack && ack.id) {
        dispatch({ type: "ACK", otherUserId, ack });
      } else {
        dispatch({ type: "FAIL", otherUserId, clientTempId });
      }
    } catch {
      dispatch({ type: "FAIL", otherUserId, clientTempId });
    }
  }, []);

  const retry = useCallback(
    async (otherUserId: string, clientTempId: string) => {
      const existing = conversationsRef.current[otherUserId] ?? [];
      const failed = existing.find((m) => m.clientTempId === clientTempId);
      if (!failed) {
        return;
      }
      dispatch({
        type: "ACK",
        otherUserId,
        ack: { id: clientTempId, createdAt: failed.createdAt, clientTempId },
      });
      await sendMessage(otherUserId, failed.content);
    },
    [sendMessage],
  );

  const markRead = useCallback((otherUserId: string) => {
    socket.emit("message:read", { otherUserId });
    dispatch({ type: "CLEAR_UNREAD", otherUserId });
  }, []);

  const emitTyping = useCallback((otherUserId: string, isTyping: boolean) => {
    if (isTyping) {
      socket.emit("typing:start", { receiverId: otherUserId });
    } else {
      socket.emit("typing:stop", { receiverId: otherUserId });
    }
  }, []);

  const value: ChatContextValue = {
    state,
    setActive,
    loadConversation,
    loadOlder,
    sendMessage,
    sendImage,
    retry,
    markRead,
    emitTyping,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}
