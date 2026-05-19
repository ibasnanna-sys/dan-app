"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function DashboardPage() {
  const router = useRouter();

  const [member, setMember] = useState<any>(null);
  const [activities, setActivities] = useState<any[]>([]);

  useEffect(() => {
    getMember();
    getActivities();
  }, []);

  async function getMember() {
    const localUser = localStorage.getItem("member");

    if (!localUser) {
      router.push("/login");
      return;
    }

    const user = JSON.parse(localUser);

    const { data } = await supabase
      .from("members")
      .select("*")
      .eq("id", user.id)
      .single();

    if (!data) {
      router.push("/login");
      return;
    }

    setMember(data);
  }

  async function getActivities() {
    const { data } = await supabase
      .from("activity_logs")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(20);

    if (data) {
      setActivities(data);
    }
  }

  async function logout() {
    localStorage.removeItem("member");
    router.push("/login");
  }

  if (!member) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  const isActive = member.status === "aktif";
  const isFrozen = member.status === "dibekukan";

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-md mx-auto px-5 py-6">

        {/* HEADER */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-zinc-500 text-sm">Halo,</p>
            <h1 className="text-4xl font-bold leading-tight">
              {member.name}
            </h1>
          </div>

          <button
            onClick={logout}
            className="bg-red-600 px-5 py-3 rounded-2xl font-bold"
          >
            Logout
          </button>
        </div>

        {/* STATUS */}
        <div className="bg-zinc-900 rounded-3xl p-6 mb-4 border border-zinc-800">
          <p className="text-zinc-500 mb-2">Status Member</p>

          <div className="flex items-center gap-3">
            <div
              className={`w-4 h-4 rounded-full ${
                isActive
                  ? "bg-green-500"
                  : isFrozen
                  ? "bg-red-500"
                  : "bg-yellow-400"
              }`}
            />

            <h2
              className={`text-3xl font-bold uppercase ${
                isActive
                  ? "text-green-500"
                  : isFrozen
                  ? "text-red-500"
                  : "text-yellow-400"
              }`}
            >
              {member.status}
            </h2>
          </div>

          <div className="mt-6">
            <p className="text-zinc-500 mb-2">Referral Code</p>

            <h3 className="text-4xl font-bold text-white">
              {member.referral_code}
            </h3>
          </div>
        </div>

        {/* INFO */}
        <div className="grid grid-cols-2 gap-4 mb-4">

          <div className="bg-zinc-900 rounded-3xl p-5 border border-zinc-800">
            <p className="text-zinc-500 mb-2">Saldo</p>

            <h3 className="text-3xl font-bold text-green-500">
              Rp {member.balance || 0}
            </h3>
          </div>

          <div className="bg-zinc-900 rounded-3xl p-5 border border-zinc-800">
            <p className="text-zinc-500 mb-2">Referral</p>

            <h3 className="text-3xl font-bold">
              {member.total_referral || 0}
            </h3>
          </div>
        </div>

        {/* MEMBER INFO */}
        <div className="bg-zinc-900 rounded-3xl p-5 border border-zinc-800 mb-5">
          <p className="text-zinc-500 mb-4">Informasi Member</p>

          <div className="space-y-4">
            <div>
              <p className="text-zinc-500 text-sm">Nomor HP</p>
              <p className="font-bold text-xl">{member.phone}</p>
            </div>

            <div>
              <p className="text-zinc-500 text-sm">Kota</p>
              <p className="font-bold text-xl">{member.city}</p>
            </div>
          </div>
        </div>

        {/* TOMBOL UTAMA */}
        <div className="space-y-3 mb-6">

          {!isActive ? (
            <Link
              href="/member/produk"
              className="h-14 rounded-2xl bg-green-500 text-black font-bold text-lg flex items-center justify-center"
            >
              Aktivasi Member
            </Link>
          ) : (
            <Link
              href="/member/produk"
              className="h-14 rounded-2xl bg-green-500 text-black font-bold text-lg flex items-center justify-center"
            >
              Belanja Paket
            </Link>
          )}

          <div className="grid grid-cols-2 gap-3">

            <Link
              href="/member/transaksi"
              className="bg-zinc-900 h-14 rounded-2xl flex items-center justify-center font-bold border border-zinc-800"
            >
              Transaksi
            </Link>

            <Link
              href="/member/profile"
              className="bg-zinc-900 h-14 rounded-2xl flex items-center justify-center font-bold border border-zinc-800"
            >
              Profil
            </Link>

            <Link
              href="/member/referral"
              className="bg-zinc-900 h-14 rounded-2xl flex items-center justify-center font-bold border border-zinc-800"
            >
              Referral
            </Link>

            <Link
              href="/member/bantuan"
              className="bg-zinc-900 h-14 rounded-2xl flex items-center justify-center font-bold border border-zinc-800"
            >
              Bantuan
            </Link>

            <Link
              href="/member/withdraw"
              className="bg-zinc-900 h-14 rounded-2xl flex items-center justify-center font-bold border border-zinc-800 col-span-2"
            >
              Withdraw
            </Link>

          </div>
        </div>

        {/* LIVE AKTIVITAS */}
        <div className="bg-zinc-900 rounded-3xl p-5 border border-zinc-800">

          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg">
              Aktivitas Member Hari Ini
            </h3>

            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          </div>

          <div className="space-y-3 max-h-96 overflow-y-auto pr-1">

            {activities.map((item, index) => (
              <div
                key={index}
                className="bg-black rounded-2xl p-4 border border-zinc-800"
              >
                <div className="flex items-center justify-between mb-1">
                  <p className="font-bold">{item.name}</p>

                  <span className="text-xs text-zinc-500">
                    {item.city}
                  </span>
                </div>

                <p className="text-sm text-zinc-300">
                  {item.activity}
                </p>
              </div>
            ))}

          </div>
        </div>

      </div>
    </div>
  );
}
