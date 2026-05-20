"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  ArrowLeft,
  LogOut,
  Copy,
  Share2,
  Crown,
  ShieldAlert,
  Sparkles,
  Mail,
  Phone,
  MapPin,
  CalendarDays,
} from "lucide-react";

import { supabase } from "@/lib/supabase";

export default function ProfilePage() {

  const router = useRouter();

  const [member, setMember] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    loadMember();

  }, []);

  async function loadMember() {

    try {

      const memberId =
        localStorage.getItem("member_id");

      if (!memberId) {

        router.push("/login");

        return;
      }

      const { data, error } =
        await supabase
          .from("members")
          .select("*")
          .eq("id", memberId)
          .single();

      if (error || !data) {

        localStorage.removeItem(
          "member_id"
        );

        localStorage.removeItem(
          "member"
        );

        router.push("/login");

        return;
      }

      setMember(data);

    } catch {

      router.push("/login");

    }

    setLoading(false);
  }

  function logout() {

    localStorage.removeItem(
      "member_id"
    );

    localStorage.removeItem(
      "member"
    );

    router.push("/login");
  }

  function copyCode() {

    navigator.clipboard.writeText(
      member.referral_code
    );

    alert(
      "Kode referral disalin"
    );
  }

  function copyLink() {

    const link =
      `${window.location.origin}/register?ref=${member.referral_code}`;

    navigator.clipboard.writeText(
      link
    );

    alert(
      "Link referral disalin"
    );
  }

  if (loading) {

    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  const isActive =
    member.status === "aktif";

  const isFrozen =
    member.status === "dibekukan";

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">

      {/* BACKGROUND */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,255,100,0.10),transparent_35%)] pointer-events-none"></div>

      <div className="fixed bottom-0 left-0 w-72 h-72 bg-green-500/5 blur-3xl rounded-full pointer-events-none"></div>

      <div className="relative max-w-5xl mx-auto p-5 pb-32">

        {/* TOP BAR */}
        <div className="flex items-center justify-between gap-4 mb-8">

          <Link
            href="/member/dashboard"
            className="inline-flex items-center gap-3 h-14 px-6 rounded-[24px] bg-zinc-900 border border-zinc-800 hover:border-green-500 transition font-black"
          >

            <ArrowLeft size={20} />

            Dashboard

          </Link>

          <button
            onClick={logout}
            className="inline-flex items-center gap-3 h-14 px-6 rounded-[24px] bg-red-600 hover:bg-red-500 transition font-black shadow-[0_0_30px_rgba(255,0,0,0.25)]"
          >

            <LogOut size={20} />

            Logout

          </button>

        </div>

        {/* HEADER */}
        <div className="relative overflow-hidden rounded-[40px] border border-zinc-800 bg-white/[0.03] backdrop-blur-xl p-7 shadow-[0_0_45px_rgba(0,255,100,0.08)]">

          <div className="absolute top-0 right-0 w-72 h-72 bg-green-500/10 blur-[120px] rounded-full"></div>

          <div className="relative z-10">

            <div className="flex flex-col md:flex-row md:items-center gap-6">

              {/* AVATAR */}
              <div className="w-28 h-28 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-5xl font-black text-black shadow-[0_0_40px_rgba(0,255,100,0.45)]">

                {member.name?.charAt(0)}

              </div>

              {/* INFO */}
              <div className="flex-1">

                <p className="text-zinc-500 text-sm tracking-[0.2em] uppercase">
                  Digital Affiliate Network
                </p>

                <h1 className="text-5xl md:text-6xl font-black leading-tight mt-3 break-words">
                  {member.name}
                </h1>

                {/* STATUS */}
                <div className="mt-5">

                  {isActive && (

                    <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-green-500/10 border border-green-500/20 shadow-[0_0_30px_rgba(0,255,100,0.18)]">

                      <Crown
                        size={18}
                        className="text-green-400"
                      />

                      <span className="text-green-400 font-black uppercase tracking-wide">
                        MEMBER AKTIF
                      </span>

                    </div>

                  )}

                  {isFrozen && (

                    <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-orange-500/10 border border-orange-500/20 shadow-[0_0_30px_rgba(255,120,0,0.18)]">

                      <ShieldAlert
                        size={18}
                        className="text-orange-400"
                      />

                      <span className="text-orange-400 font-black uppercase tracking-wide">
                        AKUN DIBEKUKAN
                      </span>

                    </div>

                  )}

                  {!isActive &&
                    !isFrozen && (

                    <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-yellow-500/10 border border-yellow-500/20 shadow-[0_0_30px_rgba(255,215,0,0.12)]">

                      <Sparkles
                        size={18}
                        className="text-yellow-400"
                      />

                      <span className="text-yellow-400 font-black uppercase tracking-wide">
                        FREE MEMBER
                      </span>

                    </div>

                  )}

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* REFERRAL CARD */}
        <div className="relative overflow-hidden rounded-[40px] border border-zinc-800 bg-white/[0.03] backdrop-blur-xl p-7 mt-7 shadow-[0_0_40px_rgba(0,255,100,0.08)]">

          <div className="absolute top-0 right-0 w-60 h-60 bg-green-500/10 blur-3xl rounded-full"></div>

          <div className="relative z-10">

            <p className="text-zinc-500 text-sm">
              Referral Code
            </p>

            <h2 className="text-5xl md:text-7xl font-black text-green-400 tracking-tight mt-4 break-words">
              {member.referral_code}
            </h2>

            <p className="text-2xl font-black leading-relaxed mt-7 max-w-3xl">
              Bagikan referralmu sekarang dan bangun jaringan affiliate digital modern bersama DAN.
            </p>

            {/* BUTTONS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">

              <button
                onClick={copyCode}
                className="h-16 rounded-[24px] bg-zinc-900 border border-zinc-800 hover:border-green-500 transition text-lg font-black flex items-center justify-center gap-3"
              >

                <Copy size={20} />

                Copy Kode

              </button>

              <button
                onClick={copyLink}
                className="h-16 rounded-[24px] bg-green-500 hover:bg-green-400 transition text-black text-lg font-black shadow-[0_0_35px_rgba(0,255,100,0.30)] flex items-center justify-center gap-3"
              >

                <Share2 size={20} />

                Copy Link

              </button>

            </div>

          </div>

        </div>

        {/* MEMBER INFO */}
        <div className="grid md:grid-cols-2 gap-5 mt-7">

          {/* EMAIL */}
          <div className="rounded-[34px] border border-zinc-800 bg-white/[0.03] backdrop-blur-xl p-6">

            <div className="flex items-center gap-4">

              <div className="w-14 h-14 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center">

                <Mail
                  size={24}
                  className="text-green-400"
                />

              </div>

              <div>

                <p className="text-zinc-500 text-sm">
                  Email
                </p>

                <h2 className="text-2xl font-black mt-1 break-all">
                  {member.email}
                </h2>

              </div>

            </div>

          </div>

          {/* PHONE */}
          <div className="rounded-[34px] border border-zinc-800 bg-white/[0.03] backdrop-blur-xl p-6">

            <div className="flex items-center gap-4">

              <div className="w-14 h-14 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center">

                <Phone
                  size={24}
                  className="text-green-400"
                />

              </div>

              <div>

                <p className="text-zinc-500 text-sm">
                  Nomor HP
                </p>

                <h2 className="text-2xl font-black mt-1">
                  {member.phone}
                </h2>

              </div>

            </div>

          </div>

          {/* CITY */}
          <div className="rounded-[34px] border border-zinc-800 bg-white/[0.03] backdrop-blur-xl p-6">

            <div className="flex items-center gap-4">

              <div className="w-14 h-14 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center">

                <MapPin
                  size={24}
                  className="text-green-400"
                />

              </div>

              <div>

                <p className="text-zinc-500 text-sm">
                  Kota
                </p>

                <h2 className="text-2xl font-black mt-1">
                  {member.city}
                </h2>

              </div>

            </div>

          </div>

          {/* CREATED */}
          <div className="rounded-[34px] border border-zinc-800 bg-white/[0.03] backdrop-blur-xl p-6">

            <div className="flex items-center gap-4">

              <div className="w-14 h-14 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center">

                <CalendarDays
                  size={24}
                  className="text-green-400"
                />

              </div>

              <div>

                <p className="text-zinc-500 text-sm">
                  Tanggal Daftar
                </p>

                <h2 className="text-2xl font-black mt-1">
                  {new Date(
                    member.created_at
                  ).toLocaleDateString(
                    "id-ID"
                  )}
                </h2>

              </div>

            </div>

          </div>

        </div>

        {/* CTA */}
        <Link
          href="/member/dashboard"
          className="w-full h-16 mt-7 rounded-[28px] bg-gradient-to-r from-green-500 to-lime-400 hover:scale-[1.01] transition text-black text-xl font-black shadow-[0_0_40px_rgba(0,255,100,0.30)] flex items-center justify-center"
        >

          Kembali Ke Dashboard

        </Link>

      </div>

    </div>
  );
}
