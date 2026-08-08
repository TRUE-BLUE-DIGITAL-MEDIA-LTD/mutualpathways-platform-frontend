"use client";

import { API_URL }
  from '../../../lib/api';

import {
  useEffect,
  useState,
} from "react";

import Link from "next/link";

import Script from "next/script";

import Navbar
  from "../../../components/Navbar";

import * as Tracking from "../js/tracking";

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
      "Do you appreciate a woman who enjoys taking care of her man?",

    answers: [
      "Absolutely",
      "Yes",
      "Depends",
      "Not necessary",
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
      "How do you feel about a woman who openly shows affection?",

    answers: [
      "I value that highly",
      "It feels great",
      "It’s nice but optional",
      "I prefer distance",
    ],
  },

  {
    question:
      "Are you ready for a committed long-term relationship?",

    answers: [
      "Yes, absolutely",
      "Yes, if it's right",
      "Maybe",
      "Not sure",
    ],
  },
];

const slides = [
  "/images/woman_feed_03.jpeg",
  "/images/woman_feed_02.jpeg",
  "/images/woman_feed_01.jpeg",
];

export default function Quiz9Page() {

  const [step, setStep] =
    useState(0);

  const [loading, setLoading] =
    useState(false);

  const [finished, setFinished] =
    useState(false);

  const [slideIndex, setSlideIndex] =
    useState(0);

  const totalSteps =
    questions.length + 1;

  const progress =
    (
      (
        step +
        (finished ? 1 : 0)
      ) / totalSteps
    ) * 100;

  useEffect(() => {


    const interval =
      setInterval(() => {

        setSlideIndex((prev) =>

          prev === slides.length - 1
            ? 0
            : prev + 1,
        );

      }, 3000);

    return () =>
      clearInterval(interval);

  }, []);

  function nextStep() {

    if (
      step < questions.length
    ) {

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
  const incomingParams =
    new URLSearchParams(
      window.location.search,
    );

  const target =
    new URL(
      'https://linked2day.com/index.php?key=moazsn6prto62qi9a0gi',
    );

  incomingParams.forEach(
    (value, key) => {
      target.searchParams.set(
        key,
        value,
      );
    },
  );

  const clientId =
    Tracking.getGAClientId();

  if (clientId) {
    target.searchParams.set(
      'client_id',
      clientId,
    );
  }

  window.location.href =
    target.toString();
}

  return (

    <main className="
      min-h-screen
      bg-gradient-to-b
      from-white
      to-pink-50
      text-[#1c1c1e]
      overflow-x-hidden
    ">

      <Navbar />

      <link
        rel="stylesheet"
        href="/legacy/landing.css"
      />

      {/* FLOATING HEARTS */}

      <div className="
        fixed
        inset-0
        pointer-events-none
        z-0
      ">

        {
          [...Array(15)].map(
            (_, i) => (

              <div
                key={i}

                className="
                  absolute
                  text-pink-500
                  animate-bounce
                "

                style={{
                  left:
                    `${(i * 7) % 100}%`,

                  top:
                    `${(i * 13) % 100}%`,

                  fontSize:
                    `${14 + (i % 5) * 2}px`,
                }}
              >
                ❤
              </div>
            ),
          )
        }

      </div>

      {/* QUIZ */}

      <section className="
        relative
        z-10
        max-w-md
        mx-auto
        mt-8
        mb-6
        px-4
      ">

        <div className="
          bg-white/80
          backdrop-blur-xl
          rounded-[24px]
          shadow-2xl
          p-5
          border
          border-white
        ">

          {/* PROGRESS */}

          <div className="
            w-full
            h-2
            bg-zinc-200
            rounded-full
            overflow-hidden
            mb-4
            leading-6
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
                  "linear-gradient(90deg,#ff4e8a,#7b5cff)",
              }}
            />

          </div>

          <h1 className="
            text-2xl
            font-bold
            text-center
            leading-6
            mb-4
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

                <div className="
                  relative
                  overflow-hidden
                  rounded-2xl
                  mb-4
                  h-[260px]
                  leading-5
                ">

                  <div
                    className="
                      flex
                      transition-transform
                      duration-500
                    "

                    style={{
                      transform:
                        `translateX(-${slideIndex * 100}%)`,
                    }}
                  >

                    {
                      slides.map(
                        (slide) => (

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
                              mb-4
                              leading-4
                            "
                          />
                        ),
                      )
                    }

                  </div>

                  <button
                    onClick={() =>

                      setSlideIndex(

                        slideIndex === 0
                          ? slides.length - 1
                          : slideIndex - 1,
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

                        slideIndex ===
                          slides.length - 1
                          ? 0
                          : slideIndex + 1,
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

                <p className="
                  text-center
                  text-[15px]
                  leading-5
                  mb-6
                  text-zinc-700
                ">

                  Answer a few quick
                  questions to see if
                  you're ready to
                  connect with women
                  who value loyalty,
                  respect, and
                  long-term commitment.

                </p>

                <button
                  onClick={nextStep}

                  className="
                    w-full
                    py-4
                    rounded-2xl
                    text-white
                    font-semibold
                    transition-all
                    hover:scale-[1.02]
                  "

                  style={{
                    background:
                      "linear-gradient(135deg,#ff4e8a,#7b5cff)",
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
                  text-center
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
                text-center
                py-10
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
                        "linear-gradient(90deg,#ff4e8a,#7b5cff)",
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
                text-center
                py-4
              ">

                <p className="
                  text-lg
                  leading-8
                  mb-8
                ">

                  <strong>

                    Congratulations!
                    You qualify to
                    access a platform
                    where women are
                    focused on building
                    strong and meaningful
                    relationships.

                    <br />
                    <br />

                    Enter now and
                    discover women who
                    value respect
                    and care.

                  </strong>

                  <br />
                  <br />

                  Click below and
                  discover your most
                  compatible match 👇

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
                    font-bold
                    text-white
                    shadow-xl
                    transition-all
                    hover:scale-[1.02]
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

      
      <Script
        src="/legacy/script.js"
        strategy="afterInteractive"
      />

    </main>
  );
}