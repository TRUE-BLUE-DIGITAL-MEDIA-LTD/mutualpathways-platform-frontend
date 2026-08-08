"use client";

import { useEffect, useState } from "react";

import Script from "next/script";

import Navbar from "../../../components/Navbar";

import * as Tracking from "../js/tracking";

export default function Quiz5v3Page() {
  const [slideIndex, setSlideIndex] = useState(0);

  const slides = [
    "/images/man_quiz5_slide1.jpeg",
    "/images/man_quiz5_slide2.jpeg",
    "/images/man_quiz5_slide3.jpeg",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  function enterMemberArea() {
    const incomingParams = new URLSearchParams(window.location.search);

    const baseUrl = new URL(
      "https://linked2day.com/index.php?key=5gofmfa1tfewf5ipk72f",
    );

    incomingParams.forEach((value, key) => {
      baseUrl.searchParams.set(key, value);
    });

    const clientId = Tracking.getGAClientId();

    if (clientId) {
      baseUrl.searchParams.set("client_id", clientId);
    }

    window.location.href = baseUrl.toString();
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-white to-pink-50 text-black">
      <Navbar />

      <link rel="stylesheet" href="/legacy/landing.css" />

      {/* FLOATING HEARTS */}

      <div className="pointer-events-none fixed inset-0 opacity-10">
        {Array.from({
          length: 15,
        }).map((_, i) => (
          <div
            key={i}
            className="absolute animate-bounce text-pink-500"
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

      <div className="relative z-10 mx-auto mt-4 mb-10 max-w-md rounded-3xl bg-white/80 p-4 shadow-2xl backdrop-blur-xl">
        {/* CAROUSEL */}

        <div className="relative mb-4 h-[260px] overflow-hidden rounded-2xl">
          <div
            className="flex h-full transition-transform duration-500"
            style={{
              transform: `translateX(-${slideIndex * 100}%)`,
            }}
          >
            {slides.map((slide) => (
              <img
                key={slide}
                src={slide}
                alt="Relationship Match"
                className="h-[260px] w-full min-w-full object-cover object-top"
              />
            ))}
          </div>

          <button
            onClick={() =>
              setSlideIndex((slideIndex - 1 + slides.length) % slides.length)
            }
            className="absolute top-1/2 left-3 h-9 w-9 -translate-y-1/2 rounded-full bg-white/90 font-bold shadow"
          >
            ‹
          </button>

          <button
            onClick={() => setSlideIndex((slideIndex + 1) % slides.length)}
            className="absolute top-1/2 right-3 h-9 w-9 -translate-y-1/2 rounded-full bg-white/90 font-bold shadow"
          >
            ›
          </button>
        </div>

        <h1 className="mb-2 text-center text-2xl leading-tight font-bold">
          Meet Men Who Know What They Want ❤️
        </h1>

        <p className="mb-4 text-center leading-5 text-zinc-500">
          Discover men who value genuine conversation, real chemistry, and
          meaningful connections.
        </p>

        <div className="mb-5 rounded-2xl border border-zinc-200 bg-white p-3 text-center">
          <div className="mb-2 text-center font-bold text-pink-500">
            ❤️ Ready To Explore?
          </div>

          <p className="text-sm leading-5 text-zinc-500">
            Browse profiles, discover shared interests, and find meaningful
            connections at your own pace.
          </p>
        </div>

        <button
          onClick={enterMemberArea}
          className="w-full rounded-2xl bg-gradient-to-r from-pink-500 to-violet-500 py-4 text-lg font-bold text-white shadow-xl"
        >
          VIEW PROFILES →
        </button>

        <p className="mt-5 text-center text-xs text-zinc-500">
          ✔ Secure • ✔ Private • ✔ Verified Profiles
        </p>
      </div>

      <Script src="/legacy/script.js" strategy="afterInteractive" />
    </main>
  );
}
