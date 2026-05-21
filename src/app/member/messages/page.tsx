"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function MemberMessagesPage() {

  const [member, setMember] =
    useState<any>(null);

  const [messages, setMessages] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    loadMember();

  }, []);

  async function loadMember() {

    const memberId =
      localStorage.getItem(
        "member_id"
      );

    if (!memberId) {

      window.location.href =
        "/login";

      return;
    }

    const { data } =
      await supabase
        .from("members")
        .select("*")
        .eq("id", memberId)
        .single();

    if (!data) {

      window.location.href =
        "/login";

      return;
    }

    setMember(data);

    loadMessages(data.id);
  }

  async function loadMessages(
    memberId: string
  ) {

    const { data } =
      await supabase
        .from("messages")
        .select("*")
        .or(
          `is_broadcast.eq.true,member_id.eq.${memberId}`
        )
        .eq("is_active", true)
        .order("created_at", {
          ascending: false,
        });

    setMessages(data || []);

    /*
      AUTO READ
    */

    if (data && data.length > 0) {

      const unreadIds =
        data
          .filter(
            (item) =>
              !item.is_read
          )
          .map(
            (item) =>
              item.id
          );

      if (
        unreadIds.length > 0
      ) {

        await supabase
          .from("messages")
          .update({
            is_read: true,
          })
          .in(
            "id",
            unreadIds
          );
      }
    }

    setLoading(false);
  }

  if (loading) {

    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">

      {/* BACKGROUND */}
      <div className="fixed inset-0">

        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-green-500/10 blur-[140px]" />

        <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-green-500/10 blur-[140px]" />

      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-5 py-6 pb-32">

        {/* HEADER */}
        <div className="mb-10">

          <Link
            href="/member/dashboard"
            className="inline-flex items-center justify-center h-14 px-6 rounded-2xl bg-zinc-900 border border-zinc-800 font-bold mb-6"
          >
            ← Dashboard
          </Link>

          <p className="text-green-500 text-sm tracking-[5px] uppercase mb-3">
            Member Inbox
          </p>

          <h1 className="text-5xl font-black leading-none">
            Pesan Admin
          </h1>

          <p className="text-zinc-500 text-lg mt-5 leading-relaxed">
            Informasi resmi,
            pengumuman dan pesan
            pribadi dari admin DAN.
          </p>

        </div>

        {/* EMPTY */}
        {messages.length === 0 && (

          <div className="bg-zinc-950 border border-zinc-800 rounded-[35px] p-10 text-center">

            <h2 className="text-3xl font-black">
              Belum Ada Pesan
            </h2>

            <p className="text-zinc-500 mt-4 text-lg">
              Pesan admin akan
              muncul di sini.
            </p>

          </div>

        )}

        {/* LIST */}
        <div className="space-y-5">

          {messages.map((item) => (

            <div
              key={item.id}
              className="bg-zinc-950 border border-zinc-800 rounded-[35px] p-6 overflow-hidden"
            >

              {/* TOP */}
              <div className="flex items-start justify-between gap-4 flex-wrap">

                <div>

                  <div className="flex items-center gap-3 flex-wrap">

                    <h2 className="text-3xl font-black break-words">
                      {item.title}
                    </h2>

                    <div
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        item.is_broadcast
                          ? "bg-green-500/20 text-green-400"
                          : "bg-blue-500/20 text-blue-400"
                      }`}
                    >

                      {item.is_broadcast
                        ? "BROADCAST"
                        : "PRIBADI"}

                    </div>

                  </div>

                  <p className="text-zinc-500 mt-3 text-sm">

                    {new Date(
                      item.created_at
                    ).toLocaleString(
                      "id-ID"
                    )}

                  </p>

                </div>

              </div>

              {/* MESSAGE */}
              <div className="mt-6">

                <p className="text-zinc-300 leading-relaxed whitespace-pre-wrap text-lg">
                  {item.message}
                </p>

              </div>

              {/* IMAGE */}
              {item.image && (

                <img
                  src={item.image}
                  alt="message"
                  className="w-full rounded-[28px] border border-zinc-800 mt-6"
                />

              )}

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}
