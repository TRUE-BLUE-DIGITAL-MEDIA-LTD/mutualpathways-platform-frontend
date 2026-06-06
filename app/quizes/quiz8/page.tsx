"use client";

import { API_URL }
  from '../../../lib/api';

import { useState } from "react";
import Link from "next/link";
import Script from "next/script";

import Navbar
  from "../../../components/Navbar";

const questions = [
  {
    question:
      "How important is it for you to feel respected by your partner?",
    answers: [
      "Extremely important",
      "Very important",
      "Somewhat important",
      "Not a priority",
    ],
  },
  {
    question:
      "Do you value a woman who enjoys taking care of her man?",
    answers: [
      "Absolutely",
      "Yes",
      "Depends on the situation",
      "Not necessarily",
    ],
  },
  {
    question:
      "In a relationship, you want to feel:",
    answers: [
      "Appreciated",
      "Supported",
      "Admired",
      "All of the above",
    ],
  },
  {
    question:
      "How do you feel about a woman who openly expresses affection?",
    answers: [
      "I value that highly",
      "It feels good",
      "It's nice but not essential",
      "I prefer independence",
    ],
  },
  {
    question:
      "Are you ready for a committed, long-term relationship?",
    answers: [
      "Yes, absolutely",
      "Yes, if it's right",
      "Maybe",
      "Not sure",
    ],
  },
];

export default function Quiz8Page() {

  const [step, setStep] =
    useState(0);

  const [loading, setLoading] =
    useState(false);

  const [finished, setFinished] =
    useState(false);

  const totalSteps =
    questions.length + 1;

  const progress =
    (
      (
        step +
        (finished ? 1 : 0)
      ) / totalSteps
    ) * 100;

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

    window.location.href =
      "https://linked2day.com/index.php?key=moazsn6prto62qi9a0gi";
  };

  return (

    <main className="
      min-h-screen
      bg-[#f7f7f7]
      text-[#111]
    ">

      <Navbar />

      <link
        rel="stylesheet"
        href="/legacy/landing.css"
      />

      {/* QUIZ */}

      <section className="
        max-w-md
        mx-auto
        px-5
        py-10
      ">

        {/* TOP PROGRESS */}

        <div className="
          w-full
          h-2
          bg-zinc-200
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
                "linear-gradient(90deg,#ff4e8a,#ff2e63)",
            }}
          />

        </div>

        <div className="
          text-center
        ">

          <h1 className="
            text-3xl
            font-bold
            mb-6
          ">
            Meet Women Ready
            for a Real Connection
          </h1>

          {/* INTRO */}

          {
            step === 0 &&
            !loading &&
            !finished && (

              <div>

                <img
                  src="/images/woman_feed_02_coll.jpeg"
                  alt="Relationship Preview"

                  className="
                    w-3/4
                    mx-auto
                    rounded-2xl
                    mb-6
                  "
                />

                <p className="
                  text-lg
                  mb-8
                  leading-7
                  text-zinc-700
                ">

                  Answer a few questions
                  to discover what kind
                  of man matches your
                  energy 💕

                </p>

                <button
                  onClick={nextStep}

                  className="
                    w-full
                    py-4
                    rounded-2xl
                    font-bold
                    text-white
                    shadow-lg
                    transition-all
                    hover:scale-[1.02]
                    active:scale-[0.98]
                  "

                  style={{
                    background:
                      "linear-gradient(135deg,#ff4e8a,#ff2e63)",
                  }}
                >

                  Start

                </button>

              </div>
            )
          }

          {/* QUESTIONS */}

          {
            step > 0 &&
            step <= questions.length &&
            !loading &&
            !finished && (

              <div>

                <p className="
                  text-xl
                  font-semibold
                  leading-8
                  mb-8
                ">

                  {
                    questions[
                      step - 1
                    ].question
                  }

                </p>

                <div className="
                  space-y-4
                ">

                  {
                    questions[
                      step - 1
                    ].answers.map(
                      (answer) => (

                        <button
                          key={answer}

                          onClick={
                            nextStep
                          }

                          className="
                            w-full
                            py-4
                            px-5
                            rounded-2xl
                            border-2
                            border-zinc-200
                            bg-white
                            font-medium
                            transition-all
                            hover:bg-pink-50
                            hover:border-pink-200
                            active:scale-[0.98]
                          "
                        >

                          {answer}

                        </button>
                      ),
                    )
                  }

                </div>

              </div>
            )
          }

          {/* LOADING */}

          {
            loading && (

              <div className="
                mt-10
              ">

                <p className="
                  text-lg
                  mb-6
                ">

                  Checking compatibility
                  with attentive
                  women...

                </p>

                <div className="
                  w-full
                  h-2
                  bg-zinc-200
                  rounded-full
                  overflow-hidden
                ">

                  <div
                    className="
                      h-full
                      animate-pulse
                    "

                    style={{
                      width: "100%",

                      background:
                        "linear-gradient(90deg,#ff4e8a,#ff2e63)",
                    }}
                  />

                </div>

              </div>
            )
          }

          {/* FINAL */}

          {
            finished && (

              <div className="
                mt-10
              ">

                <p className="
                  text-lg
                  leading-8
                  font-medium
                  mb-8
                ">

                  Congratulations!
                  You’re eligible
                  to access a platform
                  where women are ready
                  to build strong,
                  meaningful relationships.

                  <br />
                  <br />

                  Enter now and discover
                  women who appreciate
                  loyalty, respect,
                  and commitment.

                  <br />
                  <br />

                  Click below to meet
                  your most compatible
                  one 👇

                </p>

                <button
                  onClick={
                    enterMemberArea
                  }

                  className="
                    w-full
                    py-5
                    rounded-2xl
                    text-lg
                    font-extrabold
                    text-white
                    shadow-xl
                    transition-all
                    hover:scale-[1.02]
                    active:scale-[0.98]
                  "

                  style={{
                    background:
                      "linear-gradient(135deg,#ff2e63,#ff006e)",
                  }}
                >

                  SEE YOUR MATCH →

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
        px-5
        pb-10
      ">

        <div
          className="
            rounded-2xl
            border-2
            border-zinc-200
            bg-white/70
            backdrop-blur
            p-6
            text-center
          "
        >

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
            text-zinc-600
            mb-2
          ">
            Users 18+ only.
          </p>

          <p className="
            text-xs
            text-zinc-500
          ">
            © 2026 MutualPathways.
            All Rights Reserved.
            Owned and operated by
            True Blue Digital Media LTD
          </p>

        </div>

      </footer>

      <Script
        src="/legacy/script.js"
        strategy="afterInteractive"
      />

    </main>
  );
}