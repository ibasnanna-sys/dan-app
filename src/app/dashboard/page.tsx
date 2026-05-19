"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  const [member, setMember] =
    useState<any>(null);

  useEffect(() => {
    const data =
      localStorage.getItem(
        "member"
      );

    if (!data) {
      router.push("/login");
      return;
    }

    setMember(JSON.parse(data));
  }, []);

  function logout() {
    localStorage.removeItem(
      "member"
    );

    router.push("/login");
  }

  if (!member) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-6">

      <div className="max-w-md mx-auto">

        <div className="mb-8">

          <h1 className="text-4xl font-bold">
            Halo, {member.name}
          </h1>

          <p className="text-zinc-500 mt-2">
            Dashboard Member DAN
          </p>

        </div>

        <div className="space-y-4">

          <div className="bg-zinc-900 rounded-3xl p-5">
            <p className="text-zinc-500 text-sm">
              Status Member
            </p>

            <h2 className="text-2xl font-bold mt-2">
              {
                member.status_member
              }
            </h2>
          </div>

          <div className="bg-zinc-900 rounded-3xl p-5">
            <p className="text-zinc-500 text-sm">
              Saldo Bonus
            </p>

            <h2 className="text-2xl font-bold mt-2">
              Rp {member.balance}
            </h2>
          </div>

          <div className="bg-zinc-900 rounded-3xl p-5">
            <p className="text-zinc-500 text-sm">
              Kota
            </p>

            <h2 className="text-2xl font-bold mt-2">
              {member.city}
            </h2>
          </div>

          <div className="bg-zinc-900 rounded-3xl p-5">
            <p className="text-zinc-500 text-sm">
              Kode Referral
            </p>

            <h2 className="text-2xl font-bold mt-2">
              {
                member.referral_code
              }
            </h2>
          </div>

          <button
            onClick={() =>
              router.push(
                "/produk"
              )
            }
            className="w-full bg-green-500 text-black font-bold rounded-3xl py-5 text-xl"
          >
            Aktivasi Sekarang
          </button>

          <button
            onClick={logout}
            className="w-full bg-red-500 text-white rounded-3xl py-5 text-xl"
          >
            Logout
          </button>

        </div>

      </div>
      
    </main>
  );
}
