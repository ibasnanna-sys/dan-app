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
  MessageCircle,
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
    ADMIN DASHBOARD FINAL PREMIUM CLEAN
    =====================================================

    FIX FINAL:
    - UI lebih simpel & premium
    - Hapus tombol duplicate
    - Suspend hanya di halaman member
    - System notification dihapus
    - Menu pesan gabung:
      personal + mass broadcast
    - Total penjualan diganti:
      total produk terjual
    - Live activity mini auto scroll
    - Fokus approval transaksi
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
        product: "Paket Data Bulanan",
        amount: 500000,
        status: "approved",
        memberStatus: "aktif",
        createdAt: "8 menit lalu",
      },
      {
        id: 1003,
        memberName: "Fajar",
        city: "Jakarta",
        product: "Paket Data Harian",
        amount: 250000,
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

    const memberData =
      transactions.map((trx) => ({
        id: trx.id,
        name: trx.memberName,
        city: trx.city,
        status: trx.memberStatus,
        transactionStatus:
          trx.status,
      }));

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
          trx.memberStatus ===
          "aktif"
      ).length + 1118;

    const totalTransaksi =
      transactions.length + 8418;

    const totalWithdraw = 329;

    const totalProduk = 48;

    const totalTerjual = 12480;

    return {
      totalMember,
      memberAktif,
      totalTransaksi,
      totalWithdraw,
      totalProduk,
      totalTerjual,
    };

  }, [transactions]);

  /*
    =====================================================
    LIVE ACTIVITY
    =====================================================
  */

  const activities = [
    {
      text: "Dewi • Bandung",
      sub:
        "Belanja paket data",
    },
    {
      text: "Akbar • Makassar",
      sub:
        "Aktivasi member berhasil",
    },
    {
      text: "Rizky • Jakarta",
      sub:
        "Bonus referral masuk",
    },
    {
      text: "Fajar • Surabaya",
      sub:
        "Withdraw berhasil",
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
        "Status, suspend & histori transaksi",
    },
    {
      href: "/admin/products",
      icon: ShoppingBag,
      title: "Produk",
      desc:
        "Kelola produk digital",
    },
    {
      href: "/admin/transactions",
      icon: Wallet,
      title: "Transaksi",
      desc:
        "Approval aktivasi member",
      active: true,
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
        "Pesan pribadi & massal",
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

        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-green-500/10 blur-[140px]" />

        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-green-500/10 blur-[120px]" />

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
              Kontrol member,
              transaksi, produk
              digital dan sistem DAN
              secara realtime.
            </p>

          </div>

          <button className="w-full sm:w-auto h-14 sm:h-16 px-6 rounded-3xl bg-red-600 hover:bg-red-500 transition-all duration-300 flex items-center justify-center gap-3 font-black text-base sm:text-lg shadow-[0_0_35px_rgba(255,0,0,0.25)]">

            <LogOut size={20} />

            Logout

          </button>

        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 mt-10">

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
              title: "Total Transaksi",
              value: stats.totalTransaksi,
              color: "text-white",
            },
            {
              title: "Total Withdraw",
              value: stats.totalWithdraw,
              color: "text-yellow-400",
            },
            {
              title: "Total Produk",
              value: stats.totalProduk,
              color: "text-white",
            },
            {
              title: "Produk Terjual",
              value:
                stats.totalTerjual.toLocaleString(
                  "id-ID"
                ),
              color: "text-green-400",
              active: true,
            },
          ].map((item, index) => (

            <div
              key={index}
              className={`relative overflow-hidden rounded-[28px] sm:rounded-[35px] p-5 sm:p-6 border ${
                item.active
                  ? "border-green-500/20 bg-green-500/10"
                  : "border-zinc-800 bg-zinc-950"
              }`}
            >

              <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 blur-3xl rounded-full"></div>

              <div className="relative z-10">

                <p className="text-zinc-500 text-sm">
                  {item.title}
                </p>

                <h2 className={`text-2xl sm:text-4xl font-black mt-5 break-words ${item.color}`}>
                  {item.value}
                </h2>

              </div>

            </div>

          ))}

        </div>

        {/* MENU */}
        <div className="mt-14">

          <div className="flex items-center justify-between mb-6">

            <h2 className="text-3xl sm:text-4xl font-black">
              Management
            </h2>

            <span className="text-green-400 text-sm font-black tracking-wider">
              SYSTEM ONLINE
            </span>

          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">

            {menus.map((item, index) => {

              const Icon = item.icon;

              return (

                <Link
                  key={index}
                  href={item.href}
                  className={`group relative overflow-hidden rounded-[28px] sm:rounded-[35px] min-h-[160px] sm:min-h-[170px] p-5 sm:p-6 transition-all duration-300 ${
                    item.active
                      ? "border border-green-500/20 bg-green-500/10"
                      : "border border-zinc-800 bg-zinc-950 hover:border-green-500"
                  }`}
                >

                  <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 blur-3xl rounded-full"></div>

                  <div className="relative z-10 flex flex-col justify-between h-full">

                    <Icon
                      size={34}
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

        {/* LIVE ACTIVITY MINI */}
        <div className="mt-14">

          <div className="flex items-center justify-between mb-6">

            <h2 className="text-3xl sm:text-4xl font-black">
              Live Activity
            </h2>

            <span className="text-green-400 text-sm font-black tracking-wider">
              REALTIME
            </span>

          </div>

          <div className="relative overflow-hidden rounded-[30px] border border-zinc-800 bg-zinc-950 h-[260px]">

            <div className="animate-scroll py-4 space-y-3">

              {[...activities, ...activities].map(
                (item, index) => (

                  <div
                    key={index}
                    className="mx-4 rounded-2xl border border-zinc-800 bg-black px-5 py-4"
                  >

                    <h3 className="font-black text-base sm:text-lg">
                      {item.text}
                    </h3>

                    <p className="text-zinc-500 text-sm mt-1">
                      {item.sub}
                    </p>

                  </div>

                )
              )}

            </div>

          </div>

        </div>

      </div>

      <style jsx>{`
        .animate-scroll {
          animation: scrollUp 18s linear infinite;
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
