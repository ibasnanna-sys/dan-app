"use client";

import Link from "next/link";

import {
  Users,
  ShoppingBag,
  Wallet,
  CreditCard,
  Activity,
  Settings,
  CircleDollarSign,
  LogOut,
  Bell,
  PackageSearch,
  TrendingUp,
  BarChart3,
  MessageCircle,
  ArrowUpRight,
  ShieldCheck,
} from "lucide-react";

export default function AdminPage() {

  const stats = {
    totalMember: 1250,
    memberAktif: 1119,
    totalTransaksi: 8421,
    totalWithdraw: 329,
    totalProduk: 48,
    totalModal: 86500000,
    totalPenjualan: 128500000,
    totalProfit: 42000000,
  };

  const activities = [
    {
      name: "Akbar",
      city: "Makassar",
      activity: "Melakukan aktivasi member",
      time: "2 menit lalu",
    },
    {
      name: "Dewi",
      city: "Bandung",
      activity: "Membeli paket unlimited",
      time: "4 menit lalu",
    },
    {
      name: "Rizky",
      city: "Jakarta",
      activity: "Withdraw berhasil diproses",
      time: "9 menit lalu",
    },
    {
      name: "Fajar",
      city: "Surabaya",
      activity: "Bonus referral masuk",
      time: "12 menit lalu",
    },
  ];

  const menus = [
    {
      href: "/admin/members",
      icon: Users,
      title: "Member",
      desc: "Kelola seluruh member platform DAN",
    },
    {
      href: "/admin/products",
      icon: ShoppingBag,
      title: "Produk",
      desc: "Kelola produk & pencarian produk",
    },
    {
      href: "/admin/transactions",
      icon: Wallet,
      title: "Transaksi",
      desc: "Monitoring & approval transaksi",
      active: true,
    },
    {
      href: "/admin/payment",
      icon: CreditCard,
      title: "Pembayaran",
      desc: "Kelola bank & e-wallet",
    },
    {
      href: "/admin/messages",
      icon: MessageCircle,
      title: "Pesan",
      desc: "Pesan pribadi ke member",
    },
    {
      href: "/admin/activity",
      icon: Activity,
      title: "Aktivitas",
      desc: "Aktivitas realtime platform",
    },
    {
      href: "/admin/withdraw",
      icon: CircleDollarSign,
      title: "Withdraw",
      desc: "Approval withdraw member",
    },
    {
      href: "/admin/settings",
      icon: Settings,
      title: "Pengaturan",
      desc: "Bonus & minimal withdraw",
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">

      {/* BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none">

        <div className="absolute top-0 left-0 w-[450px] h-[450px] bg-green-500/10 blur-[140px]" />

        <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-green-400/10 blur-[140px]" />

      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-5 py-5 sm:py-6 pb-32">

        {/* HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">

          <div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 mb-5">

              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>

              <span className="text-green-400 text-xs sm:text-sm font-black tracking-[0.25em]">
                ADMIN PANEL
              </span>

            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight leading-none">
              Dashboard
            </h1>

            <p className="text-zinc-500 text-sm sm:text-lg mt-5 sm:mt-6 max-w-2xl leading-relaxed">
              Pusat kontrol Digital Affiliate Network realtime.
            </p>

          </div>

          <button className="w-full sm:w-auto h-14 sm:h-16 px-6 rounded-3xl bg-red-600 hover:bg-red-500 transition-all duration-300 flex items-center justify-center gap-3 font-black text-base sm:text-lg">

            <LogOut size={20} />

            Logout

          </button>

        </div>

        {/* NOTIFICATION */}
        <div className="relative overflow-hidden rounded-[30px] sm:rounded-[40px] border border-green-500/20 bg-gradient-to-br from-green-500/15 to-black mt-8 sm:mt-10 p-5 sm:p-7">

          <div className="relative z-10">

            <div className="flex items-center gap-3 mb-4">

              <Bell
                size={22}
                className="text-green-400"
              />

              <span className="text-green-400 font-black tracking-widest text-xs sm:text-sm">
                SYSTEM NOTIFICATION
              </span>

            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black leading-tight max-w-4xl">
              Seluruh sistem DAN berjalan normal.
            </h2>

            <p className="text-zinc-400 mt-5 text-sm sm:text-lg leading-relaxed max-w-3xl">
              Approval transaksi sekarang dipusatkan di halaman transaksi admin.
            </p>

          </div>

        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mt-10">

          <div className="rounded-[35px] border border-zinc-800 bg-zinc-950 p-6">

            <p className="text-zinc-500 text-sm">
              Total Member
            </p>

            <h2 className="text-5xl font-black mt-5">
              {stats.totalMember}
            </h2>

          </div>

          <div className="rounded-[35px] border border-green-500/20 bg-green-500/10 p-6">

            <p className="text-green-300 text-sm">
              Member Aktif
            </p>

            <h2 className="text-5xl font-black text-green-400 mt-5">
              {stats.memberAktif}
            </h2>

          </div>

          <div className="rounded-[35px] border border-zinc-800 bg-zinc-950 p-6">

            <p className="text-zinc-500 text-sm">
              Total Transaksi
            </p>

            <h2 className="text-5xl font-black mt-5">
              {stats.totalTransaksi}
            </h2>

          </div>

          <div className="rounded-[35px] border border-yellow-500/20 bg-yellow-500/10 p-6">

            <p className="text-yellow-300 text-sm">
              Total Withdraw
            </p>

            <h2 className="text-5xl font-black text-yellow-400 mt-5">
              {stats.totalWithdraw}
            </h2>

          </div>

        </div>

        {/* MENU */}
        <div className="mt-14">

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

            <h2 className="text-3xl sm:text-4xl font-black">
              Management Menu
            </h2>

            <div className="flex items-center gap-2">

              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>

              <span className="text-green-400 text-sm font-black">
                SYSTEM ONLINE
              </span>

            </div>

          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">

            {menus.map((item, index) => {

              const Icon = item.icon;

              return (

                <Link
                  key={index}
                  href={item.href}
                  className={`group relative overflow-hidden rounded-[28px] sm:rounded-[35px] min-h-[160px] sm:min-h-[180px] p-5 sm:p-6 transition-all duration-300 ${
                    item.active
                      ? "border border-green-500/20 bg-green-500/10"
                      : "border border-zinc-800 bg-zinc-950 hover:border-green-500"
                  }`}
                >

                  <div className="relative z-10 flex flex-col justify-between h-full">

                    <Icon
                      size={36}
                      className={
                        item.active
                          ? "text-green-400"
                          : "text-white"
                      }
                    />

                    <div>

                      <h3
                        className={`text-xl sm:text-2xl font-black ${
                          item.active
                            ? "text-green-400"
                            : ""
                        }`}
                      >
                        {item.title}
                      </h3>

                      <p
                        className={`text-xs sm:text-sm mt-2 leading-relaxed ${
                          item.active
                            ? "text-green-200/70"
                            : "text-zinc-500"
                        }`}
                      >
                        {item.desc}
                      </p>

                    </div>

                  </div>

                </Link>

              );

            })}

          </div>

        </div>

        {/* LIVE ACTIVITY */}
        <div className="mt-16">

          <div className="flex items-center justify-between mb-6">

            <h2 className="text-3xl sm:text-4xl font-black">
              Live Activity
            </h2>

          </div>

          <div className="space-y-5">

            {activities.map((item, index) => (

              <div
                key={index}
                className="rounded-[32px] border border-zinc-800 bg-zinc-950 p-6"
              >

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

            ))}

          </div>

        </div>

      </div>

    </main>
  );
}
