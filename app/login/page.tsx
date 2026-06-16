"use client";

import { API_URL } from "../../lib/api";

import Link from "next/link";

import axios from "axios";

import { useState } from "react";

import Navbar from "../../components/Navbar";

export default function LoginPage() {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  async function login() {
    try {
      setLoading(true);

      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });

      localStorage.setItem("token", response.data.accessToken);

      window.location.href = "/discover";
    } catch (error) {
      console.log(error);

      alert("Invalid credentials");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="flex items-center justify-center px-4 py-14 sm:px-6 sm:py-20">
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
              Welcome Back
            </h1>

            <p className="text-sm leading-7 text-zinc-400 sm:text-base">
              Continue discovering meaningful connections.
            </p>
          </div>

          {/* FORM */}

          <div className="space-y-4">
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
                  login();
                }
              }}
              className="w-full rounded-2xl border border-zinc-700 bg-zinc-800 px-4 py-4 text-sm text-white transition outline-none focus:border-white sm:text-base"
            />

            <button
              onClick={login}
              disabled={loading}
              className="w-full rounded-2xl bg-white py-4 text-base font-bold text-black transition hover:bg-zinc-200 disabled:opacity-60 sm:text-lg"
            >
              {loading ? "Loading..." : "Login"}
            </button>

            <Link
              href="/forgot-password"
              className="mt-4 block text-center text-zinc-400 hover:text-white"
            >
              Forgot Password?
            </Link>
          </div>

          {/* FOOTER */}

          <p className="mt-8 text-center text-sm text-zinc-500 sm:text-base">
            Don’t have an account?{" "}
            <Link
              href="/register"
              className="font-semibold text-white hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
