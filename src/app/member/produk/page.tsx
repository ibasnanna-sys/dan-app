"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

import {
  Sparkles,
  ShieldCheck,
  ShoppingBag,
  CreditCard,
  Zap,
  CalendarDays,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

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

      alert("Pilih produk terlebih dahulu");
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
          city:
            member.city,
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

        <div className="flex flex-col items-center">

          <div className="w-14 h-14 rounded-full border-4 border-zinc-700 border-t-green-400 animate-spin"></div>

          <p className="text-zinc-400 mt-5">
            Memuat produk digital...
          </p>

        </div>

      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">

      {/* BACKGROUND */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,255,120,0.10),transparent_35%)] pointer-events-none"></div>

      <div className="fixed top-0 right-0 w-[400px] h-[400px] bg-green-500/10 blur-[140px] rounded-full pointer-events-none"></div>

      <div className="fixed bottom-0 left-0 w-[300px] h-[300px] bg-yellow-500/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="relative max-w-6xl mx-auto px-5 py-6 md:px-8 pb-44">

        {/* HERO */}
        <div className="relative overflow-hidden rounded-[40px] border border-zinc-800 bg-white/[0.03] backdrop-blur-2xl p-7 md:p-10">

          <div className="absolute top-0 right-0 w-72 h-72 bg-green-500/10 blur-[140px] rounded-full"></div>

          <div className="relative z-10">

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20">

              <Sparkles
                size={16}
                className="text-green-400"
              />

              <span className="text-green-400 text-xs font-black tracking-[0.2em] uppercase">
                Produk Digital DAN
              </span>

            </div>

            <h1 className="text-5xl md:text-7xl font-black leading-tight tracking-tight mt-6">

              Paket Data
              <br />
              Premium

            </h1>

            <p className="text-zinc-400 text-base md:text-lg leading-relaxed max-w-2xl mt-6">

              Belanja paket data digital langsung dari dashboard premium DAN.
              Setiap transaksi dapat mengaktifkan akun member dan membuka seluruh fitur affiliate modern.

            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">

              <div className="rounded-[28px] border border-zinc-800 bg-black/30 p-5">

                <p className="text-zinc-500 text-sm">
                  Status Member
                </p>

                <h2 className="text-2xl font-black text-yellow-400 mt-3 uppercase">
                  {member?.status || "free"}
                </h2>

              </div>

              <div className="rounded-[28px] border border-zinc-800 bg-black/30 p-5">

                <p className="text-zinc-500 text-sm">
                  Saldo
                </p>

                <h2 className="text-2xl font-black text-green-400 mt-3">
                  Rp{" "}
                  {Number(
                    member?.balance || 0
                  ).toLocaleString("id-ID")}
                </h2>

              </div>

              <div className="rounded-[28px] border border-zinc-800 bg-black/30 p-5">

                <p className="text-zinc-500 text-sm">
                  Produk Aktif
                </p>

                <h2 className="text-2xl font-black mt-3">
                  {products.length}
                </h2>

              </div>

            </div>

          </div>

        </div>

        {/* INFO ACTIVATION */}
        <div className="relative overflow-hidden mt-8 rounded-[36px] border border-yellow-500/20 bg-yellow-500/10 p-6 md:p-7 shadow-[0_0_40px_rgba(250,204,21,0.10)]">

          <div className="absolute top-0 right-0 w-56 h-56 bg-yellow-400/10 blur-[120px] rounded-full"></div>

          <div className="relative z-10">

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20">

              <ShieldCheck
                size={16}
                className="text-yellow-400"
              />

              <span className="text-yellow-400 text-xs font-black tracking-[0.2em] uppercase">
                Aktivasi Otomatis
              </span>

            </div>

            <h2 className="text-3xl md:text-4xl font-black leading-tight mt-5 max-w-4xl">

              Member FREE akan otomatis menjadi MEMBER AKTIF setelah transaksi berhasil diproses admin.

            </h2>

            <p className="text-yellow-100/70 leading-relaxed mt-5 max-w-3xl">

              Tidak ada lagi produk aktivasi khusus.
              Sistem DAN sekarang menggunakan transaksi produk digital pertama sebagai aktivasi akun otomatis.

            </p>

          </div>

        </div>

        {/* PRODUCT LIST */}
        <div className="space-y-6 mt-10">

          {products.map((item) => (

            <div
              key={item.id}
              className={`relative overflow-hidden rounded-[38px] border transition-all duration-300 backdrop-blur-xl p-6 md:p-8 ${
                selectedProduct?.id === item.id
                  ? "border-green-500 bg-green-500/5 shadow-[0_0_50px_rgba(0,255,120,0.18)]"
                  : "border-zinc-800 bg-white/[0.03]"
              }`}
            >

              {/* GLOW */}
              <div className="absolute top-0 right-0 w-60 h-60 bg-green-500/10 blur-[120px] rounded-full"></div>

              <div className="relative z-10">

                {/* TOP */}
                <div className="flex items-start justify-between gap-6 flex-wrap">

                  <div>

                    <div className="flex items-center gap-3 flex-wrap">

                      <h2 className="text-4xl font-black tracking-tight">
                        {item.name}
                      </h2>

                      {member?.status === "free" && (

                        <div className="inline-flex items-center gap-2 bg-green-500 text-black text-xs font-black px-4 py-2 rounded-full shadow-[0_0_25px_rgba(0,255,120,0.35)]">

                          <Sparkles size={14} />

                          PRODUK AKTIVASI

                        </div>

                      )}

                    </div>

                    <p className="text-zinc-500 mt-4 text-lg">
                      Provider {item.provider}
                    </p>

                  </div>

                  <div className="text-right">

                    <p className="text-zinc-500 text-sm">
                      Harga
                    </p>

                    <h2 className="text-4xl md:text-5xl font-black text-green-400 mt-2 tracking-tight">

                      Rp{" "}
                      {Number(
                        item.price
                      ).toLocaleString("id-ID")}

                    </h2>

                  </div>

                </div>

                {/* DETAIL */}
                <div className="grid grid-cols-2 gap-4 mt-8">

                  <div className="rounded-[28px] border border-zinc-800 bg-black/40 p-5">

                    <div className="flex items-center gap-2 text-zinc-500 text-sm">

                      <Zap size={15} />

                      Kuota

                    </div>

                    <h3 className="text-3xl font-black mt-4">
                      {item.kuota}
                    </h3>

                  </div>

                  <div className="rounded-[28px] border border-zinc-800 bg-black/40 p-5">

                    <div className="flex items-center gap-2 text-zinc-500 text-sm">

                      <CalendarDays size={15} />

                      Masa Aktif

                    </div>

                    <h3 className="text-3xl font-black mt-4">
                      {item.masa_aktif}
                    </h3>

                  </div>

                </div>

                {/* BUTTON */}
                <button
                  onClick={() =>
                    setSelectedProduct(item)
                  }
                  className={`w-full h-16 mt-8 rounded-[26px] font-black text-lg transition-all duration-300 flex items-center justify-center gap-3 ${
                    selectedProduct?.id === item.id
                      ? "bg-green-500 text-black shadow-[0_0_35px_rgba(0,255,120,0.35)]"
                      : "bg-zinc-900 border border-zinc-700 hover:border-green-500"
                  }`}
                >

                  {selectedProduct?.id === item.id ? (
                    <>
                      <CheckCircle2 size={22} />
                      Produk Dipilih
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={22} />
                      Pilih Produk
                    </>
                  )}

                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

      {/* CHECKOUT */}
      {selectedProduct && (

        <div className="fixed bottom-0 left-0 right-0 z-50">

          <div className="absolute inset-0 bg-black/85 backdrop-blur-2xl"></div>

          <div className="relative border-t border-zinc-800 p-5">

            <div className="max-w-6xl mx-auto">

              <div className="flex items-center justify-between gap-5 flex-wrap">

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
                    Total Pembayaran
                  </p>

                  <h2 className="text-4xl font-black text-green-400 mt-2">

                    Rp{" "}
                    {Number(
                      selectedProduct.price
                    ).toLocaleString("id-ID")}

                  </h2>

                </div>

              </div>

              <div className="space-y-4 mt-6">

                <input
                  type="text"
                  placeholder="Masukkan nomor tujuan"
                  value={nomorTujuan}
                  onChange={(e) =>
                    setNomorTujuan(
                      e.target.value
                    )
                  }
                  className="w-full h-16 rounded-[24px] border border-zinc-800 bg-zinc-900/80 px-5 outline-none focus:border-green-500 transition"
                />

                <select
                  value={paymentMethod}
                  onChange={(e) =>
                    setPaymentMethod(
                      e.target.value
                    )
                  }
                  className="w-full h-16 rounded-[24px] border border-zinc-800 bg-zinc-900/80 px-5 outline-none focus:border-green-500 transition"
                >

                  <option value="saldo">
                    Bayar dengan Saldo
                  </option>

                  <option value="transfer manual">
                    Transfer Manual
                  </option>

                </select>

                <button
                  onClick={handleBuy}
                  disabled={buyLoading}
                  className="w-full h-16 rounded-[24px] bg-gradient-to-r from-green-500 to-lime-400 text-black text-xl font-black shadow-[0_0_45px_rgba(0,255,120,0.30)] hover:scale-[1.01] transition-all duration-300 flex items-center justify-center gap-3"
                >

                  {buyLoading ? (
                    "Memproses..."
                  ) : (
                    <>
                      <CreditCard size={22} />
                      Beli Sekarang
                      <ArrowRight size={20} />
                    </>
                  )}

                </button>

              </div>

            </div>

          </div>

        </div>

      )}

    </main>
  );
}
