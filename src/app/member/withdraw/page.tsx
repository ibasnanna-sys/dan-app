"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { supabase } from "@/lib/supabase";

import {
  ArrowLeft,
  Wallet,
  Send,
  Clock3,
  CheckCircle2,
  XCircle,
} from "lucide-react";

type Withdraw = {
  id: string;
  amount: number;
  bank_name: string;
  account_name: string;
  account_number: string;
  status: "pending" | "approved" | "rejected";
  note?: string | null;
  created_at: string;
};

type Member = {
  id: string;
  name: string;
  city: string;
  balance: number;
};

export default function MemberWithdrawPage() {
  const [member, setMember] =
    useState<Member | null>(null);

  const [withdraws, setWithdraws] =
    useState<Withdraw[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [submitting, setSubmitting] =
    useState(false);

  const [amount, setAmount] =
    useState("");

  const [bankName, setBankName] =
    useState("");

  const [accountName, setAccountName] =
    useState("");

  const [accountNumber, setAccountNumber] =
    useState("");

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);

    const {
      data: authData,
    } = await supabase.auth.getUser();

    const user =
      authData?.user;

    if (!user) {
      setLoading(false);
      return;
    }

    const {
      data: memberData,
    } = await supabase
      .from("members")
      .select("*")
      .eq("id", user.id)
      .single();

    if (memberData) {
      setMember(memberData);
    }

    const {
      data: withdrawData,
    } = await supabase
      .from("withdraws")
      .select("*")
      .eq("member_id", user.id)
      .order("created_at", {
        ascending: false,
      });

    setWithdraws(
      (withdrawData ||
        []) as Withdraw[]
    );

    setLoading(false);
  }

  async function submitWithdraw() {
    if (!member) return;

    const nominal =
      Number(amount);

    if (!nominal || nominal <= 0) {
      alert("Nominal tidak valid");
      return;
    }

    if (nominal < 50000) {
      alert(
        "Minimal withdraw Rp 50.000"
      );
      return;
    }

    if (
      nominal >
      Number(member.balance || 0)
    ) {
      alert(
        "Saldo tidak mencukupi"
      );
      return;
    }

    if (
      !bankName ||
      !accountName ||
      !accountNumber
    ) {
      alert(
        "Lengkapi data rekening"
      );
      return;
    }

    setSubmitting(true);

    const { error } =
      await supabase
        .from("withdraws")
        .insert([
          {
            member_id:
              member.id,
            amount: nominal,
            bank_name:
              bankName,
            account_name:
              accountName,
            account_number:
              accountNumber,
            status: "pending",
          },
        ]);

    if (error) {
      alert(error.message);
      setSubmitting(false);
      return;
    }

    await supabase
      .from("activity_logs")
      .insert([
        {
          member_name:
            member.name,
          city:
            member.city,
          activity:
            "Mengajukan withdraw",
        },
      ]);

    alert(
      "Withdraw berhasil diajukan"
    );

    setAmount("");
    setBankName("");
    setAccountName("");
    setAccountNumber("");

    await loadData();

    setSubmitting(false);
  }

  const pendingTotal =
    useMemo(() => {
      return withdraws
        .filter(
          (w) =>
            w.status ===
            "pending"
        )
        .reduce(
          (
            total,
            item
          ) =>
            total +
            Number(
              item.amount || 0
            ),
          0
        );
    }, [withdraws]);

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

      <div className="relative max-w-4xl mx-auto px-4 sm:px-5 py-6 pb-32">

        {/* HEADER */}
        <div className="mb-8">

          <Link
            href="/member/dashboard"
            className="inline-flex items-center gap-2 h-12 px-5 rounded-2xl border border-zinc-800 bg-zinc-950 hover:border-green-500 transition-all text-sm font-bold mb-5"
          >

            <ArrowLeft size={18} />

            Kembali

          </Link>

          <h1 className="text-4xl md:text-6xl font-black leading-tight">
            Withdraw
            <span className="text-green-400">
              {" "}
              Balance
            </span>
          </h1>

          <p className="text-zinc-500 mt-4">
            Tarik saldo bonus langsung
            ke rekening bank.
          </p>

        </div>

        {/* SALDO */}
        <div className="rounded-[35px] border border-green-500/20 bg-green-500/10 p-6 mb-8">

          <div className="flex items-center gap-3 mb-5">

            <Wallet className="text-green-400" />

            <span className="font-black text-green-400 text-lg">
              Saldo Tersedia
            </span>

          </div>

          <h2 className="text-5xl font-black text-white break-words">
            Rp{" "}
            {Number(
              member?.balance || 0
            ).toLocaleString("id-ID")}
          </h2>

          <p className="text-zinc-400 mt-4">
            Pending withdraw:
            {" "}
            <span className="text-yellow-300 font-bold">
              Rp{" "}
              {pendingTotal.toLocaleString(
                "id-ID"
              )}
            </span>
          </p>

        </div>

        {/* FORM */}
        <div className="rounded-[35px] border border-zinc-800 bg-zinc-950 p-6 mb-8">

          <h2 className="text-2xl font-black mb-6">
            Ajukan Withdraw
          </h2>

          <div className="space-y-4">

            <input
              type="number"
              placeholder="Nominal withdraw"
              value={amount}
              onChange={(e) =>
                setAmount(
                  e.target.value
                )
              }
              className="w-full h-14 rounded-2xl bg-black border border-zinc-800 px-5 outline-none focus:border-green-500"
            />

            <input
              type="text"
              placeholder="Nama bank"
              value={bankName}
              onChange={(e) =>
                setBankName(
                  e.target.value
                )
              }
              className="w-full h-14 rounded-2xl bg-black border border-zinc-800 px-5 outline-none focus:border-green-500"
            />

            <input
              type="text"
              placeholder="Nama pemilik rekening"
              value={accountName}
              onChange={(e) =>
                setAccountName(
                  e.target.value
                )
              }
              className="w-full h-14 rounded-2xl bg-black border border-zinc-800 px-5 outline-none focus:border-green-500"
            />

            <input
              type="text"
              placeholder="Nomor rekening"
              value={accountNumber}
              onChange={(e) =>
                setAccountNumber(
                  e.target.value
                )
              }
              className="w-full h-14 rounded-2xl bg-black border border-zinc-800 px-5 outline-none focus:border-green-500"
            />

            <button
              onClick={
                submitWithdraw
              }
              disabled={submitting}
              className="w-full h-14 rounded-2xl bg-green-500 hover:bg-green-400 transition-all flex items-center justify-center gap-2 font-black text-black disabled:opacity-50"
            >

              <Send size={18} />

              {submitting
                ? "Mengirim..."
                : "Ajukan Withdraw"}

            </button>

          </div>

        </div>

        {/* HISTORY */}
        <div className="rounded-[35px] border border-zinc-800 bg-zinc-950 p-6">

          <h2 className="text-2xl font-black mb-6">
            History Withdraw
          </h2>

          {withdraws.length === 0 && (

            <div className="text-center py-10 text-zinc-500">
              Belum ada withdraw
            </div>

          )}

          <div className="space-y-4">

            {withdraws.map(
              (item) => (

                <div
                  key={item.id}
                  className="rounded-3xl border border-zinc-800 bg-black p-5"
                >

                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

                    <div>

                      <h3 className="text-2xl font-black text-white">
                        Rp{" "}
                        {Number(
                          item.amount
                        ).toLocaleString(
                          "id-ID"
                        )}
                      </h3>

                      <div className="flex items-center gap-2 text-zinc-500 mt-3 text-sm">

                        <Clock3 size={14} />

                        {new Date(
                          item.created_at
                        ).toLocaleString(
                          "id-ID"
                        )}

                      </div>

                      <p className="text-zinc-400 mt-3">
                        {item.bank_name}
                        {" • "}
                        {
                          item.account_number
                        }
                      </p>

                      {item.note && (

                        <p className="text-red-400 text-sm mt-3">
                          Catatan:
                          {" "}
                          {item.note}
                        </p>

                      )}

                    </div>

                    <div>

                      {item.status ===
                        "pending" && (

                        <div className="h-12 px-5 rounded-2xl bg-yellow-500/20 text-yellow-300 flex items-center gap-2 font-black">

                          <Clock3 size={18} />

                          Pending

                        </div>

                      )}

                      {item.status ===
                        "approved" && (

                        <div className="h-12 px-5 rounded-2xl bg-green-500/20 text-green-400 flex items-center gap-2 font-black">

                          <CheckCircle2 size={18} />

                          Approved

                        </div>

                      )}

                      {item.status ===
                        "rejected" && (

                        <div className="h-12 px-5 rounded-2xl bg-red-500/20 text-red-400 flex items-center gap-2 font-black">

                          <XCircle size={18} />

                          Rejected

                        </div>

                      )}

                    </div>

                  </div>

                </div>

              )
            )}

          </div>

        </div>

      </div>

    </main>
  );
}
