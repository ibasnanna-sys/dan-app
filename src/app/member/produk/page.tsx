"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function ProdukPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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
        window.location.href = "/login";
        return;
      }

      const { data, error } =
        await supabase
          .from("members")
          .select("*")
          .eq("id", memberId)
          .single();

      if (error || !data) {
        window.location.href = "/login";
        return;
      }

      setMember(data);
    } catch {
      window.location.href = "/login";
    }
  }

  async function loadProducts() {
    try {
      setLoading(true);

      const { data, error } =
        await supabase
          .from("products")
          .select("*")
          .eq("status", true)
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
        TRANSAKSI
      */

      const { error: trxError } =
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

      if (trxError) {
        alert(trxError.message);
        setBuyLoading(false);
        return;
      }

      /*
        AKTIVASI OTOMATIS
      */

      if (member.status !== "aktif") {
        await supabase
          .from("members")
          .update({
            status: "aktif",
          })
          .eq("id", member.id);

        setMember({
          ...member,
          status: "aktif",
        });
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

      alert("Transaksi berhasil");

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
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pb-40">
      <div className="max-w-6xl mx-auto px-4 py-6">

        {/* TOP */}
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/member/dashboard"
            className="w-11 h-11 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center"
          >
            ←
          </Link>

          <div className="px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold">
            PRODUK DIGITAL
          </div>
        </div>

        {/* HEADER */}
        <div className="rounded-[32px] border border-zinc-800 bg-zinc-900/40 p-6 mb-8">
          <h1 className="text-5xl font-black">
            Paket Data
          </h1>

          <p className="text-zinc-400 mt-4">
            Belanja paket data premium langsung dari dashboard DAN.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">

            <div className="rounded-3xl border border-zinc-800 bg-black/30 p-5">
              <p className="text-zinc-500 text-sm">
                Status
              </p>

              <h2
                className={`text-3xl font-black mt-3 ${
                  member?.status ===
                  "aktif"
                    ? "text-green-400"
                    : "text-yellow-400"
                }`}
              >
                {member?.status ===
                "aktif"
                  ? "AKTIF"
                  : "FREE"}
              </h2>
            </div>

            <div className="rounded-3xl border border-zinc-800 bg-black/30 p-5">
              <p className="text-zinc-500 text-sm">
                Saldo
              </p>

              <h2 className="text-3xl font-black text-green-400 mt-3">
                Rp{" "}
                {Number(
                  member?.balance || 0
                ).toLocaleString("id-ID")}
              </h2>
            </div>

            <div className="rounded-3xl border border-zinc-800 bg-black/30 p-5">
              <p className="text-zinc-500 text-sm">
                Produk
              </p>

              <h2 className="text-3xl font-black mt-3">
                {products.length}
              </h2>
            </div>
          </div>
        </div>

        {/* EMPTY */}
        {products.length === 0 && (
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/40 p-10 text-center">
            <h2 className="text-3xl font-black">
              Produk Belum Ada
            </h2>

            <p className="text-zinc-500 mt-4">
              Admin belum menambahkan produk.
            </p>
          </div>
        )}

        {/* LIST PRODUK */}
        <div className="space-y-6">
          {products.map((item) => (
            <div
              key={item.id}
              className={`rounded-[40px] border p-7 transition ${
                selectedProduct?.id ===
                item.id
                  ? "border-green-500 bg-green-500/5"
                  : "border-zinc-800 bg-zinc-900/30"
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">

                <div>
                  <h2 className="text-5xl font-black">
                    {item.name}
                  </h2>

                  <p className="text-zinc-500 text-xl mt-4">
                    Provider {item.provider}
                  </p>
                </div>

                <div className="lg:text-right">
                  <p className="text-zinc-500">
                    Harga
                  </p>

                  <h2 className="text-5xl font-black text-green-400 mt-3">
                    Rp{" "}
                    {Number(
                      item.price
                    ).toLocaleString("id-ID")}
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-7">

                <div className="rounded-[28px] border border-zinc-800 bg-black/30 p-5">
                  <p className="text-zinc-500">
                    ⚡ Kuota
                  </p>

                  <h3 className="text-4xl font-black mt-3">
                    {item.kuota}
                  </h3>
                </div>

                <div className="rounded-[28px] border border-zinc-800 bg-black/30 p-5">
                  <p className="text-zinc-500">
                    🗓 Masa Aktif
                  </p>

                  <h3 className="text-4xl font-black mt-3">
                    {item.masa_aktif}
                  </h3>
                </div>
              </div>

              <button
                onClick={() =>
                  setSelectedProduct(item)
                }
                className={`w-full h-16 rounded-[24px] mt-7 text-2xl font-black transition ${
                  selectedProduct?.id ===
                  item.id
                    ? "bg-green-500 text-black"
                    : "bg-zinc-900 border border-zinc-700"
                }`}
              >
                {selectedProduct?.id ===
                item.id
                  ? "Produk Dipilih"
                  : "Pilih Produk"}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* CHECKOUT */}
      {selectedProduct && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-2xl border-t border-zinc-800 p-5">

          <div className="max-w-6xl mx-auto">

            <div className="flex items-center justify-between mb-5">
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
              className="w-full h-14 rounded-2xl bg-zinc-900 border border-zinc-800 px-5 outline-none"
            />

            <select
              value={paymentMethod}
              onChange={(e) =>
                setPaymentMethod(
                  e.target.value
                )
              }
              className="w-full h-14 rounded-2xl bg-zinc-900 border border-zinc-800 px-5 mt-4 outline-none"
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
              className="w-full h-14 rounded-2xl mt-5 bg-gradient-to-r from-green-500 to-lime-400 text-black text-xl font-black"
            >
              {buyLoading
                ? "Memproses..."
                : "Beli Sekarang"}
            </button>

          </div>
        </div>
      )}
    </div>
  );
}
