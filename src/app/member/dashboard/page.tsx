"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function ProfilePage() {
  const router = useRouter();

  const [member, setMember] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProfile();
  }, []);

  async function getProfile() {
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
    } catch (error) {
      console.log(error);
      alert("Gagal memuat profile");
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

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-3xl mx-auto px-4 md:px-6 py-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <p className="text-zinc-500 text-lg mb-1">
              Profile Member
            </p>

            <h1 className="text-4xl md:text-5xl font-black break-words">
              {member.name}
            </h1>
          </div>

          <button
            onClick={() => router.push("/dashboard")}
            className="bg-zinc-800 hover:bg-zinc-700 transition px-5 py-4 rounded-3xl font-bold w-full sm:w-auto"
          >
            Dashboard
          </button>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-[36px] p-6 md:p-8">
          <div className="space-y-6">
            <div>
              <p className="text-zinc-500 text-sm mb-2">
                Nama Lengkap
              </p>

              <p className="text-2xl md:text-3xl font-black break-words">
                {member.name || "-"}
              </p>
            </div>

            <div>
              <p className="text-zinc-500 text-sm mb-2">
                Email
              </p>

              <p className="text-xl md:text-2xl font-bold break-all">
                {member.email || "-"}
              </p>
            </div>

            <div>
              <p className="text-zinc-500 text-sm mb-2">
                Nomor HP
              </p>

              <p className="text-2xl md:text-3xl font-black break-all">
                {member.phone || "-"}
              </p>
            </div>

            <div>
              <p className="text-zinc-500 text-sm mb-2">
                Kota
              </p>

              <p className="text-2xl md:text-3xl font-black break-words">
                {member.city || "-"}
              </p>
            </div>

            <div>
              <p className="text-zinc-500 text-sm mb-2">
                Referral Code
              </p>

              <p className="text-2xl md:text-4xl font-black break-all text-green-500">
                {member.referral_code}
              </p>
            </div>

            <div>
              <p className="text-zinc-500 text-sm mb-2">
                Status Member
              </p>

              <div className="flex items-center gap-3">
                <div
                  className={`w-4 h-4 rounded-full ${
                    member.status_member === "aktif"
                      ? "bg-green-500"
                      : member.status_member === "dibekukan"
                      ? "bg-red-500"
                      : "bg-yellow-400"
                  }`}
                />

                <p
                  className={`text-2xl md:text-3xl font-black uppercase ${
                    member.status_member === "aktif"
                      ? "text-green-500"
                      : member.status_member === "dibekukan"
                      ? "text-red-500"
                      : "text-yellow-400"
                  }`}
                >
                  {member.status_member}
                </p>
              </div>
            </div>

            <div>
              <p className="text-zinc-500 text-sm mb-2">
                Tanggal Daftar
              </p>

              <p className="text-lg md:text-xl font-bold">
                {new Date(
                  member.created_at
                ).toLocaleDateString("id-ID")}
              </p>
            </div>
          </div>

          <button
            onClick={logout}
            className="w-full bg-red-600 hover:bg-red-700 transition py-5 rounded-3xl text-xl font-black mt-8"
          >
            Logout
          </button>
        </div>
      </div>
    </main>
  );
}
