"use client";

import Link from "next/link";
import { useMemo } from "react";

export default function DashboardPage() {
  const member = {
    name: "Basri",
    status: "FREE",
    referralCode: "DAN614928",
    referralLink: "https://dan-app.com/register?ref=DAN614928",
    saldo: 0,
    totalReferral: 0,
    bonusSponsor: 0,
    bonusReferral: 0,
  };

  const activities = useMemo(
    () => [
      {
        name: "Andi",
        city: "Makassar",
        action: "Aktivasi Member",
        time: "1 menit lalu",
      },
      {
        name: "Rina",
        city: "Bone",
        action: "Belanja Paket 25GB",
        time: "3 menit lalu",
      },
      {
        name: "Fajar",
        city: "Jakarta",
        action: "Bonus Referral Masuk",
        time: "6 menit lalu",
      },
      {
        name: "Dewi",
        city: "Bandung",
        action: "Belanja Paket Unlimited",
        time: "10 menit lalu",
      },
      {
        name: "Akbar",
        city: "Surabaya",
        action: "Aktivasi Member",
        time: "15 menit lalu",
      },
    ],
    []
  );

  const copyLink = async () => {
    await navigator.clipboard.writeText(member.referralLink);
    alert("Link referral berhasil disalin");
  };

  const copyCode = async () => {
    await navigator.clipboard.writeText(member.referralCode);
    alert("Kode referral berhasil disalin");
  };

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-10">
        {/* HEADER */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-zinc-500 text-sm md:text-base">
              Halo,
            </p>

            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-none mt-1">
              {member.name}
            </h1>

            <div className="mt-5 inline-flex items-center gap-3 bg-zinc-900 border border-yellow-500/20 px-4 py-2 rounded-full">
              <span className="w-3 h-3 rounded-full bg-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.8)]"></span>

              <span className="text-yellow-400 font-bold tracking-wide text-sm md:text-base">
                FREE MEMBER
              </span>
            </div>
          </div>

          <button className="bg-red-600 hover:bg-red-700 transition-all duration-300 px-5 md:px-6 py-3 rounded-2xl font-bold text-sm shadow-[0_0_30px_rgba(220,38,38,0.35)]">
            Logout
          </button>
        </div>

        {/* HERO REFERRAL */}
        <div className="mt-8 relative overflow-hidden rounded-[36px] border border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-950 p-6 md:p-8 shadow-2xl">
          <div className="absolute top-0 right-0 w-56 h-56 bg-green-500/10 blur-3xl rounded-full"></div>

          <div className="relative z-10">
            <p className="text-zinc-500 text-sm md:text-base">
              Referral Code
            </p>

            <h2 className="mt-3 text-4xl md:text-6xl font-black tracking-tight">
              {member.referralCode}
            </h2>

            <div className="flex flex-wrap gap-3 mt-7">
              <button
                onClick={copyLink}
                className="px-5 py-3 rounded-2xl bg-black border border-zinc-700 hover:border-green-500 transition-all font-semibold text-sm"
              >
                Copy Link
              </button>

              <button
                onClick={copyCode}
                className="px-5 py-3 rounded-2xl bg-black border border-zinc-700 hover:border-green-500 transition-all font-semibold text-sm"
              >
                Copy Kode
              </button>
            </div>
          </div>
        </div>

        {/* STATISTIK */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mt-6">
          <Card
            title="Saldo Total"
            value={`Rp ${member.saldo}`}
            valueClass="text-green-400"
            glow="green"
          />

          <Card
            title="Total Referral"
            value={`${member.totalReferral}`}
          />

          <Card
            title="Bonus Sponsor"
            value={`Rp ${member.bonusSponsor}`}
          />

          <Card
            title="Bonus Referral"
            value={`Rp ${member.bonusReferral}`}
          />
        </div>

        {/* MENU */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
          <MenuButton
            href="/member/produk"
            label="Aktivasi Member"
            active
          />

          <MenuButton
            href="/member/transaksi"
            label="Transaksi"
          />

          <MenuButton
            href="/member/referral"
            label="Referral"
          />

          <MenuButton
            href="/member/profile"
            label="Profil"
          />

          <MenuButton
            href="/member/bantuan"
            label="Bantuan"
          />

          <MenuButton
            href="/member/withdraw"
            label="Withdraw"
          />
        </div>

        {/* LIVE AKTIVITAS */}
        <div className="mt-10">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-2xl md:text-3xl font-black tracking-tight">
              Aktivitas Member
            </h2>

            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse"></span>

              <span className="text-green-400 text-xs md:text-sm font-bold tracking-widest">
                LIVE
              </span>
            </div>
          </div>

          <div className="relative h-[380px] overflow-hidden rounded-[32px] border border-zinc-800 bg-zinc-950 p-4">
            <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black to-transparent z-10"></div>

            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent z-10"></div>

            <div className="animate-scroll space-y-4">
              {[...activities, ...activities].map((item, index) => (
                <div
                  key={index}
                  className="rounded-3xl border border-zinc-800 bg-zinc-900/80 backdrop-blur-xl p-5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-bold text-lg">
                        {item.name}
                      </h3>

                      <p className="text-zinc-500 text-sm mt-1">
                        {item.city}
                      </p>
                    </div>

                    <span className="text-zinc-500 text-xs whitespace-nowrap">
                      {item.time}
                    </span>
                  </div>

                  <p className="mt-4 text-white font-medium">
                    {item.action}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .animate-scroll {
          animation: scrollUp 24s linear infinite;
        }

        @keyframes scrollUp {
          0% {
            transform: translateY(0%);
          }

          100% {
            transform: translateY(-50%);
          }
        }
      `}</style>
    </main>
  );
}

function Card({
  title,
  value,
  valueClass = "",
  glow = "",
}: {
  title: string;
  value: string;
  valueClass?: string;
  glow?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-[30px] border border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-950 p-5 md:p-6 ${
        glow === "green"
          ? "shadow-[0_0_40px_rgba(34,197,94,0.12)]"
          : ""
      }`}
    >
      <div className="absolute top-0 right-0 w-28 h-28 bg-white/5 blur-3xl rounded-full"></div>

      <p className="text-zinc-500 text-sm md:text-base relative z-10">
        {title}
      </p>

      <h3
        className={`relative z-10 mt-5 text-3xl md:text-4xl font-black tracking-tight ${valueClass}`}
      >
        {value}
      </h3>
    </div>
  );
}

function MenuButton({
  href,
  label,
  active = false,
}: {
  href: string;
  label: string;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`rounded-[26px] px-5 py-5 text-center font-bold transition-all duration-300 ${
        active
          ? "bg-green-500 text-black hover:bg-green-400 shadow-[0_0_40px_rgba(34,197,94,0.35)]"
          : "bg-zinc-900 border border-zinc-800 hover:border-zinc-600 hover:bg-zinc-800"
      }`}
    >
      {label}
    </Link>
  );
}
