"use client";

import { API_URL } from "../../../lib/api";

import { useEffect, useState } from "react";

import Link from "next/link";

import Script from "next/script";

import Navbar from "../../../components/NavbarComm";

import * as Tracking from "../js/tracking";

const slides = [
  "/images/woman_feed_03.jpeg",
  "/images/wEman_feed_02.jpeg",
  "/images/woman_feed_01.jpeg",
];

export default function Quiz9Page() {
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  function enterMemberArea() {
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
    <main className="min-h-screen overflow-x-hidden bg-gradient-to-b from-white to-pink-50 text-[#1c1c1e]">
      <Navbar />

      <link rel="stylesheet" href="/legacy/landing.css" />

      {/* Floating Hearts */}

      <div className="pointer-events-none fixed inset-0 z-0">
        {[...Array(15)].map((_, i) => (
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

      <section className="relative z-10 mx-auto mt-1 mb-1 max-w-md p-3">
        <div className="rounded-[24px] border border-white bg-white/80 p-1 shadow-2xl backdrop-blur-xl">
          <h1 className="mb-2 text-center text-2xl leading-tight font-bold">
            Meet Beautiful Women
            <br />
            Seeking Something Real
          </h1>

          <div className="relative mb-2 h-[220px] overflow-hidden rounded-2xl sm:h-[240px] md:h-[260px]">
            <div
              className="flex transition-transform duration-500"
              style={{
                transform: `translateX(-${slideIndex * 100}%)`,
              }}
            >
              {slides.map((slide) => (
                <img
                  key={slide}
                  src={slide}
                  alt="Women"
                  className="h-[220px] w-full min-w-full bg-white object-contain sm:h-[240px] md:h-[260px]"
                />
              ))}
            </div>

            <button
              onClick={() =>
                setSlideIndex(
                  slideIndex === 0 ? slides.length - 1 : slideIndex - 1,
                )
              }
              className="absolute top-1/2 left-3 h-9 w-9 -translate-y-1/2 rounded-full bg-white/80 font-bold"
            >
              ‹
            </button>

            <button
              onClick={() =>
                setSlideIndex(
                  slideIndex === slides.length - 1 ? 0 : slideIndex + 1,
                )
              }
              className="absolute top-1/2 right-3 h-9 w-9 -translate-y-1/2 rounded-full bg-white/80 font-bold"
            >
              ›
            </button>
          </div>

          <div className="mb-2 rounded-2xl border border-pink-100 bg-purple-50 p-3">
            <div className="font-semibold text-purple-600">
              Ready To Connect?
            </div>

            <p className="text-[13px] leading-tight text-zinc-500">
              Your next meaningful relationship could be just one message away.
              Browse verified profiles, find women who share your interests, and
              start chatting today. 👇
            </p>
          </div>

          <button
            onClick={enterMemberArea}
            className="mb-1 w-full rounded-full py-3 text-base font-bold text-white shadow-lg transition-all hover:scale-[1.02]"
            style={{
              background: "linear-gradient(135deg, #c85adf, #7b5cff)",
            }}
          >
            VIEW PROFILES →
          </button>

          <div className="mt-1 mb-3 rounded-2xl border border-purple-300 bg-purple-50 p-4">
            <div className="gap-2 font-semibold text-purple-600">Why Join?</div>

            <div className="mb-3 flex flex-wrap justify-center gap-1">
              <div className="rounded-full border border-purple-300 bg-white px-3 py-1 text-xs leading-tight font-semibold text-pink-600 shadow-sm">
                ❤️ Genuine Connections: Meet like-minded women serious about
                relationships
              </div>

              <div className="rounded-full border border-purple-300 bg-white px-3 py-1 text-xs leading-tight font-semibold text-pink-600 shadow-sm">
                ✨ Safe & Smart Matching: Verified profiles with personalized
                recommendations.
              </div>

              <div className="rounded-full border border-purple-300 bg-white px-3 py-1 text-xs leading-tight font-semibold text-pink-600 shadow-sm">
                💕 Exclusive Features: Unlock private photos and videos shared
                by members.
              </div>
            </div>
          </div>
        </div>
      </section>

      <Script src="/legacy/script.js" strategy="afterInteractive" />
    </main>
  );
}
