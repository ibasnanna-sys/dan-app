"use client";

import Link from "next/link";

import { useEffect, useState } from "react";

import {
  ArrowLeft,
  ShoppingBag,
  Zap,
  Package,
  Calendar,
} from "lucide-react";

import { supabase } from "@/lib/supabase";

export default function ProdukPage() {

  const [member, setMember] =
    useState<any>(null);

  const [products, setProducts] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    loadData();

  }, []);

  async function loadData() {

    const memberId =
      localStorage.getItem("member_id");

    if (!memberId) {

      window.location.href =
        "/login";

      return;
    }

    const { data: memberData } =
      await supabase
        .from("members")
        .select("*")
        .eq("id", memberId)
        .single();

    if (!memberData) {

      window.location.href =
        "/login";

      return;
    }

    setMember(memberData);

    const { data: productData } =
      await supabase
        .from("products")
        .select("*")
        .eq("is_active", true)
        .order("price", {
          ascending: true,
        });

    setProducts(productData || []);

    setLoading(false);
  }

  async function pilihProduk(
    product: any
  ) {

    const nomor =
      prompt(
        "Masukkan nomor tujuan"
      );

    if (!nomor) return;

    const memberId =
      localStorage.getItem("member_id");

    const { error } =
      await supabase
        .from("transactions")
        .insert([
          {
            member_id: memberId,
            product_id: product.id,
            nomor_tujuan: nomor,
            amount: product.price,
            payment_method:
              "saldo",
            status: "pending",
          },
        ]);

    if (error) {

      alert(error.message);

      return;
    }

    /*
      AKTIVASI OTOMATIS
      transaksi pertama
    */

    if (
      member.status !== "aktif"
    ) {

      await supabase
        .from("members")
        .update({
          status: "aktif",
        })
        .eq("id", member.id);

    }

    alert(
      "Transaksi berhasil dibuat"
    );

    window.location.href =
      "/member/transaksi";
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

      {/* BG */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,255,100,0.12),transparent_35%)] pointer-events-none"></div>

      <div className="relative max-w-6xl mx-auto p-5 pb-32">

        {/* TOPBAR */}
        <div className="flex items-center justify-between mb-8">

          <Link
            href="/member/dashboard"
            className="w-14 h-14 rounded-2xl border border-zinc-800 bg-zinc-900/80 flex items-center justify-center hover:border-green-500 transition"
          >
            <ArrowLeft size={22} />
          </Link>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20">

            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>

            <span className="text-green-400 text-sm font-black tracking-[0.2em]">
              PRODUK DIGITAL
            </span>

          </div>

        </div>

        {/* HERO */}
        <div className="relative overflow-hidden rounded-[40px] border border-zinc-800 bg-white/[0.03] backdrop-blur-xl p-7 shadow-[0_0_40px_rgba(0,255,100,0.08)]">

          <div className="absolute top-0 right-0 w-72 h-72 bg-green-500/10 blur-3xl rounded-full"></div>

          <div className="relative z-10">

            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
              Paket Data
              <br />
              Premium
            </h1>

            <p className="text-zinc-400 text-lg leading-relaxed mt-6 max-w-2xl">
              Belanja paket data digital langsung dari dashboard premium DAN.
            </p>

            {/* INFO */}
            <div className="mt-8 rounded-[32px] border border-green-500/20 bg-green-500/10 p-5 shadow-[0_0_30px_rgba(0,255,100,0.08)]">

              <div className="flex items-start gap-4">

                <div className="w-12 h-12 rounded-2xl bg-green-500 text-black flex items-center justify-center flex-shrink-0">

                  <Zap size={22} />

                </div>

                <div>

                  <h3 className="text-2xl font-black">
                    Aktivasi Otomatis
                  </h3>

                  <p className="text-zinc-300 mt-3 leading-relaxed">
                    Transaksi pertama otomatis mengaktifkan akun member DAN tanpa produk aktivasi khusus.
                  </p>

                </div>

              </div>

            </div>

            {/* STATS */}
            <div className="grid grid-cols-3 gap-4 mt-8">

              <div className="rounded-[28px] border border-zinc-800 bg-black/30 p-5">

                <p className="text-zinc-500 text-sm">
                  Status
                </p>

                <h3
                  className={`text-2xl font-black mt-3 ${
                    member.status ===
                    "aktif"
                      ? "text-green-400"
                      : "text-yellow-300"
                  }`}
                >
                  {member.status ===
                  "aktif"
                    ? "AKTIF"
                    : "FREE"}
                </h3>

              </div>

              <div className="rounded-[28px] border border-zinc-800 bg-black/30 p-5">

                <p className="text-zinc-500 text-sm">
                  Saldo
                </p>

                <h3 className="text-2xl font-black text-green-400 mt-3">
                  Rp 0
                </h3>

              </div>

              <div className="rounded-[28px] border border-zinc-800 bg-black/30 p-5">

                <p className="text-zinc-500 text-sm">
                  Produk
                </p>

                <h3 className="text-2xl font-black mt-3">
                  {products.length}
                </h3>

              </div>

            </div>

          </div>

        </div>

        {/* PRODUK */}
        <div className="space-y-6 mt-8">

          {products.map((item) => (

            <div
              key={item.id}
              className="relative overflow-hidden rounded-[36px] border border-zinc-800 bg-white/[0.03] backdrop-blur-xl p-6 shadow-[0_0_30px_rgba(255,255,255,0.02)]"
            >

              <div className="absolute top-0 right-0 w-40 h-40 bg-green-500/5 blur-3xl rounded-full"></div>

              <div className="relative z-10">

                {/* TOP */}
                <div className="flex items-start justify-between gap-4">

                  <div>

                    <h2 className="text-4xl font-black">
                      {item.name}
                    </h2>

                    <p className="text-zinc-500 mt-3 text-lg">
                      Provider {item.provider}
                    </p>

                  </div>

                  <div className="text-right">

                    <p className="text-zinc-500 text-sm">
                      Harga
                    </p>

                    <h2 className="text-5xl font-black text-green-400 mt-3">
                      Rp{" "}
                      {Number(
                        item.price
                      ).toLocaleString(
                        "id-ID"
                      )}
                    </h2>

                  </div>

                </div>

                {/* INFO */}
                <div className="grid grid-cols-2 gap-4 mt-8">

                  <div className="rounded-[28px] border border-zinc-800 bg-black/30 p-5">

                    <div className="flex items-center gap-2 text-zinc-500 text-sm">

                      <Package size={14} />

                      Kuota

                    </div>

                    <h3 className="text-3xl font-black mt-4">
                      {item.kuota}
                    </h3>

                  </div>

                  <div className="rounded-[28px] border border-zinc-800 bg-black/30 p-5">

                    <div className="flex items-center gap-2 text-zinc-500 text-sm">

                      <Calendar size={14} />

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
                    pilihProduk(item)
                  }
                  className="w-full h-16 mt-6 rounded-[28px] bg-green-500 hover:bg-green-400 transition text-black font-black text-xl shadow-[0_0_35px_rgba(0,255,100,0.30)] flex items-center justify-center gap-3"
                >

                  <ShoppingBag size={22} />

                  Beli Sekarang

                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}
