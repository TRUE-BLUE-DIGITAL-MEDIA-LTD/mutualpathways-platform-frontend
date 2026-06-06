'use client';

import { API_URL }
  from '../../lib/api';


import Link from 'next/link';

import axios from 'axios';

import {
  useState,
} from 'react';

import Navbar
  from '../../components/Navbar';

export default function RegisterPage() {

  const [username, setUsername] =
    useState('');

  const [email, setEmail] =
    useState('');

  const [password, setPassword] =
    useState('');

  const [loading, setLoading] =
    useState(false);

  async function register() {

    try {

      setLoading(true);

      const response =
        await axios.post(
          `${API_URL}/auth/register`,
          {
            username,
            email,
            password,
          },
        );

      localStorage.setItem(
        'token',
        response.data.accessToken,
      );

      window.location.href =
        '/discover';

    } catch (error) {

      console.log(error);

      alert(
        'Registration failed',
      );

    } finally {

      setLoading(false);
    }
  }

  return (

    <main className="
      min-h-screen
      bg-black
      text-white
    ">

      <Navbar />

      <section className="
        flex
        items-center
        justify-center
        px-4
        sm:px-6
        py-14
        sm:py-20
      ">

        <div className="
          w-full
          max-w-md
          bg-zinc-900
          border
          border-zinc-800
          rounded-3xl
          p-6
          sm:p-8
          shadow-2xl
        ">

          {/* HEADER */}

          <div className="
            text-center
            mb-8
          ">

            <Link href="/">

              <img
                src="/images/mt_logo.jpeg"

                alt="MutualPathways"

                className="
                  h-14
                  sm:h-16
                  mx-auto
                  mb-6
                  object-contain
                "
              />

            </Link>

            <h1 className="
              text-3xl
              sm:text-4xl
              font-bold
              mb-3
            ">
              Create Account
            </h1>

            <p className="
              text-zinc-400
              text-sm
              sm:text-base
              leading-7
            ">
              Start building meaningful
              connections today.
            </p>

          </div>

          {/* FORM */}

          <div className="
            space-y-4
          ">

            <input
              type="text"

              placeholder="Username"

              value={username}

              onChange={(e) =>
                setUsername(
                  e.target.value,
                )
              }

              className="
                w-full
                bg-zinc-800
                border
                border-zinc-700
                rounded-2xl
                px-4
                py-4
                text-white
                outline-none
                focus:border-white
                transition
                text-sm
                sm:text-base
              "
            />

            <input
              type="email"

              placeholder="Email"

              value={email}

              onChange={(e) =>
                setEmail(
                  e.target.value,
                )
              }

              className="
                w-full
                bg-zinc-800
                border
                border-zinc-700
                rounded-2xl
                px-4
                py-4
                text-white
                outline-none
                focus:border-white
                transition
                text-sm
                sm:text-base
              "
            />

            <input
              type="password"

              placeholder="Password"

              value={password}

              onChange={(e) =>
                setPassword(
                  e.target.value,
                )
              }

              onKeyDown={(e) => {

                if (
                  e.key === 'Enter'
                ) {

                  register();
                }
              }}

              className="
                w-full
                bg-zinc-800
                border
                border-zinc-700
                rounded-2xl
                px-4
                py-4
                text-white
                outline-none
                focus:border-white
                transition
                text-sm
                sm:text-base
              "
            />

            <button
              onClick={register}

              disabled={loading}

              className="
                w-full
                bg-white
                text-black
                rounded-2xl
                py-4
                font-bold
                text-base
                sm:text-lg
                hover:bg-zinc-200
                transition
                disabled:opacity-50
              "
            >
              {
                loading
                  ? 'Loading...'
                  : 'Create Account'
              }
            </button>

          </div>

          {/* FOOTER */}

          <p className="
            mt-8
            text-center
            text-zinc-500
            text-sm
            sm:text-base
          ">

            Already have an account?

            {' '}

            <Link
              href="/login"

              className="
                text-white
                font-semibold
                hover:underline
              "
            >
              Login
            </Link>

          </p>

        </div>

      </section>

    </main>
  );
}