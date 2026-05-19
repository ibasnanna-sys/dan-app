"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function ProfilePage() {
  const router = useRouter();

  const [member, setMember] = useState<any>(null);

  useEffect(() => {
    getMember();
  }, []);

  async function getMember() {
    const localUser = localStorage.getItem("member");

    if (!localUser) {
      router.push("/login");
      return;
    }

    const user = JSON.parse(localUser);

    const { data } = await supabase
      .from("members")
      .select("*")
      .eq("id", user.id)
      .single();

    if (!data) {
      router.push("/login");
      return;
    }

    setMember(data);
  }

  async function logout() {
    localStorage.removeItem("member");
    router.push("/login");
  }

  if (!member) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  const isActive = member.status === "aktif";
  const isFrozen = member.status === "dibekukan";

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-md mx-auto px-5 py-6">

        {/* TITLE */}
        <div className="mb-6">
          <p className="text-zinc-500 text-sm mb-2">
            Profile Member
          </p>

          <h1 className="text-5xl font-bold leading-tight">
            {member.name}
          </h1>
        </div>

        {/* DASHBOARD BUTTON */}
        <Link
          href="/member/dashboard"
          className="w-full h-16 rounded-3xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-2xl font-bold mb-6"
        >
          Dashboard
        </Link>

        {/* CARD */}
        <div className="bg-zinc-900 rounded-[35px] border border-zinc-800 p-6">

          {/* NAMA */}
          <div className="mb-8">
            <p className="text-zinc-500 text-sm mb-3">
              Nama Lengkap
            </p>

            <h2 className="text-4xl font-bold break-words">
              {member.name}
            </h2>
          </div>

          {/* EMAIL */}
          <div className="mb-8">
            <p className="text-zinc-500 text-sm mb-3">
              Email
            </p>

            <h2 className="text-2xl font-bold break-words leading-relaxed">
              {member.email}
            </h2>
          </div>

          {/* PHONE */}
          <div className="mb-8">
            <p className="text-zinc-500 text-sm mb-3">
              Nomor HP
            </p>

            <h2 className="text-3xl font-bold">
              {member.phone}
            </h2>
          </div>

          {/* KOTA */}
          <div className="mb-8">
            <p className="text-zinc-500 text-sm mb-3">
              Kota
            </p>

            <h2 className="text-3xl font-bold">
              {member.city}
            </h2>
          </div>

          {/* REFERRAL */}
          <div className="mb-8">
            <p className="text-zinc-500 text-sm mb-3">
              Referral Code
            </p>

            <h2 className="text-4xl font-bold text-green-500">
              {member.referral_code}
            </h2>
          </div>

          {/* STATUS */}
          <div className="mb-8">
            <p className="text-zinc-500 text-sm mb-3">
              Status Member
            </p>

            <div className="flex items-center gap-3">

              <div
                className={`w-5 h-5 rounded-full ${
                  isActive
                    ? "bg-green-500"
                    : isFrozen
                    ? "bg-red-500"
                    : "bg-yellow-400"
                }`}
              />

              <h2
                className={`text-3xl font-bold uppercase ${
                  isActive
                    ? "text-green-500"
                    : isFrozen
                    ? "text-red-500"
                    : "text-yellow-400"
                }`}
              >
                {member.status}
              </h2>

            </div>
          </div>

          {/* TANGGAL */}
          <div className="mb-10">
            <p className="text-zinc-500 text-sm mb-3">
              Tanggal Daftar
            </p>

            <h2 className="text-2xl font-bold">
              {new Date(member.created_at).toLocaleDateString("id-ID")}
            </h2>
          </div>

          {/* LOGOUT */}
          <button
            onClick={logout}
            className="w-full h-16 rounded-3xl bg-red-600 text-white text-2xl font-bold"
          >
            Logout
          </button>

        </div>

      </div>
    </div>
  );
}
