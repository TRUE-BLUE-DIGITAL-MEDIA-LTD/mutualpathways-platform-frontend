"use client";

import { API_URL } from "../../../lib/api";
import { useChatContext } from "../ChatProvider";
import { usePresence } from "../../../hooks/usePresence";

interface MatchedUser {
  userId: string;
  displayName?: string;
  imageUrl?: string | null;
}

interface Match {
  id?: string;
  matchedUser: MatchedUser;
}

function imageUrl(url?: string | null) {
  if (!url) {
    return "https://placehold.co/200x200/18181b/ffffff?text=User";
  }
  return url.startsWith("http") ? url : `${API_URL}${url}`;
}

function ChatListItem({
  match,
  selected,
  unread,
  onSelect,
}: {
  match: Match;
  selected: boolean;
  unread: number;
  onSelect: () => void;
}) {
  const presence = usePresence(match.matchedUser.userId);
  return (
    <button
      onClick={onSelect}
      className={`flex w-full items-center gap-3 rounded-2xl p-3 text-left transition ${
        selected ? "bg-zinc-700" : "bg-zinc-800 hover:bg-zinc-700"
      }`}
    >
      <div className="relative">
        <img
          src={imageUrl(match.matchedUser.imageUrl)}
          alt="User"
          className="h-12 w-12 rounded-full object-cover object-top"
        />
        {presence.online && (
          <span className="absolute right-0 bottom-0 h-3 w-3 rounded-full border-2 border-zinc-900 bg-green-400" />
        )}
      </div>
      <div className="flex-1">
        <h3 className="font-bold">{match.matchedUser.displayName || "User"}</h3>
        <p className="text-sm text-zinc-400">
          {presence.online ? "Online" : "Offline"}
        </p>
      </div>
      {unread > 0 && (
        <span className="rounded-full bg-pink-500 px-2 py-0.5 text-xs font-bold text-white">
          {unread}
        </span>
      )}
    </button>
  );
}

export default function ChatList({
  matches,
  selectedUserId,
  onSelect,
}: {
  matches: Match[];
  selectedUserId: string | null;
  onSelect: (match: MatchedUser) => void;
}) {
  const { state } = useChatContext();
  return (
    <div className="h-auto overflow-y-auto rounded-3xl border border-zinc-800 bg-zinc-900 p-4 lg:h-[80vh]">
      <h2 className="mb-6 text-2xl font-bold">Chats</h2>
      <div className="space-y-3">
        {matches.map((match, index) => (
          <ChatListItem
            key={match.id || match.matchedUser?.userId || index}
            match={match}
            selected={selectedUserId === match.matchedUser?.userId}
            unread={state.unread[match.matchedUser?.userId] ?? 0}
            onSelect={() => onSelect(match.matchedUser)}
          />
        ))}
      </div>
    </div>
  );
}
