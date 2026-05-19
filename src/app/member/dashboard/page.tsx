"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function DashboardPage() {
  const router = useRouter();

  const [member, setMember] = useState<any>(null);
  const [referralCount, setReferralCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const activities = [
    {
      name: "Andi",
      city: "Makassar",
      action: "Aktivasi Member",
      time: "2 menit lalu",
    },
    {
      name: "Rina",
      city: "Bone",
      action: "Belanja Paket XL 10GB",
      time: "5 menit lalu",
    },
    {
      name: "Fajar",
      city: "Jakarta",
      action: "Bonus Referral Rp25.000",
      time: "7 menit lalu",
    },
    {
      name: "Dewi",
      city: "Bandung",
      action: "Withdraw Berhasil",
      time: "10 menit lalu",
    },
    {
      name: "Arman",
      city: "Surabaya",
      action: "Belanja Paket Telkomsel",
      time: "12 menit lalu",
    },
  ];

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
      alert("Gagal memuat dashboard");
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

  if (!member) return null;

  const isActive = member.status_member === "aktif";
  const isFrozen = member.status_member === "dibekukan";

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 pb-28">
        <div className="flex items-start justify-between gap-4 mb-8">
          <div>
            <p className="text-zinc-500 text-lg mb-1">
              Halo,
            </p>

            <h1 className="text-4xl md:text-6xl font-black">
              {member.name}
            </h1>
          </div>

          <button
            onClick={logout}
            className="bg-red-600 hover:bg-red-700 transition px-5 py-4 rounded-3xl font-bold"
          >
            Logout
          </button>
        </div>

        {isFrozen && (
          <div className="bg-red-600 text-white p-5 rounded-3xl mb-6 font-bold text-center">
            Akun dibekukan karena tidak belanja selama 60 hari.
          </div>
        )}

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 space-y-6">
            <div className="bg-zinc-900 border border-zinc-800 rounded-[36px] p-6 md:p-8">
              <p className="text-zinc-500 text-lg mb-3">
                Status Member
              </p>

              <h2 className="text-6xl md:text-8xl font-black uppercase mb-6">
                {member.status_member}
              </h2>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-black/40 border border-zinc-800 rounded-3xl p-5">
                  <p className="text-zinc-500 mb-2">
                    Saldo Total
                  </p>

                  <h3 className="text-3xl md:text-4xl font-black text-green-500">
                    Rp{" "}
                    {Number(member.balance || 0).toLocaleString(
                      "id-ID"
                    )}
                  </h3>
                </div>

                <div className="bg-black/40 border border-zinc-800 rounded-3xl p-5">
                  <p className="text-zinc-500 mb-2">
                    Total Referral
                  </p>

                  <h3 className="text-4xl md:text-5xl font-black">
                    {referralCount}
                  </h3>
                </div>
              </div>

              <div className="bg-black/40 border border-zinc-800 rounded-3xl p-5 mt-4">
                <p className="text-zinc-500 mb-2">
                  Referral Code
                </p>

                <h3 className="text-3xl md:text-5xl font-black break-all">
                  {member.referral_code}
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6">
                {!isActive ? (
                  <button
                    onClick={() =>
                      router.push("/member/produk")
                    }
                    className="bg-green-500 hover:bg-green-400 transition text-black py-5 rounded-3xl text-lg md:text-xl font-black"
                  >
                    Aktivasi Member
                  </button>
                ) : (
                  <button
                    onClick={() =>
                      router.push("/member/produk")
                    }
                    className="bg-green-500 hover:bg-green-400 transition text-black py-5 rounded-3xl text-lg md:text-xl font-black"
                  >
                    Belanja
                  </button>
                )}

                <button
                  onClick={() =>
                    router.push("/member/referral")
                  }
                  className="bg-zinc-800 hover:bg-zinc-700 transition py-5 rounded-3xl text-lg md:text-xl font-bold"
                >
                  Referral
                </button>

                <button
                  onClick={() =>
                    router.push("/member/transaksi")
                  }
                  className="bg-zinc-800 hover:bg-zinc-700 transition py-5 rounded-3xl text-lg md:text-xl font-bold"
                >
                  Withdraw
                </button>

                <button
                  onClick={() =>
                    router.push("/member/bantuan")
                  }
                  className="bg-zinc-800 hover:bg-zinc-700 transition py-5 rounded-3xl text-lg md:text-xl font-bold"
                >
                  Bantuan
                </button>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-[36px] p-6 overflow-hidden">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-black">
                  Aktivitas Member
                </h3>

                <span className="text-green-500 text-sm font-bold">
                  LIVE
                </span>
              </div>

              <div className="relative h-[500px] overflow-hidden">
                <div className="animate-scroll space-y-4">
                  {[...activities, ...activities].map(
                    (item, index) => (
                      <div
                        key={index}
                        className="bg-black/40 border border-zinc-800 rounded-3xl p-4"
                      >
                        <p className="font-bold text-lg">
                          {item.name} - {item.city}
                        </p>

                        <p className="text-zinc-300 mt-1">
                          {item.action}
                        </p>

                        <p className="text-zinc-500 text-sm mt-2">
                          {item.time}
                        </p>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-zinc-950 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="grid grid-cols-5 gap-3">
            <button
              onClick={() => router.push("/dashboard")}
              className="bg-green-500 text-black rounded-2xl py-3 font-black text-sm"
            >
              Home
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
                router.push("/member/referral")
              }
              className="bg-zinc-900 border border-zinc-800 rounded-2xl py-3 font-bold text-sm"
            >
              Referral
            </button>

            <button
              onClick={() =>
                router.push("/member/transaksi")
              }
              className="bg-zinc-900 border border-zinc-800 rounded-2xl py-3 font-bold text-sm"
            >
              Riwayat
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

      <style jsx>{`
        .animate-scroll {
          animation: scrollUp 20s linear infinite;
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
    </main>
  );
}
