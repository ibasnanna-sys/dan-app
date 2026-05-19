Ganti FULL isi file berikut:

src/app/member/dashboard/page.tsx

Dengan kode FIX FINAL ini:

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function DashboardPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [member, setMember] = useState<any>(null);

  useEffect(() => {
    loadMember();
  }, []);

  async function loadMember() {
    try {
      const memberId = localStorage.getItem("member_id");

      if (!memberId) {
        router.push("/login");
        return;
      }

      const { data, error } = await supabase
        .from("members")
        .select("*")
        .eq("id", memberId)
        .single();

      if (error) {
        alert(error.message);
        return;
      }

      setMember(data);
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    localStorage.removeItem("member_id");

    router.push("/login");
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-5 pb-28">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-zinc-400 text-sm">
            Halo,
          </p>

          <h1 className="text-5xl font-bold leading-tight mt-1">
            {member?.name}
          </h1>
        </div>

        <button
          onClick={logout}
          className="bg-red-600 px-4 py-2 rounded-2xl text-sm font-medium"
        >
          Logout
        </button>
      </div>

      <div className="mt-8 bg-zinc-900 border border-zinc-800 rounded-[30px] p-6">
        <p className="text-zinc-400 text-lg">
          Status Member
        </p>

        <h2 className="text-5xl font-bold text-green-500 mt-3 capitalize">
          {member?.status_member || "free"}
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="bg-zinc-900 border border-zinc-800 rounded-[30px] p-5">
          <p className="text-zinc-400 text-lg">
            Saldo
          </p>

          <h3 className="text-4xl font-bold mt-4">
            Rp {Number(member?.balance || 0).toLocaleString("id-ID")}
          </h3>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-[30px] p-5">
          <p className="text-zinc-400 text-lg">
            Referral
          </p>

          <h3 className="text-4xl font-bold mt-4">
            {member?.total_referral || 0}
          </h3>
        </div>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-[30px] p-5 mt-4">
        <p className="text-zinc-400 text-lg">
          Kode Referral
        </p>

        <h3 className="text-4xl font-bold mt-4">
          {member?.referral_code}
        </h3>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-zinc-950 border-t border-zinc-800">
        <div className="grid grid-cols-4 text-center py-4 text-sm">
          <button
            onClick={() => router.push("/member/dashboard")}
            className="text-green-500 font-semibold"
          >
            Dashboard
          </button>

          <button
            onClick={() => router.push("/member/produk")}
            className="text-zinc-400"
          >
            Produk
          </button>

          <button
            onClick={() => router.push("/member/transaksi")}
            className="text-zinc-400"
          >
            Transaksi
          </button>

          <button
            onClick={() => router.push("/member/profile")}
            className="text-zinc-400"
          >
            Profile
          </button>
        </div>
      </div>
    </div>
  );
}
