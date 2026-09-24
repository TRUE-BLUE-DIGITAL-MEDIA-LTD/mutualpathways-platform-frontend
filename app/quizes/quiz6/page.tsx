"use client";

import { API_URL } from "../../../lib/api";

import Link from "next/link";

import { useState } from "react";

import Script from "next/script";

import Navbar from "../../../components/NavbarComm";

import * as Tracking from "../js/tracking";

export default function Quiz6Page() {
  const [step, setStep] = useState(1);

  const totalSteps = 8;

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
        "Feel distant",
        "Prefer more overlap",
      ],
    },

    {
      title: "Doing things together makes you feel:",

      answers: ["Closer", "Happy", "Secure", "Neutral"],
    },

    {
      title: "In a relationship, you prefer:",

      answers: [
        "Many shared activities",
        "Some shared, some separate",
        "Mostly separate interests",
        "It depends",
      ],
    },

    {
      title: "If you don’t share passions, you:",

      answers: [
        "Focus on connection",
        "Try to create new ones",
        "Worry about compatibility",
        "Accept it easily",
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
      title: "Ideally, your partner feels like:",

      answers: ["My best friend", "My teammate", "My safe place", "My lover"],
    },
  ];

  const progress = ((step - 1) / totalSteps) * 100;

  function nextStep() {
    setStep((prev) => prev + 1);
  }

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
    <main className="relative min-h-screen overflow-hidden text-white">
      <Navbar />

      <link rel="stylesheet" href="/legacy/landing.css" />

      {/* BACKGROUND */}

      <div
        className="fixed inset-0 -z-20 scale-105 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/men_back02.jpeg')",
        }}
      />

      {/* OVERLAY */}

      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-[rgba(45,15,35,0.55)] to-[rgba(25,10,25,0.78)]" />

      {/* QUIZ CARD */}

      <section className="relative z-10 mx-auto mt-16 mb-8 w-[90%] max-w-md rounded-[28px] border border-white/15 bg-white/10 p-8 text-center shadow-2xl backdrop-blur-2xl">
        {/* TOP PROGRESS */}

        <div className="mb-8 h-2 w-full overflow-hidden rounded-full bg-white/15">
          <div
            className="h-full bg-gradient-to-r from-pink-400 to-violet-400 transition-all duration-300"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>

        {/* INTRO */}

        {step === 1 && (
          <div>
            <h1 className="mb-4 text-2xl leading-8 font-semibold">
              Discover What Matters in Your Next Long-Term Relationship 💕
            </h1>

            <h2 className="text-1xl mb-2 leading-5 font-medium">
              Before we can show you the website where connections grow through
              shared interests and values
            </h2>

            <p className="text-1xl mb-6 leading-5">
              Help us find men who align with your values and long-term
              relationship goals by taking this short quiz.
            </p>

            <button
              onClick={nextStep}
              className="w-full rounded-full bg-gradient-to-r from-pink-400 to-violet-500 py-4 font-semibold text-white shadow-xl transition hover:scale-[1.02]"
            >
              Start
            </button>
          </div>
        )}

        {/* QUESTIONS */}

        {step >= 2 && step <= 8 && (
          <div>
            <h2 className="mb-8 text-2xl leading-relaxed font-semibold">
              {questions[step - 2].title}
            </h2>

            <div className="flex flex-col gap-4">
              {questions[step - 2].answers.map((answer) => (
                <button
                  key={answer}
                  onClick={nextStep}
                  className="w-full rounded-full bg-gradient-to-r from-pink-400 to-violet-500 px-5 py-4 font-semibold text-white shadow-lg transition hover:scale-[1.02]"
                >
                  {answer}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* FINAL */}

        {step === 9 && (
          <div>
            <h2 className="mb-6 text-3xl font-semibold">
              You’re Eligible to Connect 💕
            </h2>

            <p className="mb-8 leading-8 text-white/90">
              Congratulations!
              <br />
              <br />
              You now qualify to join a community of men focused on meaningful,
              long-term relationships.
              <br />
              <br />
              Click below to discover your compatible matches.
            </p>

            <button
              onClick={enterMemberArea}
              className="w-full rounded-full bg-gradient-to-r from-pink-400 to-violet-500 py-4 font-semibold text-white shadow-xl transition hover:scale-[1.02]"
            >
              Continue
            </button>
          </div>
        )}
      </section>

      {/* FOOTER */}

      <Script src="/legacy/script.js" strategy="afterInteractive" />
    </main>
  );
}
