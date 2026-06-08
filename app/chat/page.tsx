'use client';

import { API_URL } from '../../lib/api';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import { ChatProvider, useChatContext } from './ChatProvider';
import { useChat } from '../../hooks/useChat';
import { usePresence } from '../../hooks/usePresence';
import ChatList from './components/ChatList';
import MessageThread from './components/MessageThread';
import MessageInput from './components/MessageInput';

interface MatchedUser {
  userId: string;
  displayName?: string;
  imageUrl?: string | null;
  lastSeen?: string | null;
}

interface Match {
  id?: string;
  matchedUser: MatchedUser;
}

function imageUrl(url?: string | null) {
  if (!url) {
    return 'https://placehold.co/200x200/18181b/ffffff?text=User';
  }
  return url.startsWith('http') ? url : `${API_URL}${url}`;
}

function formatLastSeen(date?: string | null) {
  if (!date) {
    return 'Offline';
  }
  const lastSeen = new Date(date);
  const diffMinutes = Math.floor((Date.now() - lastSeen.getTime()) / 60000);
  if (diffMinutes < 1) return 'Last seen just now';
  if (diffMinutes < 60) return `Last seen ${diffMinutes} min ago`;
  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `Last seen ${diffHours}h ago`;
  return `Last seen ${lastSeen.toLocaleDateString()}`;
}

function ChatWorkspace() {
  const { state } = useChatContext();
  const [matches, setMatches] = useState<Match[]>([]);
  const [selected, setSelected] = useState<MatchedUser | null>(null);

  const otherUserId = selected?.userId ?? null;
  const { messages, typing, status, send, loadOlder, retry, emitTyping } =
    useChat(otherUserId);
  const presence = usePresence(otherUserId);

  useEffect(() => {
    async function fetchMatches() {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${API_URL}/likes/matches`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMatches(res.data || []);
      } catch {
        // non-fatal
      }
    }
    fetchMatches();
  }, []);

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      {status === 'disconnected' && (
        <div className="bg-amber-600 py-1 text-center text-sm">
          Reconnecting…
        </div>
      )}

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 p-4 sm:gap-6 sm:p-6 lg:grid-cols-3">
        <ChatList
          matches={matches}
          selectedUserId={otherUserId}
          onSelect={(m) => setSelected(m)}
        />

        <div className="flex h-[75vh] flex-col rounded-3xl border border-zinc-800 bg-zinc-900 p-4 sm:p-6 lg:col-span-2 lg:h-[80vh]">
          {selected ? (
            <>
              <div className="mb-4 flex items-center gap-4 border-b border-zinc-800 pb-4">
                <img
                  src={imageUrl(selected.imageUrl)}
                  alt="User"
                  className="h-14 w-14 rounded-full object-cover object-top"
                />
                <div>
                  <h2 className="text-2xl font-bold">
                    {selected.displayName || 'User'}
                  </h2>
                  <p
                    className={`text-sm ${
                      presence.online ? 'text-green-400' : 'text-zinc-500'
                    }`}
                  >
                    {presence.online
                      ? 'Online'
                      : formatLastSeen(presence.lastSeen ?? selected.lastSeen)}
                  </p>
                </div>
              </div>

              <MessageThread
                messages={messages}
                currentUserId={state.currentUserId}
                typing={typing}
                onLoadOlder={loadOlder}
                onRetry={retry}
              />

              <MessageInput
                disabled={status !== 'connected'}
                onSend={send}
                onTyping={emitTyping}
              />
            </>
          ) : (
            <div className="flex flex-1 items-center justify-center text-xl text-zinc-500">
              Select a match to chat
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default function ChatPage() {
  return (
    <ChatProvider>
      <ChatWorkspace />
    </ChatProvider>
  );
}
