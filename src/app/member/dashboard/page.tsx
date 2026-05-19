"use client";

import Link from "next/link";

const activities = [
  {
    name: "Andi",
    city: "Makassar",
    action: "Aktivasi Member",
    time: "2 menit lalu",
  },
  {
    name: "Rina",
    city: "Bone",
    action: "Belanja Paket 25GB",
    time: "5 menit lalu",
  },
  {
    name: "Fajar",
    city: "Jakarta",
    action: "Bonus Referral Masuk",
    time: "8 menit lalu",
  },
  {
    name: "Dewi",
    city: "Bandung",
    action: "Belanja Paket Unlimited",
    time: "12 menit lalu",
  },
  {
    name: "Akbar",
    city: "Surabaya",
    action: "Aktivasi Member",
    time: "15 menit lalu",
  },
];

export default function DashboardPage() {
  const member = {
    name: "Basri",
    status: "FREE",
    referralCode: "DAN614928",
    referralLink: "https://dan.app/register?ref=DAN614928",
    saldo: 0,
    referral: 0,
    sponsor: 0,
    bonus: 0,
  };

  const copyCode = async () => {
    await navigator.clipboard.writeText(member.referralCode);
    alert("Kode referral berhasil disalin");
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(member.referralLink);
    alert("Link referral berhasil disalin");
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto px-4 py-6 md:px-6 lg:px-8">
        {/* HEADER */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-zinc-500 text-sm md:text-base">Halo,</p>

            <h1 className="text-4xl md:text-6xl font-black tracking-tight mt-1">
              {member.name}
            </h1>

            <div className="mt-4">
              <span className="inline-flex items-center gap-2 text-yellow-400 font-bold text-lg md:text-xl">
                <span className="w-4 h-4 rounded-full bg-yellow-400"></span>
                FREE
              </span>
            </div>
          </div>

          <button className="bg-red-600 hover:bg-red-700 transition px-5 py-3 rounded-3xl text-sm md:text-base font-bold">
            Logout
          </button>
        </div>

        {/* REFERRAL CARD */}
        <div className="mt-8 bg-zinc-900/90 border border-zinc-800 rounded-[32px] p-6 md:p-8 backdrop-blur-xl shadow-2xl">
          <p className="text-zinc-500 text-sm md:text-base">
            Referral Code
          </p>

          <h2 className="text-4xl md:text-5xl font-black mt-3 tracking-tight">
            {member.referralCode}
          </h2>

          <div className="flex flex-wrap gap-3 mt-6">
            <button
              onClick={copyLink}
              className="px-5 py-3 rounded-2xl bg-black border border-zinc-800 hover:border-zinc-600 transition font-semibold text-sm"
            >
              Copy Link
            </button>

            <button
              onClick={copyCode}
              className="px-5 py-3 rounded-2xl bg-black border border-zinc-800 hover:border-zinc-600 transition font-semibold text-sm"
            >
              Copy Kode
            </button>
          </div>
        </div>

        {/* STATISTIK */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-[28px] p-5">
            <p className="text-zinc-500 text-sm">Saldo Total</p>

            <h3 className="text-green-400 text-3xl md:text-4xl font-black mt-4">
              Rp 0
            </h3>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-[28px] p-5">
            <p className="text-zinc-500 text-sm">Total Referral</p>

            <h3 className="text-3xl md:text-4xl font-black mt-4">
              0
            </h3>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-[28px] p-5">
            <p className="text-zinc-500 text-sm">Bonus Sponsor</p>

            <h3 className="text-3xl md:text-4xl font-black mt-4">
              Rp 0
            </h3>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-[28px] p-5">
            <p className="text-zinc-500 text-sm">Bonus Referral</p>

            <h3 className="text-3xl md:text-4xl font-black mt-4">
              Rp 0
            </h3>
          </div>
        </div>

        {/* MENU UTAMA */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
          <Link
            href="/member/produk"
            className="bg-green-500 hover:bg-green-400 transition rounded-[28px] p-5 text-center font-black text-black text-lg"
          >
            Aktivasi Member
          </Link>

          <Link
            href="/member/transaksi"
            className="bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition rounded-[28px] p-5 text-center font-bold"
          >
            Transaksi
          </Link>

          <Link
            href="/member/referral"
            className="bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition rounded-[28px] p-5 text-center font-bold"
          >
            Referral
          </Link>

          <Link
            href="/member/profile"
            className="bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition rounded-[28px] p-5 text-center font-bold"
          >
            Profil
          </Link>

          <Link
            href="/member/bantuan"
            className="bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition rounded-[28px] p-5 text-center font-bold"
          >
            Bantuan
          </Link>

          <button className="bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition rounded-[28px] p-5 text-center font-bold">
            Withdraw
          </button>
        </div>

        {/* LIVE AKTIVITAS */}
        <div className="mt-10">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-2xl md:text-3xl font-black">
              Aktivitas Member
            </h2>

            <span className="text-green-400 text-sm font-semibold">
              LIVE
            </span>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-[32px] p-4 h-[340px] overflow-hidden relative">
            <div className="animate-marquee space-y-4">
              {[...activities, ...activities].map((item, index) => (
                <div
                  key={index}
                  className="bg-black/40 border border-zinc-800 rounded-2xl p-4"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-lg">
                        {item.name}
                      </h3>

                      <p className="text-zinc-500 text-sm">
                        {item.city}
                      </p>
                    </div>

                    <span className="text-zinc-500 text-xs">
                      {item.time}
                    </span>
                  </div>

                  <p className="mt-3 text-white font-medium">
                    {item.action}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .animate-marquee {
          animation: scrollUp 20s linear infinite;
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
