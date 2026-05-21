"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { supabase } from "@/lib/supabase";

import {
  Wallet,
  Clock3,
  ShieldCheck,
  XCircle,
  Users,
  Package2,
  RefreshCcw,
} from "lucide-react";

/*
=====================================================
TYPES
=====================================================
*/

type Member = {
  id: string;
  full_name: string | null;
  city: string | null;
};

type Product = {
  id: string;
  name: string | null;
  provider: string | null;
  kuota: string | null;
  masa_aktif: string | null;
};

type Transaction = {
  id: number;

  member_id: string | null;

  product_id: string | null;

  nomor_tujuan: string | null;

  payment_method: string | null;

  amount: number | null;

  status: string | null;

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
  NORMALIZER
  =====================================================
  */

  function getMember(
    item: Transaction
  ): Member | null {

    if (!item.members) return null;

    if (Array.isArray(item.members)) {

      return item.members[0] || null;
    }

    return item.members;
  }

  function getProduct(
    item: Transaction
  ): Product | null {

    if (!item.products) return null;

    if (Array.isArray(item.products)) {

      return item.products[0] || null;
    }

    return item.products;
  }

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
          "LOAD ERROR:",
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

      await loadTransactions();

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

      await loadTransactions();

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
  COUNTER
  =====================================================
  */

  const pendingCount =
    transactions.filter(
      (item) =>
        normalizeStatus(
          item.status
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

          <p className="text-zinc-400">
            Memuat transaksi...
          </p>

        </div>

      </div>
    );
  }

  return (

    <div className="min-h-screen bg-black text-white">

      {/* BACKGROUND */}

      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,255,100,0.08),transparent_35%)] pointer-events-none"></div>

      <div className="relative max-w-6xl mx-auto p-5 pb-32">

        {/* HEADER */}

        <div className="flex items-center justify-between gap-4 flex-wrap mb-10">

          <div>

            <p className="text-green-400 text-sm font-black tracking-[0.25em] uppercase">
              Admin Panel
            </p>

            <h1 className="text-5xl md:text-6xl font-black mt-3">
              Transactions
            </h1>

            <p className="text-zinc-500 mt-4">
              Approval transaksi member DAN
            </p>

          </div>

          <button
            onClick={loadTransactions}
            className="h-14 px-6 rounded-3xl bg-green-500 text-black font-black flex items-center gap-3"
          >

            <RefreshCcw size={18} />

            Refresh

          </button>

        </div>

        {/* PENDING */}

        <div className="rounded-[35px] border border-green-500/20 bg-green-500/10 p-6 mb-10">

          <div className="flex items-center gap-4">

            <Wallet
              size={30}
              className="text-green-400"
            />

            <h2 className="text-4xl font-black text-green-400">

              {pendingCount} Pending

            </h2>

          </div>

        </div>

        {/* EMPTY */}

        {transactions.length === 0 && (

          <div className="rounded-[40px] border border-zinc-800 bg-white/[0.03] p-10 text-center">

            <h2 className="text-3xl font-black">
              Belum ada transaksi
            </h2>

          </div>
        )}

        {/* LIST */}

        <div className="space-y-6">

          {transactions.map((item) => {

            const member =
              getMember(item);

            const product =
              getProduct(item);

            const status =
              normalizeStatus(
                item.status
              );

            const approved =
              status === "approved";

            const rejected =
              status === "rejected";

            return (

              <div
                key={item.id}
                className="rounded-[40px] border border-zinc-800 bg-black/70 backdrop-blur-xl p-6"
              >

                {/* TOP */}

                <div className="flex items-start justify-between gap-4 flex-wrap">

                  <div>

                    <h2 className="text-4xl font-black">

                      {member?.full_name ||
                        "Member DAN"}

                    </h2>

                    <p className="text-zinc-500 mt-3 text-lg">

                      {member?.city ||
                        "Indonesia"}

                    </p>

                  </div>

                  <div
                    className={`px-5 py-3 rounded-full font-black uppercase tracking-[0.2em]
                    ${
                      approved
                        ? "bg-green-500/15 text-green-400"
                        : rejected
                        ? "bg-red-500/15 text-red-400"
                        : "bg-yellow-500/15 text-yellow-300"
                    }`}
                  >

                    {approved
                      ? "APPROVED"
                      : rejected
                      ? "REJECTED"
                      : "PENDING"}

                  </div>

                </div>

                {/* INFO */}

                <div className="flex flex-wrap items-center gap-6 mt-8 text-zinc-300">

                  <div className="flex items-center gap-2">

                    <Users size={18} />

                    <span>
                      {member?.city ||
                        "-"}
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

                  <div className="flex items-center gap-2">

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

                </div>

                {/* PRODUCT */}

                <div className="mt-8">

                  <div className="flex items-center gap-3 text-zinc-400">

                    <Package2 size={18} />

                    <span className="uppercase tracking-[0.2em] text-sm">
                      Produk
                    </span>

                  </div>

                  <h3 className="text-3xl font-black mt-4">

                    {product?.name ||
                      "Produk Digital"}

                  </h3>

                  <p className="text-zinc-500 mt-3">

                    {product?.provider ||
                      "-"}

                  </p>

                </div>

                {/* ACTION */}

                <div className="grid grid-cols-2 gap-5 mt-10">

                  <button
                    onClick={() =>
                      approveTransaction(
                        item.id
                      )
                    }
                    disabled={
                      processingId ===
                      item.id
                    }
                    className="h-20 rounded-[28px] bg-green-600 hover:bg-green-500 transition-all text-black font-black text-2xl flex items-center justify-center gap-3 disabled:opacity-50"
                  >

                    <ShieldCheck size={28} />

                    Approve

                  </button>

                  <button
                    onClick={() =>
                      rejectTransaction(
                        item.id
                      )
                    }
                    disabled={
                      processingId ===
                      item.id
                    }
                    className="h-20 rounded-[28px] bg-red-600 hover:bg-red-500 transition-all text-white font-black text-2xl flex items-center justify-center gap-3 disabled:opacity-50"
                  >

                    <XCircle size={28} />

                    Reject

                  </button>

                </div>

              </div>
            );
          })}

        </div>

      </div>

    </div>
  );
}
