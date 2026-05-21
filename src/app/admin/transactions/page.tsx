"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

import {
  Wallet,
  Users,
  Clock3,
  ShieldCheck,
  XCircle,
  LoaderCircle,
} from "lucide-react";

interface TransactionItem {
  id: string;
  amount: number;
  status: string;
  created_at: string;
  member_id: string;
  product_id: string;

  user_name: string;
  user_phone: string;
  user_city: string;

  product_name: string;
}

export default function AdminTransactionsPage() {
  const [transactions, setTransactions] = useState<TransactionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);

  async function fetchTransactions() {
    setLoading(true);

    try {
      /*
      ==========================================
      FETCH TRANSACTIONS
      ==========================================
      */

      const { data: trxData, error: trxError } = await supabase
        .from("transactions")
        .select("*")
        .order("created_at", { ascending: false });

      if (trxError) {
        console.error(trxError);
        setLoading(false);
        return;
      }

      /*
      ==========================================
      FETCH USERS
      ==========================================
      */

      const memberIds = [
        ...new Set(trxData.map((item) => item.member_id).filter(Boolean)),
      ];

      const { data: usersData } = await supabase
        .from("users")
        .select("id,name,phone")
        .in("id", memberIds);

      /*
      ==========================================
      FETCH MEMBERS
      ==========================================
      */

      const { data: membersData } = await supabase
        .from("members")
        .select("user_id,city")
        .in("user_id", memberIds);

      /*
      ==========================================
      FETCH PRODUCTS
      ==========================================
      */

      const productIds = [
        ...new Set(trxData.map((item) => item.product_id).filter(Boolean)),
      ];

      const { data: productsData } = await supabase
        .from("products")
        .select("id,name")
        .in("id", productIds);

      /*
      ==========================================
      MERGE DATA
      ==========================================
      */

      const merged: TransactionItem[] = trxData.map((trx) => {
        const user = usersData?.find((u) => u.id === trx.member_id);

        const member = membersData?.find(
          (m) => m.user_id === trx.member_id
        );

        const product = productsData?.find(
          (p) => p.id === trx.product_id
        );

        return {
          id: trx.id,
          amount: trx.amount || 0,
          status: trx.status || "pending",
          created_at: trx.created_at,
          member_id: trx.member_id,
          product_id: trx.product_id,

          user_name: user?.name || "Member DAN",
          user_phone: user?.phone || "-",
          user_city: member?.city || "Indonesia",

          product_name: product?.name || "Paket Data",
        };
      });

      setTransactions(merged);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  }

  useEffect(() => {
    fetchTransactions();
  }, []);

  /*
  ==========================================
  APPROVE
  ==========================================
  */

  async function approveTransaction(id: string) {
    try {
      setProcessingId(id);

      const { error } = await supabase
        .from("transactions")
        .update({
          status: "approved",
        })
        .eq("id", id);

      if (error) {
        console.error(error);
        return;
      }

      await fetchTransactions();
    } catch (err) {
      console.error(err);
    }

    setProcessingId(null);
  }

  /*
  ==========================================
  REJECT
  ==========================================
  */

  async function rejectTransaction(id: string) {
    try {
      setProcessingId(id);

      const { error } = await supabase
        .from("transactions")
        .update({
          status: "rejected",
        })
        .eq("id", id);

      if (error) {
        console.error(error);
        return;
      }

      await fetchTransactions();
    } catch (err) {
      console.error(err);
    }

    setProcessingId(null);
  }

  /*
  ==========================================
  FORMAT RUPIAH
  ==========================================
  */

  function formatRupiah(amount: number) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  }

  /*
  ==========================================
  FORMAT DATE
  ==========================================
  */

  function formatDate(date: string) {
    return new Date(date).toLocaleString("id-ID");
  }

  /*
  ==========================================
  PENDING COUNT
  ==========================================
  */

  const pendingCount = transactions.filter(
    (item) => item.status === "pending"
  ).length;

  return (
    <div className="min-h-screen bg-black text-white px-4 py-6">
      <div className="max-w-md mx-auto">
        <div className="bg-green-500/10 border border-green-500/30 rounded-3xl p-5 mb-6">
          <div className="flex items-center gap-3">
            <Wallet className="w-8 h-8 text-green-400" />

            <div>
              <h1 className="text-3xl font-bold text-green-400">
                {pendingCount} Pending
              </h1>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <LoaderCircle className="w-10 h-10 animate-spin text-green-400" />
          </div>
        ) : transactions.length === 0 ? (
          <div className="text-center text-zinc-400 py-20">
            Tidak ada transaksi
          </div>
        ) : (
          <div className="space-y-6">
            {transactions.map((item) => (
              <div
                key={item.id}
                className="bg-zinc-950 border border-zinc-800 rounded-[32px] p-6 shadow-2xl"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-4xl font-black leading-none">
                    {item.user_name}
                  </h2>

                  <div
                    className={`px-5 py-2 rounded-full text-sm font-bold uppercase tracking-[3px]
                    ${
                      item.status === "approved"
                        ? "bg-green-500/20 text-green-400"
                        : item.status === "rejected"
                        ? "bg-red-500/20 text-red-400"
                        : "bg-yellow-500/20 text-yellow-400"
                    }`}
                  >
                    {item.status}
                  </div>
                </div>

                <div className="space-y-4 text-zinc-300">
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5" />
                    <span>{item.user_city}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Wallet className="w-5 h-5" />
                    <span>{formatRupiah(item.amount)}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock3 className="w-5 h-5" />
                    <span>{formatDate(item.created_at)}</span>
                  </div>

                  <div className="pt-3 text-2xl text-white font-semibold">
                    {item.product_name}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-8">
                  <button
                    onClick={() => approveTransaction(item.id)}
                    disabled={processingId === item.id}
                    className="bg-green-600 active:scale-95 transition rounded-3xl h-20 font-bold text-2xl flex items-center justify-center gap-3"
                  >
                    <ShieldCheck className="w-7 h-7" />

                    {processingId === item.id ? "..." : "Approve"}
                  </button>

                  <button
                    onClick={() => rejectTransaction(item.id)}
                    disabled={processingId === item.id}
                    className="bg-red-600 active:scale-95 transition rounded-3xl h-20 font-bold text-2xl flex items-center justify-center gap-3"
                  >
                    <XCircle className="w-7 h-7" />

                    {processingId === item.id ? "..." : "Reject"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
