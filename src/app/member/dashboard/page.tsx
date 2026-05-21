"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import {
  Bell,
  User,
  Users,
  ShoppingBag,
  CreditCard,
  ReceiptText,
  Crown,
  Sparkles,
  ShieldAlert,
} from "lucide-react";

type MemberStatus =
  | "free"
  | "aktif"
  | "dibekukan";

type MemberData = {
  id: string;
  name: string;
  city: string;
  status: MemberStatus;
};

export default function Home() {

  const [memberStatus, setMemberStatus] =
    useState<MemberStatus>("free");

  const [memberName, setMemberName] =
    useState("Basri");

  const [memberCity, setMemberCity] =
    useState("Makassar");

  /*
    ============================================
    LOAD MEMBER
    ============================================
  */

  useEffect(() => {

    const memberId =
      localStorage.getItem("member_id");

    const members =
      localStorage.getItem("dan-members");

    if (!members) return;

    try {

      const parsed: MemberData[] =
        JSON.parse(members);

      const currentMember =
        parsed.find(
          (m) =>
            String(m.id) ===
            String(memberId)
        );

      if (currentMember) {

        setMemberStatus(
          currentMember.status
        );

        if (currentMember.name) {

          setMemberName(
            currentMember.name
          );

        }

        if (currentMember.city) {

          setMemberCity(
            currentMember.city
          );

        }

      }

    } catch (err) {

      console.error(err);

    }

  }, []);

  /*
    ============================================
    LIVE ACTIVITY
    ============================================
  */

  const activities = [
    {
      name: "Akbar",
      city: "Makassar",
      activity:
        "Aktivasi member berhasil",
      time: "2 menit lalu",
    },
    {
      name: "Dewi",
      city: "Bandung",
      activity:
        "Belanja paket data",
      time: "5 menit lalu",
    },
    {
      name: "Rizky",
      city: "Jakarta",
      activity:
        "Bonus referral masuk",
      time: "9 menit lalu",
    },
    {
      name: "Fajar",
      city: "Surabaya",
      activity:
        "Withdraw berhasil",
      time: "12 menit lalu",
    },
  ];

  const [activityIndex, setActivityIndex] =
    useState(0);

  useEffect(() => {

    const interval =
      setInterval(() => {

        setActivityIndex((prev) =>
          prev ===
          activities.length - 1
            ? 0
            : prev + 1
        );

      }, 3500);

    return () =>
      clearInterval(interval);

  }, [activities.length]);

  /*
    ============================================
    STATUS STYLE
    ============================================
  */

  const status = useMemo(() => {

    if (memberStatus === "aktif") {

      return {
        text: "text-green-400",
        dot: "bg-green-400",
        label: "MEMBER AKTIF",
      };

    }

    if (
      memberStatus ===
      "dibekukan"
    ) {

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

  }, [memberStatus]);

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

            <div className="w-14 h-14 rounded-3xl bg-green-500/10 border border-green-500/20 flex items-center justify-center shadow-[0_0_30px_rgba(0,255,120,0.12)]">

              <span className="text-green-400 font-black text-xl">
                DAN
              </span>

            </div>

            <div>

              <p className="text-zinc-500 text-xs tracking-[0.25em] uppercase">
                Digital Affiliate Network
              </p>

              <h1 className="text-3xl sm:text-5xl font-black mt-2 tracking-tight">
                {memberName}
              </h1>

              <p className="text-zinc-500 mt-1 text-sm">
                {memberCity}
              </p>

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

          <div className="flex items-center gap-3">

            <Link
              href="/member/pemberitahuan"
              className="relative w-12 h-12 rounded-2xl border border-zinc-800 bg-zinc-950 hover:border-green-500 transition-all duration-300 flex items-center justify-center"
            >

              <Bell size={20} />

              <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-green-400"></div>

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

            {/* TOTAL BONUS */}
            <div className="grid grid-cols-1 gap-4">

              <div className="rounded-[24px] border border-zinc-800 bg-black/40 p-4">

                <p className="text-zinc-500 text-sm">
                  Total Bonus
                </p>

                <h3 className="text-xl sm:text-2xl font-black mt-4">
                  Rp 0
                </h3>

              </div>

            </div>

            {/* REFERRAL BUTTON */}
            <div className="mt-5">

              <Link
                href="/member/referral"
                className="group relative overflow-hidden flex items-center justify-between rounded-[28px] border border-zinc-800 bg-zinc-950 hover:border-green-500 transition-all duration-300 p-5"
              >

                <div className="absolute inset-0 bg-green-500/5 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>

                <div className="relative z-10 flex items-center gap-4">

                  <div className="w-14 h-14 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center">

                    <Users
                      size={26}
                      className="text-green-400"
                    />

                  </div>

                  <div>

                    <p className="text-zinc-500 text-sm">
                      Referral Network
                    </p>

                    <h3 className="text-xl sm:text-2xl font-black mt-1">
                      Referral
                    </h3>

                  </div>

                </div>

                <div className="relative z-10">

                  <div className="h-11 px-5 rounded-2xl bg-green-500 text-black font-black flex items-center justify-center text-sm shadow-[0_0_25px_rgba(0,255,120,0.20)]">

                    Buka

                  </div>

                </div>

              </Link>

            </div>

          </div>

        </div>

        {/* FREE MEMBER */}
        {memberStatus === "free" && (

          <div className="relative overflow-hidden rounded-[32px] sm:rounded-[40px] border border-yellow-500/20 bg-yellow-500/10 mt-8 p-6 sm:p-7 shadow-[0_0_40px_rgba(250,204,21,0.10)]">

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
                Setelah aktivasi kamu dapat belanja paket data, menerima bonus referral, dan melakukan withdraw.
              </p>

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

        
{/* MEMBER MENU */}
        
{memberStatus === "aktif" && (
        
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

          </Link>

          <Link
            href="/member/transaksi"
            className="relative overflow-hidden rounded-[30px] border border-zinc-800 bg-zinc-950 p-6 hover:border-green-500 transition-all duration-300"
          >

            <ReceiptText size={34} />

            <h2 className="text-2xl font-black mt-6">
              Histori Transaksi
            </h2>

          </Link>

          <Link
            href="/member/withdraw"
            className="relative overflow-hidden rounded-[30px] border border-zinc-800 bg-zinc-950 p-6 hover:border-green-500 transition-all duration-300"
          >

            <CreditCard size={34} />

            <h2 className="text-2xl font-black mt-6">
              Withdraw
            </h2>

          </Link>

        </div>
  )}

{/* LOGOUT BUTTON */}
<div className="mt-5">

  <button
    onClick={() => {

      localStorage.removeItem("member_id");

      window.location.href = "/login";

    }}
    className="w-full h-14 rounded-[28px] border border-red-500/20 bg-red-500/10 text-red-400 font-black hover:bg-red-500/20 transition-all duration-300"
  >

    Logout

  </button>

</div>
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

            {activities.map(
              (item, index) => (

                <div
                  key={index}
                  className={`absolute inset-0 transition-all duration-700 ${
                    index === activityIndex
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8 pointer-events-none"
                  }`}
                >

                  <div className="relative overflow-hidden rounded-[28px] border border-zinc-800 bg-zinc-950 p-5 h-full">

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

              )
            )}

          </div>

        </div>

      </div>

    </main>
  );
}
