"use client";

import Link from "next/link";
import { useState } from "react";

import {
  Copy,
  LogOut,
  Wallet,
  Users,
  Gift,
  Bell,
  User,
  CreditCard,
  Megaphone,
  ShieldCheck,
  Sparkles,
  Activity,
  BadgeDollarSign,
  ShoppingBag,
  Crown,
  TrendingUp,
  ArrowRight,
} from "lucide-react";

export default function Home() {

  const [memberStatus] = useState<"free" | "aktif" | "dibekukan">("free");

  const activities: {
    name: string;
    city: string;
    activity: string;
    time: string;
  }[] = [
    {
      name: "Akbar",
      city: "Surabaya",
      activity: "Aktivasi Member",
      time: "2 menit lalu",
    },
    {
      name: "Dewi",
      city: "Bandung",
      activity: "Belanja Paket Data",
      time: "5 menit lalu",
    },
    {
      name: "Rizky",
      city: "Makassar",
      activity: "Bonus Referral Masuk",
      time: "9 menit lalu",
    },
    {
      name: "Fajar",
      city: "Jakarta",
      activity: "Withdraw Berhasil",
      time: "12 menit lalu",
    },
  ];

  function renderMemberBadge() {

    if (memberStatus === "aktif") {

      return (
        <div className="flex items-center gap-3 mt-5">

          <div className="w-4 h-4 rounded-full bg-green-400 shadow-[0_0_25px_rgba(0,255,120,0.9)]"></div>

          <span className="text-green-400 font-black text-xl uppercase">
            MEMBER AKTIF
          </span>

        </div>
      );
    }

    if (memberStatus === "dibekukan") {

      return (
        <div className="flex items-center gap-3 mt-5">

          <div className="w-4 h-4 rounded-full bg-orange-400 shadow-[0_0_25px_rgba(255,120,0,0.9)]"></div>

          <span className="text-orange-400 font-black text-xl uppercase">
            AKUN DIBEKUKAN
          </span>

        </div>
      );
    }

    return (
      <div className="flex items-center gap-3 mt-5">

        <div className="w-4 h-4 rounded-full bg-yellow-400 shadow-[0_0_25px_rgba(250,204,21,0.9)]"></div>

        <span className="text-yellow-400 font-black text-xl uppercase">
          FREE MEMBER
        </span>

      </div>
    );
  }

  function renderGreeting() {

    if (memberStatus === "aktif") {

      return (
        <p className="text-zinc-400 mt-4 text-base md:text-lg max-w-2xl leading-relaxed">
          Selamat datang kembali di ekosistem affiliate modern DAN.
          Bangun jaringan digitalmu dan tingkatkan penghasilan langsung dari dashboard premium ini.
        </p>
      );
    }

    if (memberStatus === "dibekukan") {

      return (
        <p className="text-zinc-400 mt-4 text-base md:text-lg max-w-2xl leading-relaxed">
          Akunmu sedang dibekukan sementara.
          Lakukan transaksi pembelian untuk mengaktifkan kembali seluruh fitur affiliate DAN.
        </p>
      );
    }

    return (
      <p className="text-zinc-400 mt-4 text-base md:text-lg max-w-2xl leading-relaxed">
        Selamat datang di Digital Affiliate Network.
        Aktifkan akunmu sekarang dan mulai membangun penghasilan digital modern bersama DAN.
      </p>
    );
  }

  function renderStatusCard() {

    if (memberStatus === "aktif") {

      return (
        <div className="relative overflow-hidden mt-8 rounded-[38px] border border-green-500/20 bg-green-500/10 p-6 md:p-8 shadow-[0_0_45px_rgba(0,255,100,0.12)]">

          <div className="absolute top-0 right-0 w-72 h-72 bg-green-400/10 blur-[140px] rounded-full"></div>

          <div className="relative z-10">

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20">

              <Crown
                size={16}
                className="text-green-400"
              />

              <span className="text-green-400 text-sm font-black tracking-[0.2em]">
                MEMBER AKTIF
              </span>

            </div>

            <h2 className="text-3xl md:text-5xl font-black leading-tight mt-6 max-w-4xl">
              Bangun jaringan digital yang menghasilkan bersama DAN.
            </h2>

            <p className="text-green-100/70 text-sm md:text-base leading-relaxed mt-5 max-w-3xl">
              Nikmati seluruh fitur premium dan bangun penghasilan affiliate digital tanpa batas.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">

              <button className="inline-flex h-14 px-7 rounded-3xl bg-green-500 hover:bg-green-400 transition-all duration-300 text-black font-black text-sm items-center justify-center gap-3 shadow-[0_0_35px_rgba(0,255,120,0.20)]">

                <Users size={20} />

                Bagikan Referral

              </button>

              <Link
                href="/member/referral"
                className="inline-flex h-14 px-7 rounded-3xl border border-green-500/20 bg-black/20 hover:bg-black/40 transition-all duration-300 text-white font-black text-sm items-center justify-center gap-3"
              >

                <TrendingUp size={20} />

                Lihat Jaringan

              </Link>

            </div>

          </div>

        </div>
      );
    }

    if (memberStatus === "dibekukan") {

      return (
        <div className="relative overflow-hidden mt-8 rounded-[38px] border border-orange-500/20 bg-orange-500/10 p-6 md:p-8 shadow-[0_0_45px_rgba(255,120,0,0.10)]">

          <div className="absolute top-0 right-0 w-72 h-72 bg-orange-400/10 blur-[140px] rounded-full"></div>

          <div className="relative z-10">

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20">

              <ShieldCheck
                size={16}
                className="text-orange-400"
              />

              <span className="text-orange-400 text-sm font-black tracking-[0.2em]">
                AKUN DIBEKUKAN
              </span>

            </div>

            <h2 className="text-3xl md:text-5xl font-black leading-tight mt-6 max-w-4xl">
              Aktifkan kembali akunmu untuk melanjutkan aktivitas digital.
            </h2>

            <p className="text-orange-100/70 text-sm md:text-base leading-relaxed mt-5 max-w-3xl">
              Lakukan transaksi pembelian untuk membuka kembali seluruh fitur DAN secara otomatis.
            </p>

            <Link
              href="/member/produk"
              className="inline-flex h-14 px-7 mt-8 rounded-3xl bg-orange-500 hover:bg-orange-400 transition-all duration-300 text-black font-black text-sm items-center justify-center gap-3 shadow-[0_0_35px_rgba(255,120,0,0.20)]"
            >

              <ShoppingBag size={20} />

              Belanja Sekarang

            </Link>

          </div>

        </div>
      );
    }

    return (
      <div className="relative overflow-hidden mt-8 rounded-[38px] border border-yellow-500/20 bg-yellow-500/10 p-6 md:p-8 shadow-[0_0_45px_rgba(250,204,21,0.12)]">

        <div className="absolute top-0 right-0 w-72 h-72 bg-yellow-400/10 blur-[140px] rounded-full"></div>

        <div className="relative z-10">

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20">

            <Sparkles
              size={16}
              className="text-yellow-400"
            />

            <span className="text-yellow-400 text-sm font-black tracking-[0.2em]">
              FREE MEMBER
            </span>

          </div>

          <h2 className="text-3xl md:text-5xl font-black leading-tight mt-6 max-w-4xl">
            Aktifkan akunmu sekarang dan mulai membangun penghasilan digital.
          </h2>

          <p className="text-yellow-100/70 text-sm md:text-base leading-relaxed mt-5 max-w-3xl">
            Buka seluruh fitur premium DAN dan nikmati pengalaman affiliate modern langsung dari dashboard eksklusif ini.
          </p>

          <Link
            href="/member/produk"
            className="inline-flex h-14 px-7 mt-8 rounded-3xl bg-yellow-400 hover:bg-yellow-300 transition-all duration-300 text-black font-black text-sm items-center justify-center gap-3 shadow-[0_0_35px_rgba(250,204,21,0.20)]"
          >

            <Sparkles size={20} />

            Aktivasi Sekarang

          </Link>

        </div>

      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">

      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,255,100,0.12),transparent_30%)] pointer-events-none"></div>

      <div className="fixed bottom-0 left-0 w-72 h-72 bg-green-500/5 blur-3xl rounded-full pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-5 py-6 md:px-8 relative z-10">

        <div className="flex items-start justify-between gap-5 flex-wrap">

          <div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 mb-5">

              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>

              <span className="text-green-400 text-sm font-black tracking-[0.2em]">
                MEMBER DASHBOARD
              </span>

            </div>

            <p className="text-zinc-500 text-sm tracking-[0.2em] uppercase">
              Digital Affiliate Network
            </p>

            <h1 className="text-5xl md:text-7xl font-black mt-3 tracking-tight leading-none">
              Basri
            </h1>

            {renderGreeting()}

            {renderMemberBadge()}

          </div>

          <button className="h-14 px-6 rounded-[24px] bg-red-600 hover:bg-red-700 transition-all duration-300 flex items-center gap-3 font-black text-sm shadow-[0_0_30px_rgba(255,0,0,0.35)]">

            <LogOut size={20} />

            Logout

          </button>

        </div>

        {renderStatusCard()}

        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mt-8">

          <div className="bg-white/[0.03] border border-zinc-800 rounded-[30px] p-5">

            <div className="flex items-center justify-between">

              <p className="text-zinc-500 text-sm">
                Saldo Total
              </p>

              <Wallet
                size={18}
                className="text-green-400"
              />

            </div>

            <h2 className="text-green-400 text-4xl font-black mt-5">
              Rp 0
            </h2>

          </div>

          <div className="bg-white/[0.03] border border-zinc-800 rounded-[30px] p-5">

            <div className="flex items-center justify-between">

              <p className="text-zinc-500 text-sm">
                Total Referral
              </p>

              <Users
                size={18}
                className="text-white"
              />

            </div>

            <h2 className="text-4xl font-black mt-5">
              0
            </h2>

          </div>

          <div className="bg-white/[0.03] border border-zinc-800 rounded-[30px] p-5">

            <div className="flex items-center justify-between">

              <p className="text-zinc-500 text-sm">
                Bonus Sponsor
              </p>

              <Gift
                size={18}
                className="text-white"
              />

            </div>

            <h2 className="text-4xl font-black mt-5">
              Rp 0
            </h2>

          </div>

          <div className="bg-white/[0.03] border border-zinc-800 rounded-[30px] p-5">

            <div className="flex items-center justify-between">

              <p className="text-zinc-500 text-sm">
                Bonus Referral
              </p>

              <BadgeDollarSign
                size={18}
                className="text-white"
              />

            </div>

            <h2 className="text-4xl font-black mt-5">
              Rp 0
            </h2>

          </div>

        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">

          <Link
            href="/member/transaksi"
            className="bg-white/[0.03] border border-zinc-800 hover:border-green-500 transition-all duration-300 rounded-[30px] p-6"
          >

            <Wallet size={34} />

            <h2 className="text-2xl font-black mt-6">
              Transaksi
            </h2>

          </Link>

          <Link
            href="/member/referral"
            className="bg-white/[0.03] border border-zinc-800 hover:border-green-500 transition-all duration-300 rounded-[30px] p-6"
          >

            <Users size={34} />

            <h2 className="text-2xl font-black mt-6">
              Referral
            </h2>

          </Link>

          <Link
            href="/member/profile"
            className="bg-white/[0.03] border border-zinc-800 hover:border-green-500 transition-all duration-300 rounded-[30px] p-6"
          >

            <User size={34} />

            <h2 className="text-2xl font-black mt-6">
              Profil
            </h2>

          </Link>

        </div>

      </div>
    </main>
  );
}
