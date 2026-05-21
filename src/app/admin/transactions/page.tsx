"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { supabase } from "@/lib/supabase";

import {
  ArrowLeft,
  ReceiptText,
  ShoppingBag,
  Wallet,
  CalendarDays,
  Smartphone,
  ShieldCheck,
  AlertTriangle,
  LoaderCircle,
  Clock3,
  Ban,
} from "lucide-react";

/*
=====================================================
TYPES
=====================================================
*/

type TransactionStatus =
  | "pending"
  | "approved"
  | "rejected"
  | "selesai"
  | "gagal";

type MemberStatus =
  | "free"
  | "aktif"
  | "dibekukan";

type Product = {
  id: number;
  name: string;
  provider: string;
  kuota: string;
  masa_aktif: string;
};

type Member = {
  id: string;
  full_name: string;
  city: string;
};

type Transaction = {
  id: number;

  member_id: string;

  product_id: number;

  nomor_tujuan: string;

  payment_method: string;

  amount: number;

  status: TransactionStatus;

  created_at: string;

  members?: Member[] | null;

  products?: Product[] | null;
};

export default function TransaksiPage() {

  const router = useRouter();

  const [transactions, setTransactions] =
    useState<Transaction[]>([]);

  const [loading, setLoading] =
    useState(true);

  /*
  =====================================================
  NORMALIZE DATA
  =====================================================
  */

  function getProduct(
    trx: Transaction
  ): Product | null {

    if (!trx.products) return null;

    return trx.products[0] || null;
  }

  function getMember(
    trx: Transaction
  ): Member | null {

    if (!trx.members) return null;

    return trx.members[0] || null;
  }

  /*
  =====================================================
  LOAD DATA
  =====================================================
  */

  useEffect(() => {

    loadTransactions();

  }, []);

  async function loadTransactions() {

    try {

      const memberId =
        localStorage.getItem("member_id");

      if (!memberId) {

        router.replace("/login");

        return;
      }

      const { data, error } =
        await supabase
          .from("transactions")
          .select(`
            *,
            members (
              id,
              full_name,
              city
            ),
            products (
              id,
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

        console.error(error);

        alert(error.message);

        return;
      }

      const trxData =
        (data || []) as unknown as Transaction[];

      setTransactions(trxData);

      /*
      =====================================================
      MEMBER STATUS
      =====================================================
      */

      const approvedCount =
        trxData.filter(
          (trx) => {

            const status =
              trx.status?.toLowerCase();

            return (
              status === "approved" ||
              status === "selesai"
            );
          }
        ).length;

      let memberStatus: MemberStatus =
        "free";

      if (approvedCount > 0) {

        memberStatus = "aktif";
      }

      localStorage.setItem(
        "dan-member-status",
        memberStatus
      );

      /*
      =====================================================
      LIVE ACTIVITY
      =====================================================
      */

      const activities =
        trxData.slice(0, 10).map(
          (trx) => {

            const product =
              getProduct(trx);

            const status =
              trx.status?.toLowerCase();

            return {

              text:
                product?.name ||
                "Produk Digital",

              sub:
                status === "approved" ||
                status === "selesai"
                  ? "Transaksi berhasil"
                  : status === "pending"
                  ? "Menunggu approval"
                  : "Transaksi gagal",

            };
          }
        );

      localStorage.setItem(
        "dan-live-activity",
        JSON.stringify(
          activities
        )
      );

      /*
      =====================================================
      BADGE
      =====================================================
      */

      const pendingTransactions =
        trxData.filter(
          (trx) =>
            trx.status?.toLowerCase() ===
            "pending"
        ).length;

      localStorage.setItem(
        "dan-pending-transactions",
        pendingTransactions.toString()
      );

      /*
      =====================================================
      HISTORY
      =====================================================
      */

      const history =
        trxData.map((trx) => {

          const product =
            getProduct(trx);

          return {

            id: trx.id,

            product:
              product?.name ||
              "Produk Digital",

            amount:
              trx.amount,

            status:
              trx.status,

            created_at:
              trx.created_at,

          };
        });

      localStorage.setItem(
        "dan-history",
        JSON.stringify(history)
      );

    } catch (err: any) {

      console.error(err);

      alert(
        err.message ||
        "Terjadi kesalahan"
      );

    } finally {

      setLoading(false);
    }
  }

  /*
  =====================================================
  STATUS STYLE
  =====================================================
  */

  function statusStyle(
    status: string
  ) {

    const normalized =
      status?.toLowerCase();

    if (
      normalized === "approved" ||
      normalized === "selesai"
    ) {

      return {

        text:
          "text-green-400",

        bg:
          "bg-green-500/10",

        border:
          "border-green-500/20",

        glow:
          "shadow-[0_0_30px_rgba(0,255,100,0.15)]",

        label:
          "BERHASIL",

        icon:
          <ShieldCheck
            size={16}
            className="text-green-400"
          />,

      };
    }

    if (
      normalized === "rejected" ||
      normalized === "gagal"
    ) {

      return {

        text:
          "text-red-400",

        bg:
          "bg-red-500/10",

        border:
          "border-red-500/20",

        glow:
          "shadow-[0_0_30px_rgba(255,0,0,0.15)]",

        label:
          "GAGAL",

        icon:
          <AlertTriangle
            size={16}
            className="text-red-400"
          />,

      };
    }

    return {

      text:
        "text-yellow-300",

      bg:
        "bg-yellow-500/10",

      border:
        "border-yellow-500/20",

      glow:
        "shadow-[0_0_30px_rgba(255,215,0,0.12)]",

      label:
        "PENDING",

      icon:
        <LoaderCircle
          size={16}
          className="text-yellow-300 animate-spin"
        />,

    };
  }

  /*
  =====================================================
  LOADING
  =====================================================
  */

  if (loading) {

    return (

      <div className="min-h-screen bg-black text-white flex items-center justify-center">

        <div className="flex flex-col items-center gap-5">

          <div className="w-16 h-16 rounded-full border-4 border-green-500/20 border-t-green-400 animate-spin"></div>

          <p className="text-zinc-400 text-lg">
            Memuat transaksi...
          </p>

        </div>

      </div>
    );
  }

  return (

    <div className="min-h-screen bg-black text-white overflow-hidden">

      {/* BACKGROUND */}

      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,255,100,0.10),transparent_35%)] pointer-events-none"></div>

      <div className="fixed bottom-0 left-0 w-72 h-72 bg-green-500/5 blur-3xl rounded-full pointer-events-none"></div>

      <div className="relative max-w-6xl mx-auto p-5 pb-32">

        {/* HEADER */}

        <div className="flex items-start justify-between gap-4 flex-wrap">

          <div>

            <button
              onClick={() =>
                router.push(
                  "/member/dashboard"
                )
              }
              className="inline-flex items-center gap-2 h-12 px-5 rounded-2xl border border-zinc-800 bg-black hover:border-green-500 transition-all text-sm font-bold mb-6"
            >

              <ArrowLeft size={18} />

              Kembali

            </button>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 mb-5">

              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>

              <span className="text-green-400 text-sm font-black tracking-[0.2em]">
                LIVE TRANSACTION
              </span>

            </div>

            <p className="text-zinc-500 text-sm tracking-[0.2em] uppercase">
              Digital Affiliate Network
            </p>

            <h1 className="text-5xl md:text-7xl font-black mt-3 tracking-tight leading-none">
              Transaksi
            </h1>

            <p className="text-zinc-400 mt-5 max-w-2xl leading-relaxed text-base md:text-lg">
              Riwayat pembelian
              produk digital dan
              paket data member DAN.
            </p>

          </div>

          <div className="inline-flex items-center gap-3 px-5 py-4 rounded-full bg-green-500/10 border border-green-500/20 shadow-[0_0_30px_rgba(0,255,100,0.15)]">

            <ReceiptText
              size={18}
              className="text-green-400"
            />

            <span className="text-green-400 font-black tracking-wide">
              {transactions.length} TRANSAKSI
            </span>

          </div>

        </div>

        {/* EMPTY */}

        {transactions.length === 0 && (

          <div className="relative overflow-hidden rounded-[40px] border border-zinc-800 bg-white/[0.03] backdrop-blur-xl p-12 mt-10 text-center">

            <div className="relative z-10">

              <div className="w-24 h-24 mx-auto rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center">

                <ShoppingBag
                  size={42}
                  className="text-green-400"
                />

              </div>

              <h2 className="text-4xl font-black mt-8">
                Belum Ada
                Transaksi
              </h2>

              <p className="text-zinc-500 text-lg mt-5 leading-relaxed max-w-2xl mx-auto">
                Mulai belanja
                produk digital DAN.
              </p>

              <button
                onClick={() =>
                  router.push(
                    "/member/produk"
                  )
                }
                className="h-14 px-8 rounded-3xl bg-green-500 hover:bg-green-400 transition-all duration-300 text-black font-black text-sm mt-8"
              >

                Belanja Sekarang

              </button>

            </div>

          </div>
        )}

        {/* LIST */}

        <div className="space-y-5 mt-10">

          {transactions.map(
            (item) => {

              const style =
                statusStyle(
                  item.status
                );

              const product =
                getProduct(item);

              const member =
                getMember(item);

              return (

                <div
                  key={item.id}
                  className="relative overflow-hidden rounded-[40px] border border-zinc-800 bg-white/[0.03] backdrop-blur-xl p-6 md:p-7"
                >

                  <div className="absolute top-0 right-0 w-56 h-56 bg-green-500/5 blur-[120px] rounded-full"></div>

                  <div className="relative z-10">

                    {/* TOP */}

                    <div className="flex items-start justify-between gap-5 flex-wrap">

                      <div>

                        <h2 className="text-3xl md:text-4xl font-black">

                          {product?.name ||
                            "Produk Digital"}

                        </h2>

                        <p className="text-zinc-500 text-lg mt-3">

                          {member?.full_name ||
                            "Member DAN"}

                        </p>

                      </div>

                      <div
                        className={`inline-flex items-center gap-3 px-5 py-3 rounded-full border font-black uppercase tracking-wide ${style.text} ${style.bg} ${style.border} ${style.glow}`}
                      >

                        {style.icon}

                        {style.label}

                      </div>

                    </div>

                    {/* GRID */}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">

                      <div className="rounded-[28px] bg-black/30 border border-zinc-800 p-5">

                        <div className="flex items-center gap-2 text-zinc-500 text-sm">

                          <Smartphone size={16} />

                          Nomor Tujuan

                        </div>

                        <h3 className="text-xl font-black mt-4 break-words">

                          {item.nomor_tujuan || "-"}

                        </h3>

                      </div>

                      <div className="rounded-[28px] bg-black/30 border border-zinc-800 p-5">

                        <div className="flex items-center gap-2 text-zinc-500 text-sm">

                          <Wallet size={16} />

                          Pembayaran

                        </div>

                        <h3 className="text-xl font-black mt-4 capitalize">

                          {item.payment_method || "-"}

                        </h3>

                      </div>

                      <div className="rounded-[28px] bg-black/30 border border-zinc-800 p-5">

                        <p className="text-zinc-500 text-sm">
                          Harga
                        </p>

                        <h3 className="text-3xl font-black text-green-400 mt-4">

                          Rp {Number(
                            item.amount || 0
                          ).toLocaleString(
                            "id-ID"
                          )}

                        </h3>

                      </div>

                      <div className="rounded-[28px] bg-black/30 border border-zinc-800 p-5">

                        <div className="flex items-center gap-2 text-zinc-500 text-sm">

                          <CalendarDays size={16} />

                          Tanggal

                        </div>

                        <h3 className="text-xl font-black mt-4">

                          {item.created_at
                            ? new Date(
                                item.created_at
                              ).toLocaleDateString(
                                "id-ID",
                                {
                                  day: "numeric",
                                  month: "long",
                                  year: "numeric",
                                }
                              )
                            : "-"}

                        </h3>

                      </div>

                      <div className="rounded-[28px] bg-black/30 border border-zinc-800 p-5">

                        <p className="text-zinc-500 text-sm">
                          Kuota
                        </p>

                        <h3 className="text-xl font-black mt-4">

                          {product?.kuota || "-"}

                        </h3>

                      </div>

                      <div className="rounded-[28px] bg-black/30 border border-zinc-800 p-5">

                        <p className="text-zinc-500 text-sm">
                          Masa Aktif
                        </p>

                        <h3 className="text-xl font-black mt-4">

                          {product?.masa_aktif || "-"}

                        </h3>

                      </div>

                    </div>

                    {/* FOOTER */}

                    <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-zinc-500">

                      <div className="flex items-center gap-2">

                        <Clock3 size={15} />

                        Realtime transaction synced

                      </div>

                      {item.status?.toLowerCase() ===
                        "rejected" ||
                      item.status?.toLowerCase() ===
                        "gagal" ? (

                        <div className="flex items-center gap-2 text-red-400">

                          <Ban size={15} />

                          Silahkan hubungi admin

                        </div>

                      ) : null}

                    </div>

                  </div>

                </div>
              );
            }
          )}

        </div>

      </div>

    </div>
  );
}
