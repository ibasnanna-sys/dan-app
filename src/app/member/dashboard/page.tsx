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
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5 mb-8">
          <div className="min-w-0">
            <p className="text-zinc-500 text-lg mb-2">
              Halo,
            </p>

            <h1 className="text-4xl md:text-6xl font-black break-words leading-tight">
              {member.name}
            </h1>

            <div className="flex items-center gap-3 mt-5">
              <div
                className={`w-4 h-4 rounded-full ${
                  member.status_member === "aktif"
                    ? "bg-green-500"
                    : member.status_member === "dibekukan"
                    ? "bg-red-500"
                    : "bg-yellow-400"
                }`}
              />

              <h2
                className={`text-2xl md:text-4xl font-black uppercase ${
                  member.status_member === "aktif"
                    ? "text-green-500"
                    : member.status_member === "dibekukan"
                    ? "text-red-500"
                    : "text-yellow-400"
                }`}
              >
                {member.status_member}
              </h2>
            </div>
          </div>

          <button
            onClick={logout}
            className="bg-red-600 hover:bg-red-700 transition px-6 py-4 rounded-3xl font-bold text-lg shrink-0"
          >
            Logout
          </button>
        </div>

        {isFrozen && (
          <div className="bg-red-600 border border-red-500 rounded-3xl p-5 mb-6">
            <p className="font-black text-lg md:text-xl">
              Akun Dibekukan
            </p>

            <p className="text-sm md:text-base mt-2 text-red-100 leading-relaxed">
              Member tidak melakukan transaksi selama 60 hari.
              Bonus referral dihentikan sementara sampai
              melakukan belanja kembali.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 space-y-6">
            <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-[36px] p-6 md:p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-black/40 border border-zinc-800 rounded-3xl p-5">
                  <p className="text-zinc-500 text-sm mb-3">
                    Saldo Total
                  </p>

                  <h3 className="text-3xl md:text-4xl font-black text-green-500 break-words">
                    Rp{" "}
                    {Number(member.balance || 0).toLocaleString(
                      "id-ID"
                    )}
                  </h3>
                </div>

                <div className="bg-black/40 border border-zinc-800 rounded-3xl p-5">
                  <p className="text-zinc-500 text-sm mb-3">
                    Total Referral
                  </p>

                  <h3 className="text-4xl md:text-5xl font-black">
                    {referralCount}
                  </h3>
                </div>

                <div className="bg-black/40 border border-zinc-800 rounded-3xl p-5">
                  <p className="text-zinc-500 text-sm mb-3">
                    Bonus Sponsor
                  </p>

                  <h3 className="text-3xl md:text-4xl font-black text-green-500">
                    Rp 0
                  </h3>
                </div>

                <div className="bg-black/40 border border-zinc-800 rounded-3xl p-5">
                  <p className="text-zinc-500 text-sm mb-3">
                    Bonus Referral
                  </p>

                  <h3 className="text-3xl md:text-4xl font-black text-green-500">
                    Rp 0
                  </h3>
                </div>
              </div>

              <div className="bg-black/40 border border-zinc-800 rounded-3xl p-5 mt-4">
                <p className="text-zinc-500 text-sm mb-3">
                  Referral Code
                </p>

                <h3 className="text-3xl md:text-5xl font-black break-all">
                  {member.referral_code}
                </h3>
              </div>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-[36px] p-6 md:p-8">
              <h3 className="text-2xl md:text-3xl font-black mb-6">
                Menu Utama
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {!isActive ? (
                  <button
                    onClick={() =>
                      router.push("/member/produk")
                    }
                    className="bg-green-500 hover:bg-green-400 transition text-black rounded-3xl py-5 px-4"
                  >
                    <p className="text-lg md:text-xl font-black">
                      Aktivasi
                    </p>

                    <p className="text-sm font-medium mt-1">
                      Member
                    </p>
                  </button>
                ) : (
                  <button
                    onClick={() =>
                      router.push("/member/produk")
                    }
                    className="bg-green-500 hover:bg-green-400 transition text-black rounded-3xl py-5 px-4"
                  >
                    <p className="text-lg md:text-xl font-black">
                      Belanja
                    </p>

                    <p className="text-sm font-medium mt-1">
                      Paket Data
                    </p>
                  </button>
                )}

                <button
                  onClick={() =>
                    router.push("/member/referral")
                  }
                  className="bg-zinc-800 hover:bg-zinc-700 transition border border-zinc-700 rounded-3xl py-5 px-4"
                >
                  <p className="text-lg md:text-xl font-black">
                    Referral
                  </p>

                  <p className="text-sm text-zinc-400 mt-1">
                    Bonus & jaringan
                  </p>
                </button>

                <button
                  onClick={() =>
                    router.push("/member/transaksi")
                  }
                  className="bg-zinc-800 hover:bg-zinc-700 transition border border-zinc-700 rounded-3xl py-5 px-4"
                >
                  <p className="text-lg md:text-xl font-black">
                    Transaksi
                  </p>

                  <p className="text-sm text-zinc-400 mt-1">
                    Riwayat transaksi
                  </p>
                </button>

                <button
                  onClick={() =>
                    router.push("/member/withdraw")
                  }
                  className="bg-zinc-800 hover:bg-zinc-700 transition border border-zinc-700 rounded-3xl py-5 px-4"
                >
                  <p className="text-lg md:text-xl font-black">
                    Withdraw
                  </p>

                  <p className="text-sm text-zinc-400 mt-1">
                    Tarik saldo
                  </p>
                </button>

                <button
                  onClick={() =>
                    router.push("/member/bantuan")
                  }
                  className="bg-zinc-800 hover:bg-zinc-700 transition border border-zinc-700 rounded-3xl py-5 px-4"
                >
                  <p className="text-lg md:text-xl font-black">
                    Bantuan
                  </p>

                  <p className="text-sm text-zinc-400 mt-1">
                    Chat admin
                  </p>
                </button>

                <button
                  onClick={() =>
                    router.push("/member/profile")
                  }
                  className="bg-zinc-800 hover:bg-zinc-700 transition border border-zinc-700 rounded-3xl py-5 px-4"
                >
                  <p className="text-lg md:text-xl font-black">
                    Profil
                  </p>

                  <p className="text-sm text-zinc-400 mt-1">
                    Data member
                  </p>
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

              <div className="relative h-[550px] overflow-hidden">
                <div className="animate-scroll space-y-4">
                  {[...activities, ...activities].map(
                    (item, index) => (
                      <div
                        key={index}
                        className="bg-black/40 border border-zinc-800 rounded-3xl p-4"
                      >
                        <p className="font-bold text-lg break-words">
                          {item.name} - {item.city}
                        </p>

                        <p className="text-zinc-300 mt-1 break-words">
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
