'use client';

import { API_URL }
  from '../../lib/api';


import {
  useEffect,
  useState,
} from 'react';

import axios from 'axios';

import Navbar
  from '../../components/Navbar';

export default function MatchesPage() {

  const [matches, setMatches] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  async function fetchMatches() {

    try {

      const token =
        localStorage.getItem(
          'token',
        );

      const response =
        await axios.get(
          `${API_URL}/likes/matches`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          },
        );

      setMatches(
        response.data || [],
      );

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  }

  function getImageUrl(
    imageUrl?: string,
  ) {

    if (!imageUrl) {

      return 'https://placehold.co/600x800/18181b/ffffff?text=Profile';
    }

    return imageUrl.startsWith(
      'http',
    )
      ? imageUrl
      : `${API_URL}${imageUrl}`;
  }

  useEffect(() => {

    fetchMatches();

  }, []);

  return (

    <main className="
      min-h-screen
      bg-black
      text-white
    ">

      <Navbar />

      <div className="
        max-w-6xl
        mx-auto
        p-4
        sm:p-6
      ">

        {/* HEADER */}

        <div className="
          mb-8
          sm:mb-10
        ">

          <h1 className="
            text-3xl
            sm:text-5xl
            font-bold
            mb-3
          ">
            Your Matches
          </h1>

          <p className="
            text-zinc-400
            text-base
            sm:text-lg
          ">
            People who connected with you.
          </p>

        </div>

        {
          loading ? (

            <div className="
              text-center
              py-20
              text-zinc-500
            ">
              Loading matches...
            </div>

          ) : matches.length === 0 ? (

            <div className="
              text-center
              py-20
              text-zinc-500
            ">
              No matches yet.
            </div>

          ) : (

            <div className="
              grid
              grid-cols-1
              sm:grid-cols-2
              xl:grid-cols-3
              gap-5
              sm:gap-6
            ">

              {
                matches.map((match, index) => (

                  <div
                    key={
                      match.id ||
                      match.matchedUser?.id ||
                      index
                    }

                    className="
                      bg-zinc-900
                      rounded-3xl
                      overflow-hidden
                      border
                      border-zinc-800
                      shadow-xl
                      hover:scale-[1.02]
                      transition
                    "
                  >

                    <div className="
                      h-[340px]
                      sm:h-[420px]
                      overflow-hidden
                      bg-zinc-800
                    ">

                      <img
                        src={getImageUrl(
                          match.matchedUser
                            ?.imageUrl,
                        )}

                        alt="Match"

                        onError={(e) => {

                          e.currentTarget.src =
                            'https://placehold.co/600x800/18181b/ffffff?text=Profile';
                        }}

                        className="
                          w-full
                          h-full
                          object-cover
                          object-top
                        "
                      />

                    </div>

                    <div className="
                      p-4
                      sm:p-6
                    ">

                      <h2 className="
                        text-xl
                        sm:text-2xl
                        font-bold
                        mb-3
                        break-words
                      ">
                        {
                          match.matchedUser
                            ?.displayName ||
                          'User'
                        }
                      </h2>

                      <p className="
                        text-zinc-400
                        leading-7
                        mb-6
                        min-h-[80px]
                        text-sm
                        sm:text-base
                      ">
                        {
                          match.matchedUser
                            ?.bio ||
                          'No bio available yet.'
                        }
                      </p>

                      <a
                        href="/chat"

                        className="
                          block
                          w-full
                          text-center
                          bg-white
                          text-black
                          py-3
                          sm:py-4
                          rounded-2xl
                          font-bold
                          text-base
                          sm:text-lg
                          hover:bg-zinc-200
                          transition
                        "
                      >
                        Open Chat
                      </a>

                    </div>

                  </div>
                ))
              }

            </div>
          )
        }

      </div>

    </main>
  );
}