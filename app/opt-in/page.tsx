"use client";

import { useState } from "react";
import axios from "axios";
import Link from "next/link";

import { API_URL } from "../../lib/api";
import Navbar from "../../components/Navbar";

export default function OptInPage() {
  const [email, setEmail] = useState("");

  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  async function submit() {
    if (!email.trim()) {
      return;
    }

    setStatus("loading");

    try {
      await axios.post(`${API_URL}/communications/opt-in`, {
        email,
      });

      setStatus("success");
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="mx-auto max-w-3xl px-6 py-20">
        <h1 className="mb-8 text-5xl font-bold">Opt In</h1>

        <div className="mb-10 space-y-6 text-lg leading-9 text-zinc-300">
          <p>
            Choose to receive updates, news, and communications from
            MutualPathways. By opting in, you agree to receive emails about new
            features, articles, and relevant updates.
          </p>

          <p>
            You can change your preferences or unsubscribe at any time from the{" "}
            <Link
              href="/opt-out"
              className="underline transition hover:text-white"
            >
              Opt Out
            </Link>{" "}
            page.
          </p>
        </div>

        {status === "success" ? (
          <div className="rounded-2xl border border-green-500 bg-green-500/20 p-4">
            You&apos;re opted in. Thanks &mdash; we&apos;ll keep you in the
            loop.
          </div>
        ) : (
          <div className="max-w-md">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mb-4 w-full rounded-2xl border border-zinc-700 bg-zinc-900 px-4 py-4"
            />

            <button
              onClick={submit}
              disabled={status === "loading"}
              className="w-full rounded-2xl bg-white py-4 font-bold text-black disabled:opacity-60"
            >
              {status === "loading" ? "Submitting..." : "Opt In"}
            </button>

            {status === "error" && (
              <p className="mt-4 text-sm text-red-400">
                Something went wrong. Please check your email and try again.
              </p>
            )}
          </div>
        )}
      </section>

      <footer className="mt-20 border-t border-zinc-800">
        <div className="mx-auto max-w-7xl px-6 py-10 text-center text-zinc-400">
          <div className="mb-6 flex justify-center gap-6">
            <Link href="/terms">Terms of Service</Link>

            <Link href="/privacy">Privacy Policy</Link>
          </div>

          <p className="mb-2">Users 18+ only.</p>

          <p>
            © 2026 MutualPathways. All Rights Reserved. Owned and operated by
            True Blue Digital Media LTD
          </p>
        </div>
      </footer>
    </main>
  );
}
