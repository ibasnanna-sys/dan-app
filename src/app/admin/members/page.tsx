"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

import {
  ArrowLeft,
  Users,
} from "lucide-react";

export default function AdminMembersPage() {

  const [members, setMembers] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    loadMembers();

  }, []);

  async function loadMembers() {

    setLoading(true);

    const { data } =
      await supabase
        .from("members")
        .select("*")
        .order("created_at", {
          ascending: false,
        });

    setMembers(data || []);

    setLoading(false);
  }

  if (loading) {

    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center text-xl font-black">
        Loading...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">

      {/* BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none">

        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-green-500/10 blur-[140px]" />

        <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-green-500/5 blur-[120px]" />

      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-5 py-6 pb-32">

        {/* HEADER */}
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6 mb-10">

          <div>

            <Link
              href="/admin"
              className="inline-flex items-center gap-2 h-12 px-5 rounded-2xl border border-zinc-800 bg-zinc-950 hover:border-green-500 transition-all text-sm font-bold mb-5"
            >

              <ArrowLeft size={18} />

              Kembali

            </Link>

            <h1 className="text-4xl md:text-6xl font-black leading-tight">
              Management
              <span className="text-green-400">
                {" "}
                Member
              </span>
            </h1>

            <p className="text-zinc-500 mt-5 max-w-2xl leading-relaxed">
              Kelola seluruh member platform DAN.
            </p>

          </div>

          <div className="h-16 px-6 rounded-3xl border border-green-500/20 bg-green-500/10 flex items-center gap-3">

            <Users className="text-green-400" />

            <span className="font-black text-green-400 text-lg">
              {members.length} Member
            </span>

          </div>

        </div>

        {/* LIST */}
        <div className="space-y-5">

          {members.map((member) => (

            <div
              key={member.id}
              className="rounded-[35px] border border-zinc-800 bg-zinc-950 p-6"
            >

              <div className="flex flex-col gap-3">

                <h2 className="text-2xl font-black">
                  {member.name}
                </h2>

                <p className="text-zinc-500">
                  {member.phone}
                </p>

                <p className="text-green-400 font-bold">
                  Rp{" "}
                  {Number(
                    member.balance || 0
                  ).toLocaleString("id-ID")}
                </p>

              </div>

            </div>

          ))}

        </div>

      </div>

    </main>
  );
}
