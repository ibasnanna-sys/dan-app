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
      .limit(30);

    if (data) {
      setActivities(data);
    }
  }

  function logout() {
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

  const statusMember =
    member.status_member || member.status || "free";

  const isActive = statusMember === "aktif";
  const isFrozen = statusMember === "dibekukan";

  const referralLink = `${window.location.origin}/register?ref=${member.referral_code}`;

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-md mx-auto px-5 py-6">

        {/* HEADER */}
        <div className="flex items-start justify-between mb-8">

          <div className="flex-1">

            <p className="text-zinc-500 text-sm mb-2">
              Halo,
            </p>

            <h1 className="text-5xl font-black leading-tight break-words mb-4">
              {member.name}
            </h1>

            {/* STATUS */}
            <div className="flex items-center gap-3 mb-5">

              <div
                className={`w-4 h-4 rounded-full ${
                  isActive
                    ? "bg-green-500"
                    : isFrozen
                    ? "bg-red-500"
                    : "bg-yellow-400"
                }`}
              />

              <p
                className={`text-2xl font-black uppercase ${
                  isActive
                    ? "text-green-500"
                    : isFrozen
                    ? "text-red-500"
                    : "text-yellow-400"
                }`}
              >
                {statusMember}
              </p>

            </div>

            {/* REFERRAL */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5">

              <p className="text-zinc-500 text-sm mb-3">
                Referral Code
              </p>

              <h2 className="text-4xl font-black break-all mb-5">
                {member.referral_code}
              </h2>

              <div className="grid grid-cols-2 gap-3">

                <button
                  onClick={() => {
                    navigator.clipboard.writeText(referralLink);

                    alert("Link referral berhasil disalin");
                  }}
                  className="h-12 rounded-2xl bg-black border border-zinc-800 text-sm font-bold"
                >
                  Copy Link
                </button>

                <button
                  onClick={() => {
                    navigator.clipboard.writeText(
                      member.referral_code
                    );

                    alert("Kode referral berhasil disalin");
                  }}
                  className="h-12 rounded-2xl bg-black border border-zinc-800 text-sm font-bold"
                >
                  Copy Kode
                </button>

              </div>

            </div>

          </div>

          {/* LOGOUT */}
          <button
            onClick={logout}
            className="ml-4 h-12 px-5 rounded-2xl bg-red-600 text-white text-sm font-bold"
          >
            Logout
          </button>

        </div>

        {/* FREEZE WARNING */}
        {isFrozen && (
          <div className="bg-red-600/20 border border-red-600 rounded-3xl p-5 mb-6">
            <p className="text-red-400 font-bold leading-relaxed">
              Akun dibekukan karena tidak transaksi 60 hari.
              Bonus referral dihentikan sementara.
            </p>
          </div>
        )}

        {/* INFO CARD */}
        <div className="space-y-4 mb-8">

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
            <p className="text-zinc-500 text-sm mb-3">
              Saldo Total
            </p>

            <h2 className="text-4xl font-black text-green-500 break-words">
              Rp {Number(member.balance || 0).toLocaleString("id-ID")}
            </h2>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
            <p className="text-zinc-500 text-sm mb-3">
              Total Referral
            </p>

            <h2 className="text-4xl font-black">
              {member.total_referral || 0} Member
            </h2>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
            <p className="text-zinc-500 text-sm mb-3">
              Bonus Sponsor
            </p>

            <h2 className="text-4xl font-black">
              Rp{" "}
              {Number(
                member.bonus_sponsor || 0
              ).toLocaleString("id-ID")}
            </h2>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
            <p className="text-zinc-500 text-sm mb-3">
              Bonus Referral
            </p>

            <h2 className="text-4xl font-black">
              Rp{" "}
              {Number(
                member.bonus_referral || 0
              ).toLocaleString("id-ID")}
            </h2>
          </div>

        </div>

        {/* BUTTON UTAMA */}
        <div className="mb-8">

          {!isActive ? (
            <Link
              href="/member/produk"
              className="w-full h-16 rounded-3xl bg-yellow-400 text-black text-2xl font-black flex items-center justify-center mb-4"
            >
              Aktivasi Member
            </Link>
          ) : (
            <Link
              href="/member/produk"
              className="w-full h-16 rounded-3xl bg-green-500 text-black text-2xl font-black flex items-center justify-center mb-4"
            >
              Belanja Paket
            </Link>
          )}

          {/* GRID MENU */}
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

            <Link
              href="/member/withdraw"
              className="h-14 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center font-bold col-span-2"
            >
              Withdraw
            </Link>

          </div>

        </div>

        {/* LIVE ACTIVITY */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5">

          <div className="flex items-center justify-between mb-5">

            <h2 className="text-xl font-black">
              Aktivitas Member
            </h2>

            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />

          </div>

          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-1">

            {activities.length === 0 && (
              <div className="text-zinc-500 text-sm">
                Belum ada aktivitas
              </div>
            )}

            {activities.map((item, index) => (
              <div
                key={index}
                className="bg-black border border-zinc-800 rounded-2xl p-4"
              >

                <div className="flex items-center justify-between mb-2">

                  <h3 className="font-bold break-words">
                    {item.member_name || item.name}
                  </h3>

                  <p className="text-zinc-500 text-xs">
                    {item.city}
                  </p>

                </div>

                <p className="text-zinc-300 text-sm mb-2 break-words">
                  {item.activity}
                </p>

                <p className="text-zinc-500 text-xs">
                  {new Date(item.created_at).toLocaleString("id-ID")}
                </p>

              </div>
            ))}

          </div>

        </div>

      </div>
    </main>
  );
}
