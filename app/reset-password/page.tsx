'use client';

import { API_URL }
  from '../../lib/api';


import {
  useSearchParams,
} from 'next/navigation';

import {
  Suspense,
  useState,
} from 'react';

import axios from 'axios';

import Navbar
  from '../../components/Navbar';

export default function ResetPasswordPage() {

  return (

    <Suspense>

      <ResetPasswordForm />

    </Suspense>
  );
}

function ResetPasswordForm() {

  const params =
    useSearchParams();

  const token =
    params.get('token');

  const [password, setPassword] =
    useState('');

  const [success, setSuccess] =
    useState(false);

  async function submit() {

    try {

      await axios.post(
        `${API_URL}/auth/reset-password`,
        {
          token,
          password,
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
          Reset Password
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
              Password updated successfully.
            </div>

          ) : (

            <>
              <input
                type="password"
                placeholder="New Password"

                value={password}

                onChange={(e) =>
                  setPassword(
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
                Reset Password
              </button>
            </>
          )
        }

      </div>

    </main>
  );
}