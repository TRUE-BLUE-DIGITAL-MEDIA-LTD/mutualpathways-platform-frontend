'use client';

import { API_URL }
  from '../lib/api';

import axios from 'axios';

import {
  useEffect,
  useState,
} from 'react';

type Props = {
  otherUserId: string;

  otherUserName: string;
};

export default function ChatWindow({
  otherUserId,
  otherUserName,
}: Props) {

  const [messages, setMessages] =
    useState<any[]>([]);

  const [content, setContent] =
    useState('');

  async function fetchMessages() {

    try {

      const token =
        localStorage.getItem('token');

      const response =
        await axios.get(
          `${API_URL}/messages/${otherUserId}`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          },
        );

      setMessages(
        response.data,
      );

    } catch (error) {

      console.log(error);
    }
  }

  async function sendMessage() {

    if (!content.trim()) {
      return;
    }

    try {

      const token =
        localStorage.getItem('token');

      await axios.post(
        `${API_URL}/messages/${otherUserId}`,
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

      setContent('');

      fetchMessages();

    } catch (error) {

      console.log(error);
    }
  }

  useEffect(() => {

    fetchMessages();

  }, [otherUserId]);

  return (

    <div className="
      bg-zinc-900
      border
      border-zinc-800
      rounded-2xl
      p-6
      h-[600px]
      flex
      flex-col
    ">

      <div className="
        mb-6
        pb-4
        border-b
        border-zinc-800
      ">

        <h2 className="
          text-2xl
          font-bold
        ">
          {otherUserName}
        </h2>

      </div>

      <div className="
        flex-1
        overflow-y-auto
        space-y-4
        mb-4
      ">

        {
          messages.map((message) => (

            <div
              key={message.id}

              className="
                bg-zinc-800
                rounded-xl
                p-3
              "
            >

              <p>
                {message.content}
              </p>

            </div>
          ))
        }

      </div>

      <div className="
        flex
        gap-3
      ">

        <input
          value={content}

          onChange={(e) =>
            setContent(
              e.target.value,
            )
          }

          placeholder="Type message..."

          className="
            flex-1
            bg-zinc-800
            rounded-xl
            px-4
            py-3
            outline-none
          "
        />

        <button
          onClick={sendMessage}

          className="
            bg-white
            text-black
            px-6
            rounded-xl
            font-semibold
          "
        >
          Send
        </button>

      </div>

    </div>
  );
}