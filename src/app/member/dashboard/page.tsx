"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function MemberDashboardPage() {
  const [member, setMember] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMember();
  }, []);

  async function loadMember() {
    try {
      const memberId =
        localStorage.getItem("member_id");

      if (!memberId) {
        window.location.href = "/login";
        return;
      }

      const { data, error } = await supabase
        .from("members")
        .select("*")
        .eq("id", memberId)
        .single();

      if (error || !data) {
        localStorage.removeItem("member_id");

        window.location.href = "/login";

        return;
      }

      setMember(data);
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  }

  function logout() {
    localStorage.removeItem("member_id");

    window.location.href = "/login";
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
      <div className="flex items-center justify-between">
        <div>
          <p className="text-zinc-500">
            Halo,
          </p>

          <h1 className="text-4xl font-black">
            {member?.name}
          </h1>
        </div>

        <button
          onClick={logout}
          className="bg-red-600 px-5 py-3 rounded-2xl font-bold"
        >
          Logout
        </button>
      </div>

      <div className="bg-zinc-900 rounded-3xl p-5 mt-8">
        <p className="text-zinc-500">
          Status Member
        </p>

        <h2 className="text-5xl font-black mt-2 capitalize">
          {member?.status_member}
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="bg-zinc-900 rounded-3xl p-5">
          <p className="text-zinc-500">
            Saldo
          </p>

          <h3 className="text-2xl font-black mt-2 text-green-500">
            Rp{" "}
            {Number(
              member?.balance || 0
            ).toLocaleString("id-ID")}
          </h3>
        </div>

        <div className="bg-zinc-900 rounded-3xl p-5">
          <p className="text-zinc-500">
            Referral
          </p>

          <h3 className="text-2xl font-black mt-2">
            {member?.total_referral || 0}
          </h3>
        </div>
      </div>

      <div className="bg-zinc-900 rounded-3xl p-5 mt-4">
        <p className="text-zinc-500">
          Referral Code
        </p>

        <h3 className="text-3xl font-black mt-2">
          {member?.referral_code}
        </h3>
      </div>
    </div>
  );
}
