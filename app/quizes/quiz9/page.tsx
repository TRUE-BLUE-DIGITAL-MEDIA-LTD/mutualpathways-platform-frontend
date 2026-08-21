"use client";

import { API_URL } from "../../../lib/api";

import { useEffect, useState } from "react";

import Link from "next/link";

import Script from "next/script";

import Navbar from "../../../components/NavbarComm";

import * as Tracking from "../js/tracking";

const questions = [
  {
    question: "How important is it for you to feel respected by your partner?",

    answers: [
      "Extremely important",
      "Very important",
      "Somewhat important",
      "Not a priority",
    ],
  },

  {
    question: "Do you appreciate a woman who enjoys taking care of her man?",

    answers: ["Absolutely", "Yes", "Depends", "Not necessary"],
  },

  {
    question: "In a relationship, you want to feel:",

    answers: ["Appreciated", "Supported", "Admired", "All of the above"],
  },

  {
    question: "How do you feel about a woman who openly shows affection?",

    answers: [
      "I value that highly",
      "It feels great",
      "It’s nice but optional",
      "I prefer distance",
    ],
  },

  {
    question: "Are you ready for a committed long-term relationship?",

    answers: ["Yes, absolutely", "Yes, if it's right", "Maybe", "Not sure"],
  },
];

const slides = [
  "/images/woman_feed_03.jpeg",
  "/images/woman_feed_02.jpeg",
  "/images/woman_feed_01.jpeg",
];

export default function Quiz9Page() {
  const [step, setStep] = useState(0);

  const [loading, setLoading] = useState(false);

  const [finished, setFinished] = useState(false);

  const [slideIndex, setSlideIndex] = useState(0);

  const totalSteps = questions.length + 1;

  const progress = ((step + (finished ? 1 : 0)) / totalSteps) * 100;

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
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

    setTimeout(() => {
      setLoading(false);

      setFinished(true);
    }, 1500);
  }

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

      {/* FLOATING HEARTS */}

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

      {/* QUIZ */}

      <section className="relative z-10 mx-auto mt-8 mb-6 max-w-md px-4">
        <div className="rounded-[24px] border border-white bg-white/80 p-5 shadow-2xl backdrop-blur-xl">
          {/* PROGRESS */}

          <div className="mb-4 h-2 w-full overflow-hidden rounded-full bg-zinc-200 leading-6">
            <div
              className="h-full transition-all duration-300"
              style={{
                width: `${progress}%`,

                background: "linear-gradient(90deg,#ff4e8a,#7b5cff)",
              }}
            />
          </div>

          <h1 className="mb-4 text-center text-2xl leading-6 font-bold">
            Meet Women Ready for a Real Connection
          </h1>

          {/* INTRO */}

          {step === 0 && !loading && !finished && (
            <div>
              <div className="relative mb-4 h-[260px] overflow-hidden rounded-2xl leading-5">
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
                      className="mb-4 h-[260px] w-full min-w-full bg-white object-contain leading-4"
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

              <p className="mb-6 text-center text-[15px] leading-5 text-zinc-700">
                Answer a few quick questions to see if you're ready to connect
                with women who value loyalty, respect, and long-term commitment.
              </p>

              <button
                onClick={nextStep}
                className="w-full rounded-2xl py-4 font-semibold text-white transition-all hover:scale-[1.02]"
                style={{
                  background: "linear-gradient(135deg,#ff4e8a,#7b5cff)",
                }}
              >
                Start
              </button>
            </div>
          )}

          {/* QUESTIONS */}

          {step > 0 && step <= questions.length && !loading && !finished && (
            <div>
              <p className="mb-8 text-center text-xl leading-8 font-semibold">
                {questions[step - 1].question}
              </p>

              <div className="space-y-4">
                {questions[step - 1].answers.map((answer) => (
                  <button
                    key={answer}
                    onClick={nextStep}
                    className="w-full rounded-2xl border-2 border-zinc-200 bg-violet-200 px-5 py-4 font-medium transition-all hover:border-violet-200 hover:bg-violet-50"
                  >
                    {answer}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* LOADING */}

          {loading && (
            <div className="py-10 text-center">
              <p className="mb-6 text-lg">
                Checking compatibility with attentive women...
              </p>

              <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-200">
                <div
                  className="h-full animate-pulse"
                  style={{
                    width: "100%",

                    background: "linear-gradient(90deg,#ff4e8a,#7b5cff)",
                  }}
                />
              </div>
            </div>
          )}

          {/* FINAL */}

          {finished && (
            <div className="py-4 text-center">
              <p className="mb-8 text-lg leading-8">
                <strong>
                  Congratulations! You qualify to access a platform where women
                  are focused on building strong and meaningful relationships.
                  <br />
                  <br />
                  Enter now and discover women who value respect and care.
                </strong>
                <br />
                <br />
                Click below and discover your most compatible match 👇
              </p>

              <button
                onClick={enterMemberArea}
                className="w-full rounded-2xl py-5 text-lg font-bold text-white shadow-xl transition-all hover:scale-[1.02]"
                style={{
                  background: "linear-gradient(135deg,#ff2e63,#ff006e)",
                }}
              >
                SEE YOUR MATCH →
              </button>
            </div>
          )}
        </div>
      </section>

      <Script src="/legacy/script.js" strategy="afterInteractive" />
    </main>
  );
}
