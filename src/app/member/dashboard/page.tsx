"use client";

import Link from "next/link";
import {
  Copy,
  Link2,
  ShoppingBag,
  Wallet,
  Users,
  User,
  Headphones,
  ArrowUpRight,
  LogOut,
} from "lucide-react";

export default function DashboardPage() {
  const member = {
    name: "Basri",
    status: "FREE MEMBER",
    referralCode: "DAN614928",
    saldo: 0,
    totalReferral: 0,
    bonusSponsor: 0,
    bonusReferral: 0,
  };

  return (
    <main className="min-h-screen bg-black text-white px-5 py-6 overflow-hidden">
      {/* BACKGROUND */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,255,100,0.10),transparent_35%)] pointer-events-none" />

      <div className="relative max-w-md mx-auto">
        {/* HEADER */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-5xl font-black tracking-tight">
              {member.name}
            </h1>

            <div className="mt-5 inline-flex items-center gap-3 px-5 py-3 rounded-full border border-yellow-500/20 bg-yellow-500/10 shadow-[0_0_20px_rgba(255,215,0,0.15)]">
              <div className="w-4 h-4 rounded-full bg-yellow-400" />

              <span className="text-yellow-300 font-bold text-lg">
                {member.status}
              </span>
            </div>
          </div>

          <button className="bg-red-600 hover:bg-red-500 transition px-6 py-4 rounded-3xl font-bold shadow-[0_0_30px_rgba(255,0,0,0.35)] flex items-center gap-2">
            <LogOut size={22} />
            Logout
          </button>
        </div>

        {/* REFERRAL CARD */}
        <div className="rounded-[38px] border border-zinc-800 bg-gradient-to-br from-zinc-950 to-black p-7 mb-7 shadow-[0_0_40px_rgba(0,255,100,0.08)]">
          <p className="text-zinc-500 text-xl mb-5">
            Referral Code
          </p>

          <h2 className="text-6xl font-black tracking-tight mb-8">
            {member.referralCode}
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <button className="h-20 rounded-3xl border border-zinc-700 bg-black hover:border-lime-400 transition flex items-center justify-center gap-3 text-xl font-bold">
              <Link2 size={24} />
              Copy Link
            </button>

            <button className="h-20 rounded-3xl border border-zinc-700 bg-black hover:border-lime-400 transition flex items-center justify-center gap-3 text-xl font-bold">
              <Copy size={24} />
              Copy Kode
            </button>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 gap-5 mb-7">
          <div className="rounded-[34px] border border-zinc-800 bg-gradient-to-br from-zinc-950 to-black p-6 min-h-[180px] flex flex-col justify-between">
            <p className="text-zinc-500 text-xl">
              Saldo Total
            </p>

            <h3 className="text-5xl font-black text-lime-400">
              Rp {member.saldo}
            </h3>
          </div>

          <div className="rounded-[34px] border border-zinc-800 bg-gradient-to-br from-zinc-950 to-black p-6 min-h-[180px] flex flex-col justify-between">
            <p className="text-zinc-500 text-xl">
              Total Referral
            </p>

            <h3 className="text-5xl font-black">
              {member.totalReferral}
            </h3>
          </div>

          <div className="rounded-[34px] border border-zinc-800 bg-gradient-to-br from-zinc-950 to-black p-6 min-h-[180px] flex flex-col justify-between">
            <p className="text-zinc-500 text-xl">
              Bonus Sponsor
            </p>

            <h3 className="text-5xl font-black">
              Rp {member.bonusSponsor}
            </h3>
          </div>

          <div className="rounded-[34px] border border-zinc-800 bg-gradient-to-br from-zinc-950 to-black p-6 min-h-[180px] flex flex-col justify-between">
            <p className="text-zinc-500 text-xl">
              Bonus Referral
            </p>

            <h3 className="text-5xl font-black">
              Rp {member.bonusReferral}
            </h3>
          </div>
        </div>

        {/* AKTIVASI / BELANJA */}
        <Link
          href="/produk"
          className="mb-7 rounded-[36px] bg-lime-400 text-black p-7 flex items-center justify-between shadow-[0_0_40px_rgba(0,255,100,0.45)]"
        >
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-3xl bg-white/20 flex items-center justify-center">
              <ShoppingBag size={38} />
            </div>

            <div>
              <h3 className="text-3xl font-black leading-tight">
                AKTIVASI MEMBER
              </h3>

              <p className="text-black/70 text-lg mt-1">
                Klik untuk aktivasi & mulai belanja
              </p>
            </div>
          </div>

          <ArrowUpRight size={40} />
        </Link>

        {/* MENU */}
        <div className="grid grid-cols-2 gap-5">
          <Link
            href="/transaksi"
            className="rounded-[32px] border border-zinc-800 bg-gradient-to-br from-zinc-950 to-black p-7 min-h-[150px] flex flex-col items-center justify-center gap-5 hover:border-lime-400 transition"
          >
            <Wallet size={38} className="text-white" />

            <span className="text-2xl font-bold">
              Transaksi
            </span>
          </Link>

          <Link
            href="/referral"
            className="rounded-[32px] border border-zinc-800 bg-gradient-to-br from-zinc-950 to-black p-7 min-h-[150px] flex flex-col items-center justify-center gap-5 hover:border-lime-400 transition"
          >
            <Users size={38} className="text-white" />

            <span className="text-2xl font-bold">
              Referral
            </span>
          </Link>

          <Link
            href="/profil"
            className="rounded-[32px] border border-zinc-800 bg-gradient-to-br from-zinc-950 to-black p-7 min-h-[150px] flex flex-col items-center justify-center gap-5 hover:border-lime-400 transition"
          >
            <User size={38} className="text-white" />

            <span className="text-2xl font-bold">
              Profil
            </span>
          </Link>

          <Link
            href="/bantuan"
            className="rounded-[32px] border border-zinc-800 bg-gradient-to-br from-zinc-950 to-black p-7 min-h-[150px] flex flex-col items-center justify-center gap-5 hover:border-lime-400 transition"
          >
            <Headphones size={38} className="text-white" />

            <span className="text-2xl font-bold">
              Bantuan
            </span>
          </Link>
        </div>

        {/* WITHDRAW */}
        <Link
          href="/withdraw"
          className="mt-5 rounded-[32px] border border-zinc-800 bg-gradient-to-br from-zinc-950 to-black p-8 flex items-center justify-center gap-4 hover:border-lime-400 transition"
        >
          <ArrowUpRight size={34} />

          <span className="text-3xl font-bold">
            Withdraw
          </span>
        </Link>

        {/* FOOTER SPACE */}
        <div className="h-10" />
      </div>
    </main>
  );
}
