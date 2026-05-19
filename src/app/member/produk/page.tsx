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
    <div className="min-h-screen bg-black text-white overflow-hidden">

      {/* BACKGROUND */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,255,100,0.10),transparent_35%)] pointer-events-none"></div>

      <div className="relative max-w-6xl mx-auto p-5 pb-40">

        {/* HEADER */}
        <div className="flex items-start justify-between gap-4">

          <div>

            <p className="text-zinc-500 text-sm tracking-[0.2em] uppercase">
              Digital Affiliate Network
            </p>

            <h1 className="text-5xl font-black mt-2 tracking-tight">
              Produk Digital
            </h1>

            <p className="text-zinc-400 mt-4 max-w-md leading-relaxed">
              Pilih produk paket data digital terbaik dan mulai transaksi langsung dari aplikasi DAN.
            </p>

          </div>

          <div className="rounded-[30px] border border-zinc-800 bg-white/[0.03] backdrop-blur-xl px-5 py-4 min-w-[150px]">

            <p className="text-zinc-500 text-sm">
              Saldo
            </p>

            <h2 className="text-3xl font-black text-green-400 mt-2">
              Rp{" "}
              {Number(
                member?.balance || 0
              ).toLocaleString("id-ID")}
            </h2>

          </div>

        </div>

        {/* PRODUCTS */}
        <div className="space-y-5 mt-10">

          {products.map((item) => (

            <div
              key={item.id}
              className={`relative overflow-hidden rounded-[36px] border p-6 transition-all duration-300 backdrop-blur-xl ${
                selectedProduct?.id ===
                item.id
                  ? "border-green-500 bg-green-500/5 shadow-[0_0_40px_rgba(0,255,100,0.15)]"
                  : "border-zinc-800 bg-white/[0.03]"
              }`}
            >

              {/* GLOW */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-green-500/10 blur-3xl rounded-full"></div>

              <div className="relative z-10">

                {/* TOP */}
                <div className="flex items-start justify-between gap-4">

                  <div>

                    <div className="flex items-center gap-3 flex-wrap">

                      <h2 className="text-3xl font-black">
                        {item.name}
                      </h2>

                      {item.is_activation && (

                        <div className="bg-green-500 text-black text-xs font-black px-4 py-2 rounded-full shadow-[0_0_20px_rgba(0,255,100,0.4)]">
                          AKTIVASI
                        </div>

                      )}

                    </div>

                    <p className="text-zinc-500 mt-3 text-lg">
                      {item.provider}
                    </p>

                  </div>

                </div>

                {/* INFO */}
                <div className="grid grid-cols-2 gap-4 mt-7">

                  <div className="rounded-[28px] bg-black/30 border border-zinc-800 p-5">

                    <p className="text-zinc-500 text-sm">
                      Kuota
                    </p>

                    <h3 className="text-2xl font-black mt-3">
                      {item.kuota}
                    </h3>

                  </div>

                  <div className="rounded-[28px] bg-black/30 border border-zinc-800 p-5">

                    <p className="text-zinc-500 text-sm">
                      Masa Aktif
                    </p>

                    <h3 className="text-2xl font-black mt-3">
                      {item.masa_aktif}
                    </h3>

                  </div>

                </div>

                {/* PRICE */}
                <div className="mt-7 flex items-center justify-between gap-4 flex-wrap">

                  <div>

                    <p className="text-zinc-500 text-sm">
                      Harga
                    </p>

                    <h3 className="text-4xl font-black text-green-400 mt-2 tracking-tight">
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
                    className={`px-7 py-4 rounded-[24px] font-black text-lg transition ${
                      selectedProduct?.id ===
                      item.id
                        ? "bg-green-500 text-black shadow-[0_0_30px_rgba(0,255,100,0.4)]"
                        : "bg-zinc-900 border border-zinc-700 hover:border-green-500"
                    }`}
                  >
                    {selectedProduct?.id ===
                    item.id
                      ? "Dipilih"
                      : "Pilih"}
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

      {/* BOTTOM CHECKOUT */}
      {selectedProduct && (

        <div className="fixed bottom-0 left-0 right-0 z-50">

          <div className="absolute inset-0 bg-black/80 backdrop-blur-2xl"></div>

          <div className="relative border-t border-zinc-800 p-5">

            <div className="max-w-6xl mx-auto">

              <div className="flex items-center justify-between gap-4 mb-5">

                <div>

                  <p className="text-zinc-500 text-sm">
                    Produk Dipilih
                  </p>

                  <h2 className="text-3xl font-black mt-2">
                    {selectedProduct.name}
                  </h2>

                </div>

                <div className="text-right">

                  <p className="text-zinc-500 text-sm">
                    Total
                  </p>

                  <h2 className="text-3xl font-black text-green-400 mt-2">
                    Rp{" "}
                    {Number(
                      selectedProduct.price
                    ).toLocaleString("id-ID")}
                  </h2>

                </div>

              </div>

              <input
                type="text"
                placeholder="Masukkan nomor tujuan"
                value={nomorTujuan}
                onChange={(e) =>
                  setNomorTujuan(
                    e.target.value
                  )
                }
                className="w-full h-16 bg-zinc-900/80 border border-zinc-800 rounded-[24px] px-5 outline-none focus:border-green-500 transition"
              />

              <select
                value={paymentMethod}
                onChange={(e) =>
                  setPaymentMethod(
                    e.target.value
                  )
                }
                className="w-full h-16 bg-zinc-900/80 border border-zinc-800 rounded-[24px] px-5 mt-4 outline-none focus:border-green-500 transition"
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
                className="w-full h-16 mt-5 rounded-[24px] bg-gradient-to-r from-green-500 to-lime-400 text-black text-xl font-black shadow-[0_0_40px_rgba(0,255,100,0.35)] hover:scale-[1.01] transition"
              >
                {buyLoading
                  ? "Memproses..."
                  : "Beli Sekarang"}
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}
