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

import { socket }
  from '../../lib/socket';

export default function ChatPage() {

  const [matches, setMatches] =
    useState<any[]>([]);

  const [selectedMatch, setSelectedMatch] =
    useState<any>(null);

  const [messages, setMessages] =
    useState<any[]>([]);

  const [content, setContent] =
    useState('');

  const [currentUserId, setCurrentUserId] =
    useState('');

  const [isOnline, setIsOnline] =
    useState(false);

  const [isTyping, setIsTyping] =
  useState(false);

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

  async function fetchMessages(
    userId: string,
  ) {

    try {

      const token =
        localStorage.getItem(
          'token',
        );

      const response =
        await axios.get(
          `${API_URL}/messages/${userId}`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          },
        );

      setMessages(
        response.data || [],
      );

    } catch (error) {

      console.log(error);
    }
  }

  async function initializeUser() {

    try {

      const token =
        localStorage.getItem(
          'token',
        );

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

      const userId =
        response.data.user.id;

      setCurrentUserId(
        userId,
      );

      socket.connect();

      socket.emit(
        'join',
        {
          userId,
        },
      );

    } catch (error) {

      console.log(error);
    }
  }

  async function sendMessage() {

  if (
    !content.trim() ||
    !selectedMatch
  ) {
    return;
  }

  try {

    const token =
      localStorage.getItem(
        'token',
      );

    const response =
      await axios.post(
        `${API_URL}/messages/${selectedMatch.userId}`,
        {
          content,
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        },
      );

    console.log(
      'MESSAGE SAVED',
      response.data,
    );

    await fetchMessages(
      selectedMatch.userId,
    );

    socket.emit(
      'sendMessage',
      {
        senderId:
          currentUserId,

        receiverId:
          selectedMatch.userId,

        content,
      },
    );

    setContent('');

  } catch (error) {

    console.error(
      'SEND MESSAGE ERROR',
      error,
    );
  }
}

  function getImageUrl(
    imageUrl?: string,
  ) {

    if (!imageUrl) {

      return 'https://placehold.co/200x200/18181b/ffffff?text=User';
    }

    return imageUrl.startsWith(
      'http',
    )
      ? imageUrl
      : `${API_URL}${imageUrl}`;
  }
  
  function formatLastSeen(
  date?: string,
) {

  if (!date) {
    return 'Offline';
  }

  const lastSeen =
    new Date(date);

  const now =
    new Date();

  const diffMinutes =
    Math.floor(
      (
        now.getTime() -
        lastSeen.getTime()
      ) / 60000,
    );

  if (
    diffMinutes < 1
  ) {
    return 'Last seen just now';
  }

  if (
    diffMinutes < 60
  ) {
    return `Last seen ${diffMinutes} min ago`;
  }

  const diffHours =
    Math.floor(
      diffMinutes / 60,
    );

  if (
    diffHours < 24
  ) {
    return `Last seen ${diffHours}h ago`;
  }

  return `Last seen ${lastSeen.toLocaleDateString()}`;
}

  useEffect(() => {
socket.off('newMessage');
socket.off('onlineStatus');
socket.off('userOnline');
socket.off('userOffline');
socket.off('typing');

    fetchMatches();

    initializeUser();

    socket.on(
      'newMessage',
      (message) => {

        if (
          selectedMatch &&
          (
            message.senderId ===
              selectedMatch.userId ||

            message.receiverId ===
              selectedMatch.userId
          )
        ) {

          setMessages(
            (prev) => [
              ...prev,
              message,
            ],
          );
        }
      },
    );

    socket.on(
      'onlineStatus',
      (data) => {

        setIsOnline(
          data.isOnline,
        );
      },
    );

    socket.on(
  'userOnline',
  (data) => {

    if (
      selectedMatch &&
      data.userId ===
        selectedMatch.userId
    ) {

      setIsOnline(
        true,
      );
    }
  },
);

socket.on(
  'userOffline',
  (data) => {

    if (
      selectedMatch &&
      data.userId ===
        selectedMatch.userId
    ) {

      setIsOnline(
        false,
      );
    }
  },
);

console.log(
  'REGISTERING TYPING LISTENER',
);

socket.on(
  'typing',
  (data) => {

    alert(
      'TYPING EVENT RECEIVED',
    );

    console.log(
      'RECEIVED TYPING',
      data,
    );

    setIsTyping(
      true,
    );

    setTimeout(
      () => {

        setIsTyping(
          false,
        );

      },
      2000,
    );
  },
);

    return () => {

 socket.off('typing');
    socket.off('userOnline');
    socket.off('userOffline');
    socket.off('newMessage');
    socket.off('onlineStatus');

  };

}, [selectedMatch]);

  return (

    <main className="
      min-h-screen
      bg-black
      text-white
    ">

      <Navbar />

      <div className="
        max-w-7xl
        mx-auto
        p-4
        sm:p-6
        grid
        grid-cols-1
        lg:grid-cols-3
        gap-4
        sm:gap-6
      ">

        {/* SIDEBAR */}

        <div className="
          bg-zinc-900
          rounded-3xl
          p-4
          h-auto
          lg:h-[80vh]
          overflow-y-auto
          border
          border-zinc-800
        ">

          <h2 className="
            text-2xl
            font-bold
            mb-6
          ">
            Chats
          </h2>

          <div className="
            space-y-3
          ">

            {
              matches.map((match, index) => (

                <button
                  key={
                    match.id ||
                    match.matchedUser?.userId ||
                    index
                  }

                  onClick={() => {

                    setSelectedMatch(
                      match.matchedUser,
                    );

                    fetchMessages(
                      match.matchedUser.userId,
                    );

                    socket.emit(
                      'checkOnlineStatus',
                      {
                        userId:
                          match.matchedUser.userId,
                      },
                    );
                  }}

                  className={`
                    w-full
                    flex
                    items-center
                    gap-3
                    rounded-2xl
                    p-3
                    text-left
                    transition
                    ${
                      selectedMatch?.userId ===
                      match.matchedUser?.userId
                        ? 'bg-zinc-700'
                        : 'bg-zinc-800 hover:bg-zinc-700'
                    }
                  `}
                >

                  <img
                    src={getImageUrl(
                      match.matchedUser?.imageUrl,
                    )}

                    alt="User"

                    className="
                      w-12
                      h-12
                      rounded-full
                      object-cover
                      object-top
                    "
                  />

                  <div>

                    <h3 className="
                      font-bold
                    ">
                      {
                        match.matchedUser
                          ?.displayName ||
                        'User'
                      }
                    </h3>

                    <p className="
                      text-sm
                      text-zinc-400
                    ">
                      Live chat
                    </p>

                  </div>

                </button>
              ))
            }

          </div>

        </div>

        {/* CHAT */}

        <div className="
          lg:col-span-2
          bg-zinc-900
          rounded-3xl
          p-4
          sm:p-6
          flex
          flex-col
          h-[75vh]
          lg:h-[80vh]
          border
          border-zinc-800
        ">

          {
            selectedMatch ? (

              <>

                {/* HEADER */}

                <div className="
                  flex
                  items-center
                  gap-4
                  border-b
                  border-zinc-800
                  pb-4
                  mb-4
                ">

                  <img
                    src={getImageUrl(
                      selectedMatch?.imageUrl,
                    )}

                    alt="User"

                    className="
                      w-14
                      h-14
                      rounded-full
                      object-cover
                      object-top
                    "
                  />

                  <div>

                    <h2 className="
                      text-2xl
                      font-bold
                    ">
                      {
                        selectedMatch
                          ?.displayName ||
                        'User'
                      }
                    </h2>

                    <p className={`
                      text-sm
                      ${
                        isOnline
                          ? 'text-green-400'
                          : 'text-zinc-500'
                      }
                    `}>

                      {
                        isOnline
                           ? 'Online'
                           : formatLastSeen(
                        selectedMatch?.lastSeen,
                       )
                      }

                    </p>
                    
                    {
  isTyping && (

    <p className="
      text-xs
      text-zinc-400
      mt-1
      italic
    ">
      Typing...
    </p>

  )
}

                  </div>

                </div>

                {/* MESSAGES */}

                <div className="
                  flex-1
                  overflow-y-auto
                  space-y-3
                  mb-4
                ">

                  {
                    messages.map(
                      (
                        message,
                        index,
                      ) => {

                        const isMine =
                          message.senderId ===
                          currentUserId;

                        return (

                          <div
                            key={
                              message.id ||
                              index
                            }

                            className={`
                              flex
                              ${
                                isMine
                                  ? 'justify-end'
                                  : 'justify-start'
                              }
                            `}
                          >

                            <div
  className={`
    max-w-[80%]
    rounded-2xl
    px-4
    py-3
    ${
      isMine
        ? 'bg-pink-500 text-white'
        : 'bg-zinc-800 text-white'
    }
  `}
>

  <div>
    {
      message.content
    }
  </div>

  {
    message.createdAt && (

      <div
        className="
          text-xs
          opacity-70
          mt-2
        "
      >

        {
          new Date(
            message.createdAt,
          ).toLocaleTimeString(
            [],
            {
              hour:
                '2-digit',
              minute:
                '2-digit',
            },
          )
        }

      </div>
    )
  }

</div>

                          </div>
                        );
                      },
                    )
                  }

                </div>

                {/* INPUT */}

                <div className="
                  flex
                  gap-3
                ">

                  <input
                    type="text"

                    placeholder="Type a message..."

                    value={content}

                    onChange={(e) => {

  setContent(
    e.target.value,
  );

  if (
    selectedMatch
  ) {

    socket.emit(
      'typing',
      {
        senderId:
          currentUserId,

        receiverId:
          selectedMatch.userId,
      },
    );
  }
}}

                    onKeyDown={(e) => {

                      if (
                        e.key === 'Enter'
                      ) {

                        sendMessage();
                      }
                    }}

                    className="
                      flex-1
                      bg-zinc-800
                      rounded-2xl
                      px-4
                      py-4
                      outline-none
                      border
                      border-zinc-700
                    "
                  />

                  <button
                    onClick={
                      sendMessage
                    }

                    className="
                      bg-white
                      text-black
                      px-6
                      rounded-2xl
                      font-bold
                    "
                  >
                    Send
                  </button>

                </div>

              </>

            ) : (

              <div className="
                flex-1
                flex
                items-center
                justify-center
                text-zinc-500
                text-xl
              ">
                Select a match to chat
              </div>
            )
          }

        </div>

      </div>

    </main>
  );
}