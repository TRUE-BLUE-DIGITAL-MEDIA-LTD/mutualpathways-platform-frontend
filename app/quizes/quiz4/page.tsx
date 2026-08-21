'use client';

import { API_URL }
  from '../../../lib/api';


import Link from 'next/link';

import { useState } from "react";

import Script from 'next/script';

import Navbar
  from '../../../components/NavbarComm';

import * as Tracking from "../js/tracking";

export default function Quiz4Page() {

  const [step, setStep] =
    useState(0);

  const [loading, setLoading] =
    useState(false);

  const [progress, setProgress] =
    useState(0);

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

  const topProgress =
    step <= questions.length
      ? (step / questions.length) * 100
      : 100;


  return (

    <main className="
      min-h-screen
      bg-[#f7f7f7]
      text-black
    ">

      <Navbar />

      <link
        rel="stylesheet"
        href="/legacy/landing.css"
      />

      <div className="
        max-w-md
        mx-auto
        px-5
        py-10
      ">

        <div className="
          w-full
          h-2
          bg-zinc-200
          rounded-full
          overflow-hidden
          mb-6
        ">

          <div
            className="
              h-full
              bg-pink-500
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

              <img
                src="/images/man_quiz4.jpeg"
                alt="Relationship Preview"

                className="
                  w-3/4
                  mx-auto
                  rounded-2xl
                  mb-4
                  object-cover
                  object-top
                "
              />

              <h1 className="
                text-2xl
                font-bold
                mb-4
                leading-5
              ">
                Meet Relationship-Focused Men 💕
              </h1>

              <p className="
                text-1xl
                text-zinc-600
                mb-4
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
                  bg-pink-500
                  text-white
                  font-bold
                  text-lg
                  shadow-lg
                "
              >
                DISCOVER YOUR MATCH →
              </button>

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
                mb-8
                text-center
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
                          bg-pink-200
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
                    bg-pink-500
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
                  bg-pink-600
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

      

      <Script
        src="/legacy/script.js"
        strategy="afterInteractive"
      />

    </main>
  );
}