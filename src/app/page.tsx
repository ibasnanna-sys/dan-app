"use client";

import Link from "next/link";

export default function Home() {
  const activities = [
    {
      name: "Akbar",
      city: "Surabaya",
      activity: "Aktivasi Member",
      time: "2 menit lalu",
    },
    {
      name: "Dewi",
      city: "Bandung",
      activity: "Belanja Paket Unlimited",
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

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto px-5 py-6 md:px-8">

        {/* HEADER */}
        <div className="flex items-start justify-between gap-4">

          <div>
            <p className="text-zinc-500 text-sm">
              Halo,
            </p>

            <h1 className="text-5xl md:text-6xl font-black mt-1 tracking-tight">
              Basri
            </h1>

            <div className="flex items-center gap-3 mt-5">
              <div className="w-4 h-4 rounded-full bg-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.8)]"></div>

              <span className="text-yellow-400 font-black text-xl">
                FREE
              </span>
            </div>
          </div>

          <button className="bg-red-600 hover:bg-red-700 transition px-5 py-3 rounded-2xl font-bold text-sm">
            Logout
          </button>

        </div>

        {/* REFERRAL */}
        <div className="relative overflow-hidden mt-8 rounded-[32px] border border-zinc-800 bg-zinc-900 p-6 md:p-8">

          <div className="absolute top-0 right-0 w-40 h-40 bg-green-500/10 blur-3xl rounded-full"></div>

          <div className="relative z-10">

            <p className="text-zinc-500 text-sm">
              Referral Code
            </p>

            <h2 className="text-5xl md:text-6xl font-black mt-3 tracking-tight">
              DAN614928
            </h2>

            <div className="flex flex-wrap gap-3 mt-7">

              <button className="px-5 py-3 rounded-2xl bg-black border border-zinc-800 hover:border-zinc-600 transition text-sm font-bold">
                Copy Link
              </button>

              <button className="px-5 py-3 rounded-2xl bg-black border border-zinc-800 hover:border-zinc-600 transition text-sm font-bold">
                Copy Kode
              </button>

            </div>

          </div>

        </div>

        {/* INFO */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mt-6">

          <div className="bg-zinc-900 border border-zinc-800 rounded-[28px] p-5">
            <p className="text-zinc-500 text-sm">
              Saldo Total
            </p>

            <h2 className="text-green-400 text-4xl font-black mt-4">
              Rp 0
            </h2>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-[28px] p-5">
            <p className="text-zinc-500 text-sm">
              Total Referral
            </p>

            <h2 className="text-4xl font-black mt-4">
              0
            </h2>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-[28px] p-5">
            <p className="text-zinc-500 text-sm">
              Bonus Sponsor
            </p>

            <h2 className="text-4xl font-black mt-4">
              Rp 0
            </h2>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-[28px] p-5">
            <p className="text-zinc-500 text-sm">
              Bonus Referral
            </p>

            <h2 className="text-4xl font-black mt-4">
              Rp 0
            </h2>
          </div>

        </div>

        {/* MENU */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">

          <Link
            href="/member/produk"
            className="bg-green-500 hover:bg-green-400 transition text-black rounded-[28px] p-5 text-center font-black"
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

          <Link
            href="/member/withdraw"
            className="bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition rounded-[28px] p-5 text-center font-bold"
          >
            Withdraw
          </Link>

        </div>

        {/* LIVE ACTIVITY */}
        <div className="mt-10">

          <div className="flex items-center justify-between mb-5">

            <h2 className="text-3xl font-black">
              Aktivitas Member
            </h2>

            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>

              <span className="text-green-400 text-sm font-bold">
                LIVE
              </span>
            </div>

          </div>

          <div className="relative h-[420px] overflow-hidden rounded-[32px] border border-zinc-800 bg-zinc-950 p-4">

            <div className="animate-scroll space-y-4">

              {[...activities, ...activities].map((item, index) => (
                <div
                  key={index}
                  className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5"
                >

                  <div className="flex items-start justify-between">

                    <div>
                      <h3 className="font-bold text-xl">
                        {item.name}
                      </h3>

                      <p className="text-zinc-500 text-sm mt-1">
                        {item.city}
                      </p>
                    </div>

                    <span className="text-zinc-500 text-sm">
                      {item.time}
                    </span>

                  </div>

                  <p className="mt-4 text-lg">
                    {item.activity}
                  </p>

                </div>
              ))}

            </div>

          </div>

        </div>

      </div>

      <style jsx>{`
        .animate-scroll {
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
