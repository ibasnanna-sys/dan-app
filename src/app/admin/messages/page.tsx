"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminMessagesPage() {

  const [mode, setMode] =
    useState<"broadcast" | "private">(
      "broadcast"
    );

  const [messages, setMessages] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [sending, setSending] =
    useState(false);

  const [form, setForm] =
    useState({
      referral_code: "",
      title: "",
      message: "",
      image: "",
    });

  useEffect(() => {

    loadMessages();

  }, []);

  async function loadMessages() {

    const { data } =
      await supabase
        .from("messages")
        .select(`
          *,
          members (
            name,
            referral_code
          )
        `)
        .order("created_at", {
          ascending: false,
        });

    setMessages(data || []);

    setLoading(false);
  }

  async function sendMessage() {

    if (
      !form.title ||
      !form.message
    ) {

      alert("Lengkapi data");

      return;
    }

    setSending(true);

    let memberId = null;

    /*
      PRIVATE MESSAGE
    */

    if (mode === "private") {

      if (!form.referral_code) {

        alert(
          "Masukkan kode referral member"
        );

        setSending(false);

        return;
      }

      const { data: member } =
        await supabase
          .from("members")
          .select("id")
          .eq(
            "referral_code",
            form.referral_code
          )
          .single();

      if (!member) {

        alert(
          "Member tidak ditemukan"
        );

        setSending(false);

        return;
      }

      memberId = member.id;
    }

    const { error } =
      await supabase
        .from("messages")
        .insert([
          {
            member_id:
              memberId,
            title:
              form.title,
            message:
              form.message,
            image:
              form.image,
            is_broadcast:
              mode ===
              "broadcast",
            is_active: true,
          },
        ]);

    if (error) {

      alert(error.message);

      setSending(false);

      return;
    }

    alert("Pesan berhasil dikirim");

    setForm({
      referral_code: "",
      title: "",
      message: "",
      image: "",
    });

    loadMessages();

    setSending(false);
  }

  async function toggleStatus(
    id: string,
    status: boolean
  ) {

    await supabase
      .from("messages")
      .update({
        is_active: !status,
      })
      .eq("id", id);

    loadMessages();
  }

  async function deleteMessage(
    id: string
  ) {

    const confirmDelete =
      confirm(
        "Hapus pesan ini?"
      );

    if (!confirmDelete)
      return;

    await supabase
      .from("messages")
      .delete()
      .eq("id", id);

    loadMessages();
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

        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-green-500/10 blur-[140px]" />

        <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-green-500/10 blur-[140px]" />

      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-5 py-6 pb-32">

        {/* HEADER */}
        <div className="mb-10">

          <Link
            href="/admin"
            className="inline-flex items-center justify-center h-14 px-6 rounded-2xl bg-zinc-900 border border-zinc-800 font-bold mb-6"
          >
            ← Dashboard
          </Link>

          <p className="text-green-500 text-sm tracking-[5px] uppercase mb-3">
            Admin Messages
          </p>

          <h1 className="text-5xl font-black leading-none">
            Pesan Member
          </h1>

          <p className="text-zinc-500 text-lg mt-5 leading-relaxed">
            Kirim pesan massal
            atau pesan pribadi
            langsung ke member DAN.
          </p>

        </div>

        {/* MODE */}
        <div className="grid grid-cols-2 gap-4 mb-8">

          <button
            onClick={() =>
              setMode(
                "broadcast"
              )
            }
            className={`h-16 rounded-3xl font-black transition ${
              mode ===
              "broadcast"
                ? "bg-green-500 text-black"
                : "bg-zinc-900 border border-zinc-800"
            }`}
          >
            Pesan Massal
          </button>

          <button
            onClick={() =>
              setMode(
                "private"
              )
            }
            className={`h-16 rounded-3xl font-black transition ${
              mode ===
              "private"
                ? "bg-green-500 text-black"
                : "bg-zinc-900 border border-zinc-800"
            }`}
          >
            Pesan Pribadi
          </button>

        </div>

        {/* FORM */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-[35px] p-6 mb-10">

          <h2 className="text-3xl font-black mb-6">
            {
              mode ===
              "broadcast"
                ? "Broadcast Member"
                : "Pesan Pribadi"
            }
          </h2>

          <div className="space-y-4">

            {mode ===
              "private" && (

              <input
                type="text"
                placeholder="Kode Referral Member"
                value={
                  form.referral_code
                }
                onChange={(e) =>
                  setForm({
                    ...form,
                    referral_code:
                      e.target.value,
                  })
                }
                className="w-full h-16 rounded-2xl bg-black border border-zinc-800 px-5 outline-none"
              />

            )}

            <input
              type="text"
              placeholder="Judul Pesan"
              value={form.title}
              onChange={(e) =>
                setForm({
                  ...form,
                  title:
                    e.target.value,
                })
              }
              className="w-full h-16 rounded-2xl bg-black border border-zinc-800 px-5 outline-none"
            />

            <textarea
              placeholder="Isi pesan..."
              value={form.message}
              onChange={(e) =>
                setForm({
                  ...form,
                  message:
                    e.target.value,
                })
              }
              className="w-full h-40 rounded-2xl bg-black border border-zinc-800 px-5 py-4 outline-none resize-none"
            />

            <input
              type="text"
              placeholder="Image URL (opsional)"
              value={form.image}
              onChange={(e) =>
                setForm({
                  ...form,
                  image:
                    e.target.value,
                })
              }
              className="w-full h-16 rounded-2xl bg-black border border-zinc-800 px-5 outline-none"
            />

            <button
              onClick={
                sendMessage
              }
              disabled={sending}
              className="w-full h-16 rounded-3xl bg-green-500 text-black font-black text-xl mt-4"
            >
              {sending
                ? "Mengirim..."
                : "Kirim Pesan"}
            </button>

          </div>

        </div>

        {/* LIST */}
        <div className="space-y-5">

          {messages.map((item) => (

            <div
              key={item.id}
              className="bg-zinc-950 border border-zinc-800 rounded-[35px] p-6"
            >

              <div className="flex items-start justify-between gap-4">

                <div>

                  <div className="flex items-center gap-3 flex-wrap">

                    <h2 className="text-3xl font-black">
                      {item.title}
                    </h2>

                    <div
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        item.is_active
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {item.is_active
                        ? "ACTIVE"
                        : "OFF"}
                    </div>

                  </div>

                  <p className="text-zinc-500 mt-3">

                    {item.is_broadcast
                      ? "Broadcast Semua Member"
                      : `Pribadi • ${item.members?.referral_code || "-"}`
                    }

                  </p>

                </div>

              </div>

              <p className="text-zinc-300 mt-6 leading-relaxed whitespace-pre-wrap">
                {item.message}
              </p>

              {item.image && (

                <img
                  src={item.image}
                  alt="message"
                  className="w-full rounded-3xl mt-6 border border-zinc-800"
                />

              )}

              <div className="grid grid-cols-2 gap-4 mt-8">

                <button
                  onClick={() =>
                    toggleStatus(
                      item.id,
                      item.is_active
                    )
                  }
                  className={`h-14 rounded-2xl font-bold ${
                    item.is_active
                      ? "bg-red-500 text-white"
                      : "bg-green-500 text-black"
                  }`}
                >
                  {item.is_active
                    ? "Nonaktifkan"
                    : "Aktifkan"}
                </button>

                <button
                  onClick={() =>
                    deleteMessage(
                      item.id
                    )
                  }
                  className="h-14 rounded-2xl bg-zinc-800 font-bold"
                >
                  Hapus
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}
