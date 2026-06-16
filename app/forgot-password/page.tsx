"use client";

import { API_URL } from "../../lib/api";

import { useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";

import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");

  const [success, setSuccess] = useState(false);

  async function submit() {
    try {
      await axios.post(`${API_URL}/auth/forgot-password`, {
        email,
      });

      setSuccess(true);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="mx-auto max-w-md px-6 py-20">
        <h1 className="mb-6 text-4xl font-bold">Forgot Password</h1>

        {success ? (
          <div className="rounded-2xl border border-green-500 bg-green-500/20 p-4">
            Check backend console for reset link.
          </div>
        ) : (
          <>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mb-4 w-full rounded-2xl border border-zinc-700 bg-zinc-900 px-4 py-4"
            />

            <button
              onClick={submit}
              className="w-full rounded-2xl bg-white py-4 font-bold text-black"
            >
              Send Reset Link
            </button>
          </>
        )}
      </div>
    </main>
  );
}
