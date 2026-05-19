"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function DashboardPage() {

  const [member, setMember] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    loadMember();

  }, []);

  async function loadMember() {

    const memberId =
      localStorage.getItem("member_id");

    if (!memberId) {

      window.location.href =
        "/login";

      return;
    }

    const { data, error } =
      await supabase
        .from("members")
        .select("*")
        .eq("id", memberId)
        .single();

    if (error || !data) {

      localStorage.removeItem(
        "member_id"
      );

      window.location.href =
        "/login";

      return;
    }

    setMember(data);

    setLoading(false);
  }

  function logout() {

    localStorage.removeItem(
      "member_id"
    );

    window.location.href =
      "/login";
  }

  if (loading) {

    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pb-32">

      <div className="px-5 pt-8">

        <div className="flex items-start justify-between">

          <div>

            <p className="text-zinc-500 text-lg">
              Selamat Datang
            </p>

            <h1 className="text-5xl font-black mt-1 leading-none">
              {member?.name}
            </h1>

          </div>

          <button
            onClick={logout}
            className="bg-red-600 px-5 py-3 rounded-2xl font-bold"
          >
            Logout
          </button>

        </div>

        <div className="bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 rounded-[36px] p-6 mt-8 relative overflow-hidden">

          <div className="absolute -top-16 -right-16 w-52 h-52 bg-green-500/10 rounded-full blur-3xl" />

          <p className="text-zinc-500 text-lg relative z-10">
            Status Member
          </p>

          <h2 className="text-6xl font-black mt-3 capitalize relative z-10">
            {member?.status_member}
          </h2>

          <div className="mt-8 relative z-10">

            <p className="text-zinc-500">
              Saldo
            </p>

            <h3 className="text-5xl font-black text-green-500 mt-2">
              Rp{" "}
              {Number(
                member?.balance || 0
              ).toLocaleString("id-ID")}
            </h3>

          </div>

          {member?.status_member ===
            "free" && (

            <a
              href="/member/produk"
              className="inline-block bg-green-500 text-black px-6 py-4 rounded-2xl font-black text-lg mt-8 relative z-10"
            >
              Aktivasi Sekarang
            </a>

          )}

          {(member?.status_member ===
            "aktif" ||
            member?.status_member ===
            "dibekukan") && (

            <a
              href="/member/produk"
              className="inline-block bg-green-500 text-black px-6 py-4 rounded-2xl font-black text-lg mt-8 relative z-10"
            >
              Belanja Sekarang
            </a>

          )}

        </div>

        {member?.status_member ===
          "dibekukan" && (

          <div className="bg-yellow-500 text-black rounded-[32px] p-6 mt-5">

            <p className="font-black text-xl">
              Akun Dibekukan
            </p>

            <p className="mt-3 text-lg">
              Bonus referral berhenti
              sampai member melakukan
              transaksi kembali.
            </p>

          </div>

        )}

        <div className="grid grid-cols-2 gap-4 mt-5">

          <div className="bg-zinc-900 border border-zinc-800 rounded-[32px] p-5">

            <p className="text-zinc-500">
              Referral
            </p>

            <h2 className="text-5xl font-black mt-3">
              {member?.total_referral ||
                0}
            </h2>

          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-[32px] p-5">

            <p className="text-zinc-500">
              Status
            </p>

            <h2 className="text-3xl font-black mt-5 capitalize">
              {member?.status_member}
            </h2>

          </div>

        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-[32px] p-5 mt-5">

          <p className="text-zinc-500">
            Referral Code
          </p>

          <h2 className="text-5xl font-black mt-3 break-all">
            {member?.referral_code}
          </h2>

        </div>

        <div className="mt-8">

          <p className="text-zinc-500 text-lg mb-4">
            Menu Member
          </p>

          <div className="grid grid-cols-2 gap-4">

            <a
              href="/member/transaksi"
              className="bg-zinc-900 border border-zinc-800 rounded-[32px] p-5"
            >

              <h2 className="text-3xl font-black">
                Transaksi
              </h2>

              <p className="text-zinc-500 mt-3">
                Riwayat pembelian
              </p>

            </a>

            <a
              href="/member/profile"
              className="bg-zinc-900 border border-zinc-800 rounded-[32px] p-5"
            >

              <h2 className="text-3xl font-black">
                Profile
              </h2>

              <p className="text-zinc-500 mt-3">
                Informasi akun
              </p>

            </a>

          </div>

        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-[32px] p-5 mt-8">

          <p className="text-zinc-500 text-lg">
            Informasi Member
          </p>

          <div className="mt-5 space-y-5">

            <div>

              <p className="text-zinc-500">
                Email
              </p>

              <h3 className="text-2xl font-black mt-1 break-all">
                {member?.email}
              </h3>

            </div>

            <div>

              <p className="text-zinc-500">
                Nomor HP
              </p>

              <h3 className="text-2xl font-black mt-1">
                {member?.phone || "-"}
              </h3>

            </div>

            <div>

              <p className="text-zinc-500">
                Kota
              </p>

              <h3 className="text-2xl font-black mt-1">
                {member?.city || "-"}
              </h3>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
