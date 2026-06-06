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
    <main
      className="
      min-h-screen
      bg-black
      text-white
    "
    >
      <Navbar />

      <div
        className="
        flex
        items-center
        justify-center
        px-4
        sm:px-6
        py-14
        sm:py-20
      "
      >
        <div
          className="
          w-full
          max-w-md
          bg-zinc-900
          border
          border-zinc-800
          rounded-3xl
          p-6
          sm:p-8
          shadow-2xl
        "
        >
          {/* HEADER */}

          <div
            className="
            text-center
            mb-8
          "
          >
            <Link href="/">
              <img
                src="/images/mt_logo.jpeg"
                alt="MutualPathways"
                className="
                  h-14
                  sm:h-16
                  mx-auto
                  mb-6
                  object-contain
                "
              />
            </Link>

            <h1
              className="
              text-3xl
              sm:text-4xl
              font-bold
              mb-3
            "
            >
              Welcome Back
            </h1>

            <p
              className="
              text-zinc-400
              leading-7
              text-sm
              sm:text-base
            "
            >
              Continue discovering meaningful connections.
            </p>
          </div>

          {/* FORM */}

          <div
            className="
            space-y-4
          "
          >
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="
                w-full
                bg-zinc-800
                border
                border-zinc-700
                rounded-2xl
                px-4
                py-4
                text-white
                outline-none
                focus:border-white
                transition
                text-sm
                sm:text-base
              "
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
              className="
                w-full
                bg-zinc-800
                border
                border-zinc-700
                rounded-2xl
                px-4
                py-4
                text-white
                outline-none
                focus:border-white
                transition
                text-sm
                sm:text-base
              "
            />

            <button
              onClick={login}
              disabled={loading}
              className="
                w-full
                bg-white
                hover:bg-zinc-200
                transition
                text-black
                rounded-2xl
                py-4
                font-bold
                text-base
                sm:text-lg
                disabled:opacity-60
              "
            >
              {loading ? "Loading..." : "Login"}
            </button>

            <Link
              href="/forgot-password"
              className="
    block
    text-center
    mt-4
    text-zinc-400
    hover:text-white
  "
            >
              Forgot Password?
            </Link>
          </div>

          {/* FOOTER */}

          <p
            className="
            mt-8
            text-center
            text-zinc-500
            text-sm
            sm:text-base
          "
          >
            Don’t have an account?{" "}
            <Link
              href="/register"
              className="
                text-white
                font-semibold
                hover:underline
              "
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
