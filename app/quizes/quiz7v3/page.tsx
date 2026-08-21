"use client";

import { API_URL } from "../../../lib/api";

import { useEffect, useState } from "react";

import Link from "next/link";

import Script from "next/script";

import Navbar from "../../../components/NavbarComm";

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
      bg-black/40
      backdrop-blur-[0.5px]
    "
  />

  <section
  className="
    relative
    z-10
    max-w-md
    mx-auto
    px-6
    pt-4
    pb-12
  "
  >

    <div
  className="
    bg-white/10
    backdrop-blur-xl
    border
    border-white/10
    rounded-3xl
    p-2 md:p-8
    shadow-2xl
  "
    >

<div className="flex flex-wrap justify-center gap-2 mb-3">

  

</div>

<h1 className="text-2xl font-bold text-center leading-6 mb-4">

  Meet Beautiful Women
  <br />
  Seeking Something Real

</h1>

<p className="text-center text-white/90 leading-6 mb-2">

    Your next meaningful relationship could be just one message away. 
    Browse verified profiles, find women who share your interests, and start chatting today. 👇

</p>

<div className="rounded-2xl bg-white/10 border border-white/10 px-1 py-1 mb-2 text-[14px] leading-5">

  <div className="font-semibold text-purple-300 mb-2">
    Why Join?
  </div>

  <div className="rounded-full border border-purple-300 bg-white/20 px-3 py-1 text-sm font-semibold leading-tight mb-2">
    ❤️ Genuine Connections: Meet like-minded women serious about relationships
  </div>

  <div className="rounded-full border border-purple-300 bg-white/20 px-3 py-1 text-sm font-semibold leading-tight mb-2">
    ✨ Safe & Smart Matching: Verified profiles with personalized recommendations.
  </div>

  <div className="rounded-full border border-purple-300 bg-white/20 px-3 py-1 text-sm font-semibold leading-tight mb-2">
    💕 Exclusive Features: Unlock private photos and videos shared by members.
  </div>

  <p className="text-sm text-white/80 leading-6">

    

  </p>

</div>

<button
  onClick={handleFinish}
  className="
    w-full
    py-3
    rounded-full
    font-bold
    text-lg
    transition-all
    hover:scale-[1.02]
  "
  style={{
    background:
      "linear-gradient(135deg, #c85adf, #7b5cff)",
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