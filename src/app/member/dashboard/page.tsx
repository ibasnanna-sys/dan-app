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
    <main className="min-h-screen bg-black text-white overflow-hidden">
      {/* BACKGROUND */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,255,100,0.12),transparent_30%)] pointer-events-none"></div>

      <div className="fixed bottom-0 left-0 w-72 h-72 bg-green-500/5 blur-3xl rounded-full pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-5 py-6 md:px-8 relative z-10">

        {/* HEADER */}
        <div className="flex items-start justify-between gap-4">

          <div>
            <p className="text-zinc-500 text-sm tracking-[0.2em] uppercase">
              Digital Affiliate Network
            </p>

            <h1 className="text-5xl md:text-6xl font-black mt-2 tracking-tight">
              Basri
            </h1>

            <div className="flex items-center gap-3 mt-5">
              <div className="w-4 h-4 rounded-full bg-yellow-400 shadow-[0_0_25px_rgba(250,204,21,0.9)]"></div>

              <span className="text-yellow-400 font-black text-xl">
                FREE MEMBER
              </span>
            </div>
          </div>

          <button className="bg-red-600 hover:bg-red-700 transition px-6 py-4 rounded-[24px] font-bold text-sm shadow-[0_0_30px_rgba(255,0,0,0.35)]">
            Logout
          </button>

        </div>

        {/* REFERRAL CARD */}
        <div className="relative overflow-hidden mt-8 rounded-[36px] border border-zinc-800/80 bg-white/[0.03] backdrop-blur-xl p-6 md:p-8 shadow-[0_0_50px_rgba(0,255,100,0.08)]">

          {/* GLOW */}
          <div className="absolute top-0 right-0 w-56 h-56 bg-green-500/10 blur-3xl rounded-full"></div>

          <div className="relative z-10">

            <p className="text-zinc-500 text-sm uppercase tracking-wider">
              Referral Code
            </p>

            <h2 className="text-5xl md:text-6xl font-black mt-4 tracking-tight">
              DAN614928
            </h2>

            <div className="flex flex-wrap gap-3 mt-7">

              <button className="px-6 py-4 rounded-[22px] bg-black border border-zinc-800 hover:border-green-500 transition text-sm font-bold">
                Copy Link
              </button>

              <button className="px-6 py-4 rounded-[22px] bg-black border border-zinc-800 hover:border-green-500 transition text-sm font-bold">
                Copy Kode
              </button>

            </div>

            <p className="text-zinc-400 text-sm leading-relaxed mt-6 max-w-xl">
              Ayo bagikan link referralmu sekarang dan dapatkan penghasilan tanpa batas dari jaringan affiliate digital modern bersama DAN.
            </p>

          </div>

        </div>

        {/* AKTIVASI MEMBER */}
        <Link
          href="/member/produk"
          className="relative overflow-hidden mt-6 flex items-center justify-between rounded-[36px] bg-gradient-to-r from-green-500 to-lime-400 hover:scale-[1.01] transition duration-300 p-6 shadow-[0_0_50px_rgba(34,197,94,0.40)]"
        >

          <div className="absolute top-0 right-0 w-52 h-52 bg-white/10 blur-3xl rounded-full"></div>

          <div className="relative z-10">
            <p className="text-black/70 text-sm font-bold tracking-wide">
              PRODUK DIGITAL
            </p>

            <h2 className="text-black text-4xl font-black mt-3 leading-tight">
              Aktivasi Member
            </h2>

            <p className="text-black/70 mt-3 text-sm leading-relaxed">
              Aktivasi akun & mulai belanja paket data digital langsung dari aplikasi DAN.
            </p>
          </div>

          <div className="relative z-10 w-20 h-20 rounded-[28px] bg-black/10 flex items-center justify-center text-4xl text-black">
            →
          </div>

        </Link>

        {/* INFO */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mt-6">

          <div className="bg-white/[0.03] backdrop-blur-xl border border-zinc-800 rounded-[30px] p-5 shadow-[0_0_20px_rgba(255,255,255,0.02)]">
            <p className="text-zinc-500 text-sm">
              Saldo Total
            </p>

            <h2 className="text-green-400 text-4xl font-black mt-5">
              Rp 0
            </h2>
          </div>

          <div className="bg-white/[0.03] backdrop-blur-xl border border-zinc-800 rounded-[30px] p-5 shadow-[0_0_20px_rgba(255,255,255,0.02)]">
            <p className="text-zinc-500 text-sm">
              Total Referral
            </p>

            <h2 className="text-4xl font-black mt-5">
              0
            </h2>
          </div>

          <div className="bg-white/[0.03] backdrop-blur-xl border border-zinc-800 rounded-[30px] p-5 shadow-[0_0_20px_rgba(255,255,255,0.02)]">
            <p className="text-zinc-500 text-sm">
              Bonus Sponsor
            </p>

            <h2 className="text-4xl font-black mt-5">
              Rp 0
            </h2>
          </div>

          <div className="bg-white/[0.03] backdrop-blur-xl border border-zinc-800 rounded-[30px] p-5 shadow-[0_0_20px_rgba(255,255,255,0.02)]">
            <p className="text-zinc-500 text-sm">
              Bonus Referral
            </p>

            <h2 className="text-4xl font-black mt-5">
              Rp 0
            </h2>
          </div>

        </div>

        {/* MENU */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">

          <Link
            href="/member/transaksi"
            className="bg-white/[0.03] backdrop-blur-xl border border-zinc-800 hover:border-zinc-600 transition rounded-[30px] p-6 text-center font-bold text-lg"
          >
            Transaksi
          </Link>

          <Link
            href="/member/referral"
            className="bg-white/[0.03] backdrop-blur-xl border border-zinc-800 hover:border-zinc-600 transition rounded-[30px] p-6 text-center font-bold text-lg"
          >
            Referral
          </Link>

          <Link
            href="/member/profile"
            className="bg-white/[0.03] backdrop-blur-xl border border-zinc-800 hover:border-zinc-600 transition rounded-[30px] p-6 text-center font-bold text-lg"
          >
            Profil
          </Link>

          <Link
            href="/member/bantuan"
            className="bg-white/[0.03] backdrop-blur-xl border border-zinc-800 hover:border-zinc-600 transition rounded-[30px] p-6 text-center font-bold text-lg"
          >
            Bantuan
          </Link>

          <Link
            href="/member/withdraw"
            className="bg-white/[0.03] backdrop-blur-xl border border-zinc-800 hover:border-zinc-600 transition rounded-[30px] p-6 text-center font-bold text-lg"
          >
            Withdraw
          </Link>

        </div>

        {/* LIVE ACTIVITY */}
        <div className="mt-12">

          <div className="flex items-center justify-between mb-6">

            <h2 className="text-4xl font-black tracking-tight">
              Aktivitas Member
            </h2>

            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse shadow-[0_0_20px_rgba(34,197,94,0.9)]"></div>

              <span className="text-green-400 text-sm font-black tracking-wide">
                LIVE
              </span>
            </div>

          </div>

          <div className="relative h-[420px] overflow-hidden rounded-[36px] border border-zinc-800 bg-white/[0.03] backdrop-blur-xl p-4">

            {/* FADE */}
            <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-black to-transparent z-20 pointer-events-none"></div>

            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black to-transparent z-20 pointer-events-none"></div>

            <div className="animate-scroll space-y-4">

              {[...activities, ...activities].map((item, index) => (
                <div
                  key={index}
                  className="bg-zinc-900/80 border border-zinc-800 rounded-[30px] p-5"
                >

                  <div className="flex items-start justify-between">

                    <div className="flex items-start gap-4">

                      <div className="w-14 h-14 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center text-lg font-black text-green-400">
                        {item.name.charAt(0)}
                      </div>

                      <div>
                        <h3 className="font-bold text-xl">
                          {item.name}
                        </h3>

                        <p className="text-zinc-500 text-sm mt-1">
                          {item.city}
                        </p>
                      </div>

                    </div>

                    <span className="text-zinc-500 text-sm">
                      {item.time}
                    </span>

                  </div>

                  <div className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-semibold">
                    {item.activity}
                  </div>

                </div>
              ))}

            </div>

          </div>

        </div>

        {/* FOOTER SPACE */}
        <div className="h-10"></div>

      </div>

      <style jsx>{`
        .animate-scroll {
          animation: scrollUp 22s linear infinite;
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
