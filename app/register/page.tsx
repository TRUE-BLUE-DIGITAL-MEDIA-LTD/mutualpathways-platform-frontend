"use client";

import { API_URL } from "../../lib/api";

import Link from "next/link";

import axios from "axios";

import { useState } from "react";

import Navbar from "../../components/Navbar";

export default function RegisterPage() {
  const [username, setUsername] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const [marketingEmails, setMarketingEmails] = useState(false);

  async function register() {
    if (!acceptedTerms) {
      alert("You must agree to the Terms of Service and Privacy Policy.");

      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(`${API_URL}/auth/register`, {
        username,
        email,
        password,
        marketingEmails,
      });

      console.log("REGISTER RESPONSE:", response.data);

      localStorage.setItem("token", response.data.accessToken);

      window.location.href = "/discover";
    } catch (error) {
      console.log(error);

      alert("Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="flex items-center justify-center px-4 py-14 sm:px-6 sm:py-20">
        <div className="w-full max-w-md rounded-3xl border border-zinc-800 bg-zinc-900 p-6 shadow-2xl sm:p-8">
          {/* HEADER */}

          <div className="mb-8 text-center">
            <Link href="/">
              <img
                src="/images/mt_logo.jpeg"
                alt="MutualPathways"
                className="mx-auto mb-6 h-14 object-contain sm:h-16"
              />
            </Link>

            <h1 className="mb-3 text-3xl font-bold sm:text-4xl">
              Create Account
            </h1>

            <p className="text-sm leading-7 text-zinc-400 sm:text-base">
              Create an account to build your profile, discover compatible
              matches, and connect with other members.
            </p>
          </div>

          {/* FORM */}

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-2xl border border-zinc-700 bg-zinc-800 px-4 py-4 text-sm text-white transition outline-none focus:border-white sm:text-base"
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-2xl border border-zinc-700 bg-zinc-800 px-4 py-4 text-sm text-white transition outline-none focus:border-white sm:text-base"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  register();
                }
              }}
              className="w-full rounded-2xl border border-zinc-700 bg-zinc-800 px-4 py-4 text-sm text-white transition outline-none focus:border-white sm:text-base"
            />

            <div className="mt-4 mb-4 space-y-3 text-sm">
              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className="mt-1"
                />

                <span>
                  I agree to the{" "}
                  <Link
                    href="/terms"
                    target="_blank"
                    className="text-pink-500 underline"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    target="_blank"
                    className="text-pink-500 underline"
                  >
                    Privacy Policy
                  </Link>
                  .
                </span>
              </label>

              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={marketingEmails}
                  onChange={(e) => setMarketingEmails(e.target.checked)}
                  className="mt-1"
                />

                <span>
                  I would like to receive updates, newsletters, platform
                  announcements, special offers, and promotional emails from
                  MutualPathways.
                </span>
              </label>
            </div>

            <span className="mt-1 block text-xs leading-5 text-zinc-500">
              You can unsubscribe from marketing emails at any time.
            </span>

            <button
              onClick={register}
              disabled={loading}
              className="w-full rounded-2xl bg-white py-4 text-base font-bold text-black transition hover:bg-zinc-200 disabled:opacity-50 sm:text-lg"
            >
              {loading ? "Loading..." : "Create Account"}
            </button>

            <div className="space-y-3 text-sm"></div>
          </div>

          {/* FOOTER */}

          <p className="mt-8 text-center text-sm text-zinc-500 sm:text-base">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-white hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
