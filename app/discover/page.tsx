"use client";

import { API_URL } from "../../lib/api";

import Link from "next/link";

import { useEffect, useState } from "react";

import axios from "axios";

import Navbar from "../../components/Navbar";

type Profile = {
  id: string;

  userId?: string;

  displayName?: string;

  age?: number;

  bio?: string;

  imageUrl?: string;

  gender?: string;

  country?: string;

  region?: string;

  city?: string;

  occupation?: string;

  education?: string;

  relationshipGoals?: string;

  interests?: string[];

  languages?: string[];
};

export default function DiscoverPage() {
  const [profiles, setProfiles] = useState<Profile[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";

      return;
    }

    async function loadProfiles() {
      try {
        const response = await axios.get(`${API_URL}/profile/discover`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProfiles(response.data);
      } catch (error) {
        console.error("Failed to load profiles", error);
      } finally {
        setLoading(false);
      }
    }

    loadProfiles();
  }, []);

  async function likeUser(userId: string) {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${API_URL}/likes/${userId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data?.match) {
        alert("It’s a match! 💕");
      }

      setProfiles((prev) => prev.filter((p) => p.userId !== userId));
    } catch (error) {
      console.error("Like failed", error);
    }
  }

  function skipUser(userId?: string) {
    setProfiles((prev) => prev.filter((p) => p.userId !== userId));
  }

  function getImageUrl(imageUrl?: string) {
    if (!imageUrl) {
      return "https://placehold.co/600x900/18181b/ffffff?text=Profile";
    }

    return imageUrl.startsWith("http") ? imageUrl : `${API_URL}${imageUrl}`;
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="relative z-50">
        <Navbar />
      </div>

      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
        {/* HEADER */}

        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="mb-3 text-4xl font-bold sm:text-5xl">
              Discover People
            </h1>

            <p className="max-w-2xl text-base text-zinc-400 sm:text-lg">
              Explore meaningful connections, shared interests, and compatible
              personalities.
            </p>
          </div>

          <div className="flex w-full gap-3 sm:w-auto">
            <Link
              href="/matches"
              className="flex-1 rounded-2xl bg-white px-5 py-3 text-center font-bold text-black sm:flex-none"
            >
              Matches
            </Link>

            <Link
              href="/chat"
              className="flex-1 rounded-2xl border border-zinc-700 px-5 py-3 text-center font-bold sm:flex-none"
            >
              Chat
            </Link>
          </div>
        </div>

        {/* LOADING */}

        {loading ? (
          <div className="py-24 text-center text-lg text-zinc-400">
            Loading profiles...
          </div>
        ) : profiles.length === 0 ? (
          <div className="py-24 text-center">
            <h2 className="mb-4 text-4xl font-bold">No More Profiles</h2>

            <p className="mb-8 text-zinc-500">
              Check back later for new people.
            </p>

            <Link
              href="/matches"
              className="inline-block rounded-2xl bg-white px-6 py-4 font-bold text-black"
            >
              View Matches
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {profiles.map((profile) => (
              <div
                key={profile.id}
                className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 shadow-2xl transition hover:scale-[1.02]"
              >
                {/* IMAGE */}

                <div className="relative h-[420px] overflow-hidden bg-zinc-800 sm:h-[520px]">
                  <img
                    src={getImageUrl(profile.imageUrl)}
                    alt={profile.displayName || "Profile"}
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://placehold.co/600x900/18181b/ffffff?text=Profile";
                    }}
                    className="h-full w-full object-cover object-top"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                  <div className="absolute right-0 bottom-0 left-0 p-6">
                    <div className="mb-2 flex items-center gap-3">
                      <h2 className="text-3xl font-bold">
                        {profile.displayName || "User"}
                      </h2>

                      {profile.age && (
                        <span className="text-xl text-zinc-300">
                          {profile.age}
                        </span>
                      )}
                    </div>

                    {profile.city && (
                      <p className="text-sm text-zinc-300">
                        📍{" "}
                        {[profile.city, profile.region, profile.country]
                          .filter(Boolean)
                          .join(", ")}
                      </p>
                    )}
                  </div>
                </div>

                {/* CONTENT */}

                <div className="p-5">
                  {/* GOALS */}

                  {profile.relationshipGoals && (
                    <div className="mb-4 inline-flex items-center rounded-full bg-pink-500/20 px-4 py-2 text-sm font-semibold text-pink-300">
                      💕 {profile.relationshipGoals}
                    </div>
                  )}

                  {/* BIO */}

                  <p className="mb-5 leading-7 text-zinc-300">
                    {profile.bio || "No bio available yet."}
                  </p>

                  {/* META */}

                  <div className="mb-5 grid gap-3">
                    {profile.occupation && (
                      <div className="flex items-center gap-3 text-zinc-300">
                        <span>💼</span>

                        <span>{profile.occupation}</span>
                      </div>
                    )}

                    {profile.education && (
                      <div className="flex items-center gap-3 text-zinc-300">
                        <span>🎓</span>

                        <span>{profile.education}</span>
                      </div>
                    )}

                    {profile.languages && profile.languages.length > 0 && (
                      <div className="flex items-start gap-3 text-zinc-300">
                        <span>🌍</span>

                        <div className="flex flex-wrap gap-2">
                          {profile.languages.map((language) => (
                            <span
                              key={language}
                              className="rounded-full border border-zinc-700 bg-zinc-800 px-3 py-1 text-sm"
                            >
                              {language}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* INTERESTS */}

                  {profile.interests && profile.interests.length > 0 && (
                    <div className="mb-6 flex flex-wrap gap-2">
                      {profile.interests.map((interest) => (
                        <div
                          key={interest}
                          className="rounded-full border border-zinc-700 bg-zinc-800 px-4 py-2 text-sm"
                        >
                          {interest}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* ACTIONS */}

                  <div className="grid gap-3">
                    <div className="flex gap-3">
                      <button
                        onClick={() => skipUser(profile.userId)}
                        className="flex-1 rounded-2xl bg-zinc-700 py-4 font-bold transition hover:bg-zinc-600"
                      >
                        Skip
                      </button>

                      <button
                        onClick={() => likeUser(profile.userId || "")}
                        className="flex-1 rounded-2xl bg-pink-500 py-4 font-bold transition hover:bg-pink-600"
                      >
                        Like 💕
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
