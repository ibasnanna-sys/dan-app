"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";

import {
  ArrowLeft,
  Wallet,
  ShieldCheck,
  XCircle,
  Clock3,
  Search,
  CircleDollarSign,
} from "lucide-react";

type Withdraw = {
  id: string;
  member_id: string;
  amount: number;
  bank_name: string;
  account_name: string;
  account_number: string;
  status: "pending" | "approved" | "rejected";
  note?: string;
  created_at: string;
  members?: {
    id: string;
    name: string;
    city: string;
    balance: number;
  };
};

export default function AdminWithdrawPage() {
  const [withdraws, setWithdraws] =
    useState<Withdraw[]>([]);

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
    loadWithdraws();
  }, []);

  async function loadWithdraws() {
    setLoading(true);

    const { data, error } =
      await supabase
        .from("withdraws")
        .select(`
          *,
          members (
            id,
            name,
            city,
            balance
          )
        `)
        .order("created_at", {
          ascending: false,
        });

    if (error) {
      console.log(error);
      setWithdraws([]);
    } else {
      setWithdraws(
        (data || []) as Withdraw[]
      );
    }

    setLoading(false);
  }

  /*
    =========================================
    APPROVE
    =========================================
  */

  async function approveWithdraw(
    withdraw: Withdraw
  ) {
    const confirmApprove =
      confirm(
        "Approve withdraw ini?"
      );

    if (!confirmApprove)
      return;

    if (!withdraw.members) {
      alert(
        "Member tidak ditemukan"
      );
      return;
    }

    const memberBalance =
      Number(
        withdraw.members.balance ||
          0
      );

    if (
      memberBalance <
      withdraw.amount
    ) {
      alert(
        "Saldo member tidak cukup"
      );
      return;
    }

    const { error } =
      await supabase
        .from("withdraws")
        .update({
          status: "approved",
        })
        .eq("id", withdraw.id);

    if (error) {
      alert(error.message);
      return;
    }

    await supabase
      .from("members")
      .update({
        balance:
          memberBalance -
          withdraw.amount,
      })
      .eq(
        "id",
        withdraw.member_id
      );

    await supabase
      .from("activity_logs")
      .insert([
        {
          member_name:
            withdraw.members.name,
          city:
            withdraw.members.city,
          activity:
            "Withdraw berhasil",
        },
      ]);

    alert(
      "Withdraw berhasil diapprove"
    );

    loadWithdraws();
  }

  /*
    =========================================
    REJECT
    =========================================
  */

  async function rejectWithdraw(
    withdrawId: string
  ) {
    const reason =
      prompt(
        "Alasan reject withdraw"
      );

    if (!reason) return;

    const { error } =
      await supabase
        .from("withdraws")
        .update({
          status: "rejected",
          note: reason,
        })
        .eq("id", withdrawId);

    if (error) {
      alert(error.message);
      return;
    }

    alert(
      "Withdraw berhasil direject"
    );

    loadWithdraws();
  }

  /*
    =========================================
    FILTER
    =========================================
  */

  const filteredWithdraws =
    useMemo(() => {
      return withdraws.filter(
        (item) => {
          const memberName =
            item.members?.name ||
            "";

          const memberCity =
            item.members?.city ||
            "";

          const matchSearch =
            memberName
              .toLowerCase()
              .includes(
                search.toLowerCase()
              ) ||
            memberCity
              .toLowerCase()
              .includes(
                search.toLowerCase()
              ) ||
            item.bank_name
              .toLowerCase()
              .includes(
                search.toLowerCase()
              );

          const matchFilter =
            filter === "all"
              ? true
              : item.status ===
                filter;

          return (
            matchSearch &&
            matchFilter
          );
        }
      );
    }, [
      withdraws,
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
        withdraws.length,

      pending:
        withdraws.filter(
          (w) =>
            w.status ===
            "pending"
        ).length,

      approved:
        withdraws.filter(
          (w) =>
            w.status ===
            "approved"
        ).length,

      rejected:
        withdraws.filter(
          (w) =>
            w.status ===
            "rejected"
        ).length,
    };
  }, [withdraws]);

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
        <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-green-500/10 blur-[140px]" />

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
              Approval
              <span className="text-green-400">
                {" "}
                Withdraw
              </span>
            </h1>

            <p className="text-zinc-500 mt-5 max-w-2xl leading-relaxed">
              Kelola approval
              withdraw member DAN
              secara realtime.
            </p>
          </div>

          <div className="h-16 px-6 rounded-3xl border border-green-500/20 bg-green-500/10 flex items-center gap-3 shadow-[0_0_35px_rgba(0,255,120,0.10)]">
            <CircleDollarSign className="text-green-400" />

            <span className="font-black text-green-400 text-lg">
              {stats.pending} Pending
            </span>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
          <div className="rounded-[30px] border border-zinc-800 bg-zinc-950 p-5">
            <p className="text-zinc-500 text-sm">
              Total Withdraw
            </p>

            <h2 className="text-4xl font-black mt-4">
              {stats.total}
            </h2>
          </div>

          <div className="rounded-[30px] border border-yellow-500/20 bg-yellow-500/10 p-5">
            <p className="text-yellow-200/70 text-sm">
              Pending
            </p>

            <h2 className="text-4xl font-black text-yellow-300 mt-4">
              {stats.pending}
            </h2>
          </div>

          <div className="rounded-[30px] border border-green-500/20 bg-green-500/10 p-5">
            <p className="text-green-200/70 text-sm">
              Approved
            </p>

            <h2 className="text-4xl font-black text-green-400 mt-4">
              {stats.approved}
            </h2>
          </div>

          <div className="rounded-[30px] border border-red-500/20 bg-red-500/10 p-5">
            <p className="text-red-200/70 text-sm">
              Rejected
            </p>

            <h2 className="text-4xl font-black text-red-400 mt-4">
              {stats.rejected}
            </h2>
          </div>
        </div>

        {/* FILTER */}
        <div className="rounded-[35px] border border-zinc-800 bg-zinc-950 p-5 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search
                size={20}
                className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500"
              />

              <input
                type="text"
                placeholder="Cari member / kota / bank"
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
                className="w-full h-14 rounded-2xl bg-black border border-zinc-800 pl-14 pr-5 outline-none focus:border-green-500 transition"
              />
            </div>

            <select
              value={filter}
              onChange={(e) =>
                setFilter(
                  e.target.value
                )
              }
              className="h-14 rounded-2xl bg-black border border-zinc-800 px-5 outline-none focus:border-green-500 transition"
            >
              <option value="all">
                Semua Status
              </option>

              <option value="pending">
                Pending
              </option>

              <option value="approved">
                Approved
              </option>

              <option value="rejected">
                Rejected
              </option>
            </select>
          </div>
        </div>

        {/* EMPTY */}
        {filteredWithdraws.length ===
          0 && (
          <div className="rounded-[35px] border border-zinc-800 bg-zinc-950 p-10 text-center">
            <h2 className="text-2xl font-black">
              Tidak ada withdraw
            </h2>

            <p className="text-zinc-500 mt-3">
              Data withdraw belum
              tersedia.
            </p>
          </div>
        )}

        {/* LIST */}
        <div className="space-y-5">
          {filteredWithdraws.map(
            (item) => (
              <div
                key={item.id}
                className="rounded-[35px] border border-zinc-800 bg-zinc-950 p-6 hover:border-green-500/30 transition-all duration-300"
              >
                <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6">
                  {/* LEFT */}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="text-2xl md:text-3xl font-black">
                        {item.members
                          ?.name ||
                          "-"}
                      </h2>

                      <div
                        className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-[0.15em] ${
                          item.status ===
                          "approved"
                            ? "bg-green-500/20 text-green-400"
                            : item.status ===
                              "rejected"
                            ? "bg-red-500/20 text-red-400"
                            : "bg-yellow-500/20 text-yellow-300"
                        }`}
                      >
                        {item.status}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-5 mt-5 text-zinc-400 text-sm">
                      <div className="flex items-center gap-2">
                        <Wallet size={16} />

                        Rp{" "}
                        {Number(
                          item.amount
                        ).toLocaleString(
                          "id-ID"
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <Clock3 size={16} />

                        {new Date(
                          item.created_at
                        ).toLocaleString(
                          "id-ID"
                        )}
                      </div>
                    </div>

                    <div className="mt-5 space-y-2 text-zinc-300">
                      <p>
                        Bank:{" "}
                        {
                          item.bank_name
                        }
                      </p>

                      <p>
                        Nama:{" "}
                        {
                          item.account_name
                        }
                      </p>

                      <p>
                        Rekening:{" "}
                        {
                          item.account_number
                        }
                      </p>
                    </div>
                  </div>

                  {/* RIGHT */}
                  {item.status ===
                    "pending" && (
                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={() =>
                          approveWithdraw(
                            item
                          )
                        }
                        className="h-14 px-6 rounded-2xl bg-green-500 hover:bg-green-400 transition-all flex items-center gap-2 font-black text-black shadow-[0_0_30px_rgba(0,255,120,0.18)]"
                      >
                        <ShieldCheck size={20} />

                        Approve
                      </button>

                      <button
                        onClick={() =>
                          rejectWithdraw(
                            item.id
                          )
                        }
                        className="h-14 px-6 rounded-2xl bg-red-600 hover:bg-red-500 transition-all flex items-center gap-2 font-black shadow-[0_0_30px_rgba(255,0,0,0.15)]"
                      >
                        <XCircle size={20} />

                        Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </main>
  );
                        }
