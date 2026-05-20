"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import {
  LogOut,
  Wallet,
  Users,
  Gift,
  Bell,
  User,
  ShieldCheck,
  Sparkles,
  BadgeDollarSign,
  ShoppingBag,
  Crown,
  TrendingUp,
  CreditCard,
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

  const [activityIndex, setActivityIndex] = useState(0);

  useEffect(() => {

    const interval = setInterval(() => {

      setActivityIndex((prev) =>
        prev === activities.length - 1
          ? 0
          : prev + 1
      );

    }, 3500);

    return () => clearInterval(interval);

  }, [activities.length]);

  function renderMemberBadge() {

    if (memberStatus === "aktif") {

      return (
        <div className="flex items-center gap-3 mt-5">

          <div className="w-3 h-3 rounded-full bg-green-400 shadow-[0_0_20px_rgba(0,255,120,1)]"></div>

          <span className="text-green-400 font-black text-sm md:text-lg tracking-[0.2em] uppercase">
            MEMBER AKTIF
          </span>

        </div>
      );
    }

    if (memberStatus === "dibekukan") {

      return (
        <div className="flex items-center gap-3 mt-5">

          <div className="w-3 h-3 rounded-full bg-orange-400 shadow-[0_0_20px_rgba(255,120,0,1)]"></div>

          <span className="text-orange-400 font-black text-sm md:text-lg tracking-[0.2em] uppercase">
            AKUN DIBEKUKAN
          </span>

        </div>
      );
    }

    return (
      <div className="flex items-center gap-3 mt-5">

        <div className="w-3 h-3 rounded-full bg-yellow-400 shadow-[0_0_20px_rgba(250,204,21,1)]"></div>

        <span className="text-yellow-400 font-black text-sm md:text-lg tracking-[0.2em] uppercase">
          FREE MEMBER
        </span>

      </div>
    );
  }

  function renderGreeting() {

    if (memberStatus === "aktif") {

      return (
        <p className="text-zinc-400 mt-5 text-sm md:text-lg max-w-2xl leading-relaxed">
          Selamat datang kembali di Digital Affiliate Network.
          Nikmati seluruh fitur premium DAN dan mulai bangun penghasilan digital modern langsung dari dashboard ini.
        </p>
      );
    }

    if (memberStatus === "dibekukan") {

      return (
        <p className="text-zinc-400 mt-5 text-sm md:text-lg max-w-2xl leading-relaxed">
          Akunmu sedang dibekukan sementara.
          Lakukan pembelian paket data untuk mengaktifkan kembali seluruh fitur member DAN.
        </p>
      );
    }

    return (
      <p className="text-zinc-400 mt-5 text-sm md:text-lg max-w-2xl leading-relaxed">
        Selamat datang di Digital Affiliate Network.
        Aktivasi akunmu sekarang untuk membuka seluruh fitur premium dan mulai menghasilkan bersama DAN.
      </p>
    );
  }

  function renderHeroCard() {

    if (memberStatus === "aktif") {

      return (
        <div className="relative overflow-hidden mt-8 rounded-[32px] md:rounded-[40px] border border-green-500/20 bg-green-500/10 p-6 md:p-8 shadow-[0_0_45px_rgba(0,255,100,0.10)]">

          <div className="absolute top-0 right-0 w-72 h-72 bg-green-500/10 blur-[140px] rounded-full"></div>

          <div className="relative z-10">

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20">

              <Crown
                size={16}
                className="text-green-400"
              />

              <span className="text-green-400 text-xs md:text-sm font-black tracking-[0.2em]">
                PREMIUM MEMBER
              </span>

            </div>

            <h2 className="text-3xl md:text-5xl font-black leading-tight mt-6 max-w-4xl">
              Bangun jaringan digital modern dan hasilkan bonus tanpa batas.
            </h2>

            <p className="text-green-100/70 text-sm md:text-base leading-relaxed mt-5 max-w-3xl">
              Seluruh fitur premium DAN sudah aktif dan siap digunakan untuk membangun bisnis affiliate digitalmu.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">

              <Link
                href="/member/produk"
                className="inline-flex h-14 px-7 rounded-3xl bg-green-500 hover:bg-green-400 transition-all duration-300 text-black font-black text-sm items-center justify-center gap-3 shadow-[0_0_35px_rgba(0,255,120,0.25)]"
              >

                <ShoppingBag size={20} />

                Belanja Paket Data

              </Link>

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
        <div className="relative overflow-hidden mt-8 rounded-[32px] md:rounded-[40px] border border-orange-500/20 bg-orange-500/10 p-6 md:p-8 shadow-[0_0_45px_rgba(255,120,0,0.10)]">

          <div className="absolute top-0 right-0 w-72 h-72 bg-orange-500/10 blur-[140px] rounded-full"></div>

          <div className="relative z-10">

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20">

              <ShieldCheck
                size={16}
                className="text-orange-400"
              />

              <span className="text-orange-400 text-xs md:text-sm font-black tracking-[0.2em]">
                AKUN DIBEKUKAN
              </span>

            </div>

            <h2 className="text-3xl md:text-5xl font-black leading-tight mt-6 max-w-4xl">
              Aktifkan kembali akunmu untuk membuka fitur member premium.
            </h2>

            <p className="text-orange-100/70 text-sm md:text-base leading-relaxed mt-5 max-w-3xl">
              Lakukan pembelian paket data agar akun aktif kembali secara otomatis.
            </p>

            <Link
              href="/member/produk"
              className="inline-flex h-14 px-7 mt-8 rounded-3xl bg-orange-500 hover:bg-orange-400 transition-all duration-300 text-black font-black text-sm items-center justify-center gap-3 shadow-[0_0_35px_rgba(255,120,0,0.25)]"
            >

              <ShoppingBag size={20} />

              Belanja Paket Data

            </Link>

          </div>

        </div>
      );
    }

    return (
      <div className="relative overflow-hidden mt-8 rounded-[32px] md:rounded-[40px] border border-yellow-500/20 bg-yellow-500/10 p-6 md:p-8 shadow-[0_0_45px_rgba(250,204,21,0.10)]">

        <div className="absolute top-0 right-0 w-72 h-72 bg-yellow-400/10 blur-[140px] rounded-full"></div>

        <div className="relative z-10">

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20">

            <Sparkles
              size={16}
              className="text-yellow-400"
            />

            <span className="text-yellow-400 text-xs md:text-sm font-black tracking-[0.2em]">
              FREE MEMBER
            </span>

          </div>

          <h2 className="text-3xl md:text-5xl font-black leading-tight mt-6 max-w-4xl">
            Aktifkan akunmu sekarang dan mulai bangun penghasilan digital.
          </h2>

          <p className="text-yellow-100/70 text-sm md:text-base leading-relaxed mt-5 max-w-3xl">
            Setelah aktivasi, seluruh fitur premium DAN akan terbuka otomatis termasuk referral, bonus, dan withdraw.
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
    );
  }

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">

      {/* BACKGROUND */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,255,100,0.12),transparent_35%)] pointer-events-none"></div>

      <div className="fixed bottom-0 left-0 w-72 h-72 bg-green-500/5 blur-3xl rounded-full pointer-events-none"></div>

      <div className="relative max-w-6xl mx-auto px-4 md:px-6 py-5 md:py-6 pb-32">

        {/* HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">

          <div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 mb-5">

              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>

              <span className="text-green-400 text-xs md:text-sm font-black tracking-[0.2em]">
                MEMBER DASHBOARD
              </span>

            </div>

            <p className="text-zinc-500 text-xs md:text-sm tracking-[0.2em] uppercase">
              Digital Affiliate Network
            </p>

            <h1 className="text-4xl md:text-7xl font-black mt-3 tracking-tight leading-none">
              Basri
            </h1>

            {renderGreeting()}

            {renderMemberBadge()}

          </div>

          <button className="w-full lg:w-auto h-14 px-6 rounded-[24px] bg-red-600 hover:bg-red-700 transition-all duration-300 flex items-center justify-center gap-3 font-black text-sm shadow-[0_0_30px_rgba(255,0,0,0.35)]">

            <LogOut size={20} />

            Logout

          </button>

        </div>

        {/* HERO */}
        {renderHeroCard()}

        {/* STATS */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mt-8">

          <div className="bg-white/[0.03] border border-zinc-800 rounded-[28px] p-5">

            <div className="flex items-center justify-between">

              <p className="text-zinc-500 text-sm">
                Saldo
              </p>

              <Wallet
                size={18}
                className="text-green-400"
              />

            </div>

            <h2 className="text-green-400 text-2xl md:text-4xl font-black mt-5 break-words">
              Rp 0
            </h2>

          </div>

          <div className="bg-white/[0.03] border border-zinc-800 rounded-[28px] p-5">

            <div className="flex items-center justify-between">

              <p className="text-zinc-500 text-sm">
                Referral
              </p>

              <Users
                size={18}
                className="text-white"
              />

            </div>

            <h2 className="text-2xl md:text-4xl font-black mt-5">
              0
            </h2>

          </div>

          <div className="bg-white/[0.03] border border-zinc-800 rounded-[28px] p-5">

            <div className="flex items-center justify-between">

              <p className="text-zinc-500 text-sm">
                Bonus Sponsor
              </p>

              <Gift
                size={18}
                className="text-white"
              />

            </div>

            <h2 className="text-2xl md:text-4xl font-black mt-5 break-words">
              Rp 0
            </h2>

          </div>

          <div className="bg-white/[0.03] border border-zinc-800 rounded-[28px] p-5">

            <div className="flex items-center justify-between">

              <p className="text-zinc-500 text-sm">
                Bonus Referral
              </p>

              <BadgeDollarSign
                size={18}
                className="text-white"
              />

            </div>

            <h2 className="text-2xl md:text-4xl font-black mt-5 break-words">
              Rp 0
            </h2>

          </div>

        </div>

        {/* MENU */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">

          {/* KHUSUS MEMBER AKTIF & DIBEKUKAN */}
          {memberStatus !== "free" && (
            <Link
              href="/member/produk"
              className="bg-green-500/10 border border-green-500/20 hover:border-green-400 transition-all duration-300 rounded-[30px] p-5 md:p-6 shadow-[0_0_30px_rgba(0,255,120,0.08)]"
            >

              <ShoppingBag
                size={34}
                className="text-green-400"
              />

              <h2 className="text-xl md:text-2xl font-black mt-6">
                Beli Paket
              </h2>

              <p className="text-zinc-400 text-sm mt-2">
                Belanja paket data digital
              </p>

            </Link>
          )}

          {/* PEMBERITAHUAN */}
          <Link
            href="/member/pemberitahuan"
            className="bg-white/[0.03] border border-zinc-800 hover:border-green-500 transition-all duration-300 rounded-[30px] p-5 md:p-6"
          >

            <Bell size={34} />

            <h2 className="text-xl md:text-2xl font-black mt-6">
              Pesan
            </h2>

            <p className="text-zinc-500 text-sm mt-2">
              Pemberitahuan & pesan admin
            </p>

          </Link>

          {/* PROFILE */}
          <Link
            href="/member/profile"
            className="bg-white/[0.03] border border-zinc-800 hover:border-green-500 transition-all duration-300 rounded-[30px] p-5 md:p-6"
          >

            <User size={34} />

            <h2 className="text-xl md:text-2xl font-black mt-6">
              Profil
            </h2>

            <p className="text-zinc-500 text-sm mt-2">
              Pengaturan akun member
            </p>

          </Link>

          {/* MENU KHUSUS MEMBER AKTIF */}
          {memberStatus === "aktif" && (
            <>
              <Link
                href="/member/transaksi"
                className="bg-white/[0.03] border border-zinc-800 hover:border-green-500 transition-all duration-300 rounded-[30px] p-5 md:p-6"
              >

                <Wallet size={34} />

                <h2 className="text-xl md:text-2xl font-black mt-6">
                  Transaksi
                </h2>

                <p className="text-zinc-500 text-sm mt-2">
                  Riwayat transaksi member
                </p>

              </Link>

              <Link
                href="/member/referral"
                className="bg-white/[0.03] border border-zinc-800 hover:border-green-500 transition-all duration-300 rounded-[30px] p-5 md:p-6"
              >

                <Users size={34} />

                <h2 className="text-xl md:text-2xl font-black mt-6">
                  Referral
                </h2>

                <p className="text-zinc-500 text-sm mt-2">
                  Jaringan referral member
                </p>

              </Link>

              <Link
                href="/member/withdraw"
                className="bg-white/[0.03] border border-zinc-800 hover:border-green-500 transition-all duration-300 rounded-[30px] p-5 md:p-6"
              >

                <CreditCard size={34} />

                <h2 className="text-xl md:text-2xl font-black mt-6">
                  Withdraw
                </h2>

                <p className="text-zinc-500 text-sm mt-2">
                  Tarik saldo bonus referral
                </p>

              </Link>
            </>
          )}

        </div>

        {/* LIVE ACTIVITY */}
        <div className="mt-12">

          <div className="flex items-center justify-between mb-6">

            <h2 className="text-2xl md:text-4xl font-black">
              Aktivitas Member
            </h2>

            <div className="flex items-center gap-2">

              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>

              <span className="text-green-400 text-xs md:text-sm font-black">
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

                <div className="relative overflow-hidden rounded-[28px] border border-zinc-800 bg-white/[0.03] p-5 h-full">

                  <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 blur-3xl rounded-full"></div>

                  <div className="relative z-10 flex items-start justify-between gap-4">

                    <div>

                      <h3 className="text-lg md:text-2xl font-black">
                        {item.name}
                      </h3>

                      <p className="text-zinc-500 text-sm mt-1">
                        {item.city}
                      </p>

                      <p className="text-sm md:text-base mt-4">
                        {item.activity}
                      </p>

                    </div>

                    <span className="text-zinc-500 text-xs md:text-sm whitespace-nowrap">
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
