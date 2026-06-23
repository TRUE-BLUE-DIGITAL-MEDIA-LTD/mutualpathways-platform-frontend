"use client";

import { API_URL } from "../../lib/api";

import axios from "axios";

import { useEffect, useState } from "react";

import Navbar from "../../components/Navbar";

import ChatWindow from "../../components/ChatWindow";

import Link from "next/link";

export default function HomePage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<any>(null);
  const [profiles, setProfiles] = useState<any[]>([]);
  const [matches, setMatches] = useState<any[]>([]);
  const [view, setView] = useState<"discover" | "matches">("discover");
  const [selectedMatch, setSelectedMatch] = useState<any>(null);

  function getImageUrl(imageUrl?: string) {
    if (!imageUrl) {
      return "https://placehold.co/600x800/18181b/ffffff?text=Profile";
    }

    return imageUrl.startsWith("http") ? imageUrl : `${API_URL}${imageUrl}`;
  }

  async function login() {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });

      const token = response.data.accessToken;

      localStorage.setItem("token", token);

      fetchMe(token);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchMe(token: string) {
    try {
      const response = await axios.get(`${API_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(response.data.user);

      fetchProfiles(token);
    } catch (error: any) {
      console.log("Error fetching user:", error);
      if (error.response && error.response.status === 401) {
        localStorage.removeItem("token");
        setUser(null);
      }
    }
  }

  async function fetchProfiles(token: string) {
    try {
      const response = await axios.get(`${API_URL}/profile/discover`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProfiles(response.data || []);
    } catch (error) {
      console.log(error);
    }
  }

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

  async function likeProfile(profileId: string) {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        `${API_URL}/likes/${profileId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert("Liked 💕");
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchMe(token);
    }
  }, []);

  if (user) {
    return (
      <main className="min-h-screen bg-black text-white">
        <Navbar />

        <div className="mx-auto max-w-6xl p-4 sm:p-6">
          {/* HERO */}

          <div className="mb-8">
            <div className="mb-10 flex flex-col items-start justify-between gap-6 rounded-3xl border border-zinc-800 bg-zinc-900 p-5 sm:p-8 xl:flex-row xl:items-center">
              <div className="flex-1">
                <h1 className="mb-3 text-3xl leading-tight font-bold sm:text-5xl">
                  Welcome back, {user.username}
                </h1>

                <p className="max-w-xl text-base leading-7 text-zinc-400 sm:text-lg">
                  Discover meaningful connections, chat with your matches, and
                  build your social universe.
                </p>
              </div>

              {/* PROFILE */}

              <div className="flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row">
                <img
                  src={getImageUrl(user.imageUrl)}
                  alt="My profile"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://placehold.co/400x400/18181b/ffffff?text=Profile";
                  }}
                  className="h-24 w-24 rounded-3xl border border-zinc-700 object-cover object-top shadow-xl"
                />

                <label className="w-full cursor-pointer rounded-2xl bg-white px-5 py-3 text-center font-semibold text-black transition hover:scale-105 sm:w-auto">
                  Change Photo
                  <input
                    type="file"
                    className="hidden"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];

                      if (!file) {
                        return;
                      }

                      const formData = new FormData();

                      formData.append("file", file);

                      try {
                        await axios.post(
                          `${API_URL}/profile/upload`,
                          formData,
                          {
                            headers: {
                              Authorization: `Bearer ${localStorage.getItem("token")}`,
                              "Content-Type": "multipart/form-data",
                            },
                          },
                        );

                        location.reload();
                      } catch (error) {
                        console.log(error);
                      }
                    }}
                  />
                </label>
              </div>
            </div>
          </div>

          {/* TABS */}

          <div className="mb-8 flex flex-wrap gap-3">
            <button
              onClick={() => {
                setView("discover");
              }}
              className={`rounded-2xl px-5 py-3 text-sm font-bold transition sm:px-6 sm:text-base ${
                view === "discover"
                  ? "bg-white text-black"
                  : "bg-zinc-900 text-white"
              } `}
            >
              Discover
            </button>

            <button
              onClick={() => {
                setView("matches");
                fetchMatches();
              }}
              className={`rounded-2xl px-5 py-3 text-sm font-bold transition sm:px-6 sm:text-base ${
                view === "matches"
                  ? "bg-white text-black"
                  : "bg-zinc-900 text-white"
              } `}
            >
              Matches
            </button>
          </div>

          {/* DISCOVER */}

          {view === "discover" && (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3">
              {profiles.map((profile) => (
                <div
                  key={profile.id}
                  className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 shadow-xl transition hover:scale-[1.02]"
                >
                  <div className="h-[340px] overflow-hidden bg-zinc-800 sm:h-[420px]">
                    <img
                      src={getImageUrl(profile.imageUrl)}
                      alt="Profile"
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://placehold.co/600x800/18181b/ffffff?text=Profile";
                      }}
                      className="h-full w-full object-cover object-top"
                    />
                  </div>

                  <div className="p-5">
                    <h2 className="mb-3 text-xl font-bold sm:text-2xl">
                      {profile.displayName}
                    </h2>

                    <p className="mb-6 text-sm leading-7 text-zinc-400 sm:text-base">
                      {profile.bio}
                    </p>

                    <button
                      onClick={() => likeProfile(profile.id)}
                      className="w-full rounded-2xl bg-white py-3 text-sm font-bold text-black transition hover:scale-[1.02] sm:py-4 sm:text-base"
                    >
                      Like Profile 💕
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* MATCHES */}

          {view === "matches" && (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3">
              {matches.map((match, index) => (
                <div
                  key={match.id || match.matchedUser?.id || index}
                  className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 shadow-xl transition hover:scale-[1.02]"
                >
                  <div className="h-[340px] overflow-hidden bg-zinc-800 sm:h-[420px]">
                    <img
                      src={getImageUrl(match.matchedUser?.imageUrl)}
                      alt="Match"
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://placehold.co/600x800/18181b/ffffff?text=Profile";
                      }}
                      className="h-full w-full object-cover object-top"
                    />
                  </div>

                  <div className="p-5">
                    <h2 className="mb-3 text-xl font-bold sm:text-2xl">
                      {match.matchedUser?.displayName}
                    </h2>

                    <p className="mb-6 text-sm text-zinc-400 sm:text-base">
                      {match.matchedUser?.bio}
                    </p>

                    <button
                      onClick={() => setSelectedMatch(match.matchedUser)}
                      className="w-full rounded-2xl bg-white py-3 text-sm font-bold text-black transition hover:scale-[1.02] sm:py-4 sm:text-base"
                    >
                      Open Chat
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* CHAT */}

          {selectedMatch && (
            <div className="mt-8">
              <ChatWindow
                otherUserId={selectedMatch.userId}
                otherUserName={selectedMatch.displayName}
              />
            </div>
          )}
        </div>
      </main>
    );
  }

  /* LOGIN */

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="flex items-center justify-center px-4 py-16 sm:px-6 sm:py-20">
        <div className="w-full max-w-md rounded-3xl border border-zinc-800 bg-zinc-900 p-6 shadow-xl sm:p-8">
          <h1 className="mb-6 text-3xl font-bold sm:text-4xl">Welcome Back</h1>

          <div className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-2xl border border-zinc-700 bg-zinc-800 p-4 text-sm outline-none sm:text-base"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-2xl border border-zinc-700 bg-zinc-800 p-4 text-sm outline-none sm:text-base"
            />

            <button
              onClick={login}
              className="w-full rounded-2xl bg-white py-4 text-sm font-bold text-black transition hover:scale-[1.02] sm:text-base"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
