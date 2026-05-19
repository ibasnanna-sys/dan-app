"use client";
export default function Home() {
  const activities = [
    {
      name: "Akbar",
      city: "Surabaya",
      activity: "Aktivasi Member",
      time: "2 menit lalu",
    },
    {
      name: "Dewi",
      city: "Bandung",
      activity: "Belanja Paket Unlimited",
      time: "5 menit lalu",
    },
    {
      name: "Rizky",
      city: "Makassar",
      activity: "Bonus Referral Masuk",
      time: "9 menit lalu",
    },
    {
      name: "Fajar",
      city: "Jakarta",
      activity: "Withdraw Berhasil",
      time: "12 menit lalu",
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white px-5 py-6">
      {/* HEADER */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-zinc-500 text-sm">Halo,</p>

          <h1 className="text-5xl font-black mt-1">Basri</h1>

          <div className="flex items-center gap-2 mt-4">
            <div className="w-4 h-4 rounded-full bg-yellow-400"></div>

            <span className="text-yellow-400 font-bold text-xl">
              FREE
            </span>
          </div>
        </div>

        <button className="bg-red-600 px-5 py-3 rounded-2xl font-bold">
          Logout
        </button>
      </div>

      {/* REFERRAL */}
      <div className="bg-zinc-900 rounded-3xl p-6 mt-8 border border-zinc-800">
        <p className="text-zinc-500 text-sm">Referral Code</p>

        <h2 className="text-5xl font-black mt-3">
          DAN614928
        </h2>

        <div className="flex gap-3 mt-6">
          <button className="flex-1 bg-black border border-zinc-800 py-4 rounded-2xl font-bold">
            Copy Link
          </button>

          <button className="flex-1 bg-black border border-zinc-800 py-4 rounded-2xl font-bold">
            Copy Kode
          </button>
        </div>
      </div>

      {/* INFO */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="bg-zinc-900 rounded-3xl p-5 border border-zinc-800">
          <p className="text-zinc-500 text-sm">
            Saldo Total
          </p>

          <h2 className="text-green-400 text-4xl font-black mt-4">
            Rp 0
          </h2>
        </div>

        <div className="bg-zinc-900 rounded-3xl p-5 border border-zinc-800">
          <p className="text-zinc-500 text-sm">
            Total Referral
          </p>

          <h2 className="text-4xl font-black mt-4">
            0
          </h2>
        </div>

        <div className="bg-zinc-900 rounded-3xl p-5 border border-zinc-800">
          <p className="text-zinc-500 text-sm">
            Bonus Sponsor
          </p>

          <h2 className="text-4xl font-black mt-4">
            Rp 0
          </h2>
        </div>

        <div className="bg-zinc-900 rounded-3xl p-5 border border-zinc-800">
          <p className="text-zinc-500 text-sm">
            Bonus Referral
          </p>

          <h2 className="text-4xl font-black mt-4">
            Rp 0
          </h2>
        </div>
      </div>

      {/* MENU */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        <button className="bg-green-500 text-black font-black py-5 rounded-2xl">
          Aktivasi Member
        </button>

        <button className="bg-zinc-900 border border-zinc-800 py-5 rounded-2xl font-bold">
          Transaksi
        </button>

        <button className="bg-zinc-900 border border-zinc-800 py-5 rounded-2xl font-bold">
          Referral
        </button>

        <button className="bg-zinc-900 border border-zinc-800 py-5 rounded-2xl font-bold">
          Profil
        </button>

        <button className="bg-zinc-900 border border-zinc-800 py-5 rounded-2xl font-bold">
          Bantuan
        </button>

        <button className="bg-zinc-900 border border-zinc-800 py-5 rounded-2xl font-bold">
          Withdraw
        </button>
      </div>

      {/* LIVE AKTIVITAS */}
      <div className="mt-10">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-3xl font-black">
            Aktivitas Member
          </h2>

          <span className="text-green-400 text-sm font-bold">
            LIVE
          </span>
        </div>

        <div className="space-y-4 max-h-[420px] overflow-hidden">
          <div className="animate-pulse space-y-4">
            {activities.map((item, index) => (
              <div
                key={index}
                className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-xl">
                      {item.name}
                    </h3>

                    <p className="text-zinc-500 text-sm mt-1">
                      {item.city}
                    </p>
                  </div>

                  <span className="text-zinc-500 text-sm">
                    {item.time}
                  </span>
                </div>

                <p className="mt-4 text-lg">
                  {item.activity}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function HomePage() {

  const [products, setProducts] =
    useState<any[]>([]);

  const [activities, setActivities] =
    useState<any[]>([]);

  const [stats, setStats] =
    useState({
      members: 0,
      transactions: 0,
      bonuses: 0,
    });

  useEffect(() => {
    getProducts();
    getActivities();
    getStats();
  }, []);

  async function getProducts() {

    const { data } =
      await supabase
        .from("products")
        .select("*")
        .eq("status", true)
        .order("price", {
          ascending: true,
        });

    if (data) {
      setProducts(data);
    }
  }

  async function getActivities() {

    const { data } =
      await supabase
        .from("activity_logs")
        .select("*")
        .order("created_at", {
          ascending: false,
        })
        .limit(10);

    if (data) {
      setActivities(data);
    }
  }

  async function getStats() {

    const members =
      await supabase
        .from("members")
        .select("*", {
          count: "exact",
          head: true,
        });

    const transactions =
      await supabase
        .from("transactions")
        .select("*", {
          count: "exact",
          head: true,
        });

    const bonuses =
      await supabase
        .from("bonuses")
        .select("amount");

    let totalBonus = 0;

    bonuses.data?.forEach((item: any) => {
      totalBonus += item.amount;
    });

    setStats({
      members: members.count || 0,
      transactions:
        transactions.count || 0,
      bonuses: totalBonus,
    });
  }

  return (
    <main className="min-h-screen bg-black text-white">

      <section className="px-5 pt-10 pb-16">

        <div className="max-w-md mx-auto">

          <div className="bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 rounded-[40px] p-8">

            <h1 className="text-5xl font-black leading-tight">
              DAN
            </h1>

            <p className="text-zinc-400 mt-4 text-lg leading-relaxed">
              Platform paket data &
              referral modern dengan
              sistem bonus realtime.
            </p>

            <div className="grid grid-cols-2 gap-4 mt-8">

              <Link
                href="/register"
                className="bg-green-500 text-black text-center py-4 rounded-2xl font-black"
              >
                Daftar
              </Link>

              <Link
                href="/login"
                className="bg-zinc-800 text-white text-center py-4 rounded-2xl font-black"
              >
                Login
              </Link>

            </div>

          </div>

        </div>

      </section>

      <section className="px-5 pb-10">

        <div className="max-w-md mx-auto">

          <div className="grid grid-cols-3 gap-4">

            <div className="bg-zinc-900 rounded-3xl p-5 text-center">

              <h2 className="text-3xl font-black text-green-500">
                {stats.members}
              </h2>

              <p className="text-zinc-400 text-sm mt-2">
                Member
              </p>

            </div>

            <div className="bg-zinc-900 rounded-3xl p-5 text-center">

              <h2 className="text-3xl font-black text-green-500">
                {stats.transactions}
              </h2>

              <p className="text-zinc-400 text-sm mt-2">
                Transaksi
              </p>

            </div>

            <div className="bg-zinc-900 rounded-3xl p-5 text-center">

              <h2 className="text-3xl font-black text-green-500">
                {stats.bonuses}
              </h2>

              <p className="text-zinc-400 text-sm mt-2">
                Bonus
              </p>

            </div>

          </div>

        </div>

      </section>

      <section className="px-5 py-10">

        <div className="max-w-md mx-auto">

          <h2 className="text-3xl font-black">
            Produk Paket Data
          </h2>

          <div className="space-y-5 mt-8">

            {products.map((item) => (

              <div
                key={item.id}
                className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5"
              >

                <div className="flex items-start justify-between gap-4">

                  <div>

                    <h3 className="text-2xl font-black">
                      {item.name}
                    </h3>

                    <p className="text-zinc-400 mt-2">
                      {item.provider}
                    </p>

                  </div>

                  {item.is_activation && (
                    <div className="bg-green-500 text-black text-xs font-black px-3 py-2 rounded-full">
                      Aktivasi
                    </div>
                  )}

                </div>

                <div className="grid grid-cols-2 gap-4 mt-6">

                  <div className="bg-black rounded-2xl p-4">

                    <p className="text-zinc-500 text-sm">
                      Kuota
                    </p>

                    <h4 className="text-xl font-black mt-2">
                      {item.kuota}
                    </h4>

                  </div>

                  <div className="bg-black rounded-2xl p-4">

                    <p className="text-zinc-500 text-sm">
                      Masa Aktif
                    </p>

                    <h4 className="text-xl font-black mt-2">
                      {item.masa_aktif}
                    </h4>

                  </div>

                </div>

                <div className="flex items-center justify-between mt-8">

                  <h3 className="text-3xl font-black text-green-500">
                    Rp {item.price}
                  </h3>

                  <Link
                    href="/login"
                    className="bg-green-500 text-black px-5 py-3 rounded-2xl font-black"
                  >
                    Beli
                  </Link>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>

      <section className="px-5 py-10">

        <div className="max-w-md mx-auto">

          <h2 className="text-3xl font-black">
            Cara Kerja DAN
          </h2>

          <div className="space-y-4 mt-8">

            {[
              "Daftar akun member",
              "Aktivasi member",
              "Belanja paket data",
              "Dapat bonus referral",
            ].map((item, index) => (

              <div
                key={index}
                className="bg-zinc-900 rounded-3xl p-5 flex items-center gap-5"
              >

                <div className="bg-green-500 text-black w-12 h-12 rounded-2xl flex items-center justify-center font-black">
                  {index + 1}
                </div>

                <h3 className="font-bold text-lg">
                  {item}
                </h3>

              </div>

            ))}

          </div>

        </div>

      </section>

      <section className="px-5 py-10 pb-20">

        <div className="max-w-md mx-auto">

          <h2 className="text-3xl font-black">
            Aktivitas Member
          </h2>

          <div className="space-y-4 mt-8">

            {activities.map((item) => (

              <div
                key={item.id}
                className="bg-zinc-900 rounded-3xl p-5"
              >

                <div className="flex items-center justify-between">

                  <h3 className="font-black">
                    {item.member_name}
                  </h3>

                  <p className="text-zinc-500 text-sm">
                    {new Date(
                      item.created_at
                    ).toLocaleDateString()}
                  </p>

                </div>

                <p className="text-zinc-400 mt-2">
                  {item.city}
                </p>

                <p className="text-green-500 mt-4">
                  {item.activity}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>

    </main>
  );
}
