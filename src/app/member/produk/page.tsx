"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ProdukPage() {

  const [products, setProducts] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [selectedProduct, setSelectedProduct] =
    useState<any>(null);

  const [nomorTujuan, setNomorTujuan] =
    useState("");

  const [paymentMethod, setPaymentMethod] =
    useState("saldo");

  const [member, setMember] =
    useState<any>(null);

  const [buyLoading, setBuyLoading] =
    useState(false);

  useEffect(() => {
    loadMember();
    loadProducts();
  }, []);

  async function loadMember() {

    const memberId =
      localStorage.getItem("member_id");

    if (!memberId) {

      window.location.href =
        "/login";

      return;
    }

    const { data } =
      await supabase
        .from("members")
        .select("*")
        .eq("id", memberId)
        .single();

    setMember(data);
  }

  async function loadProducts() {

    const { data, error } =
      await supabase
        .from("products")
        .select("*")
        .eq("status", true)
        .order("price", {
          ascending: true,
        });

    if (!error && data) {

      setProducts(data);
    }

    setLoading(false);
  }

  async function handleBuy() {

    if (!selectedProduct) {

      alert("Pilih produk");
      return;
    }

    if (!nomorTujuan) {

      alert("Masukkan nomor tujuan");
      return;
    }

    if (!member) {

      alert("Member tidak ditemukan");
      return;
    }

    setBuyLoading(true);

    const { error } =
      await supabase
        .from("transactions")
        .insert([
          {
            member_id: member.id,
            product_id:
              selectedProduct.id,
            nomor_tujuan:
              nomorTujuan,
            amount:
              selectedProduct.price,
            payment_method:
              paymentMethod,
            status: "proses",
          },
        ]);

    if (error) {

      alert(error.message);

      setBuyLoading(false);

      return;
    }

    await supabase
      .from("activity_logs")
      .insert([
        {
          member_name:
            member.name,
          city: member.city,
          activity:
            "Membeli " +
            selectedProduct.name,
        },
      ]);

    alert(
      "Transaksi berhasil dibuat"
    );

    setSelectedProduct(null);

    setNomorTujuan("");

    setPaymentMethod("saldo");

    setBuyLoading(false);
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
            PRODUK
          </h1>

        </div>

        <div className="text-right">

          <p className="text-zinc-500 text-sm">
            Saldo
          </p>

          <h2 className="text-2xl font-black text-green-500">
            Rp{" "}
            {Number(
              member?.balance || 0
            ).toLocaleString("id-ID")}
          </h2>

        </div>

      </div>

      <div className="space-y-4 mt-8">

        {products.map((item) => (

          <div
            key={item.id}
            className={`border rounded-3xl p-5 transition ${
              selectedProduct?.id ===
              item.id
                ? "border-green-500 bg-zinc-900"
                : "border-zinc-800 bg-zinc-950"
            }`}
          >

            <div className="flex items-start justify-between">

              <div>

                <h2 className="text-2xl font-black">
                  {item.name}
                </h2>

                <p className="text-zinc-500 mt-1">
                  {item.provider}
                </p>

              </div>

              {item.is_activation && (

                <div className="bg-green-500 text-black text-xs font-bold px-3 py-1 rounded-full">
                  AKTIVASI
                </div>

              )}

            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">

              <div>

                <p className="text-zinc-500 text-sm">
                  Kuota
                </p>

                <h3 className="text-xl font-bold mt-1">
                  {item.kuota}
                </h3>

              </div>

              <div>

                <p className="text-zinc-500 text-sm">
                  Masa Aktif
                </p>

                <h3 className="text-xl font-bold mt-1">
                  {item.masa_aktif}
                </h3>

              </div>

            </div>

            <div className="mt-6 flex items-center justify-between">

              <div>

                <p className="text-zinc-500 text-sm">
                  Harga
                </p>

                <h3 className="text-3xl font-black text-green-500 mt-1">
                  Rp{" "}
                  {Number(
                    item.price
                  ).toLocaleString("id-ID")}
                </h3>

              </div>

              <button
                onClick={() =>
                  setSelectedProduct(
                    item
                  )
                }
                className="bg-green-600 px-6 py-3 rounded-2xl font-bold"
              >
                Pilih
              </button>

            </div>

          </div>

        ))}

      </div>

      {selectedProduct && (

        <div className="fixed bottom-0 left-0 right-0 bg-zinc-950 border-t border-zinc-800 p-5">

          <h2 className="text-2xl font-black">
            {selectedProduct.name}
          </h2>

          <input
            type="text"
            placeholder="Nomor Tujuan"
            value={nomorTujuan}
            onChange={(e) =>
              setNomorTujuan(
                e.target.value
              )
            }
            className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-5 py-4 mt-5 outline-none"
          />

          <select
            value={paymentMethod}
            onChange={(e) =>
              setPaymentMethod(
                e.target.value
              )
            }
            className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-5 py-4 mt-4 outline-none"
          >

            <option value="saldo">
              Saldo
            </option>

            <option value="transfer manual">
              Transfer Manual
            </option>

          </select>

          <button
            onClick={handleBuy}
            disabled={buyLoading}
            className="w-full bg-green-600 rounded-2xl py-4 font-black text-lg mt-5"
          >
            {buyLoading
              ? "Memproses..."
              : "Beli Sekarang"}
          </button>

        </div>

      )}

    </div>
  );
}
