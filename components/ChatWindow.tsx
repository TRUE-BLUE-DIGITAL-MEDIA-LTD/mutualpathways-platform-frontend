"use client";

import { API_URL } from "../lib/api";

import axios from "axios";

import { useEffect, useState } from "react";

type Props = {
  otherUserId: string;

  otherUserName: string;
};

export default function ChatWindow({ otherUserId, otherUserName }: Props) {
  const [messages, setMessages] = useState<any[]>([]);

  const [content, setContent] = useState("");

  async function fetchMessages() {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(`${API_URL}/messages/${otherUserId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessages(response.data);
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/";
      }
      console.log(error);
    }
  }

  async function sendMessage() {
    if (!content.trim()) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        `${API_URL}/messages/${otherUserId}`,
        {
          content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setContent("");

      fetchMessages();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchMessages();
  }, [otherUserId]);

  return (
    <div className="flex h-[600px] flex-col rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <div className="mb-6 border-b border-zinc-800 pb-4">
        <h2 className="text-2xl font-bold">{otherUserName}</h2>
      </div>

      <div className="mb-4 flex-1 space-y-4 overflow-y-auto">
        {messages.map((message) => (
          <div key={message.id} className="rounded-xl bg-zinc-800 p-3">
            <p>{message.content}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Type message..."
          className="flex-1 rounded-xl bg-zinc-800 px-4 py-3 outline-none"
        />

        <button
          onClick={sendMessage}
          className="rounded-xl bg-white px-6 font-semibold text-black"
        >
          Send
        </button>
      </div>
    </div>
  );
}
