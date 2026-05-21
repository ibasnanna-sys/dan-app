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

type Transaction = {
  id: number;
  member_id: string;
  nomor_tujuan?: string | null;
  payment_method?: string | null;
  amount?: number | null;
  status?: TransactionStatus | string | null;
  created_at?: string | null;

  products?: Product | Product[] | null;
};

export default function TransaksiPage() {

  const router = useRouter();

  const [transactions, setTransactions] =
    useState<Transaction[]>([]);

  const [loading, setLoading] =
    useState(true);

  /*
    =====================================================
    NORMALIZE PRODUCT
    =====================================================
  */

  function getProduct(
    trx: Transaction
  ): Product | null {

    if (!trx.products) return null;

    if (Array.isArray(trx.products)) {

      return trx.products[0] || null;
    }

    return trx.products;
  }

  /*
    =====================================================
    NORMALIZE STATUS
    =====================================================
  */

  function normalizeStatus(
    status?: string | null
  ) {

    return (
      status?.toLowerCase() ||
      "pending"
    );
  }

  /*
    =====================================================
    FORMAT DATE
    =====================================================
  */

  function formatDate(
    date?: string | null
  ) {

    if (!date) return "-";

    try {

      return new Date(
        date
      ).toLocaleDateString(
        "id-ID",
        {
          day: "numeric",
          month: "long",
          year: "numeric",
        }
      );

    } catch {

      return "-";
    }
  }

  /*
    =====================================================
    LOAD TRANSACTIONS
    =====================================================
  */

  useEffect(() => {

    loadTransactions();

  }, []);

  async function loadTransactions() {

    try {

      const memberId =
        localStorage.getItem(
          "member_id"
        );

      if (!memberId) {

        router.replace("/login");

        return;
      }

      const { data, error } =
        await supabase
          .from("transactions")
          .select(`
            *,
            products (
              id,
              name,
              provider,
              kuota,
              masa_aktif
            )
          `)
          .eq(
            "member_id",
            memberId
          )
          .order(
            "created_at",
            {
              ascending: false,
            }
          );

      if (error) {

        console.error(error);

        alert(error.message);

        return;
      }

      const trxData =
        (data || []) as Transaction[];

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
              normalizeStatus(
                trx.status
              );

            return (
              status ===
                "approved" ||
              status ===
                "selesai"
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
        trxData
          .slice(0, 10)
          .map((trx) => {

            const product =
              getProduct(trx);

            const status =
              normalizeStatus(
                trx.status
              );

            return {

              text:
                product?.name ||
                "Paket Data",

              sub:
                status ===
                  "approved" ||
                status ===
                  "selesai"
                  ? "Transaksi berhasil"
                  : status ===
                    "pending"
                  ? "Menunggu approval"
                  : "Transaksi gagal",
            };
          });

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
            normalizeStatus(
              trx.status
            ) === "pending"
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
              "Paket Data",

            amount:
              trx.amount || 0,

            status:
              trx.status ||
              "pending",

            created_at:
              trx.created_at,
          };
        });

      localStorage.setItem(
        "dan-history",
        JSON.stringify(
          history
        )
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
    status?: string | null
  ) {

    const normalized =
      normalizeStatus(status);

    if (
      normalized ===
        "approved" ||
      normalized ===
        "selesai"
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
      normalized ===
        "rejected" ||
      normalized ===
        "gagal"
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

      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,255,100,0.10),transparent_35%)] pointer-events-none"></div>

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

            <h1 className="text-5xl md:text-7xl font-black">
              Transaksi
            </h1>

          </div>

          <div className="inline-flex items-center gap-3 px-5 py-4 rounded-full bg-green-500/10 border border-green-500/20">

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

          <div className="rounded-[40px] border border-zinc-800 bg-white/[0.03] p-12 mt-10 text-center">

            <ShoppingBag
              size={50}
              className="mx-auto text-green-400"
            />

            <h2 className="text-4xl font-black mt-6">

              Belum Ada Transaksi

            </h2>

          </div>
        )}

        {/* LIST */}

        <div className="space-y-5 mt-10">

          {transactions.map(
            (item) => {

              const product =
                getProduct(item);

              const style =
                statusStyle(
                  item.status
                );

              return (

                <div
                  key={item.id}
                  className="rounded-[40px] border border-zinc-800 bg-white/[0.03] p-6"
                >

                  <div className="flex items-start justify-between gap-5 flex-wrap">

                    <div>

                      <h2 className="text-3xl font-black">

                        {product?.name ||
                          "Paket Data"}

                      </h2>

                      <p className="text-zinc-500 mt-2">

                        {product?.provider ||
                          "Digital Affiliate Network"}

                      </p>

                    </div>

                    <div
                      className={`inline-flex items-center gap-3 px-5 py-3 rounded-full border font-black uppercase tracking-wide ${style.text} ${style.bg} ${style.border}`}
                    >

                      {style.icon}

                      {style.label}

                    </div>

                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">

                    <div className="rounded-[28px] bg-black/30 border border-zinc-800 p-5">

                      <p className="text-zinc-500 text-sm">

                        Nomor Tujuan

                      </p>

                      <h3 className="text-xl font-black mt-4">

                        {item.nomor_tujuan ||
                          "-"}

                      </h3>

                    </div>

                    <div className="rounded-[28px] bg-black/30 border border-zinc-800 p-5">

                      <p className="text-zinc-500 text-sm">

                        Pembayaran

                      </p>

                      <h3 className="text-xl font-black mt-4">

                        {item.payment_method ||
                          "-"}

                      </h3>

                    </div>

                    <div className="rounded-[28px] bg-black/30 border border-zinc-800 p-5">

                      <p className="text-zinc-500 text-sm">

                        Harga

                      </p>

                      <h3 className="text-3xl font-black text-green-400 mt-4">

                        Rp{" "}

                        {Number(
                          item.amount || 0
                        ).toLocaleString(
                          "id-ID"
                        )}

                      </h3>

                    </div>

                    <div className="rounded-[28px] bg-black/30 border border-zinc-800 p-5">

                      <p className="text-zinc-500 text-sm">

                        Tanggal

                      </p>

                      <h3 className="text-xl font-black mt-4">

                        {formatDate(
                          item.created_at
                        )}

                      </h3>

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
