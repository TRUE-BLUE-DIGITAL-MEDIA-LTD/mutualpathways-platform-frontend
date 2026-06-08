"use client";

import { API_URL } from "../../lib/api";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import { socket } from "../../lib/socket";

export default function ChatPage() {
  const [matches, setMatches] = useState<any[]>([]);
  const [selectedMatch, setSelectedMatch] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [content, setContent] = useState("");
  const [currentUserId, setCurrentUserId] = useState("");
  const [isOnline, setIsOnline] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  async function fetchMatches() {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(`${API_URL}/likes/matches`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMatches(response.data || []);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchMessages(userId: string) {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(`${API_URL}/messages/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessages(response.data || []);
    } catch (error) {
      console.log(error);
    }
  }

  async function initializeUser() {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(`${API_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const userId = response.data.user.id;

      setCurrentUserId(userId);

      socket.connect();

      socket.emit("join", {
        userId,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function sendMessage() {
    if (!content.trim() || !selectedMatch) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${API_URL}/messages/${selectedMatch.userId}`,
        {
          content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log("MESSAGE SAVED", response.data);

      await fetchMessages(selectedMatch.userId);

      socket.emit("sendMessage", {
        senderId: currentUserId,

        receiverId: selectedMatch.userId,

        content,
      });

      setContent("");
    } catch (error) {
      console.error("SEND MESSAGE ERROR", error);
    }
  }

  function getImageUrl(imageUrl?: string) {
    if (!imageUrl) {
      return "https://placehold.co/200x200/18181b/ffffff?text=User";
    }

    return imageUrl.startsWith("http") ? imageUrl : `${API_URL}${imageUrl}`;
  }

  function formatLastSeen(date?: string) {
    if (!date) {
      return "Offline";
    }

    const lastSeen = new Date(date);

    const now = new Date();

    const diffMinutes = Math.floor(
      (now.getTime() - lastSeen.getTime()) / 60000,
    );

    if (diffMinutes < 1) {
      return "Last seen just now";
    }

    if (diffMinutes < 60) {
      return `Last seen ${diffMinutes} min ago`;
    }

    const diffHours = Math.floor(diffMinutes / 60);

    if (diffHours < 24) {
      return `Last seen ${diffHours}h ago`;
    }

    return `Last seen ${lastSeen.toLocaleDateString()}`;
  }

  useEffect(() => {
    socket.off("newMessage");
    socket.off("onlineStatus");
    socket.off("userOnline");
    socket.off("userOffline");
    socket.off("typing");

    fetchMatches();

    initializeUser();

    socket.on("newMessage", (message) => {
      if (
        selectedMatch &&
        (message.senderId === selectedMatch.userId ||
          message.receiverId === selectedMatch.userId)
      ) {
        setMessages((prev) => [...prev, message]);
      }
    });

    socket.on("onlineStatus", (data) => {
      setIsOnline(data.isOnline);
    });

    socket.on("userOnline", (data) => {
      if (selectedMatch && data.userId === selectedMatch.userId) {
        setIsOnline(true);
      }
    });

    socket.on("userOffline", (data) => {
      if (selectedMatch && data.userId === selectedMatch.userId) {
        setIsOnline(false);
      }
    });

    console.log("REGISTERING TYPING LISTENER");

    socket.on("typing", (data) => {
      alert("TYPING EVENT RECEIVED");

      console.log("RECEIVED TYPING", data);

      setIsTyping(true);

      setTimeout(() => {
        setIsTyping(false);
      }, 2000);
    });

    return () => {
      socket.off("typing");
      socket.off("userOnline");
      socket.off("userOffline");
      socket.off("newMessage");
      socket.off("onlineStatus");
    };
  }, [selectedMatch]);

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 p-4 sm:gap-6 sm:p-6 lg:grid-cols-3">
        {/* SIDEBAR */}

        <div className="h-auto overflow-y-auto rounded-3xl border border-zinc-800 bg-zinc-900 p-4 lg:h-[80vh]">
          <h2 className="mb-6 text-2xl font-bold">Chats</h2>

          <div className="space-y-3">
            {matches.map((match, index) => (
              <button
                key={match.id || match.matchedUser?.userId || index}
                onClick={() => {
                  setSelectedMatch(match.matchedUser);

                  fetchMessages(match.matchedUser.userId);

                  socket.emit("checkOnlineStatus", {
                    userId: match.matchedUser.userId,
                  });
                }}
                className={`flex w-full items-center gap-3 rounded-2xl p-3 text-left transition ${
                  selectedMatch?.userId === match.matchedUser?.userId
                    ? "bg-zinc-700"
                    : "bg-zinc-800 hover:bg-zinc-700"
                } `}
              >
                <img
                  src={getImageUrl(match.matchedUser?.imageUrl)}
                  alt="User"
                  className="h-12 w-12 rounded-full object-cover object-top"
                />

                <div>
                  <h3 className="font-bold">
                    {match.matchedUser?.displayName || "User"}
                  </h3>

                  <p className="text-sm text-zinc-400">Live chat</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* CHAT */}

        <div className="flex h-[75vh] flex-col rounded-3xl border border-zinc-800 bg-zinc-900 p-4 sm:p-6 lg:col-span-2 lg:h-[80vh]">
          {selectedMatch ? (
            <>
              {/* HEADER */}

              <div className="mb-4 flex items-center gap-4 border-b border-zinc-800 pb-4">
                <img
                  src={getImageUrl(selectedMatch?.imageUrl)}
                  alt="User"
                  className="h-14 w-14 rounded-full object-cover object-top"
                />

                <div>
                  <h2 className="text-2xl font-bold">
                    {selectedMatch?.displayName || "User"}
                  </h2>

                  <p
                    className={`text-sm ${isOnline ? "text-green-400" : "text-zinc-500"} `}
                  >
                    {isOnline
                      ? "Online"
                      : formatLastSeen(selectedMatch?.lastSeen)}
                  </p>

                  {isTyping && (
                    <p className="mt-1 text-xs text-zinc-400 italic">
                      Typing...
                    </p>
                  )}
                </div>
              </div>

              {/* MESSAGES */}

              <div className="mb-4 flex-1 space-y-3 overflow-y-auto">
                {messages.map((message, index) => {
                  const isMine = message.senderId === currentUserId;

                  return (
                    <div
                      key={message.id || index}
                      className={`flex ${isMine ? "justify-end" : "justify-start"} `}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-3 ${isMine ? "bg-pink-500 text-white" : "bg-zinc-800 text-white"} `}
                      >
                        <div>{message.content}</div>

                        {message.createdAt && (
                          <div className="mt-2 text-xs opacity-70">
                            {new Date(message.createdAt).toLocaleTimeString(
                              [],
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              },
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* INPUT */}

              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={content}
                  onChange={(e) => {
                    setContent(e.target.value);

                    if (selectedMatch) {
                      socket.emit("typing", {
                        senderId: currentUserId,

                        receiverId: selectedMatch.userId,
                      });
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      sendMessage();
                    }
                  }}
                  className="flex-1 rounded-2xl border border-zinc-700 bg-zinc-800 px-4 py-4 outline-none"
                />

                <button
                  onClick={sendMessage}
                  className="rounded-2xl bg-white px-6 font-bold text-black"
                >
                  Send
                </button>
              </div>
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
