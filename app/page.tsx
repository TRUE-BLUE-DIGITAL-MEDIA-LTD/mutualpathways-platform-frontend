"use client";
import { API_URL } from "../lib/api";
import Link from "next/link";

import Navbar from "../components/Navbar";
import { useEffect } from "react";
import axios from "axios";

export default function LandingPage() {
  const articles = [
    {
      title: "Getting to Know Each Other",

      image: "/images/art1.jpeg",

      href: "/articles/article1",
    },

    {
      title: "Healthy Relationships",

      image: "/images/art2.jpeg",

      href: "/articles/article2",
    },

    {
      title: "Communication Matters",

      image: "/images/art7.jpeg",

      href: "/articles/article7",
    },
  ];

  async function fetchMe(token: string) {
    try {
      const response = await axios.get(`${API_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error: any) {
      console.log("Error fetching user:", error);
      if (error.response && error.response.status === 401) {
        localStorage.removeItem("token");
      }
    }
  }
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchMe(token);
    }
  }, []);
  return (
    <main className="min-h-screen bg-black text-white">
      {/* NAVBAR */}

      <Navbar />

      {/* HERO */}

      <section className="relative flex min-h-[85vh] items-center overflow-hidden">
        {/* OVERLAY */}

        <div className="absolute inset-0 z-10 bg-black/70" />

        {/* HERO IMAGE */}

        <img
          src="/images/hero.jpeg"
          alt="Hero"
          className="absolute inset-0 h-full w-full object-cover object-top"
        />

        {/* CONTENT */}

        <div className="relative z-20 mx-auto max-w-6xl px-4 py-24 text-center sm:px-6 sm:py-32">
          <h1 className="mb-6 text-4xl leading-tight font-bold sm:text-6xl lg:text-7xl">
            Build Connections
            <br />
            That Truly Matter
          </h1>

          <p className="mx-auto mb-10 max-w-3xl text-base leading-8 text-zinc-300 sm:text-xl lg:text-2xl">
            MutualPathways helps people discover meaningful relationships
            through profile matching, compatibility tools, secure messaging, and
            shared interests.
          </p>

          {/* CTA BUTTONS */}

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/discover"
              className="w-full rounded-2xl bg-white px-8 py-4 text-center text-base font-bold text-black transition hover:bg-zinc-200 sm:w-auto sm:text-lg"
            >
              Open Platform
            </Link>

            <Link
              href="/articles"
              className="w-full rounded-2xl border border-white px-8 py-4 text-center text-base font-bold transition hover:bg-white hover:text-black sm:w-auto sm:text-lg"
            >
              Explore Articles
            </Link>
          </div>
        </div>
      </section>

      {/* ARTICLES */}

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        {/* SECTION HEADER */}

        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-3xl font-bold sm:text-4xl">Featured Articles</h2>

          <Link
            href="/articles"
            className="text-zinc-400 transition hover:text-white"
          >
            View all →
          </Link>
        </div>

        {/* ARTICLE GRID */}

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {articles.map((article) => (
            <Link
              key={article.title}
              href={article.href}
              className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 shadow-xl transition hover:scale-[1.02]"
            >
              <div className="h-[240px] overflow-hidden bg-zinc-800">
                <img
                  src={article.image}
                  alt={article.title}
                  className="h-full w-full object-cover object-top"
                />
              </div>

              <div className="p-5 sm:p-6">
                <h3 className="mb-3 text-xl font-bold sm:text-2xl">
                  {article.title}
                </h3>

                <p className="text-sm text-zinc-400 sm:text-base">
                  Read article →
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FOOTER */}
    </main>
  );
}
