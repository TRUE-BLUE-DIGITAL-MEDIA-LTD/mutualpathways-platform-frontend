"use client";

import { API_URL } from "../../../lib/api";

import Link from "next/link";

import { useState } from "react";

import Script from "next/script";

import Navbar from "../../../components/NavbarComm";

import * as Tracking from "../js/tracking";

export default function Quiz4Page() {
  const [step, setStep] = useState(0);

  const [loading, setLoading] = useState(false);

  const [progress, setProgress] = useState(0);

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

    const clientId = Tracking.getGAClientId();

    if (clientId) {
      baseUrl.searchParams.set("client_id", clientId);
    }

    window.location.href = baseUrl.toString();
  }

  const topProgress =
    step <= questions.length ? (step / questions.length) * 100 : 100;

  return (
    <main className="min-h-screen bg-[#f7f7f7] text-black">
      <Navbar />

      <link rel="stylesheet" href="/legacy/landing.css" />

      <div className="mx-auto max-w-md px-5 py-10">
        <div className="mb-6 h-2 w-full overflow-hidden rounded-full bg-zinc-200">
          <div
            className="h-full bg-pink-500 transition-all duration-300"
            style={{
              width: `${topProgress}%`,
            }}
          />
        </div>

        {step === 0 && (
          <div className="text-center">
            <img
              src="/images/man_quiz4.jpeg"
              alt="Relationship Preview"
              className="mx-auto mb-4 w-3/4 rounded-2xl object-cover object-top"
            />

            <h1 className="mb-4 text-2xl leading-5 font-bold">
              Meet Relationship-Focused Men 💕
            </h1>

            <p className="text-1xl mb-4 leading-5 text-zinc-600">
              Discover emotionally mature men who value honesty, companionship,
              and meaningful long-term relationships.
            </p>

            <button
              onClick={nextStep}
              className="w-full rounded-2xl bg-pink-500 py-4 text-lg font-bold text-white shadow-lg"
            >
              DISCOVER YOUR MATCH →
            </button>
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
                className="h-full bg-pink-500 transition-all"
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
              className="w-full rounded-2xl bg-pink-600 py-5 text-lg font-extrabold text-white shadow-xl"
            >
              SEE YOUR MATCH →
            </button>

            <p className="mt-6 text-sm leading-6 text-zinc-500">
              ✔ Private Access • ✔ Verified Profiles • ✔ Easy To Start
            </p>
          </div>
        )}
      </div>

      <Script src="/legacy/script.js" strategy="afterInteractive" />
    </main>
  );
}
