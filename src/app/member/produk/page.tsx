"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import { supabase } from "@/lib/supabase";

import {
  ArrowLeft,
  Check,
  CreditCard,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Wallet,
  Zap,
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

    const { error: transactionError } =
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
            status: "success",
          },
        ]);

    if (transactionError) {

      alert(transactionError.message);

      setBuyLoading(false);

      return;

    }

    /*
      AKTIVASI MEMBER
    */

    if (
      selectedProduct.is_activation &&
      member.status !== "aktif"
    ) {

      await supabase
        .from("members")
        .update({
          status: "aktif",
        })
        .eq("id", member.id);

      /*
        BONUS SPONSOR
      */

      if (member.upline_id) {

        const bonusSponsor =
          selectedProduct.bonus_sponsor || 0;

        const {
          data: sponsor,
        } = await supabase
          .from("members")
          .select("balance")
          .eq(
            "id",
            member.upline_id
          )
          .single();

        if (sponsor) {

          await supabase
            .from("members")
            .update({
              balance:
                Number(
                  sponsor.balance || 0
                ) + bonusSponsor,
            })
            .eq(
              "id",
              member.upline_id
            );

        }

      }

    }

    /*
      ACTIVITY LOG
    */

    await supabase
      .from("activity_logs")
      .insert([
        {
          member_name:
            member.name,
          city: member.city,
          activity:
            selectedProduct.is_activation
              ? "Berhasil aktivasi member"
              : "Membeli " +
                selectedProduct.name,
        },
      ]);

    /*
      NOTIFICATION
    */

    await supabase
      .from("notifications")
      .insert([
        {
          member_id: member.id,
          title:
            selectedProduct.is_activation
              ? "Aktivasi Berhasil"
              : "Transaksi Berhasil",
          message:
            selectedProduct.is_activation
              ? "Selamat akunmu sudah aktif dan seluruh fitur premium DAN telah terbuka."
              : "Transaksi produk digital berhasil diproses.",
        },
      ]);

    alert(
      selectedProduct.is_activation
        ? "Aktivasi berhasil, akunmu sekarang aktif."
        : "Transaksi berhasil dibuat"
    );

    window.location.href =
      "/member/dashboard";

  }

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
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,255,100,0.10),transparent_35%)] pointer-events-none"></div>

      <div className="fixed bottom-0 left-0 w-72 h-72 bg-green-500/5 blur-3xl rounded-full pointer-events-none"></div>

      <div className="relative max-w-6xl mx-auto px-5 py-6 pb-44">

        {/* HEADER */}
        <div className="flex items-start justify-between gap-5 flex-wrap">

          <div>

            <Link
              href="/member/dashboard"
              className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition mb-6"
            >

              <ArrowLeft size={18} />

              Kembali

            </Link>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20">

              <ShoppingBag
                size={16}
                className="text-green-400"
              />

              <span className="text-green-400 text-sm font-black tracking-widest">
                PRODUK DIGITAL
              </span>

            </div>

            <h1 className="text-5xl md:text-6xl font-black tracking-tight mt-5">
              Paket Data
            </h1>

            <p className="text-zinc-400 mt-5 text-lg max-w-2xl leading-relaxed">
              Pilih paket data digital terbaik dan nikmati pengalaman transaksi modern langsung dari ekosistem premium DAN.
            </p>

          </div>

          <div className="rounded-[32px] border border-zinc-800 bg-white/[0.03] backdrop-blur-xl px-6 py-5 min-w-[220px]">

            <div className="flex items-center justify-between">

              <p className="text-zinc-500 text-sm">
                Saldo Member
              </p>

              <Wallet
                size={18}
                className="text-green-400"
              />

            </div>

            <h2 className="text-3xl font-black text-green-400 mt-4">
              Rp{" "}
              {Number(
                member?.balance || 0
              ).toLocaleString("id-ID")}
            </h2>

          </div>

        </div>

        {/* ACTIVATION INFO */}
        {member?.status !== "aktif" && (

          <div className="relative overflow-hidden mt-8 rounded-[36px] border border-yellow-500/20 bg-yellow-500/10 p-6 shadow-[0_0_40px_rgba(250,204,21,0.10)]">

            <div className="absolute top-0 right-0 w-52 h-52 bg-yellow-400/10 blur-[120px] rounded-full"></div>

            <div className="relative z-10">

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20">

                <Sparkles
                  size={16}
                  className="text-yellow-400"
                />

                <span className="text-yellow-400 text-sm font-black tracking-widest">
                  AKTIVASI MEMBER
                </span>

              </div>

              <h2 className="text-3xl md:text-4xl font-black leading-tight mt-5 max-w-3xl">
                Pilih produk aktivasi untuk membuka seluruh fitur premium DAN dan mulai membangun jaringan affiliate digital modern.
              </h2>

            </div>

          </div>

        )}

        {/* PRODUCT LIST */}
        <div className="space-y-6 mt-10">

          {products.map((item) => (

            <div
              key={item.id}
              className={`relative overflow-hidden rounded-[38px] border p-6 md:p-7 transition-all duration-300 ${
                selectedProduct?.id ===
                item.id
                  ? "border-green-500 bg-green-500/5 shadow-[0_0_40px_rgba(0,255,100,0.15)]"
                  : "border-zinc-800 bg-white/[0.03]"
              }`}
            >

              <div className="absolute top-0 right-0 w-44 h-44 bg-green-500/10 blur-3xl rounded-full"></div>

              <div className="relative z-10">

                {/* TOP */}
                <div className="flex items-start justify-between gap-5 flex-wrap">

                  <div>

                    <div className="flex items-center gap-3 flex-wrap">

                      <h2 className="text-3xl md:text-4xl font-black">
                        {item.name}
                      </h2>

                      {item.is_activation && (

                        <div className="inline-flex items-center gap-2 bg-green-500 text-black text-xs font-black px-4 py-2 rounded-full shadow-[0_0_25px_rgba(0,255,100,0.4)]">

                          <ShieldCheck size={14} />

                          PRODUK AKTIVASI

                        </div>

                      )}

                    </div>

                    <div className="flex items-center gap-2 mt-4 text-zinc-400">

                      <Smartphone size={16} />

                      {item.provider}

                    </div>

                  </div>

                  <div className="text-right">

                    <p className="text-zinc-500 text-sm">
                      Harga
                    </p>

                    <h2 className="text-4xl font-black text-green-400 mt-2">
                      Rp{" "}
                      {Number(
                        item.price
                      ).toLocaleString("id-ID")}
                    </h2>

                  </div>

                </div>

                {/* INFO */}
                <div className="grid grid-cols-2 gap-4 mt-8">

                  <div className="rounded-[28px] border border-zinc-800 bg-black/30 p-5">

                    <div className="flex items-center gap-2 text-zinc-500 text-sm">

                      <Zap size={16} />

                      Kuota

                    </div>

                    <h3 className="text-2xl font-black mt-4">
                      {item.kuota}
                    </h3>

                  </div>

                  <div className="rounded-[28px] border border-zinc-800 bg-black/30 p-5">

                    <div className="flex items-center gap-2 text-zinc-500 text-sm">

                      <CreditCard size={16} />

                      Masa Aktif

                    </div>

                    <h3 className="text-2xl font-black mt-4">
                      {item.masa_aktif}
                    </h3>

                  </div>

                </div>

                {/* BUTTON */}
                <button
                  onClick={() =>
                    setSelectedProduct(
                      item
                    )
                  }
                  className={`w-full h-16 mt-8 rounded-[26px] font-black text-lg transition-all duration-300 flex items-center justify-center gap-3 ${
                    selectedProduct?.id ===
                    item.id
                      ? "bg-green-500 text-black shadow-[0_0_35px_rgba(0,255,100,0.30)]"
                      : "bg-zinc-900 border border-zinc-700 hover:border-green-500"
                  }`}
                >

                  {selectedProduct?.id ===
                  item.id ? (
                    <>
                      <Check size={20} />
                      Produk Dipilih
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={20} />
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

          <div className="absolute inset-0 bg-black/80 backdrop-blur-2xl"></div>

          <div className="relative border-t border-zinc-800 p-5">

            <div className="max-w-6xl mx-auto">

              <div className="flex items-center justify-between gap-5 flex-wrap mb-5">

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

              <input
                type="text"
                placeholder="Masukkan nomor tujuan"
                value={nomorTujuan}
                onChange={(e) =>
                  setNomorTujuan(
                    e.target.value
                  )
                }
                className="w-full h-16 rounded-[24px] bg-zinc-900/80 border border-zinc-800 px-5 outline-none focus:border-green-500 transition"
              />

              <select
                value={paymentMethod}
                onChange={(e) =>
                  setPaymentMethod(
                    e.target.value
                  )
                }
                className="w-full h-16 rounded-[24px] bg-zinc-900/80 border border-zinc-800 px-5 mt-4 outline-none focus:border-green-500 transition"
              >

                <option value="saldo">
                  Saldo Member
                </option>

                <option value="transfer manual">
                  Transfer Manual
                </option>

              </select>

              <button
                onClick={handleBuy}
                disabled={buyLoading}
                className="w-full h-16 mt-5 rounded-[26px] bg-gradient-to-r from-green-500 to-lime-400 text-black text-xl font-black shadow-[0_0_40px_rgba(0,255,100,0.35)] hover:scale-[1.01] transition-all duration-300"
              >

                {buyLoading
                  ? "Memproses Transaksi..."
                  : selectedProduct.is_activation
                  ? "Aktivasi Sekarang"
                  : "Beli Sekarang"}

              </button>

            </div>

          </div>

        </div>

      )}

    </main>
  );
}
