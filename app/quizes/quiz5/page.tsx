"use client";

import { API_URL } from "../../../lib/api";

import Link from "next/link";

import { useEffect, useState } from "react";

import Script from "next/script";

import Navbar from "../../../components/Navbar";

export default function Quiz5Page() {
  const [step, setStep] = useState(0);

  const [loading, setLoading] = useState(false);

  const [progress, setProgress] = useState(0);

  const [slideIndex, setSlideIndex] = useState(0);

  const slides = [
    "/images/man_quiz5_slide1.jpeg",
    "/images/man_quiz5_slide2.jpeg",
    "/images/man_quiz5_slide3.jpeg",
  ];

  const questions = [
    {
      title: "Shared interests are:",

      answers: [
        "Very important",
        "Nice to have",
        "Not essential",
        "Less important than values",
      ],
    },

    {
      title: "If he likes different hobbies, you:",

      answers: [
        "Enjoy learning about them",
        "Don’t mind",
        "Prefer more overlap",
        "Focus more on emotional connection",
      ],
    },

    {
      title: "Doing things together makes you feel:",

      answers: ["Closer", "Happy", "Secure", "More emotionally connected"],
    },

    {
      title: "In a relationship, you prefer:",

      answers: [
        "Many shared activities",
        "Some shared, some separate",
        "Mostly separate interests",
        "A healthy balance",
      ],
    },

    {
      title: "What makes you feel most valued in a relationship?",

      answers: [
        "Honest communication",
        "Consistency & effort",
        "Quality time together",
        "Feeling appreciated",
      ],
    },

    {
      title: "What bonds you most to a man?",

      answers: [
        "Shared experiences",
        "Shared values",
        "Emotional connection",
        "Physical chemistry",
      ],
    },

    {
      title: "What kind of relationship are you hoping to find?",

      answers: [
        "A calm and stable connection",
        "A meaningful long-term relationship",
        "Someone to share life with",
        "Real emotional companionship",
      ],
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  function nextStep() {
    if (step < questions.length) {
      setStep(step + 1);
    } else {
      startLoading();
    }
  }

  function startLoading() {
    setLoading(true);

    let current = 0;

    const interval = setInterval(() => {
      current += 10;

      setProgress(current);

      if (current >= 100) {
        clearInterval(interval);

        setLoading(false);

        setStep(questions.length + 1);
      }
    }, 150);
  }

  function enterMemberArea() {
    const incomingParams = new URLSearchParams(window.location.search);

    const baseUrl = new URL(
      "https://linked2day.com/index.php?key=5gofmfa1tfewf5ipk72f",
    );

    incomingParams.forEach((value, key) => {
      baseUrl.searchParams.set(key, value);
    });

    window.location.href = baseUrl.toString();
  }

  const topProgress =
    step <= questions.length ? (step / questions.length) * 100 : 100;

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-white to-pink-50 text-black">
      <Navbar />

      <link rel="stylesheet" href="/legacy/landing.css" />

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
        <div className="mb-5 h-2 w-full overflow-hidden rounded-full bg-zinc-200">
          <div
            className="h-full bg-gradient-to-r from-pink-500 to-violet-500 transition-all duration-300"
            style={{
              width: `${topProgress}%`,
            }}
          />
        </div>

        {step === 0 && (
          <div className="text-center">
            <div className="relative mb-2 h-[260px] overflow-hidden rounded-2xl">
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
                    alt="Quiz"
                    className="h-[260px] w-full min-w-full bg-white object-contain"
                  />
                ))}
              </div>

              <button
                onClick={() =>
                  setSlideIndex(
                    (slideIndex - 1 + slides.length) % slides.length,
                  )
                }
                className="absolute top-1/2 left-3 h-9 w-9 -translate-y-1/2 rounded-full bg-white/80 font-bold"
              >
                ‹
              </button>

              <button
                onClick={() => setSlideIndex((slideIndex + 1) % slides.length)}
                className="absolute top-1/2 right-3 h-9 w-9 -translate-y-1/2 rounded-full bg-white/80 font-bold"
              >
                ›
              </button>
            </div>

            <h1 className="mb-4 text-2xl leading-5 font-bold">
              Meet Relationship-Focused Men 💕
            </h1>

            <p className="mb-6 leading-5 text-zinc-600">
              Discover emotionally mature men who value honesty, companionship,
              and meaningful long-term relationships.
            </p>

            <button
              onClick={nextStep}
              className="w-full rounded-2xl bg-gradient-to-r from-pink-500 to-violet-500 py-4 text-lg font-bold text-white"
            >
              DISCOVER YOUR MATCH →
            </button>

            <p className="mt-4 text-xs text-zinc-500">
              Thousands of women are exploring meaningful relationships every
              day.
            </p>
          </div>
        )}

        {step > 0 && step <= questions.length && !loading && (
          <div>
            <h2 className="mb-8 text-center text-2xl leading-tight font-bold">
              {questions[step - 1].title}
            </h2>

            <div className="space-y-4">
              {questions[step - 1].answers.map((answer) => (
                <button
                  key={answer}
                  onClick={nextStep}
                  className="w-full rounded-2xl border-2 border-zinc-200 bg-white px-4 py-4 font-medium text-black hover:bg-pink-50"
                >
                  {answer}
                </button>
              ))}
            </div>
          </div>
        )}

        {loading && (
          <div className="py-10 text-center">
            <p className="mb-6 text-lg">
              Analyzing your compatibility profile...
            </p>

            <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-200">
              <div
                className="h-full bg-gradient-to-r from-pink-500 to-violet-500 transition-all"
                style={{
                  width: `${progress}%`,
                }}
              />
            </div>
          </div>
        )}

        {step === questions.length + 1 && (
          <div className="py-6 text-center">
            <p className="mb-8 text-lg leading-8">
              <strong>Your matches are ready 💕</strong>
              <br />
              <br />
              Based on your answers, you may be compatible with emotionally
              mature men who value meaningful communication, companionship, and
              lasting relationships.
              <br />
              <br />
              Click below to discover compatible men who match your relationship
              energy 👇
            </p>

            <button
              onClick={enterMemberArea}
              className="w-full rounded-2xl bg-gradient-to-r from-pink-600 to-fuchsia-600 py-5 text-lg font-extrabold text-white shadow-xl"
            >
              SEE YOUR MATCH →
            </button>

            <p className="mt-6 text-sm leading-6 text-zinc-500">
              ✔ Private Access • ✔ Verified Profiles • ✔ Easy To Start
            </p>
          </div>
        )}
      </div>

      <footer className="relative z-10 mx-auto mb-10 max-w-md px-6 py-6 text-center text-sm text-zinc-500">
        <div className="mb-4 flex justify-center gap-6">
          <Link href="/terms">Terms of Service</Link>

          <Link href="/privacy">Privacy Policy</Link>
        </div>

        <p className="mb-2">Users 18+ only.</p>

        <p>
          © 2026 MutualPathways. All Rights Reserved. Owned and operated by True
          Blue Digital Media LTD
        </p>
      </footer>

      <Script src="/legacy/script.js" strategy="afterInteractive" />
    </main>
  );
}
