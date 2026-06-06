
  'use client';
  
import { API_URL }
  from '../../lib/api';


import axios from 'axios';

import {
  useEffect,
  useState,
} from 'react';

import Navbar
  from '../../components/Navbar';

import ChatWindow
  from '../../components/ChatWindow';

export default function HomePage() {

  const [email, setEmail] =
    useState('');

  const [password, setPassword] =
    useState('');

  const [user, setUser] =
    useState<any>(null);

  const [profiles, setProfiles] =
    useState<any[]>([]);

  const [matches, setMatches] =
    useState<any[]>([]);

  const [view, setView] =
    useState<'discover' | 'matches'>(
      'discover',
    );

  const [selectedMatch, setSelectedMatch] =
    useState<any>(null);

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

  async function login() {

    try {

      const response =
        await axios.post(
          `${API_URL}/auth/login`,
          {
            email,
            password,
          },
        );

      const token =
        response.data.accessToken;

      localStorage.setItem(
        'token',
        token,
      );

      fetchMe(token);

    } catch (error) {

      console.log(error);
    }
  }

  async function fetchMe(
    token: string,
  ) {

    try {

      const response =
        await axios.get(
          `${API_URL}/auth/me`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          },
        );

      setUser(
        response.data.user,
      );

      fetchProfiles(token);

    } catch (error) {

      console.log(error);
    }
  }

  async function fetchProfiles(
    token: string,
  ) {

    try {

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
        response.data || [],
      );

    } catch (error) {

      console.log(error);
    }
  }

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
    }
  }

  async function likeProfile(
    profileId: string,
  ) {

    try {

      const token =
        localStorage.getItem(
          'token',
        );

      await axios.post(
        `${API_URL}/likes/${profileId}`,
        {},
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        },
      );

      alert('Liked 💕');

    } catch (error) {

      console.log(error);
    }
  }

  useEffect(() => {

    const token =
      localStorage.getItem(
        'token',
      );

    if (token) {
      fetchMe(token);
    }

  }, []);

  if (user) {

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

          {/* HERO */}

          <div className="
            mb-8
          ">

            <div className="
              flex
              flex-col
              xl:flex-row
              items-start
              xl:items-center
              justify-between
              gap-6
              mb-10
              bg-zinc-900
              border
              border-zinc-800
              rounded-3xl
              p-5
              sm:p-8
            ">

              <div className="
                flex-1
              ">

                <h1 className="
                  text-3xl
                  sm:text-5xl
                  font-bold
                  mb-3
                  leading-tight
                ">
                  Welcome back,
                  {' '}
                  {user.username}
                </h1>

                <p className="
                  text-zinc-400
                  text-base
                  sm:text-lg
                  max-w-xl
                  leading-7
                ">
                  Discover meaningful
                  connections,
                  chat with your matches,
                  and build your social
                  universe.
                </p>

              </div>

              {/* PROFILE */}

              <div className="
                flex
                flex-col
                sm:flex-row
                items-center
                gap-4
                w-full
                sm:w-auto
              ">

                <img
                  src={getImageUrl(
                    user.imageUrl,
                  )}

                  alt="My profile"

                  onError={(e) => {

                    e.currentTarget.src =
                      'https://placehold.co/400x400/18181b/ffffff?text=Profile';
                  }}

                  className="
                    w-24
                    h-24
                    rounded-3xl
                    object-cover
                    object-top
                    border
                    border-zinc-700
                    shadow-xl
                  "
                />

                <label className="
                  cursor-pointer
                  bg-white
                  text-black
                  px-5
                  py-3
                  rounded-2xl
                  font-semibold
                  hover:scale-105
                  transition
                  text-center
                  w-full
                  sm:w-auto
                ">

                  Change Photo

                  <input
                    type="file"

                    className="hidden"

                    onChange={async (e) => {

                      const file =
                        e.target.files?.[0];

                      if (!file) {
                        return;
                      }

                      const formData =
                        new FormData();

                      formData.append(
                        'file',
                        file,
                      );

                      try {

                        await axios.post(
                          `${API_URL}/profile/upload`,
                          formData,
                          {
                            headers: {
                              Authorization:
                                `Bearer ${localStorage.getItem('token')}`,
                              'Content-Type':
                                'multipart/form-data',
                            },
                          },
                        );

                        location.reload();

                      } catch (error) {

                        console.log(error);
                      }
                    }}
                  />

                </label>

              </div>

            </div>

          </div>

          {/* TABS */}

          <div className="
            flex
            gap-3
            mb-8
            flex-wrap
          ">

            <button
              onClick={() => {
                setView('discover');
              }}

              className={`
                px-5
                sm:px-6
                py-3
                rounded-2xl
                font-bold
                transition
                text-sm
                sm:text-base
                ${
                  view === 'discover'
                    ? 'bg-white text-black'
                    : 'bg-zinc-900 text-white'
                }
              `}
            >
              Discover
            </button>

            <button
              onClick={() => {
                setView('matches');
                fetchMatches();
              }}

              className={`
                px-5
                sm:px-6
                py-3
                rounded-2xl
                font-bold
                transition
                text-sm
                sm:text-base
                ${
                  view === 'matches'
                    ? 'bg-white text-black'
                    : 'bg-zinc-900 text-white'
                }
              `}
            >
              Matches
            </button>

          </div>

          {/* DISCOVER */}

          {
            view === 'discover' && (

              <div className="
                grid
                grid-cols-1
                sm:grid-cols-2
                xl:grid-cols-3
                gap-5
                sm:gap-6
              ">

                {
                  profiles.map((profile) => (

                    <div
                      key={profile.id}

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
                            profile.imageUrl,
                          )}

                          alt="Profile"

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
                        p-5
                      ">

                        <h2 className="
                          text-xl
                          sm:text-2xl
                          font-bold
                          mb-3
                        ">
                          {
                            profile.displayName
                          }
                        </h2>

                        <p className="
                          text-zinc-400
                          mb-6
                          leading-7
                          text-sm
                          sm:text-base
                        ">
                          {profile.bio}
                        </p>

                        <button
                          onClick={() =>
                            likeProfile(
                              profile.id,
                            )
                          }

                          className="
                            w-full
                            bg-white
                            text-black
                            py-3
                            sm:py-4
                            rounded-2xl
                            font-bold
                            hover:scale-[1.02]
                            transition
                            text-sm
                            sm:text-base
                          "
                        >
                          Like Profile 💕
                        </button>

                      </div>

                    </div>
                  ))
                }

              </div>
            )
          }

          {/* MATCHES */}

          {
            view === 'matches' && (

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
                        p-5
                      ">

                        <h2 className="
                          text-xl
                          sm:text-2xl
                          font-bold
                          mb-3
                        ">
                          {
                            match.matchedUser
                              ?.displayName
                          }
                        </h2>

                        <p className="
                          text-zinc-400
                          mb-6
                          text-sm
                          sm:text-base
                        ">
                          {
                            match.matchedUser
                              ?.bio
                          }
                        </p>

                        <button
                          onClick={() =>
                            setSelectedMatch(
                              match.matchedUser,
                            )
                          }

                          className="
                            w-full
                            bg-white
                            text-black
                            py-3
                            sm:py-4
                            rounded-2xl
                            font-bold
                            hover:scale-[1.02]
                            transition
                            text-sm
                            sm:text-base
                          "
                        >
                          Open Chat
                        </button>

                      </div>

                    </div>
                  ))
                }

              </div>
            )
          }

          {/* CHAT */}

          {
            selectedMatch && (

              <div className="
                mt-8
              ">

                <ChatWindow
                  otherUserId={
                    selectedMatch.userId
                  }

                  otherUserName={
                    selectedMatch.displayName
                  }
                />

              </div>
            )
          }

        </div>

      </main>
    );
  }

  /* LOGIN */

  return (

    <main className="
      min-h-screen
      bg-black
      text-white
    ">

      <Navbar />

      <div className="
        flex
        items-center
        justify-center
        px-4
        sm:px-6
        py-16
        sm:py-20
      ">

        <div className="
          w-full
          max-w-md
          bg-zinc-900
          p-6
          sm:p-8
          rounded-3xl
          border
          border-zinc-800
          shadow-xl
        ">

          <h1 className="
            text-3xl
            sm:text-4xl
            font-bold
            mb-6
          ">
            Welcome Back
          </h1>

          <div className="
            space-y-4
          ">

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
                p-4
                rounded-2xl
                bg-zinc-800
                border
                border-zinc-700
                outline-none
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

              className="
                w-full
                p-4
                rounded-2xl
                bg-zinc-800
                border
                border-zinc-700
                outline-none
                text-sm
                sm:text-base
              "
            />

            <button
              onClick={login}

              className="
                w-full
                bg-white
                text-black
                py-4
                rounded-2xl
                font-bold
                hover:scale-[1.02]
                transition
                text-sm
                sm:text-base
              "
            >
              Login
            </button>

          </div>

        </div>

      </div>

    </main>
  );
}