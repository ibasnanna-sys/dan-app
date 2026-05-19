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
    <div className="min-h-screen bg-black text-white p-5 pb-32">

      <div className="flex items-start justify-between">

        <div>

          <p className="text-zinc-500 text-xl">
            Halo,
          </p>

          <h1 className="text-5xl font-black mt-1">
            {member?.name}
          </h1>

        </div>

        <button
          onClick={logout}
          className="bg-red-600 px-6 py-4 rounded-3xl text-xl font-black"
        >
          Logout
        </button>

      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-[32px] p-6 mt-8">

        <p className="text-zinc-500 text-2xl">
          Status Member
        </p>

        <h2 className="text-6xl font-black mt-4">
          {member?.status_member}
        </h2>

      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">

        <div className="bg-zinc-900 border border-zinc-800 rounded-[32px] p-6">

          <p className="text-zinc-500 text-2xl">
            Saldo
          </p>

          <h2 className="text-4xl font-black text-green-500 mt-4">
            Rp{" "}
            {Number(
              member?.balance || 0
            ).toLocaleString("id-ID")}
          </h2>

        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-[32px] p-6">

          <p className="text-zinc-500 text-2xl">
            Referral
          </p>

          <h2 className="text-4xl font-black mt-4">
            0
          </h2>

        </div>

      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-[32px] p-6 mt-4">

        <p className="text-zinc-500 text-2xl">
          Referral Code
        </p>

        <h2 className="text-5xl font-black mt-4">
          {member?.referral_code}
        </h2>

      </div>

      <div className="grid grid-cols-2 gap-4 mt-6">

        <a
          href="/member/produk"
          className="bg-zinc-900 border border-zinc-800 rounded-[32px] p-6"
        >

          <p className="text-zinc-500 text-xl">
            Menu
          </p>

          <h2 className="text-3xl font-black mt-3">
            Produk
          </h2>

        </a>

        <a
          href="/member/transaksi"
          className="bg-zinc-900 border border-zinc-800 rounded-[32px] p-6"
        >

          <p className="text-zinc-500 text-xl">
            Menu
          </p>

          <h2 className="text-3xl font-black mt-3">
            Transaksi
          </h2>

        </a>

      </div>

      <div className="grid grid-cols-1 gap-4 mt-4">

        <a
          href="/member/profile"
          className="bg-zinc-900 border border-zinc-800 rounded-[32px] p-6"
        >

          <p className="text-zinc-500 text-xl">
            Menu
          </p>

          <h2 className="text-3xl font-black mt-3">
            Profile Member
          </h2>

        </a>

      </div>

    </div>
  );
}
