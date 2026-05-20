"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminPaymentPage() {

  const [payments, setPayments] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [form, setForm] =
    useState({
      name: "",
      type: "ewallet",
      account_name: "",
      account_number: "",
      logo: "",
    });

  useEffect(() => {

    loadPayments();

  }, []);

  async function loadPayments() {

    const { data } =
      await supabase
        .from("payment_methods")
        .select("*")
        .order("created_at", {
          ascending: false,
        });

    setPayments(data || []);

    setLoading(false);
  }

  async function createPayment() {

    if (
      !form.name ||
      !form.account_name ||
      !form.account_number
    ) {

      alert("Lengkapi data");

      return;
    }

    setSaving(true);

    const { error } =
      await supabase
        .from("payment_methods")
        .insert([
          {
            ...form,
            is_active: true,
          },
        ]);

    if (error) {

      alert(error.message);

      setSaving(false);

      return;
    }

    setForm({
      name: "",
      type: "ewallet",
      account_name: "",
      account_number: "",
      logo: "",
    });

    loadPayments();

    setSaving(false);

    alert("Metode pembayaran berhasil ditambahkan");
  }

  async function toggleStatus(
    id: string,
    status: boolean
  ) {

    await supabase
      .from("payment_methods")
      .update({
        is_active: !status,
      })
      .eq("id", id);

    loadPayments();
  }

  async function deletePayment(
    id: string
  ) {

    const confirmDelete =
      confirm(
        "Hapus metode pembayaran?"
      );

    if (!confirmDelete) return;

    await supabase
      .from("payment_methods")
      .delete()
      .eq("id", id);

    loadPayments();
  }

  if (loading) {

    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">

      {/* BACKGROUND */}
      <div className="fixed inset-0">

        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-green-500/10 blur-[140px]" />

        <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-green-400/10 blur-[140px]" />

      </div>

      <div className="relative z-10 max-w-md mx-auto px-5 py-6 pb-32">

        {/* HEADER */}
        <div className="mb-10">

          <p className="text-green-500 text-sm tracking-[5px] uppercase mb-3">
            Admin Payment
          </p>

          <h1 className="text-5xl font-black leading-none">
            Kelola Pembayaran
          </h1>

          <p className="text-zinc-500 text-lg mt-5 leading-relaxed">
            Atur rekening bank,
            e-wallet, dan QRIS
            agar member dapat
            melakukan pembayaran
            secara realtime.
          </p>

        </div>

        {/* NAVIGATION */}
        <div className="grid grid-cols-2 gap-4 mb-8">

          <Link
            href="/admin"
            className="h-16 rounded-3xl border border-zinc-800 bg-zinc-900 flex items-center justify-center font-bold"
          >
            Dashboard
          </Link>

          <Link
            href="/admin/products"
            className="h-16 rounded-3xl border border-zinc-800 bg-zinc-900 flex items-center justify-center font-bold"
          >
            Produk
          </Link>

        </div>

        {/* FORM */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-[35px] p-6 mb-8">

          <h2 className="text-3xl font-black mb-6">
            Tambah Pembayaran
          </h2>

          <div className="space-y-4">

            <input
              type="text"
              placeholder="Nama Pembayaran"
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
              className="w-full h-16 rounded-2xl bg-black border border-zinc-800 px-5 outline-none"
            />

            <select
              value={form.type}
              onChange={(e) =>
                setForm({
                  ...form,
                  type: e.target.value,
                })
              }
              className="w-full h-16 rounded-2xl bg-black border border-zinc-800 px-5 outline-none"
            >

              <option value="ewallet">
                E-Wallet
              </option>

              <option value="bank">
                Bank
              </option>

              <option value="qris">
                QRIS
              </option>

            </select>

            <input
              type="text"
              placeholder="Nama Pemilik"
              value={form.account_name}
              onChange={(e) =>
                setForm({
                  ...form,
                  account_name:
                    e.target.value,
                })
              }
              className="w-full h-16 rounded-2xl bg-black border border-zinc-800 px-5 outline-none"
            />

            <input
              type="text"
              placeholder="Nomor Rekening / Nomor E-Wallet"
              value={form.account_number}
              onChange={(e) =>
                setForm({
                  ...form,
                  account_number:
                    e.target.value,
                })
              }
              className="w-full h-16 rounded-2xl bg-black border border-zinc-800 px-5 outline-none"
            />

            <input
              type="text"
              placeholder="Logo URL (opsional)"
              value={form.logo}
              onChange={(e) =>
                setForm({
                  ...form,
                  logo: e.target.value,
                })
              }
              className="w-full h-16 rounded-2xl bg-black border border-zinc-800 px-5 outline-none"
            />

            <button
              onClick={createPayment}
              disabled={saving}
              className="w-full h-16 rounded-3xl bg-green-500 text-black font-black text-xl mt-4"
            >
              {saving
                ? "Menyimpan..."
                : "Tambah Pembayaran"}
            </button>

          </div>

        </div>

        {/* LIST */}
        <div className="space-y-5">

          {payments.map((item) => (

            <div
              key={item.id}
              className="bg-zinc-950 border border-zinc-800 rounded-[35px] p-6"
            >

              <div className="flex items-start justify-between">

                <div>

                  <div className="flex items-center gap-3">

                    <h2 className="text-3xl font-black">
                      {item.name}
                    </h2>

                    <div
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        item.is_active
                          ? "bg-green-500/20 text-green-400 border border-green-500/30"
                          : "bg-red-500/20 text-red-400 border border-red-500/30"
                      }`}
                    >
                      {item.is_active
                        ? "ACTIVE"
                        : "OFF"}
                    </div>

                  </div>

                  <p className="text-zinc-500 mt-2 uppercase">
                    {item.type}
                  </p>

                </div>

              </div>

              <div className="mt-8 space-y-5">

                <div>

                  <p className="text-zinc-500 text-sm mb-2">
                    Nama Pemilik
                  </p>

                  <h3 className="text-2xl font-bold">
                    {item.account_name}
                  </h3>

                </div>

                <div>

                  <p className="text-zinc-500 text-sm mb-2">
                    Nomor
                  </p>

                  <h3 className="text-2xl font-bold break-all">
                    {item.account_number}
                  </h3>

                </div>

              </div>

              <div className="grid grid-cols-2 gap-4 mt-8">

                <button
                  onClick={() =>
                    toggleStatus(
                      item.id,
                      item.is_active
                    )
                  }
                  className={`h-14 rounded-2xl font-bold ${
                    item.is_active
                      ? "bg-red-500 text-white"
                      : "bg-green-500 text-black"
                  }`}
                >
                  {item.is_active
                    ? "Nonaktifkan"
                    : "Aktifkan"}
                </button>

                <button
                  onClick={() =>
                    deletePayment(
                      item.id
                    )
                  }
                  className="h-14 rounded-2xl bg-zinc-800 font-bold"
                >
                  Hapus
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}
