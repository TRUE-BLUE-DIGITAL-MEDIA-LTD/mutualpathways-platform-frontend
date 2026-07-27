"use client";

import { API_URL } from "../../../lib/api";

import { useEffect, useState } from "react";

import Link from "next/link";

import Script from "next/script";

import Navbar from "../../../components/Navbar";

import * as Tracking from "../js/tracking";

const slides = [
  "/images/woman_feed_03.jpeg",
  "/images/woman_feed_02.jpeg",
  "/images/woman_feed_01.jpeg",
];

export default function Quiz9Page() {

  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {


    const interval = setInterval(() => {

      setSlideIndex((prev) =>
        prev === slides.length - 1
          ? 0
          : prev + 1
      );

    }, 3000);

    return () => clearInterval(interval);

  }, []);

  function enterMemberArea() {
  const incomingParams =
    new URLSearchParams(window.location.search);

  const target =
    new URL(
      "https://linked2day.com/index.php?key=moazsn6prto62qi9a0gi"
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
    className="
      min-h-screen
      bg-gradient-to-b
      from-white
      to-pink-50
      text-[#1c1c1e]
      overflow-x-hidden
    "
  >
    <Navbar />

    <link
      rel="stylesheet"
      href="/legacy/landing.css"
    />

    {/* Floating Hearts */}

    <div
      className="
        fixed
        inset-0
        pointer-events-none
        z-0
      "
    >
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="
            absolute
            text-pink-500
            animate-bounce
          "
          style={{
            left: `${(i * 7) % 100}%`,
            top: `${(i * 13) % 100}%`,
            fontSize: `${14 + (i % 5) * 2}px`,
          }}
        >
          ❤
        </div>
      ))}
    </div>

    <section
      className="
        relative
        z-10
        max-w-md
        mx-auto
        mt-8
        mb-6
        px-4
      "
    >
      <div
        className="
          bg-white/80
          backdrop-blur-xl
          rounded-[24px]
          shadow-2xl
          border
          border-white
          p-5
        "
      >

<h1 className="text-2xl font-bold text-center leading-tight mb-4">

  ⭐ Meet Beautiful Women Seeking Something Real ⭐

</h1>

        <div
  className="
    relative
    overflow-hidden
    rounded-2xl
    mb-5
    h-[260px]
  "
>
  <div
    className="
      flex
      transition-transform
      duration-500
    "
    style={{
      transform: `translateX(-${slideIndex * 100}%)`,
    }}
  >
    {slides.map((slide) => (
      <img
        key={slide}
        src={slide}
        alt="Women"
        className="
          w-full
          min-w-full
          h-[260px]
          object-contain
          bg-white
        "
      />
    ))}
  </div>

  <button
    onClick={() =>
      setSlideIndex(
        slideIndex === 0
          ? slides.length - 1
          : slideIndex - 1
      )
    }
    className="
      absolute
      left-3
      top-1/2
      -translate-y-1/2
      w-9
      h-9
      rounded-full
      bg-white/80
      font-bold
    "
  >
    ‹
  </button>

  <button
    onClick={() =>
      setSlideIndex(
        slideIndex === slides.length - 1
          ? 0
          : slideIndex + 1
      )
    }
    className="
      absolute
      right-3
      top-1/2
      -translate-y-1/2
      w-9
      h-9
      rounded-full
      bg-white/80
      font-bold
    "
  >
    ›
  </button>
</div>


<div className="rounded-2xl bg-pink-50 border border-pink-100 p-4 mb-6">

  <div className="font-semibold text-pink-600 mb-2">

    Ready To Connect?

  </div>

  <p className="text-sm text-zinc-500 leading-5">

    Browse profiles, discover shared interests,
    and find meaningful connections at your own pace. 
    Sign up now And start chatting With Someone who Truly matches you! 👇

  </p>

</div>

<button
  onClick={enterMemberArea}
  className="
    w-full
    py-4
    rounded-2xl
    text-white
    text-lg
    font-bold
    shadow-lg
    transition-all
    hover:scale-[1.02]
  "
  style={{
    background:
      "linear-gradient(135deg,#ff4e8a,#7b5cff)",
  }}
>

  VIEW PROFILES →

</button>


<div className="rounded-2xl bg-pink-50 border border-pink-100 p-4 mb-6">

  <div className="font-semibold text-pink-600 mb-2">

    Why Join? 
  </div>

  <div className="flex flex-wrap justify-center gap-2 mb-5">

  <div className="rounded-full border border-pink-200 bg-white px-3 py-1 text-xs font-semibold text-pink-600 shadow-sm">
    ❤️ Genuine Connections: Meet like-minded women serious about relationships
  </div>

  <div className="rounded-full border border-pink-200 bg-white px-3 py-1 text-xs font-semibold text-pink-600 shadow-sm">
    ✨ Safe & Smart Matching: Verified profiles with personalized recommendations.
  </div>

  <div className="rounded-full border border-pink-200 bg-white px-3 py-1 text-xs font-semibold text-pink-600 shadow-sm">
    💕 Exclusive Features: Unlock private photos and videos shared by members.
  </div>

</div>

</div>

      </div>

    </section>

    <Script
      src="/legacy/script.js"
      strategy="afterInteractive"
    />

  </main>
);
}




