'use client';

import {
useEffect,
useState,
} from 'react';

import Script from 'next/script';

import Navbar
from '../../../components/Navbar';

export default function Quiz5v3Page() {

const [slideIndex, setSlideIndex] =
useState(0);

const slides = [
'/images/man_quiz5_slide1.jpeg',
'/images/man_quiz5_slide2.jpeg',
'/images/man_quiz5_slide3.jpeg',
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

  {/* FLOATING HEARTS */}

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

    {/* CAROUSEL */}

    <div className="
      relative
      overflow-hidden
      rounded-2xl
      mb-4
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

                alt="Relationship Match"

                className="
                  w-full
                  min-w-full
                  h-[260px]
                  object-cover
                  object-top
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
              slideIndex -
              1 +
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
          bg-white/90
          font-bold
          shadow
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
          bg-white/90
          font-bold
          shadow
        "
      >
        ›
      </button>

    </div>    

    <h1 className="
      text-2xl
      font-bold
      leading-tight
      mb-2
      text-center
    ">
      Meet Men Who Know
      What They Want ❤️
    </h1>

    <p className="
      text-zinc-500
      text-center
      leading-5
      mb-4
      text-center
    ">
      Discover men who value
      genuine conversation,
      real chemistry,
      and meaningful connections.
    </p>
    
    <div className="
      bg-white
      border
      border-zinc-200
      rounded-2xl
      p-3
      mb-5
      text-center
    ">

      <div className="
        text-pink-500
        font-bold
        mb-2
        text-center
      ">
        ❤️ Ready To Explore?
      </div>

      <p className="
        text-sm
        text-zinc-500
        leading-5
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
        rounded-2xl
        bg-gradient-to-r
        from-pink-500
        to-violet-500
        text-white
        font-bold
        text-lg
        shadow-xl
      "
    >
      VIEW PROFILES →
    </button>

    <p className="
      mt-5
      text-xs
      text-zinc-500
      text-center
    ">
      ✔ Secure
      {' '}•{' '}
      ✔ Private
      {' '}•{' '}
      ✔ Verified Profiles
    </p>

  </div>

  <Script
    src="/legacy/script.js"
    strategy="afterInteractive"
  />

</main>

);
}
