"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import {
  Bell,
  User,
  Copy,
  Share2,
  Users,
  Wallet,
  Gift,
  BadgeDollarSign,
  ShoppingBag,
  CreditCard,
  ReceiptText,
  Crown,
  Sparkles,
} from "lucide-react";

export default function Home() {

  /*
    STATUS:
    - free
    - aktif
    - dibekukan
  */

  const [memberStatus] =
    useState<"free" | "aktif" | "dibekukan">(
      "free"
    );

  const activities = [
    {
      name: "Akbar",
      city: "Makassar",
      activity: "Aktivasi member",
      time: "2 menit lalu",
    },
    {
      name: "Dewi",
      city: "Bandung",
      activity: "Belanja paket data",
      time: "5 menit lalu",
    },
    {
      name: "Rizky",
      city: "Jakarta",
      activity: "Bonus referral masuk",
      time: "9 menit lalu",
    },
    {
      name: "Fajar",
      city: "Surabaya",
      activity: "Withdraw berhasil",
      time: "12 menit lalu",
    },
  ];

  const [activityIndex, setActivityIndex] =
    useState(0);

  useEffect(() => {

    const interval = setInterval(() => {

      setActivityIndex((prev) =>
        prev === activities.length - 1
          ? 0
          : prev + 1
      );

    }, 3500);

    return () => clearInterval(interval);

  }, []);

  function statusColor() {

    if (memberStatus === "aktif") {

      return {
        text: "text-green-400",
        dot: "bg-green-400",
        label: "MEMBER AKTIF",
      };
    }

    if (memberStatus === "dibekukan") {

      return {
        text: "text-orange-400",
        dot: "bg-orange-400",
        label: "DIBEKUKAN",
      };
    }

    return {
      text: "text-yellow-400",
      dot: "bg-yellow-400",
      label: "FREE MEMBER",
    };
  }

  const status = statusColor();

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">

      {/* BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none">

        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-green-500/10 blur-[140px]" />

        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-green-400/5 blur-[120px]" />

      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-5 py-5 pb-32">

        {/* HEADER */}
        <div className="flex items-start justify-between gap-4">

          <div className="flex items-start gap-4">

            {/* LOGO */}
            <div className="w-14 h-14 rounded-3xl bg-green-500/10 border border-green-500/20 flex items-center justify-center shadow-[0_0_30px_rgba(0,255,120,0.12)]">

              <span className="text-green-400 font-black text-xl">
                DAN
              </span>

            </div>

            {/* NAME */}
            <div>

              <p className="text-zinc-500 text-xs tracking-[0.25em] uppercase">
                Digital Affiliate Network
              </p>

              <h1 className="text-3xl sm:text-5xl font-black mt-2 tracking-tight">
                Basri
              </h1>

              <div className="flex items-center gap-2 mt-3">

                <div
                  className={`w-2.5 h-2.5 rounded-full ${status.dot}`}
                />

                <span
                  className={`text-xs sm:text-sm font-black tracking-[0.18em] ${status.text}`}
                >
                  {status.label}
                </span>

              </div>

            </div>

          </div>

          {/* ACTION */}
          <div className="flex items-center gap-3">

            <Link
              href="/member/pemberitahuan"
              className="relative w-12 h-12 rounded-2xl border border-zinc-800 bg-zinc-950 hover:border-green-500 transition-all duration-300 flex items-center justify-center"
            >

              <Bell size={20} />

              <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-green-400 text-[10px] text-black font-black flex items-center justify-center">
                2
              </div>

            </Link>

            <Link
              href="/member/profile"
              className="w-12 h-12 rounded-2xl border border-zinc-800 bg-zinc-950 hover:border-green-500 transition-all duration-300 flex items-center justify-center"
            >

              <User size={20} />

            </Link>

          </div>

        </div>

        {/* REFERRAL CARD */}
        <div className="relative overflow-hidden rounded-[32px] sm:rounded-[40px] border border-green-500/20 bg-gradient-to-br from-green-500/10 to-black mt-8 p-5 sm:p-7 shadow-[0_0_40px_rgba(0,255,120,0.08)]">

          <div className="absolute top-0 right-0 w-72 h-72 bg-green-500/10 blur-[140px] rounded-full"></div>

          <div className="relative z-10">

            <div className="flex items-center gap-3 mb-6">

              <div className="w-11 h-11 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center">

                <Crown
                  size={20}
                  className="text-green-400"
                />

              </div>

              <div>

                <p className="text-green-400 text-xs font-black tracking-[0.25em]">
                  REFERRAL COMMERCE
                </p>

                <h2 className="text-2xl sm:text-3xl font-black mt-1">
                  Dashboard Bonus
                </h2>

              </div>

            </div>

            {/* BONUS GRID */}
            <div className="grid grid-cols-2 gap-4">

              <div className="rounded-[24px] border border-zinc-800 bg-black/40 p-4">

                <div className="flex items-center justify-between">

                  <p className="text-zinc-500 text-sm">
                    Bonus Sponsor
                  </p>

                  <Gift
                    size={16}
                    className="text-white"
                  />

                </div>

                <h3 className="text-xl sm:text-2xl font-black mt-4">
                  Rp 0
                </h3>

              </div>

              <div className="rounded-[24px] border border-zinc-800 bg-black/40 p-4">

                <div className="flex items-center justify-between">

                  <p className="text-zinc-500 text-sm">
                    Bonus Referral
                  </p>

                  <BadgeDollarSign
                    size={16}
                    className="text-white"
                  />

                </div>

                <h3 className="text-xl sm:text-2xl font-black mt-4">
                  Rp 0
                </h3>

              </div>

              <div className="rounded-[24px] border border-zinc-800 bg-black/40 p-4">

                <div className="flex items-center justify-between">

                  <p className="text-zinc-500 text-sm">
                    Total Bonus
                  </p>

                  <Wallet
                    size={16}
                    className="text-green-400"
                  />

                </div>

                <h3 className="text-xl sm:text-2xl font-black text-green-400 mt-4">
                  Rp 0
                </h3>

              </div>

              <div className="rounded-[24px] border border-zinc-800 bg-black/40 p-4">

                <div className="flex items-center justify-between">

                  <p className="text-zinc-500 text-sm">
                    Total Referral
                  </p>

                  <Users
                    size={16}
                    className="text-white"
                  />

                </div>

                <h3 className="text-xl sm:text-2xl font-black mt-4">
                  0
                </h3>

              </div>

            </div>

            {/* REF CODE */}
            <div className="mt-5 rounded-[28px] border border-zinc-800 bg-black/40 p-5">

              <p className="text-zinc-500 text-sm">
                Kode Referral
              </p>

              <h3 className="text-xl sm:text-3xl font-black tracking-[0.15em] mt-3">
                BASRI001
              </h3>

              <div className="flex flex-wrap gap-3 mt-5">

                <button
                  type="button"
                  className="h-12 px-5 rounded-2xl bg-green-500 hover:bg-green-400 transition-all duration-300 text-black font-black text-sm flex items-center gap-2"
                >

                  <Copy size={16} />

                  Copy Link

                </button>

                <button
                  type="button"
                  className="h-12 px-5 rounded-2xl border border-zinc-700 hover:border-green-500 transition-all duration-300 text-sm font-black flex items-center gap-2"
                >

                  <Share2 size={16} />

                  Share Link

                </button>

                <Link
                  href="/member/referral"
                  className="h-12 px-5 rounded-2xl border border-zinc-700 hover:border-green-500 transition-all duration-300 text-sm font-black flex items-center gap-2"
                >

                  <Users size={16} />

                  Referral

                </Link>

              </div>

            </div>

          </div>

        </div>

        {/* FREE MEMBER */}
        {memberStatus === "free" && (

          <div className="relative overflow-hidden rounded-[32px] sm:rounded-[40px] border border-yellow-500/20 bg-yellow-500/10 mt-8 p-6 sm:p-7 shadow-[0_0_40px_rgba(250,204,21,0.10)]">

            <div className="absolute top-0 right-0 w-72 h-72 bg-yellow-400/10 blur-[140px] rounded-full"></div>

            <div className="relative z-10">

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20">

                <Sparkles
                  size={16}
                  className="text-yellow-400"
                />

                <span className="text-yellow-400 text-xs font-black tracking-[0.2em]">
                  AKTIVASI MEMBER
                </span>

              </div>

              <h2 className="text-3xl sm:text-5xl font-black leading-tight mt-6 max-w-4xl">
                Aktifkan akunmu untuk membuka seluruh fitur premium DAN.
              </h2>

              <p className="text-yellow-100/70 text-sm sm:text-base leading-relaxed mt-5 max-w-3xl">
                Setelah aktivasi kamu dapat belanja paket data,
                menerima bonus referral, dan melakukan withdraw.
              </p>

              <div className="space-y-3 mt-7">

                <div className="flex items-center gap-3 text-sm sm:text-base">

                  <div className="w-2 h-2 rounded-full bg-yellow-400"></div>

                  Bonus sponsor otomatis

                </div>

                <div className="flex items-center gap-3 text-sm sm:text-base">

                  <div className="w-2 h-2 rounded-full bg-yellow-400"></div>

                  Bonus referral realtime

                </div>

                <div className="flex items-center gap-3 text-sm sm:text-base">

                  <div className="w-2 h-2 rounded-full bg-yellow-400"></div>

                  Fitur withdraw premium

                </div>

              </div>

              <Link
                href="/member/produk"
                className="inline-flex h-14 px-7 mt-8 rounded-3xl bg-yellow-400 hover:bg-yellow-300 transition-all duration-300 text-black font-black text-sm items-center justify-center gap-3 shadow-[0_0_35px_rgba(250,204,21,0.25)]"
              >

                <Sparkles size={20} />

                Aktivasi Sekarang

              </Link>

            </div>

          </div>

        )}

        {/* MENU MEMBER AKTIF */}
        {memberStatus !== "free" && (

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">

            <Link
              href="/member/produk"
              className="relative overflow-hidden rounded-[30px] border border-green-500/20 bg-green-500/10 p-6 shadow-[0_0_35px_rgba(0,255,120,0.08)]"
            >

              <ShoppingBag
                size={34}
                className="text-green-400"
              />

              <h2 className="text-2xl font-black mt-6">
                Beli Paket Data
              </h2>

              <p className="text-green-100/70 text-sm mt-2">
                Belanja produk digital
              </p>

            </Link>

            <Link
              href="/member/transaksi"
              className="relative overflow-hidden rounded-[30px] border border-zinc-800 bg-zinc-950 p-6 hover:border-green-500 transition-all duration-300"
            >

              <ReceiptText size={34} />

              <h2 className="text-2xl font-black mt-6">
                Histori Transaksi
              </h2>

              <p className="text-zinc-500 text-sm mt-2">
                Riwayat transaksi member
              </p>

            </Link>

            <Link
              href="/member/withdraw"
              className="relative overflow-hidden rounded-[30px] border border-zinc-800 bg-zinc-950 p-6 hover:border-green-500 transition-all duration-300"
            >

              <CreditCard size={34} />

              <h2 className="text-2xl font-black mt-6">
                Withdraw
              </h2>

              <p className="text-zinc-500 text-sm mt-2">
                Tarik bonus referral
              </p>

            </Link>

          </div>

        )}

        {/* LIVE ACTIVITY */}
        <div className="mt-12">

          <div className="flex items-center justify-between mb-5">

            <h2 className="text-2xl sm:text-4xl font-black">
              Live Activity
            </h2>

            <div className="flex items-center gap-2">

              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>

              <span className="text-green-400 text-xs font-black tracking-[0.2em]">
                REALTIME
              </span>

            </div>

          </div>

          <div className="relative overflow-hidden h-[170px]">

            {activities.map((item, index) => (

              <div
                key={index}
                className={`absolute inset-0 transition-all duration-700 ${
                  index === activityIndex
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8 pointer-events-none"
                }`}
              >

                <div className="relative overflow-hidden rounded-[28px] border border-zinc-800 bg-zinc-950 p-5 h-full">

                  <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 blur-3xl rounded-full"></div>

                  <div className="relative z-10 flex items-start justify-between gap-4">

                    <div>

                      <h3 className="text-xl sm:text-2xl font-black">
                        {item.name}
                      </h3>

                      <p className="text-zinc-500 text-sm mt-1">
                        {item.city}
                      </p>

                      <p className="text-sm sm:text-base mt-4">
                        {item.activity}
                      </p>

                    </div>

                    <span className="text-zinc-500 text-xs sm:text-sm whitespace-nowrap">
                      {item.time}
                    </span>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

    </main>
  );
}
