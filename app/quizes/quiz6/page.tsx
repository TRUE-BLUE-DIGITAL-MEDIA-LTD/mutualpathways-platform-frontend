'use client';


import { API_URL }
  from '../../../lib/api';

import Link from 'next/link';

import { useState } from "react";

import Script from 'next/script';

import Navbar
  from '../../../components/NavbarComm';

import * as Tracking from "../js/tracking";

export default function Quiz6Page() {

  const [step, setStep] =
    useState(1);

  const totalSteps = 8;

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
        'Feel distant',
        'Prefer more overlap',
      ],
    },

    {
      title:
        'Doing things together makes you feel:',

      answers: [
        'Closer',
        'Happy',
        'Secure',
        'Neutral',
      ],
    },

    {
      title:
        'In a relationship, you prefer:',

      answers: [
        'Many shared activities',
        'Some shared, some separate',
        'Mostly separate interests',
        'It depends',
      ],
    },

    {
      title:
        'If you don’t share passions, you:',

      answers: [
        'Focus on connection',
        'Try to create new ones',
        'Worry about compatibility',
        'Accept it easily',
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
        'Ideally, your partner feels like:',

      answers: [
        'My best friend',
        'My teammate',
        'My safe place',
        'My lover',
      ],
    },
  ];

  const progress =
    ((step - 1) / totalSteps) * 100;

  function nextStep() {

    setStep((prev) => prev + 1);
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

  const clientId =
    Tracking.getGAClientId();

  if (clientId) {
    baseUrl.searchParams.set(
      'client_id',
      clientId,
    );
  }

  window.location.href =
    baseUrl.toString();
}


  return (

    <main className="
      min-h-screen
      relative
      overflow-hidden
      text-white
    ">

      <Navbar />

      <link
        rel="stylesheet"
        href="/legacy/landing.css"
      />

      {/* BACKGROUND */}

      <div
        className="
          fixed
          inset-0
          -z-20
          bg-cover
          bg-center
          scale-105
        "

        style={{
          backgroundImage:
            "url('/images/men_back02.jpeg')",
        }}
      />

      {/* OVERLAY */}

      <div className="
        fixed
        inset-0
        -z-10
        bg-gradient-to-b
        from-[rgba(45,15,35,0.55)]
        to-[rgba(25,10,25,0.78)]
      " />

      {/* QUIZ CARD */}

      <section className="
        relative
        z-10
        w-[90%]
        max-w-md
        mx-auto
        mt-16
        mb-8
        p-8
        rounded-[28px]
        bg-white/10
        backdrop-blur-2xl
        border
        border-white/15
        shadow-2xl
        text-center
      ">

        {/* TOP PROGRESS */}

        <div className="
          w-full
          h-2
          bg-white/15
          rounded-full
          overflow-hidden
          mb-8
        ">

          <div
            className="
              h-full
              bg-gradient-to-r
              from-pink-400
              to-violet-400
              transition-all
              duration-300
            "

            style={{
              width:
                `${progress}%`,
            }}
          />

        </div>

        {/* INTRO */}

        {
          step === 1 && (

            <div>

              <h1 className="
                text-2xl
                font-semibold
                leading-8
                mb-4
              ">
                Discover What Matters
                in Your Next
                Long-Term Relationship 💕
              </h1>

              <h2 className="
                text-1xl
                leading-5
                font-medium
                mb-2
              ">
                Before we can show you
                the website where
                connections grow through
                shared interests and values
              </h2>

              <p className="
                text-1xl
                leading-5
                mb-6
              ">
                Help us find men who
                align with your values
                and long-term relationship
                goals by taking this
                short quiz.
              </p>

              <button
                onClick={nextStep}

                className="
                  w-full
                  py-4
                  rounded-full
                  bg-gradient-to-r
                  from-pink-400
                  to-violet-500
                  font-semibold
                  text-white
                  shadow-xl
                  hover:scale-[1.02]
                  transition
                "
              >
                Start
              </button>

            </div>
          )
        }

        {/* QUESTIONS */}

        {
          step >= 2 &&
          step <= 8 && (

            <div>

              <h2 className="
                text-2xl
                font-semibold
                leading-relaxed
                mb-8
              ">
                {
                  questions[
                    step - 2
                  ].title
                }
              </h2>

              <div className="
                flex
                flex-col
                gap-4
              ">

                {
                  questions[
                    step - 2
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
                          rounded-full
                          bg-gradient-to-r
                          from-pink-400
                          to-violet-500
                          font-semibold
                          text-white
                          shadow-lg
                          hover:scale-[1.02]
                          transition
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

        {/* FINAL */}

        {
          step === 9 && (

            <div>

              <h2 className="
                text-3xl
                font-semibold
                mb-6
              ">
                You’re Eligible
                to Connect 💕
              </h2>

              <p className="
                leading-8
                text-white/90
                mb-8
              ">
                Congratulations!

                <br />
                <br />

                You now qualify to join
                a community of men
                focused on meaningful,
                long-term relationships.

                <br />
                <br />

                Click below to discover
                your compatible matches.
              </p>

              <button
                onClick={
                  enterMemberArea
                }

                className="
                  w-full
                  py-4
                  rounded-full
                  bg-gradient-to-r
                  from-pink-400
                  to-violet-500
                  font-semibold
                  text-white
                  shadow-xl
                  hover:scale-[1.02]
                  transition
                "
              >
                Continue
              </button>

            </div>
          )
        }

      </section>

      {/* FOOTER */}

      

      <Script
        src="/legacy/script.js"
        strategy="afterInteractive"
      />

    </main>
  );
}