"use client";

import { API_URL } from "../../../lib/api";

import { useEffect, useState } from "react";

import Link from "next/link";

import Script from "next/script";

import Navbar from "../../../components/NavbarComm";

import * as Tracking from "../js/tracking";

export default function Quiz7Page() {
  function handleFinish() {
    const incomingParams = new URLSearchParams(window.location.search);

    const target = new URL(
      "https://linked2day.com/index.php?key=moazsn6prto62qi9a0gi",
    );

    incomingParams.forEach((value, key) => {
      target.searchParams.set(key, value);
    });

    const clientId = Tracking.getGAClientId();

    if (clientId) {
      target.searchParams.set("client_id", clientId);
    }

    window.location.href = target.toString();
  }

  return (
    <main
      className="relative min-h-screen overflow-hidden text-white"
      style={{
        backgroundImage: "url('/images/women_back_02.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center top",
      }}
    >
      <Navbar />

      <link rel="stylesheet" href="/legacy/landing.css" />

      <div className="absolute inset-0 bg-black/40 backdrop-blur-[0.5px]" />

      <section className="relative z-10 mx-auto max-w-md px-6 pt-4 pb-12">
        <div className="rounded-3xl border border-white/10 bg-white/10 p-2 shadow-2xl backdrop-blur-xl md:p-8">
          <div className="mb-3 flex flex-wrap justify-center gap-2"></div>

          <h1 className="mb-4 text-center text-2xl leading-6 font-bold">
            Meet Beautiful Women
            <br />
            Seeking Something Real
          </h1>

          <p className="mb-2 text-center leading-6 text-white/90">
            Your next meaningful relationship could be just one message away.
            Browse verified profiles, find women who share your interests, and
            start chatting today. 👇
          </p>

          <div className="mb-2 rounded-2xl border border-white/10 bg-white/10 px-1 py-1 text-[14px] leading-5">
            <div className="mb-2 font-semibold text-purple-300">Why Join?</div>

            <div className="mb-2 rounded-full border border-purple-300 bg-white/20 px-3 py-1 text-sm leading-tight font-semibold">
              ❤️ Genuine Connections: Meet like-minded women serious about
              relationships
            </div>

            <div className="mb-2 rounded-full border border-purple-300 bg-white/20 px-3 py-1 text-sm leading-tight font-semibold">
              ✨ Safe & Smart Matching: Verified profiles with personalized
              recommendations.
            </div>

            <div className="mb-2 rounded-full border border-purple-300 bg-white/20 px-3 py-1 text-sm leading-tight font-semibold">
              💕 Exclusive Features: Unlock private photos and videos shared by
              members.
            </div>

            <p className="text-sm leading-6 text-white/80"></p>
          </div>

          <button
            onClick={handleFinish}
            className="w-full rounded-full py-3 text-lg font-bold transition-all hover:scale-[1.02]"
            style={{
              background: "linear-gradient(135deg, #c85adf, #7b5cff)",
            }}
          >
            VIEW PROFILES →
          </button>
        </div>
      </section>

      <Script src="/legacy/script.js" strategy="afterInteractive" />
    </main>
  );
}
