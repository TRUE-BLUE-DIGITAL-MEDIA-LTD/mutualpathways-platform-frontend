"use client";

import { API_URL }
  from '../../../lib/api';

import { useState } from "react";
import Link from "next/link";
import Script from "next/script";

import Navbar
  from "../../../components/Navbar";

const steps = [
  {
    title:
      "Before we show you the platform where women are looking for meaningful relationships...",
    description:
      "Please, answer a few quick questions so we can help you to find the best match. It only takes a minute.",
    answers: ["Start"],
  },
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
    title:
      "How do you feel about a woman who openly admires and supports you?",
    answers: [
      "I value that highly",
      "It feels good",
      "It’s nice but not essential",
      "I prefer independence",
    ],
  },
  {
    title: "In a relationship, you want to feel:",
    answers: [
      "Respected",
      "Appreciated",
      "Supported",
      "All of the above",
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
    title: "What bonds you most to a woman?",
    answers: [
      "Shared experiences",
      "Shared values",
      "Emotional connection",
      "Physical chemistry",
    ],
  },
  {
    title: "Ideally, your partner feels like:",
    answers: [
      "My best friend",
      "My teammate",
      "My safe place",
      "My lover",
    ],
  },
];

export default function Quiz7Page() {

  const [step, setStep] =
    useState(0);

  const progress =
    (step / steps.length) * 100;

  const nextStep = () => {

    if (step < steps.length) {

      setStep(step + 1);
    }
  };

  const handleFinish = () => {

    window.location.href =
      "https://linked2day.com/index.php?key=moazsn6prto62qi9a0gi";
  };

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

        backgroundSize:
          "cover",

        backgroundPosition:
          "center top",
      }}
    >

      <Navbar />

      <link
        rel="stylesheet"
        href="/legacy/landing.css"
      />

      <div className="
        absolute
        inset-0
        bg-black/60
        backdrop-blur-[1px]
      " />

      <div className="
        relative
        z-10
      ">

        {/* QUIZ */}

        <section className="
          max-w-md
          mx-auto
          px-6
          py-16
        ">

          <div className="
            bg-white/10
            backdrop-blur-xl
            border
            border-white/10
            rounded-3xl
            p-8
            shadow-2xl
          ">

            {/* TOP BAR */}

            <div className="
              w-full
              h-2
              bg-white/10
              rounded-full
              overflow-hidden
              mb-8
            ">

              <div
                className="
                  h-full
                  transition-all
                  duration-300
                "

                style={{
                  width:
                    `${progress}%`,

                  background:
                    "linear-gradient(90deg,#d86fa7,#b76bd3)",
                }}
              />

            </div>

            {
              step < steps.length ? (

                <>

                  <h1 className="
                    text-2xl
                    font-semibold
                    leading-relaxed
                    mb-6
                    text-center
                  ">

                    {steps[step].title}

                  </h1>

                  {
                    "description" in
                      steps[step] && (

                      <p className="
                        text-white/80
                        leading-7
                        text-center
                        mb-8
                      ">

                        {
                          steps[step]
                            .description
                        }

                      </p>
                    )
                  }

                  <div className="
                    space-y-4
                  ">

                    {
                      steps[step]
                        .answers.map(
                          (answer) => (

                            <button
                              key={answer}

                              onClick={
                                nextStep
                              }

                              className="
                                w-full
                                py-4
                                px-6
                                rounded-full
                                font-semibold
                                transition-all
                                duration-200
                                hover:scale-[1.02]
                                active:scale-[0.98]
                              "

                              style={{
                                background:
                                  "linear-gradient(135deg,#d86fa7,#b76bd3)",
                              }}
                            >

                              {answer}

                            </button>
                          ),
                        )
                    }

                  </div>

                </>

              ) : (

                <div className="
                  text-center
                ">

                  <h1 className="
                    text-3xl
                    font-bold
                    mb-6
                  ">
                    You’re Eligible
                    to Connect
                  </h1>

                  <p className="
                    text-white/80
                    leading-7
                    mb-8
                  ">

                    Based on your answers,
                    you qualify to join a
                    community of women
                    who are focused on
                    building serious,
                    long-term relationships.

                    <br />
                    <br />

                    Click below to enter
                    and discover your
                    compatible matches.

                  </p>

                  <button
                    onClick={
                      handleFinish
                    }

                    className="
                      w-full
                      py-4
                      rounded-full
                      font-bold
                      text-lg
                      hover:scale-[1.02]
                      transition-all
                    "

                    style={{
                      background:
                        "linear-gradient(135deg,#d86fa7,#b76bd3)",
                    }}
                  >

                    Continue

                  </button>

                </div>
              )
            }

          </div>

        </section>

        {/* FOOTER */}

        <footer className="
          max-w-md
          mx-auto
          px-6
          pb-10
        ">

          <div className="
            bg-white/10
            backdrop-blur-xl
            border
            border-white/10
            rounded-2xl
            p-6
            text-center
          ">

            <div className="
              flex
              justify-center
              gap-6
              mb-4
              text-sm
            ">

              <Link href="/terms">
                Terms of Service
              </Link>

              <Link href="/privacy">
                Privacy Policy
              </Link>

            </div>

            <p className="
              text-sm
              text-white/70
              mb-2
            ">
              Users 18+ only.
            </p>

            <p className="
              text-xs
              text-white/50
            ">
              © 2026 MutualPathways.
              All Rights Reserved.
              Owned and operated by
              True Blue Digital Media LTD
            </p>

          </div>

        </footer>

      </div>

      <Script
        src="/legacy/script.js"
        strategy="afterInteractive"
      />

    </main>
  );
}