"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import {
  Users,
  ShoppingBag,
  Wallet,
  CreditCard,
  Settings,
  CircleDollarSign,
  LogOut,
  Bell,
  MessageCircle,
  ShieldAlert,
  Activity,
} from "lucide-react";

type TransactionStatus =
  | "pending"
  | "approved"
  | "rejected";

type MemberStatus =
  | "free"
  | "aktif"
  | "dibekukan";

type Transaction = {
  id: number;
  memberName: string;
  city: string;
  product: string;
  amount: number;
  status: TransactionStatus;
  memberStatus: MemberStatus;
  createdAt: string;
};

export default function AdminPage() {

  /*
    =====================================================
    ADMIN DASHBOARD DAN
    =====================================================

    FINAL CONCEPT:
    - Simpel
    - Premium dark modern
    - Fokus operasional
    - Tidak terlalu banyak widget
    - Aktivasi diproses di:
      /admin/transactions

    MEMBER SYSTEM:
    - Approve transaksi => aktif
    - Reject transaksi => free
    - Suspend manual admin
    - Suspend otomatis 60 hari tidak belanja
    - Auto aktif lagi jika belanja lagi

    MESSAGE SYSTEM:
    - Pesan Massal
    - Pesan Pribadi
    - Kendala transaksi manual admin
  */

  const [transactions] =
    useState<Transaction[]>([
      {
        id: 1001,
        memberName: "Akbar",
        city: "Makassar",
        product: "Paket Data Unlimited",
        amount: 350000,
        status: "pending",
        memberStatus: "free",
        createdAt: "2 menit lalu",
      },
      {
        id: 1002,
        memberName: "Dewi",
        city: "Bandung",
        product: "Paket Internet Bulanan",
        amount: 500000,
        status: "approved",
        memberStatus: "aktif",
        createdAt: "8 menit lalu",
      },
      {
        id: 1003,
        memberName: "Fajar",
        city: "Jakarta",
        product: "Voucher Digital",
        amount: 150000,
        status: "pending",
        memberStatus: "free",
        createdAt: "12 menit lalu",
      },
    ]);

  /*
    =====================================================
    LOCAL STORAGE
    =====================================================
  */

  useEffect(() => {

    localStorage.setItem(
      "dan-transactions",
      JSON.stringify(transactions)
    );

    const memberData = transactions.map(
      (trx) => ({
        id: trx.id,
        name: trx.memberName,
        city: trx.city,
        status: trx.memberStatus,
        transactionStatus: trx.status,
      })
    );

    localStorage.setItem(
      "dan-members",
      JSON.stringify(memberData)
    );

  }, [transactions]);

  /*
    =====================================================
    STATS
    =====================================================
  */

  const stats = useMemo(() => {

    const totalMember = 1250;

    const memberAktif =
      transactions.filter(
        (trx) =>
          trx.memberStatus === "aktif"
      ).length + 1118;

    const pendingApproval =
      transactions.filter(
        (trx) =>
          trx.status === "pending"
      ).length;

    const totalPenjualan =
      128500000;

    return {
      totalMember,
      memberAktif,
      pendingApproval,
      totalPenjualan,
    };

  }, [transactions]);

  /*
    =====================================================
    LIVE ACTIVITY
    =====================================================
  */

  const activities = [
    {
      name: "Akbar",
      city: "Makassar",
      activity:
        "Membeli paket data unlimited",
      time: "2 menit lalu",
    },
    {
      name: "Dewi",
      city: "Bandung",
      activity:
        "Bonus referral berhasil masuk",
      time: "5 menit lalu",
    },
    {
      name: "Fajar",
      city: "Jakarta",
      activity:
        "Withdraw berhasil diproses",
      time: "11 menit lalu",
    },
  ];

  /*
    =====================================================
    MENU
    =====================================================
  */

  const menus = [
    {
      href: "/admin/members",
      icon: Users,
      title: "Member",
      desc:
        "Status member & suspend akun",
    },
    {
      href: "/admin/transactions",
      icon: Wallet,
      title: "Transaksi",
      desc:
        "Approve transaksi member",
      active: true,
    },
    {
      href: "/admin/products",
      icon: ShoppingBag,
      title: "Produk",
      desc:
        "Kelola produk digital",
    },
    {
      href: "/admin/payment",
      icon: CreditCard,
      title: "Pembayaran",
      desc:
        "Bank & e-wallet",
    },
    {
      href: "/admin/messages",
      icon: MessageCircle,
      title: "Pesan",
      desc:
        "Massal & pribadi",
    },
    {
      href: "/admin/withdraw",
      icon: CircleDollarSign,
      title: "Withdraw",
      desc:
        "Approval withdraw",
    },
    {
      href: "/admin/settings",
      icon: Settings,
      title: "Pengaturan",
      desc:
        "Bonus & sistem",
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">

      {/* BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none">

        <div className="absolute top-0 left-0 w-[420px] h-[420px] bg-green-500/10 blur-[140px]" />

        <div className="absolute bottom-0 right-0 w-[320px] h-[320px] bg-green-400/5 blur-[120px]" />

      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-6 pb-32">

        {/* HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">

          <div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-green-500/20 bg-green-500/10 mb-5">

              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />

              <span className="text-green-400 text-xs font-black tracking-[0.25em]">
                ADMIN PANEL
              </span>

            </div>

            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-none">
              Dashboard
            </h1>

            <p className="text-zinc-500 mt-5 max-w-2xl leading-relaxed text-sm sm:text-base">
              Pusat kontrol Digital Affiliate Network untuk monitoring member, transaksi, produk digital, pembayaran, dan aktivitas platform realtime.
            </p>

          </div>

          <button className="h-14 px-6 rounded-3xl bg-red-600 hover:bg-red-500 transition-all duration-300 flex items-center justify-center gap-3 font-black shadow-[0_0_30px_rgba(255,0,0,0.25)]">

            <LogOut size={20} />

            Logout

          </button>

        </div>

        {/* SYSTEM STATUS */}
        <div className="relative overflow-hidden rounded-[35px] border border-green-500/20 bg-gradient-to-br from-green-500/15 to-black mt-10 p-6">

          <div className="absolute top-0 right-0 w-56 h-56 bg-green-500/10 blur-[120px] rounded-full" />

          <div className="relative z-10">

            <div className="flex items-center gap-3 mb-4">

              <Bell
                size={20}
                className="text-green-400"
              />

              <span className="text-green-400 font-black tracking-widest text-xs">
                SYSTEM STATUS
              </span>

            </div>

            <h2 className="text-2xl md:text-4xl font-black leading-tight max-w-4xl">
              Sistem DAN berjalan normal dan realtime.
            </h2>

            <p className="text-zinc-400 mt-5 max-w-3xl leading-relaxed">
              Approval transaksi diproses melalui halaman transaksi admin dan otomatis mengaktifkan status member setelah approve.
            </p>

          </div>

        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mt-10">

          {[
            {
              title: "Total Member",
              value: stats.totalMember,
              color: "text-white",
            },
            {
              title: "Member Aktif",
              value: stats.memberAktif,
              color: "text-green-400",
              active: true,
            },
            {
              title: "Pending Approval",
              value: stats.pendingApproval,
              color: "text-yellow-300",
            },
            {
              title: "Total Penjualan",
              value:
                "Rp " +
                stats.totalPenjualan.toLocaleString(
                  "id-ID"
                ),
              color: "text-cyan-400",
            },
          ].map((item, index) => (

            <div
              key={index}
              className={`rounded-[30px] p-5 border ${
                item.active
                  ? "border-green-500/20 bg-green-500/10"
                  : "border-zinc-800 bg-zinc-950"
              }`}
            >

              <p className="text-zinc-500 text-sm">
                {item.title}
              </p>

              <h2 className={`text-2xl sm:text-4xl font-black mt-5 break-words ${item.color}`}>
                {item.value}
              </h2>

            </div>

          ))}

        </div>

        {/* QUICK ACTION */}
        <div className="grid md:grid-cols-2 gap-5 mt-10">

          <div className="rounded-[35px] border border-zinc-800 bg-zinc-950 p-6">

            <div className="flex items-center gap-3 mb-5">

              <ShieldAlert
                className="text-yellow-300"
                size={22}
              />

              <h2 className="text-2xl font-black">
                Suspend Member
              </h2>

            </div>

            <p className="text-zinc-500 leading-relaxed">
              Member dapat dibekukan karena tidak belanja selama 60 hari atau dicurigai melakukan pelanggaran/manipulasi sistem.
            </p>

            <div className="mt-5 p-4 rounded-2xl border border-zinc-800 bg-black text-sm text-zinc-400 leading-relaxed">
              Jika member kembali melakukan transaksi valid, status otomatis aktif kembali.
            </div>

          </div>

          <div className="rounded-[35px] border border-zinc-800 bg-zinc-950 p-6">

            <div className="flex items-center gap-3 mb-5">

              <MessageCircle
                className="text-green-400"
                size={22}
              />

              <h2 className="text-2xl font-black">
                Sistem Pesan
              </h2>

            </div>

            <p className="text-zinc-500 leading-relaxed">
              Admin dapat mengirim pesan massal untuk seluruh member atau pesan pribadi berdasarkan ID referral/member.
            </p>

            <div className="mt-5 p-4 rounded-2xl border border-zinc-800 bg-black text-sm text-zinc-400 leading-relaxed">
              Digunakan untuk peringatan akun, kendala transaksi, atau informasi penting platform.
            </div>

          </div>

        </div>

        {/* MENU */}
        <div className="mt-14">

          <div className="flex items-center justify-between mb-6">

            <h2 className="text-3xl md:text-4xl font-black">
              Management Menu
            </h2>

            <div className="flex items-center gap-2">

              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />

              <span className="text-green-400 text-sm font-black">
                SYSTEM ONLINE
              </span>

            </div>

          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">

            {menus.map((item, index) => {

              const Icon = item.icon;

              return (

                <Link
                  key={index}
                  href={item.href}
                  className={`group rounded-[30px] min-h-[170px] p-5 border transition-all duration-300 ${
                    item.active
                      ? "border-green-500/20 bg-green-500/10"
                      : "border-zinc-800 bg-zinc-950 hover:border-green-500"
                  }`}
                >

                  <div className="flex flex-col justify-between h-full">

                    <Icon
                      size={34}
                      className={
                        item.active
                          ? "text-green-400"
                          : "text-white"
                      }
                    />

                    <div>

                      <h3 className={`text-xl sm:text-2xl font-black ${
                        item.active
                          ? "text-green-400"
                          : ""
                      }`}>
                        {item.title}
                      </h3>

                      <p className={`text-sm mt-2 leading-relaxed ${
                        item.active
                          ? "text-green-200/70"
                          : "text-zinc-500"
                      }`}>
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
        <div className="mt-14">

          <div className="flex items-center justify-between mb-6">

            <h2 className="text-3xl md:text-4xl font-black">
              Live Activity
            </h2>

            <div className="flex items-center gap-2">

              <Activity
                size={16}
                className="text-green-400"
              />

              <span className="text-green-400 font-black text-sm">
                REALTIME
              </span>

            </div>

          </div>

          <div className="space-y-4">

            {activities.map((item, index) => (

              <div
                key={index}
                className="rounded-[30px] border border-zinc-800 bg-zinc-950 p-5"
              >

                <div className="flex items-start justify-between gap-4">

                  <div>

                    <h3 className="text-xl font-black">
                      {item.name}
                    </h3>

                    <p className="text-zinc-500 mt-1 text-sm">
                      {item.city}
                    </p>

                  </div>

                  <span className="text-zinc-500 text-xs whitespace-nowrap">
                    {item.time}
                  </span>

                </div>

                <p className="mt-4 text-zinc-300 leading-relaxed">
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
