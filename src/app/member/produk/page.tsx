"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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
          .from("members")
          .select("*")
          .eq("id", memberId)
          .single();

      if (error || !data) {

        window.location.href =
          "/login";

        return;
      }

      setMember(data);

    } catch {

      window.location.href =
        "/login";
    }
  }

  async function loadProducts() {

    try {

      setLoading(true);

      const { data, error } =
        await supabase
          .from("products")
          .select("*")
          .eq("is_active", true)
          .order("price", {
            ascending: true,
          });

      if (error) {

        console.log(error);

        setProducts([]);

      } else {

        setProducts(data || []);
      }

    } catch (err) {

      console.log(err);

      setProducts([]);

    } finally {

      setLoading(false);
    }
  }

  async function handleBuy() {

    if (!selectedProduct) {

      alert("Pilih produk");

      return;
    }

    if (!nomorTujuan.trim()) {

      alert("Masukkan nomor tujuan");

      return;
    }

    if (!member) {

      alert("Member tidak ditemukan");

      return;
    }

    if (buyLoading) return;

    try {

      setBuyLoading(true);

      /*
        VALIDASI SALDO
      */

      if (
        paymentMethod === "saldo" &&
        Number(member.balance || 0) <
          Number(selectedProduct.price)
      ) {

        alert("Saldo tidak cukup");

        setBuyLoading(false);

        return;
      }

      /*
        KURANGI SALDO
      */

      if (paymentMethod === "saldo") {

        const newBalance =
          Number(member.balance || 0) -
          Number(selectedProduct.price);

        const { error: balanceError } =
          await supabase
            .from("members")
            .update({
              balance: newBalance,
            })
            .eq("id", member.id);

        if (balanceError) {

          alert(balanceError.message);

          setBuyLoading(false);

          return;
        }

        setMember({
          ...member,
          balance: newBalance,
        });
      }

      /*
        BUAT TRANSAKSI
      */

      const { error: transactionError } =
        await supabase
          .from("transactions")
          .insert([
            {
              member_id: member.id,
              product_id:
                selectedProduct.id,
              nomor_tujuan:
                nomorTujuan.trim(),
              amount:
                selectedProduct.price,
              payment_method:
                paymentMethod,
              status: "proses",
            },
          ]);

      if (transactionError) {

        alert(transactionError.message);

        setBuyLoading(false);

        return;
      }

      /*
        AKTIVASI OTOMATIS
        PEMBELIAN PERTAMA
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

        setMember((prev: any) => ({
          ...prev,
          status: "aktif",
        }));
      }

      /*
        LIVE ACTIVITY
      */

      await supabase
        .from("activity_logs")
        .insert([
          {
            member_name:
              member.name || "Member",
            city:
              member.city || "-",
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

    } catch (err: any) {

      alert(
        err?.message ||
          "Terjadi kesalahan"
      );

    } finally {

      setBuyLoading(false);
    }
  }

  if (loading) {

    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center text-lg sm:text-xl font-bold">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">

      {/* BACKGROUND */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,255,100,0.12),transparent_35%)] pointer-events-none"></div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-5 py-5 sm:py-6 pb-44">

        {/* TOP BAR */}
        <div className="flex items-center justify-between mb-5 gap-3">

          <Link
            href="/member/dashboard"
            className="min-w-11 w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center hover:border-green-500 transition text-lg"
          >
            ←
          </Link>

          <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-3 rounded-full bg-green-500/10 border border-green-500/20">

            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>

            <span className="text-green-400 text-[10px] sm:text-xs font-black tracking-[0.2em] uppercase whitespace-nowrap">
              Produk Digital
            </span>

          </div>

        </div>

        {/* HERO */}
        <div className="relative overflow-hidden rounded-[32px] sm:rounded-[40px] border border-zinc-800 bg-white/[0.03] backdrop-blur-xl p-5 sm:p-7 shadow-[0_0_60px_rgba(0,255,100,0.08)]">

          <div className="absolute top-0 right-0 w-56 sm:w-72 h-56 sm:h-72 bg-green-500/10 blur-3xl rounded-full"></div>

          <div className="relative z-10">

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1] tracking-tight">
              Paket Data
              <br />
              Premium
            </h1>

            <p className="text-zinc-400 mt-5 sm:mt-7 max-w-2xl text-sm sm:text-lg leading-relaxed">
              Belanja paket data digital langsung dari dashboard premium DAN.
            </p>

            {/* AUTO ACTIVATION */}
            <div className="mt-6 sm:mt-8 rounded-[24px] sm:rounded-[32px] border border-green-500/20 bg-green-500/10 p-4 sm:p-5 shadow-[0_0_40px_rgba(0,255,100,0.10)]">

              <div className="flex items-start gap-3 sm:gap-4">

                <div className="min-w-12 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-green-500 flex items-center justify-center text-black text-xl sm:text-2xl font-black shadow-[0_0_30px_rgba(0,255,100,0.35)]">
                  ⚡
                </div>

                <div>

                  <h2 className="text-xl sm:text-3xl font-black">
                    Aktivasi Otomatis
                  </h2>

                  <p className="text-zinc-300 mt-2 sm:mt-3 leading-relaxed text-sm sm:text-lg">
                    Pembelian pertama otomatis mengaktifkan akun member DAN.
                  </p>

                </div>

              </div>

            </div>

            {/* STATS */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 sm:mt-7">

              <div className="rounded-[24px] sm:rounded-[28px] border border-zinc-800 bg-black/30 p-4 sm:p-5">

                <p className="text-zinc-500 text-sm">
                  Status
                </p>

                <h2
                  className={`text-2xl sm:text-3xl font-black mt-3 ${
                    member?.status ===
                    "aktif"
                      ? "text-green-400"
                      : "text-yellow-300"
                  }`}
                >
                  {member?.status ===
                  "aktif"
                    ? "AKTIF"
                    : "FREE"}
                </h2>

              </div>

              <div className="rounded-[24px] sm:rounded-[28px] border border-zinc-800 bg-black/30 p-4 sm:p-5">

                <p className="text-zinc-500 text-sm">
                  Saldo
                </p>

                <h2 className="text-2xl sm:text-3xl font-black text-green-400 mt-3 break-words">
                  Rp{" "}
                  {Number(
                    member?.balance || 0
                  ).toLocaleString(
                    "id-ID"
                  )}
                </h2>

              </div>

              <div className="rounded-[24px] sm:rounded-[28px] border border-zinc-800 bg-black/30 p-4 sm:p-5">

                <p className="text-zinc-500 text-sm">
                  Produk
                </p>

                <h2 className="text-2xl sm:text-3xl font-black mt-3">
                  {products.length}
                </h2>

              </div>

            </div>

          </div>

        </div>

        {/* EMPTY */}
        {products.length === 0 && (

          <div className="mt-10 rounded-[30px] sm:rounded-[36px] border border-zinc-800 bg-white/[0.03] backdrop-blur-xl p-8 sm:p-10 text-center">

            <h2 className="text-3xl sm:text-4xl font-black">
              Produk Belum Tersedia
            </h2>

            <p className="text-zinc-500 text-base sm:text-lg mt-4">
              Admin belum menambahkan produk digital.
            </p>

          </div>

        )}

        {/* PRODUCT LIST */}
        <div className="space-y-5 sm:space-y-6 mt-10">

          {products.map((item) => (

            <div
              key={item.id}
              className={`relative overflow-hidden rounded-[30px] sm:rounded-[40px] border transition-all duration-300 backdrop-blur-xl p-5 sm:p-7 ${
                selectedProduct?.id ===
                item.id
                  ? "border-green-500 bg-green-500/5 shadow-[0_0_50px_rgba(0,255,100,0.15)]"
                  : "border-zinc-800 bg-white/[0.03]"
              }`}
            >

              <div className="absolute top-0 right-0 w-44 sm:w-56 h-44 sm:h-56 bg-green-500/5 blur-3xl rounded-full"></div>

              <div className="relative z-10">

                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">

                  <div className="min-w-0">

                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight break-words">
                      {item.name}
                    </h2>

                    <p className="text-zinc-500 text-base sm:text-xl mt-3 sm:mt-4">
                      Provider {item.provider}
                    </p>

                  </div>

                  <div className="lg:text-right">

                    <p className="text-zinc-500 text-sm">
                      Harga
                    </p>

                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-green-400 mt-2 sm:mt-3 break-words">
                      Rp{" "}
                      {Number(
                        item.price
                      ).toLocaleString(
                        "id-ID"
                      )}
                    </h2>

                  </div>

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 sm:mt-7">

                  <div className="rounded-[24px] sm:rounded-[28px] border border-zinc-800 bg-black/30 p-4 sm:p-5">

                    <p className="text-zinc-500 text-sm">
                      ⚡ Kuota
                    </p>

                    <h3 className="text-2xl sm:text-3xl font-black mt-3 break-words">
                      {item.kuota}
                    </h3>

                  </div>

                  <div className="rounded-[24px] sm:rounded-[28px] border border-zinc-800 bg-black/30 p-4 sm:p-5">

                    <p className="text-zinc-500 text-sm">
                      🗓 Masa Aktif
                    </p>

                    <h3 className="text-2xl sm:text-3xl font-black mt-3 break-words">
                      {item.masa_aktif}
                    </h3>

                  </div>

                </div>

                <button
                  onClick={() =>
                    setSelectedProduct(
                      item
                    )
                  }
                  className={`w-full h-14 sm:h-16 mt-6 sm:mt-7 rounded-[20px] sm:rounded-[24px] text-base sm:text-xl font-black transition ${
                    selectedProduct?.id ===
                    item.id
                      ? "bg-green-500 text-black shadow-[0_0_40px_rgba(0,255,100,0.35)]"
                      : "bg-zinc-900 border border-zinc-700 hover:border-green-500"
                  }`}
                >
                  {selectedProduct?.id ===
                  item.id
                    ? "Produk Dipilih"
                    : "Pilih Produk"}
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

          <div className="relative border-t border-zinc-800 p-4 sm:p-5">

            <div className="max-w-6xl mx-auto">

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">

                <div className="min-w-0">

                  <p className="text-zinc-500 text-sm">
                    Produk Dipilih
                  </p>

                  <h2 className="text-2xl sm:text-4xl font-black mt-2 break-words">
                    {selectedProduct.name}
                  </h2>

                </div>

                <div className="sm:text-right">

                  <p className="text-zinc-500 text-sm">
                    Total
                  </p>

                  <h2 className="text-2xl sm:text-4xl font-black text-green-400 mt-2 break-words">
                    Rp{" "}
                    {Number(
                      selectedProduct.price
                    ).toLocaleString(
                      "id-ID"
                    )}
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
                className="w-full h-14 sm:h-16 rounded-[20px] sm:rounded-[24px] bg-zinc-900 border border-zinc-800 px-5 outline-none focus:border-green-500 transition text-sm sm:text-base"
              />

              <select
                value={paymentMethod}
                onChange={(e) =>
                  setPaymentMethod(
                    e.target.value
                  )
                }
                className="w-full h-14 sm:h-16 rounded-[20px] sm:rounded-[24px] bg-zinc-900 border border-zinc-800 px-5 mt-4 outline-none focus:border-green-500 transition text-sm sm:text-base"
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
                className="w-full h-14 sm:h-16 mt-5 rounded-[20px] sm:rounded-[24px] bg-gradient-to-r from-green-500 to-lime-400 text-black text-lg sm:text-2xl font-black shadow-[0_0_50px_rgba(0,255,100,0.35)] hover:scale-[1.01] transition disabled:opacity-60"
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
