"use client";

import { API_URL } from "../../../lib/api";

import { useState } from "react";
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
    question: "Do you value a woman who enjoys taking care of her man?",
    answers: [
      "Absolutely",
      "Yes",
      "Depends on the situation",
      "Not necessarily",
    ],
  },
  {
    question: "In a relationship, you want to feel:",
    answers: ["Appreciated", "Supported", "Admired", "All of the above"],
  },
  {
    question: "How do you feel about a woman who openly expresses affection?",
    answers: [
      "I value that highly",
      "It feels good",
      "It's nice but not essential",
      "I prefer independence",
    ],
  },
  {
    question: "Are you ready for a committed, long-term relationship?",
    answers: ["Yes, absolutely", "Yes, if it's right", "Maybe", "Not sure"],
  },
];

export default function Quiz8Page() {
  const [step, setStep] = useState(0);

  const [loading, setLoading] = useState(false);

  const [finished, setFinished] = useState(false);

  const totalSteps = questions.length + 1;

  const progress = ((step + (finished ? 1 : 0)) / totalSteps) * 100;

  const nextStep = () => {
    if (step < questions.length) {
      setStep(step + 1);
    } else {
      startLoading();
    }
  };

  const startLoading = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      setFinished(true);
    }, 1500);
  };

  const enterMemberArea = () => {
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
  };

  return (
    <main className="min-h-screen bg-[#f7f7f7] text-[#111]">
      <Navbar />

      <link rel="stylesheet" href="/legacy/landing.css" />

      {/* QUIZ */}

      <section className="mx-auto max-w-md px-5 py-10">
        {/* TOP PROGRESS */}

        <div className="mb-4 h-2 w-full overflow-hidden rounded-full bg-zinc-200">
          <div
            className="h-full transition-all duration-300"
            style={{
              width: `${progress}%`,

              background: "linear-gradient(90deg,#ff4e8a,#ff2e63)",
            }}
          />
        </div>

        <div className="text-center">
          <h1 className="mb-4 text-2xl leading-6 font-bold">
            Meet Women Ready for a Real Connection
          </h1>

          {/* INTRO */}

          {step === 0 && !loading && !finished && (
            <div>
              <img
                src="/images/woman_feed_02_coll.jpeg"
                alt="Relationship Preview"
                className="mx-auto mb-4 h-[65%] w-[65%] rounded-2xl object-cover"
              />

              <p className="text-1xl mb-4 leading-5 text-zinc-700">
                Answer a few questions to discover what kind of woman matches
                your energy 💕
              </p>

              <button
                onClick={nextStep}
                className="w-full rounded-2xl py-4 font-bold text-white shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  background: "linear-gradient(135deg,#ff4e8a,#ff2e63)",
                }}
              >
                Start
              </button>
            </div>
          )}

          {/* QUESTIONS */}

          {step > 0 && step <= questions.length && !loading && !finished && (
            <div>
              <p className="mb-8 text-xl leading-8 font-semibold">
                {questions[step - 1].question}
              </p>

              <div className="space-y-4">
                {questions[step - 1].answers.map((answer) => (
                  <button
                    key={answer}
                    onClick={nextStep}
                    className="w-full rounded-2xl border-2 border-zinc-200 bg-violet-200 px-5 py-4 font-medium transition-all hover:border-violet-200 hover:bg-violet-50 active:scale-[0.98]"
                  >
                    {answer}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* LOADING */}

          {loading && (
            <div className="mt-10">
              <p className="mb-6 text-lg">
                Checking compatibility with attentive women...
              </p>

              <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-200">
                <div
                  className="h-full animate-pulse"
                  style={{
                    width: "100%",

                    background: "linear-gradient(90deg,#ff4e8a,#ff2e63)",
                  }}
                />
              </div>
            </div>
          )}

          {/* FINAL */}

          {finished && (
            <div className="mt-10">
              <p className="mb-8 text-lg leading-8 font-medium">
                Congratulations! You’re eligible to access a platform where
                women are ready to build strong, meaningful relationships.
                <br />
                <br />
                Enter now and discover women who appreciate loyalty, respect,
                and commitment.
                <br />
                <br />
                Click below to meet your most compatible one 👇
              </p>

              <button
                onClick={enterMemberArea}
                className="w-full rounded-2xl py-5 text-lg font-extrabold text-white shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
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

      {/* FOOTER */}

      <Script src="/legacy/script.js" strategy="afterInteractive" />
    </main>
  );
}
