"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { supabase } from "@/lib/supabase";

import {
  ArrowLeft,
  ShieldCheck,
  AlertTriangle,
  LoaderCircle,
  Wallet,
  Clock3,
  Users,
  Package,
  CheckCircle2,
  XCircle,
} from "lucide-react";

/*
=====================================================
TYPE
=====================================================
*/

type TransactionStatus =
  | "pending"
  | "approved"
  | "rejected"
  | "selesai"
  | "gagal";

type Product = {
  id: number;
  name: string;
  provider: string;
  kuota: string;
  masa_aktif: string;
};

type Member = {
  id: string;
  full_name: string;
  city: string;
};

type Transaction = {
  id: number;

  member_id: string | null;

  product_id: number | null;

  nomor_tujuan: string | null;

  payment_method: string | null;

  amount: number | null;

  status: TransactionStatus | string | null;

  created_at: string | null;

  members?: Member | Member[] | null;

  products?: Product | Product[] | null;
};

export default function AdminTransactionsPage() {

  const router = useRouter();

  const [transactions, setTransactions] =
    useState<Transaction[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [processingId, setProcessingId] =
    useState<number | null>(null);

  /*
  =====================================================
  NORMALIZE
  =====================================================
  */

  function normalizeStatus(
    status?: string | null
  ) {

    return (
      status
        ?.toString()
        .trim()
        .toLowerCase() || "pending"
    );
  }

  function getMember(
    trx: Transaction
  ): Member | null {

    if (!trx.members) return null;

    if (Array.isArray(trx.members)) {

      return trx.members[0] || null;
    }

    return trx.members;
  }

  function getProduct(
    trx: Transaction
  ): Product | null {

    if (!trx.products) return null;

    if (Array.isArray(trx.products)) {

      return trx.products[0] || null;
    }

    return trx.products;
  }

  /*
  =====================================================
  LOAD TRANSACTIONS
  =====================================================
  */

  useEffect(() => {

    loadTransactions();

  }, []);

  async function loadTransactions() {

    try {

      setLoading(true);

      const { data, error } =
        await supabase
          .from("transactions")
          .select(`
            id,
            member_id,
            product_id,
            nomor_tujuan,
            payment_method,
            amount,
            status,
            created_at,

            members:member_id (
              id,
              full_name,
              city
            ),

            products:product_id (
              id,
              name,
              provider,
              kuota,
              masa_aktif
            )
          `)
          .order("created_at", {
            ascending: false,
          });

      if (error) {

        console.error(
          "LOAD TRANSACTIONS ERROR:",
          error
        );

        alert(error.message);

        return;
      }

      setTransactions(
        (data || []) as Transaction[]
      );

    } catch (err: any) {

      console.error(err);

      alert(
        err?.message ||
        "Terjadi kesalahan"
      );

    } finally {

      setLoading(false);
    }
  }

  /*
  =====================================================
  APPROVE
  =====================================================
  */

  async function approveTransaction(
    id: number
  ) {

    try {

      setProcessingId(id);

      const { error } =
        await supabase
          .from("transactions")
          .update({
            status: "approved",
          })
          .eq("id", id);

      if (error) {

        alert(error.message);

        return;
      }

      setTransactions((prev) =>
        prev.map((trx) =>
          trx.id === id
            ? {
                ...trx,
                status: "approved",
              }
            : trx
        )
      );

    } catch (err: any) {

      alert(
        err?.message ||
        "Gagal approve transaksi"
      );

    } finally {

      setProcessingId(null);
    }
  }

  /*
  =====================================================
  REJECT
  =====================================================
  */

  async function rejectTransaction(
    id: number
  ) {

    try {

      setProcessingId(id);

      const { error } =
        await supabase
          .from("transactions")
          .update({
            status: "rejected",
          })
          .eq("id", id);

      if (error) {

        alert(error.message);

        return;
      }

      setTransactions((prev) =>
        prev.map((trx) =>
          trx.id === id
            ? {
                ...trx,
                status: "rejected",
              }
            : trx
        )
      );

    } catch (err: any) {

      alert(
        err?.message ||
        "Gagal reject transaksi"
      );

    } finally {

      setProcessingId(null);
    }
  }

  /*
  =====================================================
  STATUS STYLE
  =====================================================
  */

  function statusStyle(
    status?: string | null
  ) {

    const normalized =
      normalizeStatus(status);

    if (
      normalized === "approved" ||
      normalized === "selesai"
    ) {

      return {

        text:
          "text-green-400",

        bg:
          "bg-green-500/10",

        border:
          "border-green-500/20",

        glow:
          "shadow-[0_0_30px_rgba(0,255,100,0.15)]",

        label:
          "APPROVED",

        icon:
          (
            <ShieldCheck
              size={16}
              className="text-green-400"
            />
          ),

      };
    }

    if (
      normalized === "rejected" ||
      normalized === "gagal"
    ) {

      return {

        text:
          "text-red-400",

        bg:
          "bg-red-500/10",

        border:
          "border-red-500/20",

        glow:
          "shadow-[0_0_30px_rgba(255,0,0,0.15)]",

        label:
          "REJECTED",

        icon:
          (
            <AlertTriangle
              size={16}
              className="text-red-400"
            />
          ),

      };
    }

    return {

      text:
        "text-yellow-300",

      bg:
        "bg-yellow-500/10",

      border:
        "border-yellow-500/20",

      glow:
        "shadow-[0_0_30px_rgba(255,215,0,0.12)]",

      label:
        "PENDING",

      icon:
        (
          <LoaderCircle
            size={16}
            className="text-yellow-300 animate-spin"
          />
        ),

    };
  }

  /*
  =====================================================
  STATS
  =====================================================
  */

  const pendingCount =
    transactions.filter(
      (trx) =>
        normalizeStatus(
          trx.status
        ) === "pending"
    ).length;

  /*
  =====================================================
  LOADING
  =====================================================
  */

  if (loading) {

    return (

      <div className="min-h-screen bg-black text-white flex items-center justify-center">

        <div className="flex flex-col items-center gap-5">

          <div className="w-16 h-16 rounded-full border-4 border-green-500/20 border-t-green-400 animate-spin"></div>

          <p className="text-zinc-400 text-lg">
            Memuat transaksi...
          </p>

        </div>

      </div>
    );
  }

  return (

    <div className="min-h-screen bg-black text-white overflow-hidden">

      {/* BACKGROUND */}

      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,255,100,0.10),transparent_35%)] pointer-events-none"></div>

      <div className="fixed bottom-0 left-0 w-72 h-72 bg-green-500/5 blur-3xl rounded-full pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto p-5 pb-32">

        {/* HEADER */}

        <div className="flex items-start justify-between gap-4 flex-wrap">

          <div>

            <button
              onClick={() =>
                router.push("/admin")
              }
              className="inline-flex items-center gap-2 h-12 px-5 rounded-2xl border border-zinc-800 bg-black hover:border-green-500 transition-all text-sm font-bold mb-6"
            >

              <ArrowLeft size={18} />

              Kembali

            </button>

            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-none">
              Transactions
            </h1>

            <p className="text-zinc-400 mt-5 max-w-2xl leading-relaxed text-base md:text-lg">
              Approval transaksi
              paket data dan
              aktivasi member DAN.
            </p>

          </div>

          <div className="inline-flex items-center gap-3 px-5 py-4 rounded-full bg-green-500/10 border border-green-500/20 shadow-[0_0_30px_rgba(0,255,100,0.15)]">

            <Wallet
              size={18}
              className="text-green-400"
            />

            <span className="text-green-400 font-black tracking-wide">
              {pendingCount} Pending
            </span>

          </div>

        </div>

        {/* LIST */}

        <div className="space-y-6 mt-10">

          {transactions.map((item) => {

            const style =
              statusStyle(
                item.status
              );

            const member =
              getMember(item);

            const product =
              getProduct(item);

            const normalizedStatus =
              normalizeStatus(
                item.status
              );

            return (

              <div
                key={item.id}
                className="relative overflow-hidden rounded-[40px] border border-zinc-800 bg-white/[0.03] backdrop-blur-xl p-6 md:p-8"
              >

                <div className="absolute top-0 right-0 w-56 h-56 bg-green-500/5 blur-[120px] rounded-full"></div>

                <div className="relative z-10">

                  {/* TOP */}

                  <div className="flex items-start justify-between gap-5 flex-wrap">

                    <div>

                      <h2 className="text-3xl md:text-5xl font-black">

                        {member?.full_name ||
                          "Member DAN"}

                      </h2>

                      <div className="flex flex-wrap items-center gap-5 mt-5 text-zinc-400">

                        <div className="flex items-center gap-2">

                          <Users size={18} />

                          <span>
                            {member?.city ||
                              "Indonesia"}
                          </span>

                        </div>

                        <div className="flex items-center gap-2">

                          <Wallet size={18} />

                          <span>

                            Rp{" "}

                            {Number(
                              item.amount || 0
                            ).toLocaleString(
                              "id-ID"
                            )}

                          </span>

                        </div>

                      </div>

                    </div>

                    <div
                      className={`inline-flex items-center gap-3 px-5 py-3 rounded-full border font-black uppercase tracking-wide ${style.text} ${style.bg} ${style.border} ${style.glow}`}
                    >

                      {style.icon}

                      {style.label}

                    </div>

                  </div>

                  {/* INFO */}

                  <div className="mt-8 space-y-5">

                    <div className="flex items-center gap-3 text-zinc-400">

                      <Clock3 size={18} />

                      <span>

                        {item.created_at
                          ? new Date(
                              item.created_at
                            ).toLocaleString(
                              "id-ID"
                            )
                          : "-"}

                      </span>

                    </div>

                    <div className="flex items-start gap-3">

                      <Package
                        size={18}
                        className="mt-1 text-zinc-400"
                      />

                      <div>

                        <p className="text-zinc-500 text-sm">
                          Produk
                        </p>

                        <h3 className="text-2xl font-bold mt-1">

                          {product?.name ||
                            "Paket Data"}

                        </h3>

                        <p className="text-zinc-500 mt-2">

                          {product?.provider ||
                            "-"}

                          {" • "}

                          {product?.kuota ||
                            "-"}

                        </p>

                      </div>

                    </div>

                  </div>

                  {/* ACTION */}

                  <div className="flex flex-wrap gap-4 mt-10">

                    <button
                      onClick={() =>
                        approveTransaction(
                          item.id
                        )
                      }
                      disabled={
                        processingId ===
                          item.id ||
                        normalizedStatus ===
                          "approved"
                      }
                      className="flex-1 min-w-[220px] h-16 rounded-[24px] bg-green-600 hover:bg-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 text-black font-black text-2xl flex items-center justify-center gap-3"
                    >

                      <CheckCircle2
                        size={24}
                      />

                      {processingId ===
                      item.id
                        ? "Loading..."
                        : "Approve"}

                    </button>

                    <button
                      onClick={() =>
                        rejectTransaction(
                          item.id
                        )
                      }
                      disabled={
                        processingId ===
                          item.id ||
                        normalizedStatus ===
                          "rejected"
                      }
                      className="flex-1 min-w-[220px] h-16 rounded-[24px] bg-red-600 hover:bg-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 text-white font-black text-2xl flex items-center justify-center gap-3"
                    >

                      <XCircle
                        size={24}
                      />

                      {processingId ===
                      item.id
                        ? "Loading..."
                        : "Reject"}

                    </button>

                  </div>

                </div>

              </div>

            );
          })}

        </div>

      </div>

    </div>
  );
}
