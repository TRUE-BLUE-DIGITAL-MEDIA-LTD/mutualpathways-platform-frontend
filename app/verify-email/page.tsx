'use client';

import { API_URL }
  from '../../lib/api';


import {
  Suspense,
  useEffect,
  useState,
} from 'react';

import {
  useSearchParams,
} from 'next/navigation';

import axios from 'axios';

import Navbar
  from '../../components/Navbar';

export default function VerifyEmailPage() {

  return (

    <Suspense>

      <VerifyEmail />

    </Suspense>
  );
}

function VerifyEmail() {

  const params =
    useSearchParams();

  const token =
    params.get('token');

  const [loading, setLoading] =
    useState(true);

  const [success, setSuccess] =
    useState(false);

  const [error, setError] =
    useState('');

  useEffect(() => {

    async function verify() {

      if (!token) {

        setLoading(false);

        setError(
          'Missing verification token',
        );

        return;
      }

      try {

        await axios.get(
          `${API_URL}/auth/verify-email/${token}`,
        );

        setSuccess(true);

      } catch {

        setError(
          'Invalid or expired verification link',
        );

      } finally {

        setLoading(false);
      }
    }

    verify();

  }, [token]);

  return (

    <main className="
      min-h-screen
      bg-black
      text-white
    ">

      <Navbar />

      <div className="
        max-w-xl
        mx-auto
        px-6
        py-20
        text-center
      ">

        <h1 className="
          text-4xl
          font-bold
          mb-8
        ">
          Email Verification
        </h1>

        {
          loading && (

            <div className="
              bg-zinc-900
              border
              border-zinc-800
              rounded-3xl
              p-8
            ">
              Verifying email...
            </div>
          )
        }

        {
          !loading &&
          success && (

            <div className="
              bg-green-500/20
              border
              border-green-500
              rounded-3xl
              p-8
            ">

              <div className="
                text-5xl
                mb-4
              ">
                ✅
              </div>

              <h2 className="
                text-2xl
                font-bold
                mb-2
              ">
                Email Verified
              </h2>

              <p className="
                text-zinc-300
              ">
                Your account has been verified successfully.
              </p>

            </div>
          )
        }

        {
          !loading &&
          !success && (

            <div className="
              bg-red-500/20
              border
              border-red-500
              rounded-3xl
              p-8
            ">

              <div className="
                text-5xl
                mb-4
              ">
                ❌
              </div>

              <h2 className="
                text-2xl
                font-bold
                mb-2
              ">
                Verification Failed
              </h2>

              <p className="
                text-zinc-300
              ">
                {error}
              </p>

            </div>
          )
        }

      </div>

    </main>
  );
}