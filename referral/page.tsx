"use client";

import { useEffect, useState } from "react";

export default function ReferralPage() {
  const [member, setMember] =
    useState<any>(null);

  useEffect(() => {
    const data =
      localStorage.getItem("member");

    if (data) {
      setMember(JSON.parse(data));
    }
  }, []);

  if (!member) return null;

  const referralLink =
    typeof window !== "undefined"
      ? `${window.location.origin}/register?ref=${member.referral_code}`
      : "";

  return (
    <main className="min-h-screen bg-black text-white px-5 py-8">

      <h1 className="text-4xl font-black">
        Referral
      </h1>

      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5 mt-8">
        <p className="text-zinc-400">
          Kode Referral
        </p>

        <h2 className="text-3xl font-black mt-2">
          {member.referral_code}
        </h2>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5 mt-5">
        <p className="text-zinc-400">
          Link Referral
        </p>

        <p className="break-all mt-3">
          {referralLink}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-5">

        <div className="bg-zinc-900 rounded-3xl p-5">
          <p className="text-zinc-400 text-sm">
            Total Referral
          </p>

          <h2 className="text-3xl font-black mt-2">
            {member.total_referral}
          </h2>
        </div>

        <div className="bg-zinc-900 rounded-3xl p-5">
          <p className="text-zinc-400 text-sm">
            Bonus Sponsor
          </p>

          <h2 className="text-3xl font-black mt-2">
            Rp {member.total_bonus_sponsor}
          </h2>
        </div>

      </div>

    </main>
  );
}
