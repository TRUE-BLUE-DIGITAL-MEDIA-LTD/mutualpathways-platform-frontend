'use client';

import { API_URL }
  from '../../../lib/api';

import Link from 'next/link';

import {
  useEffect,
  useState,
} from 'react';

import Script from 'next/script';

import Navbar
  from '../../../components/Navbar';

export default function Quiz5Page() {

  const [step, setStep] =
    useState(0);

  const [loading, setLoading] =
    useState(false);

  const [progress, setProgress] =
    useState(0);

  const [slideIndex, setSlideIndex] =
    useState(0);

  const slides = [
    '/images/man_quiz5_slide1.jpeg',
    '/images/man_quiz5_slide2.jpeg',
    '/images/man_quiz5_slide3.jpeg',
  ];

  const questions = [

    {
      title:
        'Shared interests are:',

      answers: [
        'Very important',
        'Nice to have',
        'Not essential',
        'Less important than values',
      ],
    },

    {
      title:
        'If he likes different hobbies, you:',

      answers: [
        'Enjoy learning about them',
        'Don’t mind',
        'Prefer more overlap',
        'Focus more on emotional connection',
      ],
    },

    {
      title:
        'Doing things together makes you feel:',

      answers: [
        'Closer',
        'Happy',
        'Secure',
        'More emotionally connected',
      ],
    },

    {
      title:
        'In a relationship, you prefer:',

      answers: [
        'Many shared activities',
        'Some shared, some separate',
        'Mostly separate interests',
        'A healthy balance',
      ],
    },

    {
      title:
        'What makes you feel most valued in a relationship?',

      answers: [
        'Honest communication',
        'Consistency & effort',
        'Quality time together',
        'Feeling appreciated',
      ],
    },

    {
      title:
        'What bonds you most to a man?',

      answers: [
        'Shared experiences',
        'Shared values',
        'Emotional connection',
        'Physical chemistry',
      ],
    },

    {
      title:
        'What kind of relationship are you hoping to find?',

      answers: [
        'A calm and stable connection',
        'A meaningful long-term relationship',
        'Someone to share life with',
        'Real emotional companionship',
      ],
    },
  ];

  useEffect(() => {

    const interval =
      setInterval(() => {

        setSlideIndex((prev) =>
          (prev + 1) % slides.length,
        );

      }, 3000);

    return () =>
      clearInterval(interval);

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

    const interval =
      setInterval(() => {

        current += 10;

        setProgress(current);

        if (current >= 100) {

          clearInterval(interval);

          setLoading(false);

          setStep(
            questions.length + 1,
          );
        }

      }, 150);
  }

  function enterMemberArea() {

    const incomingParams =
      new URLSearchParams(
        window.location.search,
      );

    const baseUrl =
      new URL(
        'https://linked2day.com/index.php?key=5gofmfa1tfewf5ipk72f',
      );

    incomingParams.forEach(
      (value, key) => {

        baseUrl.searchParams.set(
          key,
          value,
        );
      },
    );

    window.location.href =
      baseUrl.toString();
  }

  const topProgress =
    step <= questions.length
      ? (step / questions.length) * 100
      : 100;

  return (

    <main className="
      min-h-screen
      bg-gradient-to-b
      from-white
      to-pink-50
      text-black
      overflow-hidden
      relative
    ">

      <Navbar />

      <link
        rel="stylesheet"
        href="/legacy/landing.css"
      />

      <div className="
        fixed
        inset-0
        pointer-events-none
        opacity-10
      ">

        {
          Array.from({
            length: 15,
          }).map((_, i) => (

            <div
              key={i}

              className="
                absolute
                text-pink-500
                animate-bounce
              "

              style={{
                left: `${(i * 7) % 100}%`,
                top: `${(i * 13) % 100}%`,
                fontSize: `${14 + (i % 5) * 2}px`,
              }}
            >
              ❤
            </div>
          ))
        }

      </div>

      <div className="
        max-w-md
        mx-auto
        mt-4
        mb-10
        p-4
        bg-white/80
        backdrop-blur-xl
        rounded-3xl
        shadow-2xl
        relative
        z-10
      ">

        <div className="
          w-full
          h-2
          bg-zinc-200
          rounded-full
          overflow-hidden
          mb-5
        ">

          <div
            className="
              h-full
              bg-gradient-to-r
              from-pink-500
              to-violet-500
              transition-all
              duration-300
            "

            style={{
              width:
                `${topProgress}%`,
            }}
          />

        </div>

        {
          step === 0 && (

            <div className="
              text-center
            ">

              <div className="
                relative
                overflow-hidden
                rounded-2xl
                mb-2
                h-[260px]
              ">

                <div
                  className="
                    flex
                    transition-transform
                    duration-500
                    h-full
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

                          alt="Quiz"

                          className="
                              w-full
                              min-w-full
                              h-[260px]
                              object-contain
                              bg-white
                            "
                        />
                      ),
                    )
                  }

                </div>

                <button
                  onClick={() =>
                    setSlideIndex(
                      (
                        slideIndex - 1 +
                        slides.length
                      ) %
                        slides.length,
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
                      (
                        slideIndex + 1
                      ) %
                        slides.length,
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

              <h1 className="
                text-2xl
                font-bold
                leading-5
                mb-4
              ">
                Meet Relationship-Focused Men 💕
              </h1>

              <p className="
                text-zinc-600
                mb-6
                leading-5
              ">
                Discover emotionally mature
                men who value honesty,
                companionship,
                and meaningful long-term
                relationships.
              </p>

              <button
                onClick={nextStep}

                className="
                  w-full
                  py-4
                  rounded-2xl
                  bg-gradient-to-r
                  from-pink-500
                  to-violet-500
                  text-white
                  font-bold
                  text-lg
                "
              >
                DISCOVER YOUR MATCH →
              </button>

              <p className="
                mt-4
                text-xs
                text-zinc-500
              ">
                Thousands of women are
                exploring meaningful
                relationships every day.
              </p>

            </div>
          )
        }

        {
          step > 0 &&
          step <= questions.length &&
          !loading && (

            <div>

              <h2 className="
                text-2xl
                font-bold
                text-center
                mb-8
                leading-tight
              ">
                {
                  questions[
                    step - 1
                  ].title
                }
              </h2>

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
                          bg-white
                          border-2
                          border-zinc-200
                          rounded-2xl
                          py-4
                          px-4
                          text-black
                          font-medium
                          hover:bg-pink-50
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
                Analyzing your
                compatibility profile...
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
                    bg-gradient-to-r
                    from-pink-500
                    to-violet-500
                    transition-all
                  "

                  style={{
                    width:
                      `${progress}%`,
                  }}
                />

              </div>

            </div>
          )
        }

        {
          step ===
            questions.length + 1 && (

            <div className="
              text-center
              py-6
            ">

              <p className="
                text-lg
                leading-8
                mb-8
              ">

                <strong>
                  Your matches are ready 💕
                </strong>

                <br />
                <br />

                Based on your answers,
                you may be compatible
                with emotionally mature
                men who value meaningful
                communication,
                companionship,
                and lasting relationships.

                <br />
                <br />

                Click below to discover
                compatible men who match
                your relationship energy 👇

              </p>

              <button
                onClick={
                  enterMemberArea
                }

                className="
                  w-full
                  py-5
                  rounded-2xl
                  bg-gradient-to-r
                  from-pink-600
                  to-fuchsia-600
                  text-white
                  font-extrabold
                  text-lg
                  shadow-xl
                "
              >
                SEE YOUR MATCH →
              </button>

              <p className="
                mt-6
                text-sm
                text-zinc-500
                leading-6
              ">
                ✔ Private Access
                {' '}•{' '}
                ✔ Verified Profiles
                {' '}•{' '}
                ✔ Easy To Start
              </p>

            </div>
          )
        }

      </div>

      <footer className="
        max-w-md
        mx-auto
        mb-10
        px-6
        py-6
        text-center
        text-sm
        text-zinc-500
        relative
        z-10
      ">

        <div className="
          flex
          justify-center
          gap-6
          mb-4
        ">

          <Link href="/terms">
            Terms of Service
          </Link>

          <Link href="/privacy">
            Privacy Policy
          </Link>

        </div>

        <p className="mb-2">
          Users 18+ only.
        </p>

        <p>
          © 2026 MutualPathways.
          All Rights Reserved.
          Owned and operated by
          True Blue Digital Media LTD
        </p>

      </footer>

      <Script
        src="/legacy/script.js"
        strategy="afterInteractive"
      />

    </main>
  );
}