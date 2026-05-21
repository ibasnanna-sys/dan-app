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
  status:
    | "pending"
    | "approved"
    | "rejected";
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
        (data ||
          []) as Withdraw[]
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

    if (
      !withdraw.members
    ) {

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

    /*
      UPDATE STATUS
    */

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

    /*
      POTONG SALDO
    */

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

    /*
      ACTIVITY LOG
    */

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
        <div className="flex flex-col xl
