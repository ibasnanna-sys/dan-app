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

  const referralLink = `${window.location.origin}/register?ref=${member.referral_code}`;

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-md mx-auto px-5 py-6">

        {/* HEADER */}
        <div className="flex items-start justify-between mb-6">

          <div>
            <p className="text-zinc-500 text-sm mb-2">
              Halo,
            </p>

            <h1 className="text-5xl font-bold leading-tight break-words">
              {member.name}
            </h1>
          </div>

          <button
            onClick={logout}
            className="bg-red-600 px-5 h-14 rounded-2xl text-white font-bold"
          >
            Logout
          </button>

        </div>

        {/* STATUS CARD */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-[35px] p-6 mb-5">

          <p className="text-zinc-500 text-sm mb-3">
            Status Member
          </p>

          <div className="flex items-center gap-3 mb-6">

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
              className={`text-4xl font-bold uppercase ${
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

          <p className="text-zinc-500 text-sm mb-3">
            Referral Code
          </p>

          <h2 className="text-4xl font-bold break-words">
            {member.referral_code}
          </h2>

        </div>

        {/* INFO GRID */}
        <div className="grid grid-cols-2 gap-4 mb-5">

          <div className="bg-zinc-900 border border-zinc-800 rounded-[30px] p-5">
            <p className="text-zinc-500 text-sm mb-3">
              Saldo
            </p>

            <h2 className="text-3xl font-bold text-green-500">
              Rp {member.balance || 0}
            </h2>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-[30px] p-5">
            <p className="text-zinc-500 text-sm mb-3">
              Referral
            </p>

            <h2 className="text-3xl font-bold">
              {member.total_referral || 0}
            </h2>
          </div>

        </div>

        {/* COPY BUTTON */}
        <div className="space-y-3 mb-5">

          <button
            onClick={() => {
              navigator.clipboard.writeText(referralLink);

              alert("Link referral berhasil disalin");
            }}
            className="w-full h-14 rounded-2xl bg-zinc-900 border border-zinc-800 text-white font-bold text-lg"
          >
            Copy Link Referral
          </button>

          <button
            onClick={() => {
              navigator.clipboard.writeText(member.referral_code);

              alert("Kode referral berhasil disalin");
            }}
            className="w-full h-14 rounded-2xl bg-zinc-900 border border-zinc-800 text-white font-bold text-lg"
          >
            Copy Kode Referral
          </button>

        </div>

        {/* LIVE ACTIVITY */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-[35px] p-5 mb-5">

          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">
              Aktivitas Member
            </h2>

            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
          </div>

          <div className="space-y-3 max-h-[300px] overflow-y-auto">

            {activities.length === 0 && (
              <div className="text-zinc-500 text-sm">
                Belum ada aktivitas
              </div>
            )}

            {activities.map((item, index) => (
              <div
                key={index}
                className="bg-black/40 rounded-2xl p-4 border border-zinc-800"
              >
                <div className="flex items-center justify-between mb-2">

                  <h3 className="font-bold text-sm">
                    {item.name}
                  </h3>

                  <p className="text-zinc-500 text-xs">
                    {item.city}
                  </p>

                </div>

                <p className="text-sm text-zinc-300 mb-2">
                  {item.activity}
                </p>

                <p className="text-zinc-500 text-xs">
                  {new Date(item.created_at).toLocaleString("id-ID")}
                </p>
              </div>
            ))}

          </div>

        </div>

        {/* MAIN BUTTON */}
        <div className="space-y-4">

          {!isActive ? (
            <Link
              href="/member/produk"
              className="w-full h-16 rounded-3xl bg-green-500 text-black text-2xl font-bold flex items-center justify-center"
            >
              Aktivasi Member
            </Link>
          ) : (
            <Link
              href="/member/produk"
              className="w-full h-16 rounded-3xl bg-green-500 text-black text-2xl font-bold flex items-center justify-center"
            >
              Belanja Paket
            </Link>
          )}

          <div className="grid grid-cols-2 gap-4">

            <Link
              href="/member/transaksi"
              className="h-14 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center font-bold"
            >
              Transaksi
            </Link>

            <Link
              href="/member/profile"
              className="h-14 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center font-bold"
            >
              Profil
            </Link>

            <Link
              href="/member/referral"
              className="h-14 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center font-bold"
            >
              Referral
            </Link>

            <Link
              href="/member/bantuan"
              className="h-14 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center font-bold"
            >
              Bantuan
            </Link>

          </div>

        </div>

      </div>
    </div>
  );
}
