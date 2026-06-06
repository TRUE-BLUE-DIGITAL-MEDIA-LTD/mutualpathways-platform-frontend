'use client';

import { API_URL }
  from '../../lib/api';


import Link from 'next/link';

import {
  useEffect,
  useState,
} from 'react';

import axios from 'axios';

import Navbar
  from '../../components/Navbar';

type Profile = {

  id: string;

  userId?: string;

  displayName?: string;

  age?: number;

  bio?: string;

  imageUrl?: string;

  gender?: string;

  country?: string;

  region?: string;

  city?: string;

  occupation?: string;

  education?: string;

  relationshipGoals?: string;

  interests?: string[];

  languages?: string[];
};

export default function DiscoverPage() {

  const [profiles, setProfiles] =
    useState<Profile[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    async function loadProfiles() {

      try {

        const token =
          localStorage.getItem(
            'token',
          );

        const response =
          await axios.get(
            `${API_URL}/profile/discover`,
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            },
          );

        setProfiles(
          response.data,
        );

      } catch (error) {

        console.error(
          'Failed to load profiles',
          error,
        );

      } finally {

        setLoading(false);
      }
    }

    loadProfiles();

  }, []);

  async function likeUser(
    userId: string,
  ) {

    try {

      const token =
        localStorage.getItem(
          'token',
        );

      const response =
        await axios.post(
          `${API_URL}/likes/${userId}`,
          {},
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          },
        );

      if (
        response.data?.match
      ) {

        alert(
          'It’s a match! 💕',
        );
      }

      setProfiles((prev) =>
        prev.filter(
          (p) => p.userId !== userId,
        ),
      );

    } catch (error) {

      console.error(
        'Like failed',
        error,
      );
    }
  }

  function skipUser(
    userId?: string,
  ) {

    setProfiles((prev) =>
      prev.filter(
        (p) => p.userId !== userId,
      ),
    );
  }

  function getImageUrl(
    imageUrl?: string,
  ) {

    if (!imageUrl) {

      return 'https://placehold.co/600x900/18181b/ffffff?text=Profile';
    }

    return imageUrl.startsWith(
      'http',
    )
      ? imageUrl
      : `${API_URL}${imageUrl}`;
  }

  return (

    <main className="
      min-h-screen
      bg-black
      text-white
    ">

      <div className="
        relative
        z-50
      ">
        <Navbar />
      </div>

      <section className="
        max-w-7xl
        mx-auto
        px-4
        sm:px-6
        py-6
        sm:py-8
      ">

        {/* HEADER */}

        <div className="
          flex
          flex-col
          lg:flex-row
          lg:items-center
          lg:justify-between
          gap-6
          mb-10
        ">

          <div>

            <h1 className="
              text-4xl
              sm:text-5xl
              font-bold
              mb-3
            ">
              Discover People
            </h1>

            <p className="
              text-zinc-400
              text-base
              sm:text-lg
              max-w-2xl
            ">
              Explore meaningful connections,
              shared interests, and compatible personalities.
            </p>

          </div>

          <div className="
            flex
            gap-3
            w-full
            sm:w-auto
          ">

            <Link
              href="/matches"

              className="
                flex-1
                sm:flex-none
                text-center
                bg-white
                text-black
                px-5
                py-3
                rounded-2xl
                font-bold
              "
            >
              Matches
            </Link>

            <Link
              href="/chat"

              className="
                flex-1
                sm:flex-none
                text-center
                border
                border-zinc-700
                px-5
                py-3
                rounded-2xl
                font-bold
              "
            >
              Chat
            </Link>

          </div>

        </div>

        {/* LOADING */}

        {
          loading ? (

            <div className="
              text-center
              py-24
              text-zinc-400
              text-lg
            ">
              Loading profiles...
            </div>

          ) : profiles.length === 0 ? (

            <div className="
              text-center
              py-24
            ">

              <h2 className="
                text-4xl
                font-bold
                mb-4
              ">
                No More Profiles
              </h2>

              <p className="
                text-zinc-500
                mb-8
              ">
                Check back later for new people.
              </p>

              <Link
                href="/matches"

                className="
                  inline-block
                  bg-white
                  text-black
                  px-6
                  py-4
                  rounded-2xl
                  font-bold
                "
              >
                View Matches
              </Link>

            </div>

          ) : (

            <div className="
              grid
              grid-cols-1
              sm:grid-cols-2
              xl:grid-cols-3
              gap-6
            ">

              {
                profiles.map(
                  (profile) => (

                    <div
                      key={profile.id}

                      className="
                        bg-zinc-900
                        rounded-3xl
                        overflow-hidden
                        border
                        border-zinc-800
                        shadow-2xl
                        hover:scale-[1.02]
                        transition
                      "
                    >

                      {/* IMAGE */}

                      <div className="
                        relative
                        h-[420px]
                        sm:h-[520px]
                        overflow-hidden
                        bg-zinc-800
                      ">

                        <img
                          src={getImageUrl(
                            profile.imageUrl,
                          )}

                          alt={
                            profile.displayName ||
                            'Profile'
                          }

                          onError={(e) => {

                            e.currentTarget.src =
                              'https://placehold.co/600x900/18181b/ffffff?text=Profile';
                          }}

                          className="
                            w-full
                            h-full
                            object-cover
                            object-top
                          "
                        />

                        <div className="
                          absolute
                          inset-0
                          bg-gradient-to-t
                          from-black/90
                          via-black/20
                          to-transparent
                        " />

                        <div className="
                          absolute
                          bottom-0
                          left-0
                          right-0
                          p-6
                        ">

                          <div className="
                            flex
                            items-center
                            gap-3
                            mb-2
                          ">

                            <h2 className="
                              text-3xl
                              font-bold
                            ">
                              {
                                profile.displayName ||
                                'User'
                              }
                            </h2>

                            {
                              profile.age && (

                                <span className="
                                  text-zinc-300
                                  text-xl
                                ">
                                  {profile.age}
                                </span>
                              )
                            }

                          </div>

                          {
                            profile.city && (

                              <p className="
                                text-zinc-300
                                text-sm
                              ">
                                📍 {
                                  [
                                    profile.city,
                                    profile.region,
                                    profile.country,
                                  ]
                                    .filter(Boolean)
                                    .join(', ')
                                }
                              </p>
                            )
                          }

                        </div>

                      </div>

                      {/* CONTENT */}

                      <div className="
                        p-5
                      ">

                        {/* GOALS */}

                        {
                          profile.relationshipGoals && (

                            <div className="
                              inline-flex
                              items-center
                              rounded-full
                              bg-pink-500/20
                              text-pink-300
                              px-4
                              py-2
                              text-sm
                              font-semibold
                              mb-4
                            ">
                              💕 {
                                profile.relationshipGoals
                              }
                            </div>
                          )
                        }

                        {/* BIO */}

                        <p className="
                          text-zinc-300
                          leading-7
                          mb-5
                        ">
                          {
                            profile.bio ||
                            'No bio available yet.'
                          }
                        </p>

                        {/* META */}

                        <div className="
                          grid
                          gap-3
                          mb-5
                        ">

                          {
                            profile.occupation && (

                              <div className="
                                flex
                                items-center
                                gap-3
                                text-zinc-300
                              ">
                                <span>💼</span>

                                <span>
                                  {
                                    profile.occupation
                                  }
                                </span>
                              </div>
                            )
                          }

                          {
                            profile.education && (

                              <div className="
                                flex
                                items-center
                                gap-3
                                text-zinc-300
                              ">
                                <span>🎓</span>

                                <span>
                                  {
                                    profile.education
                                  }
                                </span>
                              </div>
                            )
                          }

                          {
                            profile.languages &&
                            profile.languages.length > 0 && (

                              <div className="
                                flex
                                items-start
                                gap-3
                                text-zinc-300
                              ">

                                <span>
                                  🌍
                                </span>

                                <div className="
                                  flex
                                  flex-wrap
                                  gap-2
                                ">

                                  {
                                    profile.languages.map(
                                      (
                                        language,
                                      ) => (

                                        <span
                                          key={language}

                                          className="
                                            bg-zinc-800
                                            border
                                            border-zinc-700
                                            rounded-full
                                            px-3
                                            py-1
                                            text-sm
                                          "
                                        >
                                          {
                                            language
                                          }
                                        </span>
                                      ),
                                    )
                                  }

                                </div>

                              </div>
                            )
                          }

                        </div>

                        {/* INTERESTS */}

                        {
                          profile.interests &&
                          profile.interests.length > 0 && (

                            <div className="
                              flex
                              flex-wrap
                              gap-2
                              mb-6
                            ">

                              {
                                profile.interests.map(
                                  (
                                    interest,
                                  ) => (

                                    <div
                                      key={interest}

                                      className="
                                        bg-zinc-800
                                        border
                                        border-zinc-700
                                        rounded-full
                                        px-4
                                        py-2
                                        text-sm
                                      "
                                    >
                                      {
                                        interest
                                      }
                                    </div>
                                  ),
                                )
                              }

                            </div>
                          )
                        }

                        {/* ACTIONS */}

                        <div className="
                          grid
                          gap-3
                        ">

                          <div className="
                            flex
                            gap-3
                          ">

                            <button
                              onClick={() =>
                                skipUser(
                                  profile.userId,
                                )
                              }

                              className="
                                flex-1
                                py-4
                                rounded-2xl
                                bg-zinc-700
                                hover:bg-zinc-600
                                transition
                                font-bold
                              "
                            >
                              Skip
                            </button>

                            <button
                              onClick={() =>
                                likeUser(
                                  profile.userId || '',
                                )
                              }

                              className="
                                flex-1
                                py-4
                                rounded-2xl
                                bg-pink-500
                                hover:bg-pink-600
                                transition
                                font-bold
                              "
                            >
                              Like 💕
                            </button>

                          </div>

                        </div>

                      </div>

                    </div>
                  ),
                )
              }

            </div>
          )
        }

      </section>

    </main>
  );
}