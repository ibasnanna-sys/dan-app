"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";

import {
  ArrowLeft,
  Search,
  Users,
  Wallet,
  ShieldCheck,
  Ban,
  Eye,
} from "lucide-react";

type Member = {
  id: string;
  name: string;
  phone: string;
  city: string;
  status: "free" | "aktif" | "dibekukan";
  balance: number;
  sponsor_id?: string | null;
  created_at: string;
};

type Transaction = {
  id: string;
  member_id: string;
  amount: number;
};

export default function AdminMembersPage() {

  const [members, setMembers] =
    useState<Member[]>([]);

  const [transactions, setTransactions] =
    useState<Transaction[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [filter, setFilter] =
    useState("all");

  /*
    =========================================
    LOAD DATA
    =========================================
  */

  useEffect(() => {

    loadData();

  }, []);

  async function loadData() {

    setLoading(true);

    const [
      membersResult,
      transactionResult,
    ] = await Promise.all([

      supabase
        .from("members")
        .select("*")
        .order("created_at", {
          ascending: false,
        }),

      supabase
        .from("transactions")
        .select("*"),

    ]);

    setMembers(
      (membersResult.data ||
        []) as Member[]
    );

    setTransactions(
      (transactionResult.data ||
        []) as Transaction[]
    );

    setLoading(false);
  }

  /*
    =========================================
    MEMBER ACTION
    =========================================
  */

  async function updateStatus(
    id: string,
    status:
      | "aktif"
      | "dibekukan"
  ) {

    const confirmAction =
      confirm(
        status === "aktif"
          ? "Aktifkan member?"
          : "Bekukan member?"
      );

    if (!confirmAction)
      return;

    const { error } =
      await supabase
        .from("members")
        .update({
          status,
        })
        .eq("id", id);

    if (error) {

      alert(error.message);

      return;
    }

    loadData();

    alert(
      status === "aktif"
        ? "Member berhasil diaktifkan"
        : "Member berhasil dibekukan"
    );
  }

  /*
    =========================================
    FILTER
    =========================================
  */

  const filteredMembers =
    useMemo(() => {

      return members.filter(
        (member) => {

          const matchSearch =
            member.name
              ?.toLowerCase()
              .includes(
                search.toLowerCase()
              ) ||
            member.phone
              ?.toLowerCase()
              .includes(
                search.toLowerCase()
              ) ||
            member.city
              ?.toLowerCase()
              .includes(
                search.toLowerCase()
              );

          const matchFilter =
            filter === "all"
              ? true
              : member.status ===
                filter;

          return (
            matchSearch &&
            matchFilter
          );
        }
      );

    }, [
      members,
      search,
      filter,
    ]);

  /*
    =========================================
    STATS
    =========================================
  */

  const stats = useMemo(() => {

    return {

      total:
        members.length,

      aktif:
        members.filter(
          (m) =>
            m.status ===
            "aktif"
        ).length,

      free:
        members.filter(
          (m) =>
            m.status ===
            "free"
        ).length,

      dibekukan:
        members.filter(
          (m) =>
            m.status ===
            "dibekukan"
        ).length,

    };

  }, [members]);

  /*
    =========================================
    HELPER
    =========================================
  */

  function getTransactionCount(
    memberId: string
  ) {

    return transactions.filter(
      (trx) =>
        trx.member_id ===
        memberId
    ).length;
  }

  /*
    =========================================
    LOADING
    =========================================
  */

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
              Kelola seluruh member,
              status akun, saldo,
              transaksi dan aktivitas
              realtime platform DAN.
            </p>

          </div>

          <div className="h-16 px-6 rounded-3xl border border-green-500/20 bg-green-500/10 flex items-center gap-3 shadow-[0_0_35px_rgba(0,255,120,0.10)]">

            <Users className="text-green-400" />

            <span className="font-black text-green-400 text-lg">
              {stats.total} Member
            </span>

          </div>

        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-10">

          <div className="rounded-[30px] border border-zinc-800 bg-zinc-950 p-5">

            <p className="text-zinc-500 text-sm">
              Total Member
            </p>

            <h2 className="text-4xl font-black mt-4">
              {stats.total}
            </h2>

          </div>

          <div className="rounded-[30px] border border-green-500/20 bg-green-500/10 p-5">

            <p className="text-green-300 text-sm">
              Member Aktif
            </p>

            <h2 className="text-4xl font-black text-green-400 mt-4">
              {stats.aktif}
            </h2>

          </div>

          <div className="rounded-[30px] border border-yellow-500/20 bg-yellow-500/10 p-5">

            <p className="text-yellow-300 text-sm">
              Member Free
            </p>

            <h2 className="text-4xl font-black text-yellow-300 mt-4">
              {stats.free}
            </h2>

          </div>

          <div className="rounded-[30px] border border-red-500/20 bg-red-500/10 p-5">

            <p className="text-red-300 text-sm">
              Dibekukan
            </p>

            <h2 className="text-4xl font-black text-red-400 mt-4">
              {stats.dibekukan}
            </h2>

          </div>

        </div>

        {/* FILTER */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-4 mb-10">

          <div className="relative">

            <Search
              size={20}
              className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500"
            />

            <input
              type="text"
              placeholder="Cari member..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              className="w-full h-16 rounded-3xl bg-zinc-950 border border-zinc-800 pl-14 pr-5 outline-none focus:border-green-500 transition-all"
            />

          </div>

          <select
            value={filter}
            onChange={(e) =>
              setFilter(
                e.target.value
              )
            }
            className="h-16 rounded-3xl bg-zinc-950 border border-zinc-800 px-5 outline-none focus:border-green-500"
          >

            <option value="all">
              Semua Status
            </option>

            <option value="aktif">
              Aktif
            </option>

            <option value="free">
              Free
            </option>

            <option value="dibekukan">
              Dibekukan
            </option>

          </select>

        </div>

        {/* EMPTY */}
        {filteredMembers.length ===
          0 && (

          <div className="rounded-[35px] border border-zinc-800 bg-zinc-950 p-10 text-center">

            <h2 className="text-3xl font-black">
              Member Tidak Ditemukan
            </h2>

            <p className="text-zinc-500 mt-4">
              Tidak ada data member
              yang cocok.
            </p>

          </div>

        )}

        {/* LIST */}
        <div className="space-y-5">

          {filteredMembers.map(
            (member) => (

              <div
                key={member.id}
                className="rounded-[35px] border border-zinc-800 bg-zinc-950 p-6 hover:border-green-500/30 transition-all duration-300"
              >

                <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6">

                  {/* LEFT */}
                  <div className="flex-1">

                    <div className="flex flex-wrap items-center gap-3">

                      <h2 className="text-2xl md:text-3xl font-black break-words">
                        {member.name}
                      </h2>

                      <div
                        className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-[0.15em] ${
                          member.status ===
                          "aktif"
                            ? "bg-green-500/20 text-green-400"
                            : member.status ===
                              "dibekukan"
                            ? "bg-red-500/20 text-red-400"
                            : "bg-yellow-500/20 text-yellow-300"
                        }`}
                      >

                        {
                          member.status
                        }

                      </div>

                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">

                      <div>

                        <p className="text-zinc-500 text-sm">
                          Kota
                        </p>

                        <h3 className="font-bold mt-2">
                          {
                            member.city
                          }
                        </h3>

                      </div>

                      <div>

                        <p className="text-zinc-500 text-sm">
                          Telepon
                        </p>

                        <h3 className="font-bold mt-2 break-all">
                          {
                            member.phone
                          }
                        </h3>

                      </div>

                      <div>

                        <p className="text-zinc-500 text-sm">
                          Saldo
                        </p>

                        <h3 className="font-bold mt-2 text-green-400 break-words">
                          Rp{" "}
                          {Number(
                            member.balance ||
                              0
                          ).toLocaleString(
                            "id-ID"
                          )}
                        </h3>

                      </div>

                      <div>

                        <p className="text-zinc-500 text-sm">
                          Transaksi
                        </p>

                        <h
