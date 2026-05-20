"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Copy,
  LogOut,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Crown,
  ShieldAlert,
  Sparkles,
} from "lucide-react";

import { supabase } from "@/lib/supabase";

type Member = {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  status: "aktif" | "dibekukan" | "free";
  referral_code: string;
  created_at: string;
};

export default function ProfilePage() {
  const router = useRouter();

  const [member, setMember] =
    useState<Member | null>(null);

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

        router.push("/login");
        return;
      }

      setMember(data);
    } catch (error) {
      console.error(error);

      router.push("/login");
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    localStorage.removeItem(
      "member_id"
    );

    localStorage.removeItem(
      "member"
    );

    router.push("/login");
  }

  function copyReferral() {
    if (!member) return;

    navigator.clipboard.writeText(
      member.referral_code
    );

    alert("Kode referral disalin");
  }

  if (loading || !member) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center text-lg font-bold">
        Loading...
      </div>
    );
  }

  const isActive =
    member.status === "aktif";

  const isFrozen =
    member.status === "dibekukan";

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">

      {/* BACKGROUND */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,255,100,0.12),transparent_35%)] pointer-events-none" />

      <div className="relative max-w-xl mx-auto px-5 py-6 pb-32">

        {/* TOPBAR */}
        <div className="flex items-center justify-between mb-8">

          <Link
            href="/member/dashboard"
            className="w-14 h-14 rounded-2xl border border-zinc-800 bg-zinc-900/80 flex items-center justify-center hover:border-green-500 transition"
          >
            <ArrowLeft size={22} />
          </Link>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20">

            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />

            <span className="text-green-400 text-sm font-black tracking-[0.2em]">
              PROFILE
            </span>

          </div>

        </div>

        {/* HEADER */}
        <div className="flex flex-col items-center text-center">

          <div className="w-28 h-28 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-black text-5xl font-black shadow-[0_0_45px_rgba(0,255,100,0.35)]">

            {member.name?.charAt(0)}

          </div>

          <h1 className="text-5xl font-black mt-6 break-words">
            {member.name}
          </h1>

          <p className="text-zinc-500 mt-3">
            Digital Affiliate Network
          </p>

          {/* STATUS */}
          <div className="mt-6">

            <div
              className={`inline-flex items-center gap-3 px-5 py-3 rounded-full border ${
                isActive
                  ? "bg-green-500/10 border-green-500/20 text-green-400"
                  : isFrozen
                  ? "bg-red-500/10 border-red-500/20 text-red-400"
                  : "bg-yellow-500/10 border-yellow-500/20 text-yellow-300"
              }`}
            >

              {isActive ? (
                <Crown size={18} />
              ) : isFrozen ? (
                <ShieldAlert size={18} />
              ) : (
                <Sparkles size={18} />
              )}

              <span className="font-black uppercase tracking-wider">
                {isActive
                  ? "Member Aktif"
                  : isFrozen
                  ? "Akun Dibekukan"
                  : "Free Member"}
              </span>

            </div>

          </div>

        </div>

        {/* REFERRAL */}
        <div className="relative overflow-hidden mt-10 rounded-[36px] border border-green-500/20 bg-green-500/10 p-6 shadow-[0_0_40px_rgba(0,255,100,0.10)]">

          <div className="absolute top-0 right-0 w-48 h-48 bg-green-400/10 blur-3xl rounded-full" />

          <div className="relative z-10">

            <p className="text-green-300/70 text-sm uppercase tracking-widest">
              Referral Code
            </p>

            <h2 className="text-5xl font-black text-green-400 mt-4 break-all">
              {member.referral_code}
            </h2>

            <button
              onClick={copyReferral}
              className="mt-6 h-14 px-6 rounded-2xl bg-black/40 border border-green-500/20 hover:border-green-400 transition flex items-center gap-3 font-bold"
            >

              <Copy size={18} />

              Copy Referral

            </button>

          </div>

        </div>

        {/* INFO */}
        <div className="space-y-5 mt-8">

          <div className="rounded-[30px] border border-zinc-800 bg-white/[0.03] p-5">

            <div className="flex items-center gap-3 text-zinc-500">

              <Mail size={18} />

              Email

            </div>

            <h2 className="text-2xl font-black mt-4 break-words">
              {member.email}
            </h2>

          </div>

          <div className="rounded-[30px] border border-zinc-800 bg-white/[0.03] p-5">

            <div className="flex items-center gap-3 text-zinc-500">

              <Phone size={18} />

              Nomor HP

            </div>

            <h2 className="text-2xl font-black mt-4">
              {member.phone}
            </h2>

          </div>

          <div className="rounded-[30px] border border-zinc-800 bg-white/[0.03] p-5">

            <div className="flex items-center gap-3 text-zinc-500">

              <MapPin size={18} />

              Kota

            </div>

            <h2 className="text-2xl font-black mt-4">
              {member.city}
            </h2>

          </div>

          <div className="rounded-[30px] border border-zinc-800 bg-white/[0.03] p-5">

            <div className="flex items-center gap-3 text-zinc-500">

              <Calendar size={18} />

              Tanggal Daftar

            </div>

            <h2 className="text-2xl font-black mt-4">
              {new Date(
                member.created_at
              ).toLocaleDateString("id-ID")}
            </h2>

          </div>

        </div>

        {/* ACTION */}
        <button
          onClick={logout}
          className="w-full h-16 mt-10 rounded-[28px] bg-red-600 hover:bg-red-500 transition text-white text-xl font-black shadow-[0_0_35px_rgba(255,0,0,0.30)] flex items-center justify-center gap-3"
        >

          <LogOut size={22} />

          Logout

        </button>

      </div>

    </main>
  );
}
