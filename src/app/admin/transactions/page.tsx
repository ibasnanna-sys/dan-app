"use client";

import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { useEffect, useState } from "react";

import {
  ArrowLeft,
  Wallet,
  ShieldCheck,
  XCircle,
  Clock3,
  Users,
} from "lucide-react";

type TransactionStatus =
  | "pending"
  | "approved"
  | "rejected";

type Transaction = {
  id: number;
  memberName: string;
  city: string;
  product: string;
  amount: number;
  status: TransactionStatus;
  created_at: string;
};

export default function AdminTransactionsPage() {

  const [transactions, setTransactions] =
    useState<Transaction[]>([]);

  /*
    =========================================
    LOAD TRANSACTIONS
    =========================================
  */

  useEffect(() => {

    async function loadTransactions() {

      const { data, error } =
        await supabase
          .from("transactions")
          .select("*")
          .order("created_at", {
            ascending: false,
          });

      if (!error && data) {

        setTransactions(
          data as Transaction[]
        );

      }

    }

    loadTransactions();

  }, []);

  /*
    =========================================
    UPDATE STATUS
    =========================================
  */

  async function updateStatus(
    id: number,
    status:
      | "approved"
      | "rejected"
  ) {

    const { error } =
      await supabase
        .from("transactions")
        .update({ status })
        .eq("id", id);

    if (!error) {

      setTransactions((prev) =>
        prev.map((trx) => {

          if (trx.id === id) {

            return {
              ...trx,
              status,
            };

          }

          return trx;

        })
      );

    }

  }

  /*
    =========================================
    COUNT
    =========================================
  */

  const pendingCount =
    transactions.filter(
      (trx) =>
        trx.status === "pending"
    ).length;

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">

      {/* BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none">

        <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-green-500/10 blur-[140px]" />

        <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-green-500/5 blur-[120px]" />

      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-6 pb-32">

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
                Transaksi
              </span>
            </h1>

            <p className="text-zinc-500 mt-5 max-w-2xl leading-relaxed">
              Approval transaksi member DAN realtime.
            </p>

          </div>

          <div className="h-16 px-6 rounded-3xl border border-green-500/20 bg-green-500/10 flex items-center gap-3 shadow-[0_0_35px_rgba(0,255,120,0.10)]">

            <Wallet className="text-green-400" />

            <span className="font-black text-green-400 text-lg">
              {pendingCount} Pending
            </span>

          </div>

        </div>

        {/* EMPTY */}
        {transactions.length === 0 && (

          <div className="rounded-[35px] border border-zinc-800 bg-zinc-950 p-10 text-center">

            <h2 className="text-2xl font-black">
              Tidak ada transaksi
            </h2>

            <p className="text-zinc-500 mt-3">
              Belum ada transaksi masuk.
            </p>

          </div>

        )}

        {/* LIST */}
        <div className="space-y-5">

          {transactions.map((trx) => (

            <div
              key={trx.id}
              className="rounded-[35px] border border-zinc-800 bg-zinc-950 p-6 hover:border-green-500/30 transition-all duration-300"
            >

              <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6">

                {/* LEFT */}
                <div className="flex-1">

                  <div className="flex flex-wrap items-center gap-3">

                    <h2 className="text-2xl md:text-3xl font-black">
                      {trx.memberName}
                    </h2>

                    <div
                      className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-[0.15em] ${
                        trx.status ===
                        "approved"
                          ? "bg-green-500/20 text-green-400"
                          : trx.status ===
                            "rejected"
                          ? "bg-red-500/20 text-red-400"
                          : "bg-yellow-500/20 text-yellow-300"
                      }`}
                    >

                      {trx.status}

                    </div>

                  </div>

                  <div className="flex flex-wrap gap-5 mt-5 text-zinc-400 text-sm">

                    <div className="flex items-center gap-2">

                      <Users size={16} />

                      {trx.city}

                    </div>

                    <div className="flex items-center gap-2">

                      <Wallet size={16} />

                      Rp{" "}
                      {Number(
                        trx.amount
                      ).toLocaleString("id-ID")}

                    </div>

                    <div className="flex items-center gap-2">

                      <Clock3 size={16} />

                      {trx.created_at}

                    </div>

                  </div>

                  <p className="mt-5 text-lg text-zinc-300">
                    {trx.product}
                  </p>

                </div>

                {/* RIGHT */}
                <div className="flex flex-wrap gap-3">

                  <button
                    onClick={() =>
                      updateStatus(
                        trx.id,
                        "approved"
                      )
                    }
                    disabled={
                      trx.status ===
                      "approved"
                    }
                    className="h-14 px-6 rounded-2xl bg-green-500 hover:bg-green-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2 font-black text-black"
                  >

                    <ShieldCheck
                      size={20}
                    />

                    Approve

                  </button>

                  <button
                    onClick={() =>
                      updateStatus(
                        trx.id,
                        "rejected"
                      )
                    }
                    disabled={
                      trx.status ===
                      "rejected"
                    }
                    className="h-14 px-6 rounded-2xl bg-red-600 hover:bg-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2 font-black"
                  >

                    <XCircle
                      size={20}
                    />

                    Reject

                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </main>
  );

}
