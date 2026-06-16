'use client';

import Link from 'next/link';
import { useState } from 'react';
import Script from 'next/script';
import Navbar from '../../../components/Navbar';

export default function Quiz10Page() {

  const [step, setStep] = useState(1);

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

        <h1 className="
          text-3xl
          font-bold
          leading-tight
          mb-5
        ">
          Meet Men Who Know
          What They Want ❤️
        </h1>

        <p className="
          text-white/90
          leading-7
          mb-6
        ">
          Discover men seeking
          companionship, chemistry,
          conversation, and something
          more meaningful than endless
          swiping.
        </p>

        <div className="
          bg-white/10
          border
          border-white/15
          rounded-2xl
          p-5
          mb-8
        ">

          <h2 className="
            font-semibold
            mb-2
          ">
            ❤️ Ready To Explore?
          </h2>

          <p className="
            text-white/90
            leading-6
          ">
            Browse profiles,
            discover shared interests,
            and find meaningful
            connections at your own pace.
          </p>

        </div>

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
          VIEW PROFILES →
        </button>

      </section>

      <Script
        src="/legacy/script.js"
        strategy="afterInteractive"
      />

    </main>
  );
}