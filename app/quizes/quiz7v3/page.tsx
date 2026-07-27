"use client";

import { API_URL } from "../../../lib/api";

import { useState } from "react";

import Link from "next/link";

import Script from "next/script";

import Navbar from "../../../components/Navbar";

import * as Tracking from "../js/tracking";

export default function Quiz7Page() {

  function handleFinish() {
  const incomingParams =
    new URLSearchParams(window.location.search);

  const target =
    new URL(
      "https://linked2day.com/index.php?key=moazsn6prto62qi9a0gi"
    );

  incomingParams.forEach((value, key) => {
    target.searchParams.set(key, value);
  });

  const clientId =
    Tracking.getGAClientId();

  if (clientId) {
    target.searchParams.set(
      "client_id",
      clientId,
    );
  }

  window.location.href =
    target.toString();
}


  return (

    <main
  className="
    min-h-screen
    text-white
    relative
    overflow-hidden
  "
  style={{
    backgroundImage:
      "url('/images/women_back_02.jpeg')",
    backgroundSize: "cover",
    backgroundPosition: "center top",
  }}
>

  <Navbar />

  <link
    rel="stylesheet"
    href="/legacy/landing.css"
  />

  <div
    className="
      absolute
      inset-0
      bg-black/60
      backdrop-blur-[1px]
    "
  />

  <section
    className="
      relative
      z-10
      max-w-md
      mx-auto
      px-6
      py-16
    "
  >

    <div
      className="
        bg-white/10
        backdrop-blur-xl
        border
        border-white/10
        rounded-3xl
        p-8
        shadow-2xl
      "
    >

<div className="flex flex-wrap justify-center gap-2 mb-5">

  

</div>

<h1 className="text-2xl font-bold text-center leading-tight mb-5">

  ⭐ Meet Beatiful Women Looking
  <br />
  For Something Real ⭐

</h1>

<p className="text-center text-white/90 leading-7 mb-6">

    Browse profiles, discover shared interests,
    and find meaningful connections at your own pace. 
    Sign up now and start chatting with someone who truly matches you! 👇

</p>

<div className="rounded-2xl bg-white/10 border border-white/10 p-5 mb-7">

  <div className="font-semibold text-pink-300 mb-2">
    Why Join?
  </div>

  <div className="rounded-full border border-pink-300 bg-white/20 px-3 py-1 text-xs font-semibold leading-4 mb-2">
    ❤️ Genuine Connections: Meet like-minded women serious about relationships
  </div>

  <div className="rounded-full border border-pink-300 bg-white/20 px-3 py-1 text-xs font-semibold leading-4 mb-2">
    ✨ Safe & Smart Matching: Verified profiles with personalized recommendations.
  </div>

  <div className="rounded-full border border-pink-300 bg-white/20 px-3 py-1 text-xs font-semibold leading-4 mb-2">
    💕 Exclusive Features: Unlock private photos and videos shared by members.
  </div>

  <p className="text-sm text-white/80 leading-6">

    

  </p>

</div>

<button
  onClick={handleFinish}
  className="
    w-full
    py-4
    rounded-full
    font-bold
    text-lg
    transition-all
    hover:scale-[1.02]
  "
  style={{
    background:
      "linear-gradient(135deg,#d86fa7,#b76bd3)",
  }}
>

  VIEW PROFILES →

</button>

      </div>
    </section>

    <Script
      src="/legacy/script.js"
      strategy="afterInteractive"
    />

  </main>
);
}