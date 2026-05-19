"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ProfilePage() {

  const [member, setMember] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    loadMember();

  }, []);

  async function loadMember() {

    const memberId =
      localStorage.getItem("member_id");

    if (!memberId) {

      window.location.href =
        "/login";

      return;
    }

    const { data, error } =
      await supabase
        .from("members")
        .select("*")
        .eq("id", memberId)
        .single();

    if (error || !data) {

      localStorage.removeItem(
        "member_id"
      );

      window.location.href =
        "/login";

      return;
    }

    setMember(data);

    setLoading(false);
  }

  function logout() {

    localStorage.removeItem(
      "member_id"
    );

    window.location.href =
      "/login";
  }

  if (loading) {

    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pb-32">

      <div className="px-5 pt-8">

        <div className="flex items-start justify-between">

          <div>

            <p className="text-zinc-500 text-lg">
              Profile Member
            </p>

            <h1 className="text-5xl font-black mt-1 leading-none">
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

        <div className="bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 rounded-[36px] p-6 mt-8">

          <p className="text-zinc-500">
            Status Member
          </p>

          <h2 className="text-5xl font-black mt-3 capitalize">
            {member?.status_member}
          </h2>

          <div className="mt-8">

            <p className="text-zinc-500">
              Referral Code
            </p>

            <h3 className="text-4xl font-black mt-3 break-all">
              {member?.referral_code}
            </h3>

          </div>

        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-[36px] p-6 mt-5">

          <div className="space-y-6">

            <div>

              <p className="text-zinc-500">
                Email
              </p>

              <h3 className="text-2xl font-black mt-2 break-all">
                {member?.email}
              </h3>

            </div>

            <div>

              <p className="text-zinc-500">
                Nomor HP
              </p>

              <h3 className="text-2xl font-black mt-2">
                {member?.phone || "-"}
              </h3>

            </div>

            <div>

              <p className="text-zinc-500">
                Kota
              </p>

              <h3 className="text-2xl font-black mt-2">
                {member?.city || "-"}
              </h3>

            </div>

            <div>

              <p className="text-zinc-500">
                Alamat
              </p>

              <h3 className="text-2xl font-black mt-2">
                {member?.address || "-"}
              </h3>

            </div>

          </div>

        </div>

        <a
          href="/member/dashboard"
          className="block bg-green-500 text-black text-center rounded-[32px] py-5 font-black text-2xl mt-6"
        >
          Kembali ke Dashboard
        </a>

      </div>

    </div>
  );
}
