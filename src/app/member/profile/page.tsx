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
    <div className="min-h-screen bg-black text-white overflow-hidden">

      {/* BACKGROUND */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,255,100,0.10),transparent_35%)] pointer-events-none" />

      <div className="relative max-w-md mx-auto px-5 py-6">

        {/* HEADER */}
        <div className="flex items-center gap-5 mb-7">

          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-4xl font-black text-black shadow-[0_0_35px_rgba(0,255,100,0.45)]">
            {member.name.charAt(0)}
          </div>

          <div>

            <p className="text-zinc-500 text-sm mb-2">
              Profil Member
            </p>

            <h1 className="text-5xl font-black leading-tight break-words">
              {member.name}
            </h1>

            {/* STATUS */}
            <div className="mt-5">

              <div
                className={`inline-flex items-center gap-3 px-5 py-3 rounded-full border ${
                  isActive
                    ? "bg-green-500/10 border-green-500/30 shadow-[0_0_30px_rgba(0,255,100,0.18)]"
                    : isFrozen
                    ? "bg-red-500/10 border-red-500/30 shadow-[0_0_30px_rgba(255,0,0,0.18)]"
                    : "bg-yellow-500/10 border-yellow-500/30 shadow-[0_0_30px_rgba(255,215,0,0.12)]"
                }`}
              >

                <div
                  className={`w-4 h-4 rounded-full ${
                    isActive
                      ? "bg-green-500"
                      : isFrozen
                      ? "bg-red-500"
                      : "bg-yellow-400"
                  }`}
                />

                <span
                  className={`text-lg font-black tracking-wide uppercase ${
                    isActive
                      ? "text-green-400"
                      : isFrozen
                      ? "text-red-400"
                      : "text-yellow-300"
                  }`}
                >
                  {isActive
                    ? "Member Aktif"
                    : isFrozen
                    ? "Member Dibekukan"
                    : "Free Member"}
                </span>

              </div>

            </div>

          </div>

        </div>

        {/* DASHBOARD */}
        <Link
          href="/member/dashboard"
          className="w-full h-16 rounded-[28px] bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 flex items-center justify-center text-xl font-bold mb-6 hover:border-green-500 transition"
        >
          Dashboard
        </Link>

        {/* PROFILE CARD */}
        <div className="relative overflow-hidden rounded-[36px] border border-zinc-800 bg-white/[0.03] backdrop-blur-xl p-6 shadow-[0_0_40px_rgba(0,255,100,0.06)]">

          {/* GLOW */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-green-500/10 blur-3xl rounded-full" />

          <div className="relative z-10">

            {/* REFERRAL */}
            <div className="mb-8">

              <p className="text-zinc-500 text-sm mb-3">
                Referral Code
              </p>

              <div className="rounded-[28px] bg-black/50 border border-green-500/20 p-5">

                <h2 className="text-5xl font-black text-green-400 tracking-tight break-words">
                  {member.referral_code}
                </h2>

              </div>

            </div>

            {/* CTA */}
            <div className="mb-8 rounded-[28px] bg-green-500 text-black p-5 shadow-[0_0_30px_rgba(0,255,100,0.35)]">

              <p className="text-2xl font-black leading-snug">
                Ayo bagikan link referralmu sekarang dan dapatkan penghasilan tanpa batas dari jaringan affiliate digital modern bersama DAN.
              </p>

            </div>

            {/* EMAIL */}
            <div className="mb-5 rounded-[28px] bg-zinc-900/70 border border-zinc-800 p-5">

              <p className="text-zinc-500 text-sm mb-3">
                Email
              </p>

              <h2 className="text-2xl font-bold break-words">
                {member.email}
              </h2>

            </div>

            {/* PHONE */}
            <div className="mb-5 rounded-[28px] bg-zinc-900/70 border border-zinc-800 p-5">

              <p className="text-zinc-500 text-sm mb-3">
                Nomor HP
              </p>

              <h2 className="text-3xl font-bold">
                {member.phone}
              </h2>

            </div>

            {/* CITY */}
            <div className="mb-5 rounded-[28px] bg-zinc-900/70 border border-zinc-800 p-5">

              <p className="text-zinc-500 text-sm mb-3">
                Kota
              </p>

              <h2 className="text-3xl font-bold">
                {member.city}
              </h2>

            </div>

            {/* CREATED */}
            <div className="rounded-[28px] bg-zinc-900/70 border border-zinc-800 p-5">

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
              className="w-full h-16 mt-8 rounded-[28px] bg-red-600 hover:bg-red-500 transition text-white text-2xl font-black shadow-[0_0_30px_rgba(255,0,0,0.25)]"
            >
              Logout
            </button>

          </div>

        </div>

        <div className="h-10" />

      </div>

    </div>
  );
}
