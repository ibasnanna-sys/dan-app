"use client";

import Link from "next/link";

import {
  Copy,
  LogOut,
  Wallet,
  Users,
  Gift,
  ArrowRight,
  Bell,
  User,
  CreditCard,
  Megaphone,
  ShieldCheck,
  Sparkles,
  Activity,
  BadgeDollarSign,
} from "lucide-react";

export default function Home() {

  const memberStatus: "free" | "aktif" | "freeze" = "free";

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

  function renderStatusCard() {

    if (memberStatus === "aktif") {

      return (
        <div className="relative overflow-hidden mt-6 rounded-[36px] border border-green-500/20 bg-green-500/10 p-7 shadow-[0_0_50px_rgba(0,255,100,0.15)]">

          <div className="absolute top-0 right-0 w-56 h-56 bg-green-400/10 blur-[120px] rounded-full"></div>

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

            <div>

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20">

                <Sparkles
                  size={16}
                  className="text-green-400"
                />

                <span className="text-green-400 text-sm font-black tracking-widest">
                  MEMBER AKTIF
                </span>

              </div>

              <h2 className="text-3xl md:text-4xl font-black leading-tight mt-5 max-w-3xl">
                Bagikan link referralmu sekarang dan bangun jaringan digital yang menghasilkan bersama ekosistem affiliate modern DAN.
              </h2>

            </div>

            <button className="h-16 px-7 rounded-3xl bg-green-500 hover:bg-green-400 transition-all duration-300 text-black font-black text-lg flex items-center justify-center gap-3 shadow-[0_0_40px_rgba(0,255,120,0.30)] whitespace-nowrap">

              <Users size={22} />

              Bagikan Referral

            </button>

          </div>

        </div>
      );
    }

    if (memberStatus === "dibekukan") {

      return (
        <div className="relative overflow-hidden mt-6 rounded-[36px] border border-orange-500/20 bg-orange-500/10 p-7 shadow-[0_0_50px_rgba(255,120,0,0.12)]">

          <div className="absolute top-0 right-0 w-56 h-56 bg-orange-400/10 blur-[120px] rounded-full"></div>

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

            <div>

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20">

                <ShieldCheck
                  size={16}
                  className="text-orange-400"
                />

                <span className="text-orange-400 text-sm font-black tracking-widest">
                  AKUN DIBEKUKAN
                </span>

              </div>

              <h2 className="text-3xl md:text-4xl font-black leading-tight mt-5 max-w-3xl">
                Akunmu sedang dibekukan sementara. Lakukan transaksi pembelian untuk mengaktifkan kembali seluruh fitur dan melanjutkan aktivitas digitalmu bersama DAN.
              </h2>

            </div>

            <Link
              href="/member/produk"
              className="h-16 px-7 rounded-3xl bg-orange-500 hover:bg-orange-400 transition-all duration-300 text-black font-black text-lg flex items-center justify-center gap-3 shadow-[0_0_40px_rgba(255,120,0,0.30)] whitespace-nowrap"
            >

              <ShoppingBag size={22} />

              Belanja Sekarang

            </Link>

          </div>

        </div>
      );
    }

    return (
      <div className="relative overflow-hidden mt-6 rounded-[36px] border border-yellow-500/20 bg-yellow-500/10 p-7 shadow-[0_0_50px_rgba(250,204,21,0.10)]">

        <div className="absolute top-0 right-0 w-56 h-56 bg-yellow-400/10 blur-[120px] rounded-full"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

          <div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20">

              <ShieldCheck
                size={16}
                className="text-yellow-400"
              />

              <span className="text-yellow-400 text-sm font-black tracking-widest">
                FREE MEMBER
              </span>

            </div>

            <h2 className="text-3xl md:text-4xl font-black leading-tight mt-5 max-w-3xl">
              Aktifkan akunmu sekarang untuk membuka seluruh fitur premium DAN dan mulai membangun penghasilan digital bersama jaringan affiliate modern.
            </h2>

          </div>

          <Link
            href="/member/produk"
            className="h-16 px-7 rounded-3xl bg-yellow-400 hover:bg-yellow-300 transition-all duration-300 text-black font-black text-lg flex items-center justify-center gap-3 shadow-[0_0_40px_rgba(250,204,21,0.30)] whitespace-nowrap"
          >

            <Sparkles size={22} />

            Aktivasi Sekarang

          </Link>

        </div>

      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">

      {/* BACKGROUND */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,255,100,0.12),transparent_30%)] pointer-events-none"></div>

      <div className="fixed bottom-0 left-0 w-72 h-72 bg-green-500/5 blur-3xl rounded-full pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-5 py-6 md:px-8 relative z-10">

        {/* HEADER */}
        <div className="flex items-start justify-between gap-4 flex-wrap">

          <div>

            <p className="text-zinc-500 text-sm tracking-[0.2em] uppercase">
              Digital Affiliate Network
            </p>

            <h1 className="text-5xl md:text-6xl font-black mt-2 tracking-tight">
              Basri
            </h1>

            <div className="flex items-center gap-3 mt-5">

              <div className="w-4 h-4 rounded-full bg-yellow-400 shadow-[0_0_25px_rgba(250,204,21,0.9)]"></div>

              <span className="text-yellow-400 font-black text-xl uppercase">
                FREE MEMBER
              </span>

            </div>

          </div>

          <button className="h-16 px-6 rounded-[24px] bg-red-600 hover:bg-red-700 transition-all duration-300 flex items-center gap-3 font-black text-sm shadow-[0_0_30px_rgba(255,0,0,0.35)]">

            <LogOut size={20} />

            Logout

          </button>

        </div>

        {/* STATUS CARD */}
        {renderStatusCard()}

        {/* REFERRAL CARD */}
        <div className="relative overflow-hidden mt-8 rounded-[36px] border border-zinc-800/80 bg-white/[0.03] backdrop-blur-xl p-6 md:p-8 shadow-[0_0_50px_rgba(0,255,100,0.08)]">

          <div className="absolute top-0 right-0 w-56 h-56 bg-green-500/10 blur-3xl rounded-full"></div>

          <div className="relative z-10">

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20">

              <Users
                size={16}
                className="text-green-400"
              />

              <span className="text-green-400 text-sm font-black tracking-widest">
                REFERRAL SYSTEM
              </span>

            </div>

            <p className="text-zinc-500 text-sm uppercase tracking-wider mt-6">
              Referral Code
            </p>

            <h2 className="text-5xl md:text-6xl font-black mt-4 tracking-tight">
              DAN614928
            </h2>

            <div className="flex flex-wrap gap-3 mt-7">

              <button className="h-14 px-6 rounded-[22px] bg-black border border-zinc-800 hover:border-green-500 transition flex items-center gap-3 text-sm font-bold">

                <Copy size={18} />

                Copy Link

              </button>

              <button className="h-14 px-6 rounded-[22px] bg-black border border-zinc-800 hover:border-green-500 transition flex items-center gap-3 text-sm font-bold">

                <Copy size={18} />

                Copy Kode

              </button>

            </div>

            <p className="text-zinc-400 text-sm leading-relaxed mt-6 max-w-xl">
              Bangun jaringan affiliate digital modern bersama DAN dan dapatkan peluang penghasilan dari aktivitas referral tanpa batas.
            </p>

          </div>

        </div>

        {/* PRODUK */}
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
              Paket Data & Aktivasi
            </h2>

            <p className="text-black/70 mt-3 text-sm leading-relaxed max-w-xl">
              Belanja produk digital, aktivasi member, dan nikmati pengalaman affiliate modern langsung dari aplikasi DAN.
            </p>

          </div>

          <div className="relative z-10 w-20 h-20 rounded-[28px] bg-black/10 flex items-center justify-center">

            <ArrowRight
              size={34}
              className="text-black"
            />

          </div>

        </Link>

        {/* INFO */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mt-6">

          <div className="bg-white/[0.03] backdrop-blur-xl border border-zinc-800 rounded-[30px] p-5">

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

          <div className="bg-white/[0.03] backdrop-blur-xl border border-zinc-800 rounded-[30px] p-5">

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

          <div className="bg-white/[0.03] backdrop-blur-xl border border-zinc-800 rounded-[30px] p-5">

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

          <div className="bg-white/[0.03] backdrop-blur-xl border border-zinc-800 rounded-[30px] p-5">

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

        {/* MENU */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">

          <Link
            href="/member/transaksi"
            className="group bg-white/[0.03] backdrop-blur-xl border border-zinc-800 hover:border-green-500 transition-all duration-300 rounded-[30px] p-6"
          >

            <Wallet
              size={34}
              className="text-white"
            />

            <h2 className="text-2xl font-black mt-6">
              Transaksi
            </h2>

            <p className="text-zinc-500 text-sm mt-2">
              Riwayat transaksi digital
            </p>

          </Link>

          <Link
            href="/member/referral"
            className="group bg-white/[0.03] backdrop-blur-xl border border-zinc-800 hover:border-green-500 transition-all duration-300 rounded-[30px] p-6"
          >

            <Users
              size={34}
              className="text-white"
            />

            <h2 className="text-2xl font-black mt-6">
              Referral
            </h2>

            <p className="text-zinc-500 text-sm mt-2">
              Kelola jaringan referral
            </p>

          </Link>

          <Link
            href="/member/profile"
            className="group bg-white/[0.03] backdrop-blur-xl border border-zinc-800 hover:border-green-500 transition-all duration-300 rounded-[30px] p-6"
          >

            <User
              size={34}
              className="text-white"
            />

            <h2 className="text-2xl font-black mt-6">
              Profil
            </h2>

            <p className="text-zinc-500 text-sm mt-2">
              Informasi akun member
            </p>

          </Link>

          <Link
            href="/member/notifications"
            className="group bg-white/[0.03] backdrop-blur-xl border border-zinc-800 hover:border-green-500 transition-all duration-300 rounded-[30px] p-6"
          >

            <Bell
              size={34}
              className="text-white"
            />

            <h2 className="text-2xl font-black mt-6">
              Pemberitahuan
            </h2>

            <p className="text-zinc-500 text-sm mt-2">
              Informasi & pengumuman DAN
            </p>

          </Link>

          <Link
            href="/member/withdraw"
            className="group bg-white/[0.03] backdrop-blur-xl border border-zinc-800 hover:border-green-500 transition-all duration-300 rounded-[30px] p-6"
          >

            <CreditCard
              size={34}
              className="text-white"
            />

            <h2 className="text-2xl font-black mt-6">
              Withdraw
            </h2>

            <p className="text-zinc-500 text-sm mt-2">
              Penarikan saldo member
            </p>

          </Link>

          <Link
            href="/member/produk"
            className="group bg-green-500/10 border border-green-500/20 hover:border-green-400 transition-all duration-300 rounded-[30px] p-6 shadow-[0_0_35px_rgba(0,255,120,0.08)]"
          >

            <Megaphone
              size={34}
              className="text-green-400"
            />

            <h2 className="text-2xl font-black mt-6 text-green-400">
              Produk Digital
            </h2>

            <p className="text-green-200/70 text-sm mt-2">
              Aktivasi & paket data digital
            </p>

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

            <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-black to-transparent z-20 pointer-events-none"></div>

            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black to-transparent z-20 pointer-events-none"></div>

            <div className="animate-scroll space-y-4">

              {[...activities, ...activities].map(
                (item, index) => (

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

                      <Activity size={16} />

                      {item.activity}

                    </div>

                  </div>

                )
              )}

            </div>

          </div>

        </div>

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
