"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function TransaksiPage() {

  const [transactions, setTransactions] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    loadTransactions();

  }, []);

  async function loadTransactions() {

    try {

      const memberId =
        localStorage.getItem("member_id");

      if (!memberId) {

        window.location.href =
          "/login";

        return;
      }

      const { data, error } =
        await supabase
          .from("transactions")
          .select(`
            *,
            products (
              name,
              provider,
              kuota,
              masa_aktif
            )
          `)
          .eq("member_id", memberId)
          .order("created_at", {
            ascending: false,
          });

      if (error) {

        alert(error.message);

        return;
      }

      setTransactions(data || []);

    } catch (err: any) {

      alert(err.message);

    }

    setLoading(false);
  }

  function statusStyle(status: string) {

    if (status === "selesai") {

      return {
        text: "text-green-400",
        bg: "bg-green-500/10",
        border: "border-green-500/20",
        shadow:
          "shadow-[0_0_30px_rgba(0,255,100,0.15)]",
      };
    }

    if (status === "gagal") {

      return {
        text: "text-red-400",
        bg: "bg-red-500/10",
        border: "border-red-500/20",
        shadow:
          "shadow-[0_0_30px_rgba(255,0,0,0.15)]",
      };
    }

    return {
      text: "text-yellow-300",
      bg: "bg-yellow-500/10",
      border: "border-yellow-500/20",
      shadow:
        "shadow-[0_0_30px_rgba(255,215,0,0.12)]",
    };
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
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,255,100,0.10),transparent_35%)] pointer-events-none"></div>

      <div className="relative max-w-6xl mx-auto p-5 pb-32">

        {/* HEADER */}
        <div className="flex items-start justify-between gap-4 flex-wrap">

          <div>

            <p className="text-zinc-500 text-sm tracking-[0.2em] uppercase">
              Digital Affiliate Network
            </p>

            <h1 className="text-5xl font-black mt-2 tracking-tight">
              Transaksi
            </h1>

            <p className="text-zinc-400 mt-4 max-w-md leading-relaxed">
              Riwayat seluruh transaksi produk digital dan aktivitas pembelian member DAN.
            </p>

          </div>

          <div className="inline-flex items-center gap-3 px-5 py-4 rounded-full bg-green-500/10 border border-green-500/20 shadow-[0_0_30px_rgba(0,255,100,0.15)]">

            <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>

            <span className="text-green-400 font-black tracking-wide">
              LIVE TRANSACTION
            </span>

          </div>

        </div>

        {/* EMPTY */}
        {transactions.length === 0 && (

          <div className="relative overflow-hidden rounded-[36px] border border-zinc-800 bg-white/[0.03] backdrop-blur-xl p-12 mt-10 text-center">

            <div className="absolute top-0 right-0 w-40 h-40 bg-green-500/10 blur-3xl rounded-full"></div>

            <div className="relative z-10">

              <h2 className="text-4xl font-black">
                Belum Ada Transaksi
              </h2>

              <p className="text-zinc-500 text-lg mt-5 leading-relaxed">
                Mulai belanja produk digital DAN dan seluruh riwayat transaksi akan tampil di halaman ini.
              </p>

            </div>

          </div>

        )}

        {/* LIST */}
        <div className="space-y-5 mt-10">

          {transactions.map((item) => {

            const style =
              statusStyle(item.status);

            return (

              <div
                key={item.id}
                className="relative overflow-hidden rounded-[36px] border border-zinc-800 bg-white/[0.03] backdrop-blur-xl p-6 shadow-[0_0_30px_rgba(255,255,255,0.02)]"
              >

                {/* GLOW */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-green-500/5 blur-3xl rounded-full"></div>

                <div className="relative z-10">

                  {/* TOP */}
                  <div className="flex items-start justify-between gap-4 flex-wrap">

                    <div>

                      <h2 className="text-3xl font-black">
                        {item.products?.name}
                      </h2>

                      <p className="text-zinc-500 text-lg mt-2">
                        {item.products?.provider}
                      </p>

                    </div>

                    <div
                      className={`inline-flex items-center gap-2 px-5 py-3 rounded-full border font-black uppercase tracking-wide ${style.text} ${style.bg} ${style.border} ${style.shadow}`}
                    >

                      <div
                        className={`w-3 h-3 rounded-full ${
                          item.status ===
                          "selesai"
                            ? "bg-green-400"
                            : item.status ===
                              "gagal"
                            ? "bg-red-400"
                            : "bg-yellow-300"
                        }`}
                      />

                      {item.status}

                    </div>

                  </div>

                  {/* INFO GRID */}
                  <div className="grid grid-cols-2 gap-4 mt-8">

                    <div className="rounded-[28px] bg-black/30 border border-zinc-800 p-5">

                      <p className="text-zinc-500 text-sm">
                        Nomor Tujuan
                      </p>

                      <h3 className="text-xl font-black mt-3 break-words">
                        {item.nomor_tujuan}
                      </h3>

                    </div>

                    <div className="rounded-[28px] bg-black/30 border border-zinc-800 p-5">

                      <p className="text-zinc-500 text-sm">
                        Pembayaran
                      </p>

                      <h3 className="text-xl font-black mt-3 capitalize">
                        {item.payment_method}
                      </h3>

                    </div>

                  </div>

                  {/* PRICE */}
                  <div className="grid grid-cols-2 gap-4 mt-4">

                    <div className="rounded-[28px] bg-black/30 border border-zinc-800 p-5">

                      <p className="text-zinc-500 text-sm">
                        Harga
                      </p>

                      <h3 className="text-3xl font-black text-green-400 mt-3">
                        Rp{" "}
                        {Number(
                          item.amount
                        ).toLocaleString("id-ID")}
                      </h3>

                    </div>

                    <div className="rounded-[28px] bg-black/30 border border-zinc-800 p-5">

                      <p className="text-zinc-500 text-sm">
                        Tanggal
                      </p>

                      <h3 className="text-xl font-black mt-3">
                        {new Date(
                          item.created_at
                        ).toLocaleDateString(
                          "id-ID"
                        )}
                      </h3>

                    </div>

                  </div>

                  {/* PRODUCT DETAIL */}
                  <div className="grid grid-cols-2 gap-4 mt-4">

                    <div className="rounded-[28px] bg-black/30 border border-zinc-800 p-5">

                      <p className="text-zinc-500 text-sm">
                        Kuota
                      </p>

                      <h3 className="text-xl font-black mt-3">
                        {item.products?.kuota}
                      </h3>

                    </div>

                    <div className="rounded-[28px] bg-black/30 border border-zinc-800 p-5">

                      <p className="text-zinc-500 text-sm">
                        Masa Aktif
                      </p>

                      <h3 className="text-xl font-black mt-3">
                        {item.products?.masa_aktif}
                      </h3>

                    </div>

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
