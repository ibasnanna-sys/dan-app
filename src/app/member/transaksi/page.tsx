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

  function statusColor(status: string) {

    if (status === "selesai") {

      return "text-green-500";
    }

    if (status === "gagal") {

      return "text-red-500";
    }

    return "text-yellow-500";
  }

  if (loading) {

    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-5 pb-32">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-zinc-500">
            DAN APP
          </p>

          <h1 className="text-5xl font-black mt-1">
            TRANSAKSI
          </h1>

        </div>

      </div>

      {transactions.length === 0 && (

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-10 mt-8 text-center">

          <p className="text-zinc-500 text-lg">
            Belum ada transaksi
          </p>

        </div>

      )}

      <div className="space-y-4 mt-8">

        {transactions.map((item) => (

          <div
            key={item.id}
            className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5"
          >

            <div className="flex items-start justify-between">

              <div>

                <h2 className="text-2xl font-black">
                  {item.products?.name}
                </h2>

                <p className="text-zinc-500 mt-1">
                  {item.products?.provider}
                </p>

              </div>

              <div
                className={`font-black text-lg capitalize ${statusColor(
                  item.status
                )}`}
              >
                {item.status}
              </div>

            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">

              <div>

                <p className="text-zinc-500 text-sm">
                  Nomor
                </p>

                <h3 className="text-lg font-bold mt-1">
                  {item.nomor_tujuan}
                </h3>

              </div>

              <div>

                <p className="text-zinc-500 text-sm">
                  Pembayaran
                </p>

                <h3 className="text-lg font-bold mt-1 capitalize">
                  {item.payment_method}
                </h3>

              </div>

            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">

              <div>

                <p className="text-zinc-500 text-sm">
                  Harga
                </p>

                <h3 className="text-2xl font-black text-green-500 mt-1">
                  Rp{" "}
                  {Number(
                    item.amount
                  ).toLocaleString("id-ID")}
                </h3>

              </div>

              <div>

                <p className="text-zinc-500 text-sm">
                  Tanggal
                </p>

                <h3 className="text-lg font-bold mt-1">
                  {new Date(
                    item.created_at
                  ).toLocaleDateString(
                    "id-ID"
                  )}
                </h3>

              </div>

            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">

              <div>

                <p className="text-zinc-500 text-sm">
                  Kuota
                </p>

                <h3 className="text-lg font-bold mt-1">
                  {item.products?.kuota}
                </h3>

              </div>

              <div>

                <p className="text-zinc-500 text-sm">
                  Masa Aktif
                </p>

                <h3 className="text-lg font-bold mt-1">
                  {item.products?.masa_aktif}
                </h3>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}
