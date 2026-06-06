'use client';

import { API_URL }
  from '../../lib/api';


import { useState } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar';

export default function ForgotPasswordPage() {

  const [email, setEmail] =
    useState('');

  const [success, setSuccess] =
    useState(false);

  async function submit() {

    try {

      await axios.post(
        `${API_URL}/auth/forgot-password`,
        {
          email,
        },
      );

      setSuccess(true);

    } catch (error) {

      console.error(error);
    }
  }

  return (

    <main className="
      min-h-screen
      bg-black
      text-white
    ">

      <Navbar />

      <div className="
        max-w-md
        mx-auto
        px-6
        py-20
      ">

        <h1 className="
          text-4xl
          font-bold
          mb-6
        ">
          Forgot Password
        </h1>

        {
          success ? (

            <div className="
              bg-green-500/20
              border
              border-green-500
              rounded-2xl
              p-4
            ">
              Check backend console for reset link.
            </div>

          ) : (

            <>
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
                  bg-zinc-900
                  border
                  border-zinc-700
                  rounded-2xl
                  px-4
                  py-4
                  mb-4
                "
              />

              <button
                onClick={submit}

                className="
                  w-full
                  bg-white
                  text-black
                  py-4
                  rounded-2xl
                  font-bold
                "
              >
                Send Reset Link
              </button>
            </>
          )
        }

      </div>

    </main>
  );
}