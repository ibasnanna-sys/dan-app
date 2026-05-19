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
    } catch (error) {
      console.log(error);
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
      <div className="min-h-screen bg-black flex items-center justify-center text-white text-xl font-bold">
        Loading...
      </div>
    );
  }

  if (!member) {
    return null;
  }

  const isActive = member.status_member === "aktif";

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto px-5 py-6 pb-32">
        <div className="flex items-start justify-between gap-4 mb-8">
          <div className="min-w-0">
            <p className="text-zinc-500 text-lg mb-1">
              Halo,
            </p>

            <h1 className="text-4xl md:text-6xl font-black break-words leading-tight">
              {member.name}
            </h1>
          </div>

          <button
            onClick={logout}
            className="bg-red-600 hover:bg-red-700 transition px-5 py-4 rounded-3xl font-bold shrink-0"
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
          <div className="xl:col-span-2">
            <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-[36px] p-7 md:p-10 h-full">
              <p className="text-zinc-500 text-lg mb-4">
                Status Member
              </p>

              <h2 className="text-6xl md:text-8xl font-black uppercase leading-none mb-8">
                {member.status_member}
              </h2>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-black/40 border border-zinc-800 rounded-3xl p-5">
                  <p className="text-zinc-500 text-sm mb-2">
                    Saldo
                  </p>

                  <h3 className="text-3xl md:text-4xl font-black text-green-500 break-words">
                    Rp{" "}
                    {Number(member.balance || 0).toLocaleString(
                      "id-ID"
                    )}
                  </h3>
                </div>

                <div className="bg-black/40 border border-zinc-800 rounded-3xl p-5">
                  <p className="text-zinc-500 text-sm mb-2">
                    Referral
                  </p>

                  <h3 className="text-4xl md:text-5xl font-black">
                    {referralCount}
                  </h3>
                </div>
              </div>

              <div className="bg-black/40 border border-zinc-800 rounded-3xl p-5 mb-8">
                <p className="text-zinc-500 text-sm mb-3">
                  Referral Code
                </p>

                <h3 className="text-3xl md:text-5xl font-black break-all">
                  {member.referral_code}
                </h3>
              </div>

              {!isActive ? (
                <button
                  onClick={() =>
                    router.push("/member/produk")
                  }
                  className="w-full bg-green-500 hover:bg-green-400 transition text-black py-5 rounded-full text-2xl md:text-3xl font-black"
                >
                  Aktivasi Sekarang
                </button>
              ) : (
                <button
                  onClick={() =>
                    router.push("/member/produk")
                  }
                  className="w-full bg-green-500 hover:bg-green-400 transition text-black py-5 rounded-full text-2xl md:text-3xl font-black"
                >
                  Belanja Paket
                </button>
              )}
            </div>
          </div>

          <div className="space-y-5">
            <div className="bg-zinc-900 border border-zinc-800 rounded-[36px] p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-black">
                  Aktivitas
                </h3>

                <span className="text-green-500 text-sm font-bold">
                  LIVE
                </span>
              </div>

              <div className="space-y-4">
                <div className="bg-black/40 border border-zinc-800 rounded-2xl p-4">
                  <p className="font-bold text-sm mb-1">
                    Member Baru
                  </p>

                  <p className="text-zinc-400 text-sm">
                    Referral baru berhasil bergabung
                  </p>
                </div>

                <div className="bg-black/40 border border-zinc-800 rounded-2xl p-4">
                  <p className="font-bold text-sm mb-1">
                    Bonus Referral
                  </p>

                  <p className="text-zinc-400 text-sm">
                    Bonus referral masuk otomatis
                  </p>
                </div>

                <div className="bg-black/40 border border-zinc-800 rounded-2xl p-4">
                  <p className="font-bold text-sm mb-1">
                    Paket Data
                  </p>

                  <p className="text-zinc-400 text-sm">
                    Transaksi paket data berhasil
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-[36px] p-6">
              <h3 className="text-2xl font-black mb-6">
                Menu Cepat
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() =>
                    router.push("/member/profile")
                  }
                  className="bg-black/40 hover:bg-black/60 transition border border-zinc-800 rounded-3xl py-5 font-bold"
                >
                  Profil
                </button>

                <button
                  onClick={() =>
                    router.push("/member/transaksi")
                  }
                  className="bg-black/40 hover:bg-black/60 transition border border-zinc-800 rounded-3xl py-5 font-bold"
                >
                  Transaksi
                </button>

                <button
                  onClick={() =>
                    router.push("/member/produk")
                  }
                  className="bg-black/40 hover:bg-black/60 transition border border-zinc-800 rounded-3xl py-5 font-bold"
                >
                  Produk
                </button>

                <button
                  onClick={() => router.push("/")}
                  className="bg-black/40 hover:bg-black/60 transition border border-zinc-800 rounded-3xl py-5 font-bold"
                >
                  Home
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-zinc-950/95 backdrop-blur-xl border-t border-zinc-800">
        <div className="max-w-6xl mx-auto px-5 py-4">
          <div className="grid grid-cols-4 gap-3">
            <button
              onClick={() => router.push("/dashboard")}
              className="bg-green-500 text-black rounded-2xl py-3 font-black text-sm"
            >
              Dashboard
            </button>

            <button
              onClick={() =>
                router.push("/member/produk")
              }
              className="bg-zinc-900 border border-zinc-800 rounded-2xl py-3 font-bold text-sm"
            >
              Produk
            </button>

            <button
              onClick={() =>
                router.push("/member/transaksi")
              }
              className="bg-zinc-900 border border-zinc-800 rounded-2xl py-3 font-bold text-sm"
            >
              Transaksi
            </button>

            <button
              onClick={() =>
                router.push("/member/profile")
              }
              className="bg-zinc-900 border border-zinc-800 rounded-2xl py-3 font-bold text-sm"
            >
              Profil
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
