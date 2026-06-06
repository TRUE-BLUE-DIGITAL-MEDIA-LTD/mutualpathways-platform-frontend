'use client';

import { API_URL }
  from '../lib/api';

import Link from 'next/link';

import {
  useEffect,
  useState,
} from 'react';

export default function Navbar() {

  const [loggedIn, setLoggedIn] =
    useState(false);

  useEffect(() => {

    const token =
      localStorage.getItem(
        'token',
      );

    setLoggedIn(!!token);

  }, []);

  function logout() {

    localStorage.removeItem(
      'token',
    );

    window.location.href = '/';
  }

  return (

    <header className="
      border-b
      border-zinc-800
      bg-black/95
      backdrop-blur
      sticky
      top-0
      z-50
    ">

      <div className="
        max-w-7xl
        mx-auto
        px-4
        sm:px-6
        py-3
        flex
        flex-col
        sm:flex-row
        sm:items-center
        sm:justify-between
        gap-3
      ">

        {/* LOGO */}

        <div className="
          flex
          items-center
          justify-center
          sm:justify-start
        ">

          <Link href="/">

            <img
              src="/images/logo2.png"
              alt="MutualPathways"

                className="
                 h-20
                 md:h-24
                 w-auto
                 object-contain
                "
            />

          </Link>

        </div>

        {/* NAVIGATION */}

        <nav className="
          flex
          items-center
          justify-center
          sm:justify-end
          gap-3
          sm:gap-5
          text-zinc-300
          text-sm
          sm:text-base
          flex-wrap
        ">

          {/* PUBLIC */}

          <Link
            href="/"

            className="
              hover:text-white
              transition
            "
          >
            Home
          </Link>

          <Link
            href="/articles"

            className="
              hover:text-white
              transition
            "
          >
            Articles
          </Link>

          {/* MEMBER AREA */}

          {
            loggedIn && (
              <>

                <Link
                  href="/discover"

                  className="
                    hover:text-white
                    transition
                  "
                >
                  Discover
                </Link>

                <Link
                  href="/matches"

                  className="
                    hover:text-white
                    transition
                  "
                >
                  Matches
                </Link>

                <Link
                  href="/chat"

                  className="
                    hover:text-white
                    transition
                  "
                >
                  Chat
                </Link>

                <Link
                  href="/profile"

                  className="
                    hover:text-white
                    transition
                  "
                >
                  Profile
                </Link>

                <button
                  onClick={logout}

                  className="
                    text-red-400
                    hover:text-red-300
                    transition
                  "
                >
                  Logout
                </button>

              </>
            )
          }

          {/* GUEST */}

          {
            !loggedIn && (
              <>

                <Link
                  href="/login"

                  className="
                    hover:text-white
                    transition
                  "
                >
                  Login
                </Link>

                <Link
                  href="/register"

                  className="
                    bg-white
                    text-black
                    px-4
                    py-2
                    rounded-xl
                    font-semibold
                    hover:bg-zinc-200
                    transition
                  "
                >
                  Register
                </Link>

              </>
            )
          }

        </nav>

      </div>

    </header>
  );
}