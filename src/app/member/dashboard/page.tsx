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
              Halo Member
            </p>

            <h1 className="text-5xl font-black mt-1 leading-none">
              {member?.name}
            </h1>

          </div>

          <button
            onClick={logout}
            className="bg-red-600 rounded-2xl px-5 py-3 font-bold"
          >
            Logout
          </button>

        </div>

        <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-[36px] p-6 mt-8 overflow-hidden relative">

          <div className="absolute -top-10 -right-10 w-40 h-40 bg-green-500/10 rounded-full" />

          <p className="text-zinc-500 text-lg relative z-10">
            Status Member
          </p>

          <h2 className="text-6xl font-black mt-2 relative z-10 capitalize">
            {member?.status_member}
          </h2>

          <div className="flex items-center justify-between mt-8 relative z-10">

            <div>

              <p className="text-zinc-500">
                Saldo
              </p>

              <h3 className="text-4xl font-black text-green-500 mt-2">
                Rp{" "}
                {Number(
                  member?.balance || 0
                ).toLocaleString("id-ID")}
              </h3>

            </div>

            <a
              href="/member/produk"
              className="bg-green-500 text-black px-6 py-4 rounded-2xl font-black"
            >
              Belanja
            </a>

          </div>

        </div>

        {member?.status_member ===
          "free" && (

          <div className="bg-green-500 text-black rounded-[32px] p-6 mt-5">

            <p className="font-bold text-lg">
              Aktivasi Member
            </p>

            <h2 className="text-3xl font-black mt-2 leading-tight">
              Aktifkan akun untuk mulai mendapatkan bonus referral.
            </h2>

            <a
              href="/member/produk"
              className="inline-block bg-black text-white px-6 py-4 rounded-2xl font-black mt-6"
            >
              Aktivasi Sekarang
            </a>

          </div>

        )}

        <div className="grid grid-cols-2 gap-4 mt-5">

          <div className="bg-zinc-900 border border-zinc-800 rounded-[32px] p-5">

            <p className="text-zinc-500">
              Referral
            </p>

            <h2 className="text-5xl font-black mt-3">
              0
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
              href="/member/produk"
              className="bg-zinc-900 border border-zinc-800 rounded-[32px] p-5"
            >

              <h2 className="text-3xl font-black">
                Produk
              </h2>

              <p className="text-zinc-500 mt-3">
                Belanja paket data
              </p>

            </a>

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

          </div>

          <a
            href="/member/profile"
            className="block bg-zinc-900 border border-zinc-800 rounded-[32px] p-5 mt-4"
          >

            <h2 className="text-3xl font-black">
              Profile
            </h2>

            <p className="text-zinc-500 mt-3">
              Informasi akun member
            </p>

          </a>

        </div>

      </div>

    </div>
  );
}
