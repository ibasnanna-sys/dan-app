"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function DashboardPage() {
  const router = useRouter();

  const [member, setMember] = useState<any>(null);
  const [referralCount, setReferralCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMember();
  }, []);

  async function getMember() {
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

      if (error || !data) {
        localStorage.removeItem("member_id");
        router.push("/login");
        return;
      }

      setMember(data);

      const { count } = await supabase
        .from("members")
        .select("*", {
          count: "exact",
          head: true,
        })
        .eq("upline_id", data.id);

      setReferralCount(count || 0);
    } catch (err) {
      console.log(err);
      alert("Terjadi kesalahan");
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
      <div className="min-h-screen bg-black flex items-center justify-center text-white text-2xl font-bold">
        Loading...
      </div>
    );
  }

  if (!member) {
    return null;
  }

  const isActive = member.status_member === "aktif";

  return (
    <main className="min-h-screen bg-black text-white px-5 py-6 pb-32">
      <div className="max-w-md mx-auto">
        <div className="flex items-start justify-between mb-8">
          <div className="pr-4">
            <p className="text-zinc-500 text-lg">
              Halo,
            </p>

            <h1 className="text-5xl font-black leading-tight break-words">
              {member.name}
            </h1>
          </div>

          <button
            onClick={logout}
            className="bg-red-600 px-5 py-4 rounded-3xl font-bold text-lg shrink-0"
          >
            Logout
          </button>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-[32px] p-6 mb-5">
          <p className="text-zinc-500 text-lg mb-4">
            Status Member
          </p>

          <h2 className="text-6xl font-black uppercase break-words">
            {member.status_member}
          </h2>

          <div className="mt-10">
            <p className="text-zinc-500 text-lg mb-2">
              Referral Code
            </p>

            <h3 className="text-4xl font-black break-all">
              {member.referral_code}
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-5">
          <div className="bg-zinc-900 border border-zinc-800 rounded-[28px] p-5">
            <p className="text-zinc-500 text-lg mb-3">
              Saldo
            </p>

            <h3 className="text-3xl font-black text-green-500 break-words">
              Rp{" "}
              {Number(member.balance || 0).toLocaleString("id-ID")}
            </h3>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-[28px] p-5">
            <p className="text-zinc-500 text-lg mb-3">
              Referral
            </p>

            <h3 className="text-4xl font-black">
              {referralCount}
            </h3>
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-[32px] p-6 mb-5">
          <p className="text-zinc-500 text-lg mb-6">
            Informasi Member
          </p>

          <div className="space-y-7">
            <div>
              <p className="text-zinc-500 text-base mb-2">
                Email
              </p>

              <p className="text-2xl font-bold break-all leading-snug">
                {member.email || "-"}
              </p>
            </div>

            <div>
              <p className="text-zinc-500 text-base mb-2">
                Nomor HP
              </p>

              <p className="text-3xl font-bold break-all">
                {member.phone || "-"}
              </p>
            </div>

            <div>
              <p className="text-zinc-500 text-base mb-2">
                Kota
              </p>

              <p className="text-3xl font-bold break-words">
                {member.city || "-"}
              </p>
            </div>

            <div>
              <p className="text-zinc-500 text-base mb-2">
                Alamat
              </p>

              <p className="text-2xl font-bold break-words leading-relaxed">
                {member.address || "-"}
              </p>
            </div>
          </div>
        </div>

        {!isActive ? (
          <button
            onClick={() => router.push("/member/produk")}
            className="w-full bg-green-500 text-black py-5 rounded-full text-2xl font-black mb-4"
          >
            Aktivasi Sekarang
          </button>
        ) : (
          <button
            onClick={() => router.push("/member/produk")}
            className="w-full bg-green-500 text-black py-5 rounded-full text-2xl font-black mb-4"
          >
            Belanja Paket
          </button>
        )}

        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={() => router.push("/member/transaksi")}
            className="bg-zinc-900 border border-zinc-800 rounded-3xl py-4 text-base font-bold"
          >
            Transaksi
          </button>

          <button
            onClick={() => router.push("/member/profile")}
            className="bg-zinc-900 border border-zinc-800 rounded-3xl py-4 text-base font-bold"
          >
            Profil
          </button>

          <button
            onClick={() => router.push("/")}
            className="bg-zinc-900 border border-zinc-800 rounded-3xl py-4 text-base font-bold"
          >
            Home
          </button>
        </div>
      </div>
    </main>
  );
}
