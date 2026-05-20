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
  ShoppingBag,
} from "lucide-react";

export default function Home() {

  const memberStatus: "free" | "aktif" | "dibekukan" = "free";

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
      <div className="max-w-6xl mx-auto px-5 py-6">
        {renderStatusCard()}
      </div>
    </main>
  );
}
