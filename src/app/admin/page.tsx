"use client";

import Link from "next/link";
import {
  Users,
  ShoppingBag,
  Wallet,
  CreditCard,
  Activity,
  Settings,
  ArrowUpRight,
  ShieldCheck,
  CircleDollarSign,
  LogOut,
  Megaphone,
  Bell,
} from "lucide-react";

export default function AdminPage() {

  const stats = {
    totalMember: 1250,
    memberAktif: 1120,
    totalTransaksi: 8421,
    totalWithdraw: 329,
    totalProduk: 48,
    totalDeposit: 128500000,
  };

  const activities = [
    {
      name: "Akbar",
      city: "Makassar",
      activity:
        "Melakukan aktivasi member",
      time: "2 menit lalu",
    },
    {
      name: "Dewi",
      city: "Bandung",
      activity:
        "Membeli paket unlimited",
      time: "4 menit lalu",
    },
    {
      name: "Rizky",
      city: "Jakarta",
      activity:
        "Withdraw berhasil diproses",
      time: "9 menit lalu",
    },
    {
      name: "Fajar",
      city: "Surabaya",
      activity:
        "Bonus referral masuk",
      time: "12 menit lalu",
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">

      {/* BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none">

        <div className="absolute top-0 left-0 w-[450px] h-[450px] bg-green-500/10 blur-[140px]" />

        <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-green-400/10 blur-[140px]" />

      </div>

      <div className="relative max-w-7xl mx-auto px-5 py-6 pb-32">

        {/* HEADER */}
        <div className="flex items-start justify-between gap-5 flex-wrap">

          <div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 mb-5">

              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>

              <span className="text-green-400 text-sm font-black tracking-[0.25em]">
                ADMIN PANEL
              </span>

            </div>

            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-none">
              Dashboard
            </h1>

            <p className="text-zinc-500 text-lg mt-6 max-w-2xl leading-relaxed">
              Pusat kontrol Digital Affiliate Network untuk memantau member, transaksi, produk digital, pembayaran, dan seluruh aktivitas platform secara realtime.
            </p>

          </div>

          <button className="h-16 px-6 rounded-3xl bg-red-600 hover:bg-red-500 transition-all duration-300 flex items-center gap-3 font-black text-lg shadow-[0_0_35px_rgba(255,0,0,0.30)]">

            <LogOut size={22} />

            Logout

          </button>

        </div>

        {/* QUICK ALERT */}
        <div className="relative overflow-hidden rounded-[40px] border border-green-500/20 bg-gradient-to-br from-green-500/15 to-black mt-10 p-7">

          <div className="absolute top-0 right-0 w-56 h-56 bg-green-500/10 blur-[120px] rounded-full"></div>

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

            <div>

              <div className="flex items-center gap-3 mb-4">

                <Bell
                  size={24}
                  className="text-green-400"
                />

                <span className="text-green-400 font-black tracking-widest text-sm">
                  SYSTEM NOTIFICATION
                </span>

              </div>

              <h2 className="text-3xl md:text-4xl font-black leading-tight max-w-3xl">
                Kelola pemberitahuan dan pesan massal untuk seluruh member DAN secara realtime.
              </h2>

              <p className="text-zinc-400 mt-5 text-lg leading-relaxed max-w-2xl">
                Kirim pengumuman maintenance, promo, motivasi referral, update sistem, dan informasi penting lainnya langsung ke dashboard member.
              </p>

            </div>

            <Link
              href="/admin/announcements"
              className="h-16 px-7 rounded-3xl bg-green-500 hover:bg-green-400 transition-all duration-300 text-black font-black text-lg flex items-center justify-center gap-3 shadow-[0_0_40px_rgba(0,255,120,0.30)] whitespace-nowrap"
            >

              <Megaphone size={22} />

              Pesan Massal

            </Link>

          </div>

        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 xl:grid-cols-3 gap-5 mt-10">

          <div className="relative overflow-hidden rounded-[35px] border border-zinc-800 bg-zinc-950 p-6">

            <div className="absolute top-0 right-0 w-40 h-40 bg-green-500/10 blur-3xl rounded-full"></div>

            <div className="relative z-10">

              <p className="text-zinc-500 text-sm">
                Total Member
              </p>

              <h2 className="text-5xl font-black mt-5">
                {stats.totalMember}
              </h2>

              <div className="flex items-center gap-2 mt-5 text-green-400">

                <ArrowUpRight size={18} />

                <span className="font-bold text-sm">
                  +18 hari ini
                </span>

              </div>

            </div>

          </div>

          <div className="relative overflow-hidden rounded-[35px] border border-green-500/20 bg-green-500/10 p-6 shadow-[0_0_40px_rgba(0,255,100,0.12)]">

            <div className="relative z-10">

              <p className="text-green-300 text-sm">
                Member Aktif
              </p>

              <h2 className="text-5xl font-black text-green-400 mt-5">
                {stats.memberAktif}
              </h2>

              <div className="flex items-center gap-2 mt-5 text-green-300">

                <ShieldCheck size={18} />

                <span className="font-bold text-sm">
                  Sistem normal
                </span>

              </div>

            </div>

          </div>

          <div className="relative overflow-hidden rounded-[35px] border border-zinc-800 bg-zinc-950 p-6">

            <div className="relative z-10">

              <p className="text-zinc-500 text-sm">
                Total Transaksi
              </p>

              <h2 className="text-5xl font-black mt-5">
                {stats.totalTransaksi}
              </h2>

              <div className="flex items-center gap-2 mt-5 text-green-400">

                <ArrowUpRight size={18} />

                <span className="font-bold text-sm">
                  Realtime berjalan
                </span>

              </div>

            </div>

          </div>

          <div className="relative overflow-hidden rounded-[35px] border border-zinc-800 bg-zinc-950 p-6">

            <div className="relative z-10">

              <p className="text-zinc-500 text-sm">
                Total Withdraw
              </p>

              <h2 className="text-5xl font-black mt-5">
                {stats.totalWithdraw}
              </h2>

              <div className="flex items-center gap-2 mt-5 text-yellow-400">

                <Wallet size={18} />

                <span className="font-bold text-sm">
                  Perlu review admin
                </span>

              </div>

            </div>

          </div>

          <div className="relative overflow-hidden rounded-[35px] border border-zinc-800 bg-zinc-950 p-6">

            <div className="relative z-10">

              <p className="text-zinc-500 text-sm">
                Total Produk
              </p>

              <h2 className="text-5xl font-black mt-5">
                {stats.totalProduk}
              </h2>

              <div className="flex items-center gap-2 mt-5 text-green-400">

                <ShoppingBag size={18} />

                <span className="font-bold text-sm">
                  Produk aktif
                </span>

              </div>

            </div>

          </div>

          <div className="relative overflow-hidden rounded-[35px] border border-zinc-800 bg-zinc-950 p-6">

            <div className="relative z-10">

              <p className="text-zinc-500 text-sm">
                Total Deposit
              </p>

              <h2 className="text-4xl font-black text-green-400 mt-5">
                Rp{" "}
                {stats.totalDeposit.toLocaleString(
                  "id-ID"
                )}
              </h2>

              <div className="flex items-center gap-2 mt-5 text-green-400">

                <CircleDollarSign size={18} />

                <span className="font-bold text-sm">
                  Cashflow stabil
                </span>

              </div>

            </div>

          </div>

        </div>

        {/* MENU */}
        <div className="mt-14">

          <div className="flex items-center justify-between mb-6">

            <h2 className="text-4xl font-black">
              Management Menu
            </h2>

            <div className="flex items-center gap-2">

              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>

              <span className="text-green-400 text-sm font-black">
                SYSTEM ONLINE
              </span>

            </div>

          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">

            <Link
              href="/admin/members"
              className="group relative overflow-hidden rounded-[35px] border border-zinc-800 bg-zinc-950 min-h-[180px] p-6 hover:border-green-500 transition-all duration-300"
            >

              <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 blur-3xl rounded-full"></div>

              <div className="relative z-10 flex flex-col justify-between h-full">

                <Users
                  size={42}
                  className="text-white"
                />

                <div>

                  <h3 className="text-2xl font-black">
                    Member
                  </h3>

                  <p className="text-zinc-500 text-sm mt-2 leading-relaxed">
                    Kelola seluruh member platform DAN
                  </p>

                </div>

              </div>

            </Link>

            <Link
              href="/admin/products"
              className="group relative overflow-hidden rounded-[35px] border border-zinc-800 bg-zinc-950 min-h-[180px] p-6 hover:border-green-500 transition-all duration-300"
            >

              <div className="relative z-10 flex flex-col justify-between h-full">

                <ShoppingBag
                  size={42}
                  className="text-white"
                />

                <div>

                  <h3 className="text-2xl font-black">
                    Produk
                  </h3>

                  <p className="text-zinc-500 text-sm mt-2 leading-relaxed">
                    Kelola produk digital & aktivasi
                  </p>

                </div>

              </div>

            </Link>

            <Link
              href="/admin/transactions"
              className="group relative overflow-hidden rounded-[35px] border border-zinc-800 bg-zinc-950 min-h-[180px] p-6 hover:border-green-500 transition-all duration-300"
            >

              <div className="relative z-10 flex flex-col justify-between h-full">

                <Wallet
                  size={42}
                  className="text-white"
                />

                <div>

                  <h3 className="text-2xl font-black">
                    Transaksi
                  </h3>

                  <p className="text-zinc-500 text-sm mt-2 leading-relaxed">
                    Monitoring transaksi member
                  </p>

                </div>

              </div>

            </Link>

            <Link
              href="/admin/payment"
              className="group relative overflow-hidden rounded-[35px] border border-green-500/20 bg-green-500/10 min-h-[180px] p-6 shadow-[0_0_40px_rgba(0,255,100,0.10)]"
            >

              <div className="relative z-10 flex flex-col justify-between h-full">

                <CreditCard
                  size={42}
                  className="text-green-400"
                />

                <div>

                  <h3 className="text-2xl font-black text-green-400">
                    Pembayaran
                  </h3>

                  <p className="text-green-200/70 text-sm mt-2 leading-relaxed">
                    Kelola bank & e-wallet member
                  </p>

                </div>

              </div>

            </Link>

            <Link
              href="/admin/announcements"
              className="group relative overflow-hidden rounded-[35px] border border-zinc-800 bg-zinc-950 min-h-[180px] p-6 hover:border-green-500 transition-all duration-300"
            >

              <div className="relative z-10 flex flex-col justify-between h-full">

                <Megaphone
                  size={42}
                  className="text-white"
                />

                <div>

                  <h3 className="text-2xl font-black">
                    Pesan Massal
                  </h3>

                  <p className="text-zinc-500 text-sm mt-2 leading-relaxed">
                    Broadcast pemberitahuan ke seluruh member
                  </p>

                </div>

              </div>

            </Link>

            <Link
              href="/admin/activity"
              className="group relative overflow-hidden rounded-[35px] border border-zinc-800 bg-zinc-950 min-h-[180px] p-6 hover:border-green-500 transition-all duration-300"
            >

              <div className="relative z-10 flex flex-col justify-between h-full">

                <Activity
                  size={42}
                  className="text-white"
                />

                <div>

                  <h3 className="text-2xl font-black">
                    Aktivitas
                  </h3>

                  <p className="text-zinc-500 text-sm mt-2 leading-relaxed">
                    Aktivitas realtime platform
                  </p>

                </div>

              </div>

            </Link>

            <Link
              href="/admin/withdraw"
              className="group relative overflow-hidden rounded-[35px] border border-zinc-800 bg-zinc-950 min-h-[180px] p-6 hover:border-green-500 transition-all duration-300"
            >

              <div className="relative z-10 flex flex-col justify-between h-full">

                <CircleDollarSign
                  size={42}
                  className="text-white"
                />

                <div>

                  <h3 className="text-2xl font-black">
                    Withdraw
                  </h3>

                  <p className="text-zinc-500 text-sm mt-2 leading-relaxed">
                    Approval withdraw member
                  </p>

                </div>

              </div>

            </Link>

            <Link
              href="/admin/settings"
              className="group relative overflow-hidden rounded-[35px] border border-zinc-800 bg-zinc-950 min-h-[180px] p-6 hover:border-green-500 transition-all duration-300"
            >

              <div className="relative z-10 flex flex-col justify-between h-full">

                <Settings
                  size={42}
                  className="text-white"
                />

                <div>

                  <h3 className="text-2xl font-black">
                    Settings
                  </h3>

                  <p className="text-zinc-500 text-sm mt-2 leading-relaxed">
                    Pengaturan aplikasi DAN
                  </p>

                </div>

              </div>

            </Link>

          </div>

        </div>

        {/* LIVE ACTIVITY */}
        <div className="mt-14">

          <div className="flex items-center justify-between mb-6">

            <h2 className="text-4xl font-black">
              Live Activity
            </h2>

            <div className="flex items-center gap-2">

              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>

              <span className="text-green-400 font-black text-sm">
                REALTIME
              </span>

            </div>

          </div>

          <div className="relative h-[450px] overflow-hidden rounded-[40px] border border-zinc-800 bg-zinc-950 p-5">

            <div className="animate-scroll space-y-5">

              {[...activities, ...activities].map(
                (item, index) => (

                  <div
                    key={index}
                    className="relative overflow-hidden rounded-[32px] border border-zinc-800 bg-black p-6"
                  >

                    <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 blur-3xl rounded-full"></div>

                    <div className="relative z-10">

                      <div className="flex items-start justify-between gap-4">

                        <div>

                          <h3 className="text-2xl font-black">
                            {item.name}
                          </h3>

                          <p className="text-zinc-500 mt-2">
                            {item.city}
                          </p>

                        </div>

                        <span className="text-zinc-500 text-sm">
                          {item.time}
                        </span>

                      </div>

                      <p className="text-lg mt-5 leading-relaxed">
                        {item.activity}
                      </p>

                    </div>

                  </div>

                )
              )}

            </div>

          </div>

        </div>

      </div>

      <style jsx>{`
        .animate-scroll {
          animation: scrollUp 25s linear infinite;
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
