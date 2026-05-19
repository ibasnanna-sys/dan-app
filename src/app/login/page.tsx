"use client";

import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [member, setMember] =
    useState<any>(null);

  useEffect(() => {
    const data =
      localStorage.getItem("member");

    if (data) {
      setMember(JSON.parse(data));
    }
  }, []);

  if (!member) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white px-5 py-8">
      <h1 className="text-4xl font-black">
        Halo,
        <br />
        {member.name}
      </h1>

      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5 mt-8">
        <p className="text-zinc-400">
          Status Member
        </p>

        <h2 className="text-3xl font-black mt-2 text-green-500">
          {member.status_member}
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-5">
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5">
          <p className="text-zinc-400 text-sm">
            Saldo
          </p>

          <h2 className="text-2xl font-bold mt-2">
            Rp {member.balance}
          </h2>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5">
          <p className="text-zinc-400 text-sm">
            Referral
          </p>

          <h2 className="text-2xl font-bold mt-2">
            {
              member.total_referral
            }
          </h2>
        </div>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5 mt-5">
        <p className="text-zinc-400">
          Kode Referral
        </p>

        <h2 className="text-2xl font-bold mt-2">
          {
            member.referral_code
          }
        </h2>
      </div>
    </main>
  );
}
