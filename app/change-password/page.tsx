
  'use client';

import { API_URL }
  from '../../lib/api';


import {
  useState,
} from 'react';

import axios from 'axios';

import Navbar
  from '../../components/Navbar';

export default function ChangePasswordPage() {

  const [
    currentPassword,
    setCurrentPassword,
  ] = useState('');

  const [
    newPassword,
    setNewPassword,
  ] = useState('');

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    success,
    setSuccess,
  ] = useState('');

  const [
    error,
    setError,
  ] = useState('');

  async function handleSubmit(
    e,
  ) {

    e.preventDefault();

    setLoading(true);

    setError('');

    setSuccess('');

    try {

      const token =
        localStorage.getItem(
          'token',
        );

      await axios.post(
        `${API_URL}/auth/change-password`,
        {
          currentPassword,
          newPassword,
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        },
      );

      setSuccess(
        'Password updated successfully.',
      );

      setCurrentPassword('');

      setNewPassword('');

    } catch (error: any) {

      setError(
        error?.response?.data?.message ||
        'Failed to update password',
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
        max-w-xl
        mx-auto
        px-4
        py-16
      ">

        <h1 className="
          text-4xl
          font-bold
          mb-8
        ">
          Change Password
        </h1>

        <form
          onSubmit={
            handleSubmit
          }

          className="
            space-y-5
          "
        >

          <input
            type="password"

            placeholder="Current password"

            value={
              currentPassword
            }

            onChange={(e) =>
              setCurrentPassword(
                e.target.value,
              )
            }

            className="
              w-full
              bg-zinc-900
              border
              border-zinc-800
              rounded-2xl
              px-5
              py-4
              outline-none
            "
          />

          <input
            type="password"

            placeholder="New password"

            value={
              newPassword
            }

            onChange={(e) =>
              setNewPassword(
                e.target.value,
              )
            }

            className="
              w-full
              bg-zinc-900
              border
              border-zinc-800
              rounded-2xl
              px-5
              py-4
              outline-none
            "
          />

          {
            error && (

              <p className="
                text-red-400
              ">
                {error}
              </p>
            )
          }

          {
            success && (

              <p className="
                text-green-400
              ">
                {success}
              </p>
            )
          }

          <button
            type="submit"

            disabled={
              loading
            }

            className="
              w-full
              bg-white
              text-black
              rounded-2xl
              py-4
              font-bold
            "
          >

            {
              loading
                ? 'Updating...'
                : 'Update Password'
            }

          </button>

        </form>

      </section>

    </main>
  );
}