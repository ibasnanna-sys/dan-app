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

        setMemberName(
          currentMember.name
        );

        setMemberCity(
          currentMember.city
        );
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

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
      <div className="relative max-w-6xl mx-auto px-4 sm:px-5 py-5 pb-32">

        {/* HEADER */}
        <div className="flex items-start justify-between gap-4">

          <div className="flex items-start gap-4">

            <div className="w-14 h-14 rounded-3xl bg-green-500/10 border border-green-500/20 flex items-center justify-center">
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
              className="w-12 h-12 rounded-2xl border border-zinc-800 bg-zinc-950 flex items-center justify-center"
            >
              <Bell size={20} />
            </Link>

            <Link
              href="/member/profile"
              className="w-12 h-12 rounded-2xl border border-zinc-800 bg-zinc-950 flex items-center justify-center"
            >
              <User size={20} />
            </Link>

          </div>

        </div>

        {/* REFERRAL CARD */}
        <div className="relative overflow-hidden rounded-[32px] sm:rounded-[40px] border border-green-500/20 bg-gradient-to-br from-green-500/10 to-black mt-8 p-5 sm:p-7">

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
              <p className="text-zinc-500 text-sm">
                Bonus Sponsor
              </p>

              <h3 className="text-xl sm:text-2xl font-black mt-4">
                Rp 0
              </h3>
            </div>

            <div className="rounded-[24px] border border-zinc-800 bg-black/40 p-4">
              <p className="text-zinc-500 text-sm">
                Bonus Referral
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

              <div className="flex items-center gap-4">

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

              <div className="h-11 px-5 rounded-2xl bg-green-500 text-black font-black flex items-center justify-center text-sm">
                Buka
              </div>

            </Link>

          </div>

        </div>

        {/* MEMBER DIBEKUKAN */}
        {memberStatus ===
          "dibekukan" && (

          <div className="rounded-[32px] border border-orange-500/20 bg-orange-500/10 mt-8 p-6">

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20">

              <ShieldAlert
                size={16}
                className="text-orange-400"
              />

              <span className="text-orange-400 text-xs font-black tracking-[0.2em]">
                STATUS DIBEKUKAN
              </span>

            </div>

          </div>

        )}

        {/* FREE MEMBER */}
        {memberStatus === "free" && (

          <div className="rounded-[32px] border border-yellow-500/20 bg-yellow-500/10 mt-8 p-6">

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20">

              <Sparkles
                size={16}
                className="text-yellow-400"
              />

              <span className="text-yellow-400 text-xs font-black tracking-[0.2em]">
                AKTIVASI MEMBER
              </span>

            </div>

            <Link
              href="/member/produk"
              className="inline-flex h-14 px-7 mt-8 rounded-3xl bg-yellow-400 text-black font-black items-center justify-center gap-3"
            >

              <Sparkles size={20} />

              Aktivasi Sekarang

            </Link>

          </div>

        )}

        {/* MEMBER MENU */}
        {memberStatus !== "free" && (

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">

            <Link
              href="/member/produk"
              className="rounded-[30px] border border-green-500/20 bg-green-500/10 p-6"
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
              className="rounded-[30px] border border-zinc-800 bg-zinc-950 p-6"
            >

              <ReceiptText size={34} />

              <h2 className="text-2xl font-black mt-6">
                Histori Transaksi
              </h2>

            </Link>

            <Link
              href="/member/withdraw"
              className="rounded-[30px] border border-zinc-800 bg-zinc-950 p-6"
            >

              <CreditCard size={34} />

              <h2 className="text-2xl font-black mt-6">
                Withdraw
              </h2>

            </Link>

          </div>

        )}

      </div>
    </main>
  );
}
