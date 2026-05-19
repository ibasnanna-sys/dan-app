"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminDashboardPage() {

  const [stats, setStats] =
    useState({
      totalMembers: 0,
      activeMembers: 0,
      frozenMembers: 0,
      totalTransactions: 0,
      totalWithdraw: 0,
    });

  const [activities, setActivities] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    loadDashboard();

  }, []);

  async function loadDashboard() {

    try {

      // MEMBERS
      const {
        data: members,
      } = await supabase
        .from("members")
        .select("*");

      // TRANSACTIONS
      const {
        data: transactions,
      } = await supabase
        .from("transactions")
        .select("*");

      // WITHDRAW
      const {
        data: withdraws,
      } = await supabase
        .from("withdraws")
        .select("*");

      // ACTIVITIES
      const {
        data: activityData,
      } = await supabase
        .from("activity_logs")
        .select("*")
        .order("created_at", {
          ascending: false,
        })
        .limit(20);

      setStats({

        totalMembers:
          members?.length || 0,

        activeMembers:
          members?.filter(
            (item) =>
              item.status === "aktif"
          ).length || 0,

        frozenMembers:
          members?.filter(
            (item) =>
              item.status ===
              "dibekukan"
          ).length || 0,

        totalTransactions:
          transactions?.length || 0,

        totalWithdraw:
          withdraws?.length || 0,

      });

      setActivities(
        activityData || []
      );

    } catch (err) {

      console.log(err);

    }

    setLoading(false);
  }

  if (loading) {

    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">

      {/* BACKGROUND */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,255,100,0.12),transparent_35%)] pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto p-5 pb-32">

        {/* HEADER */}
        <div className="flex items-start justify-between gap-5 flex-wrap">

          <div>

            <p className="text-zinc-500 text-sm tracking-[0.25em] uppercase">
              DAN ADMIN PANEL
            </p>

            <h1 className="text-6xl font-black tracking-tight mt-2">
              Dashboard
            </h1>

            <p className="text-zinc-400 text-lg mt-5 max-w-2xl leading-relaxed">
              Pusat kontrol Digital Affiliate Network untuk mengelola member, transaksi, produk digital, withdraw, referral, dan seluruh aktivitas platform secara realtime.
            </p>

          </div>

          <div className="inline-flex items-center gap-3 px-6 py-4 rounded-full bg-green-500/10 border border-green-500/20 shadow-[0_0_40px_rgba(0,255,100,0.15)]">

            <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>

            <span className="text-green-400 font-black tracking-wide">
              SYSTEM ONLINE
            </span>

          </div>

        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 xl:grid-cols-5 gap-5 mt-10">

          <div className="relative overflow-hidden rounded-[36px] border border-zinc-800 bg-white/[0.03] backdrop-blur-xl p-6">

            <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 blur-3xl rounded-full"></div>

            <div className="relative z-10">

              <p className="text-zinc-500 text-sm">
                Total Member
              </p>

              <h2 className="text-5xl font-black mt-5">
                {stats.totalMembers}
              </h2>

            </div>

          </div>

          <div className="relative overflow-hidden rounded-[36px] border border-green-500/20 bg-green-500/10 backdrop-blur-xl p-6 shadow-[0_0_30px_rgba(0,255,100,0.12)]">

            <div className="relative z-10">

              <p className="text-green-300 text-sm">
                Member Aktif
              </p>

              <h2 className="text-5xl font-black text-green-400 mt-5">
                {stats.activeMembers}
              </h2>

            </div>

          </div>

          <div className="relative overflow-hidden rounded-[36px] border border-red-500/20 bg-red-500/10 backdrop-blur-xl p-6 shadow-[0_0_30px_rgba(255,0,0,0.12)]">

            <div className="relative z-10">

              <p className="text-red-300 text-sm">
                Member Freeze
              </p>

              <h2 className="text-5xl font-black text-red-400 mt-5">
                {stats.frozenMembers}
              </h2>

            </div>

          </div>

          <div className="relative overflow-hidden rounded-[36px] border border-zinc-800 bg-white/[0.03] backdrop-blur-xl p-6">

            <div className="relative z-10">

              <p className="text-zinc-500 text-sm">
                Total Transaksi
              </p>

              <h2 className="text-5xl font-black mt-5">
                {stats.totalTransactions}
              </h2>

            </div>

          </div>

          <div className="relative overflow-hidden rounded-[36px] border border-zinc-800 bg-white/[0.03] backdrop-blur-xl p-6">

            <div className="relative z-10">

              <p className="text-zinc-500 text-sm">
                Total Withdraw
              </p>

              <h2 className="text-5xl font-black mt-5">
                {stats.totalWithdraw}
              </h2>

            </div>

          </div>

        </div>

        {/* MENU */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-5 mt-10">

          <Link
            href="/admin/products"
            className="rounded-[32px] bg-green-500 text-black min-h-[140px] p-6 flex items-center justify-center text-center text-2xl font-black shadow-[0_0_40px_rgba(0,255,100,0.30)]"
          >
            Produk
          </Link>

          <Link
            href="/admin/transactions"
            className="rounded-[32px] border border-zinc-800 bg-white/[0.03] backdrop-blur-xl min-h-[140px] p-6 flex items-center justify-center text-center text-2xl font-black hover:border-green-500 transition"
          >
            Transaksi
          </Link>

          <Link
            href="/admin/members"
            className="rounded-[32px] border border-zinc-800 bg-white/[0.03] backdrop-blur-xl min-h-[140px] p-6 flex items-center justify-center text-center text-2xl font-black hover:border-green-500 transition"
          >
            Member
          </Link>

          <Link
            href="/admin/withdraw"
            className="rounded-[32px] border border-zinc-800 bg-white/[0.03] backdrop-blur-xl min-h-[140px] p-6 flex items-center justify-center text-center text-2xl font-black hover:border-green-500 transition"
          >
            Withdraw
          </Link>

          <Link
            href="/admin/chats"
            className="rounded-[32px] border border-zinc-800 bg-white/[0.03] backdrop-blur-xl min-h-[140px] p-6 flex items-center justify-center text-center text-2xl font-black hover:border-green-500 transition"
          >
            Bantuan
          </Link>

          <Link
            href="/admin/settings"
            className="rounded-[32px] border border-zinc-800 bg-white/[0.03] backdrop-blur-xl min-h-[140px] p-6 flex items-center justify-center text-center text-2xl font-black hover:border-green-500 transition"
          >
            Pengaturan
          </Link>

        </div>

        {/* LIVE ACTIVITY */}
        <div className="mt-12">

          <div className="flex items-center justify-between mb-6">

            <h2 className="text-4xl font-black">
              Aktivitas Platform
            </h2>

            <div className="flex items-center gap-2">

              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>

              <span className="text-green-400 font-black text-sm">
                REALTIME
              </span>

            </div>

          </div>

          <div className="relative h-[500px] overflow-hidden rounded-[40px] border border-zinc-800 bg-zinc-950 p-5">

            <div className="animate-scroll space-y-5">

              {[...activities, ...activities].map(
                (item, index) => (

                  <div
                    key={index}
                    className="relative overflow-hidden rounded-[32px] border border-zinc-800 bg-white/[0.03] backdrop-blur-xl p-6"
                  >

                    <div className="absolute top-0 right-0 w-40 h-40 bg-green-500/5 blur-3xl rounded-full"></div>

                    <div className="relative z-10">

                      <div className="flex items-start justify-between gap-4">

                        <div>

                          <h3 className="text-2xl font-black">
                            {item.member_name}
                          </h3>

                          <p className="text-zinc-500 mt-2">
                            {item.city}
                          </p>

                        </div>

                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20">

                          <div className="w-2 h-2 rounded-full bg-green-400"></div>

                          <span className="text-green-400 text-sm font-black">
                            LIVE
                          </span>

                        </div>

                      </div>

                      <p className="text-xl mt-5 leading-relaxed">
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

    </div>
  );
}
