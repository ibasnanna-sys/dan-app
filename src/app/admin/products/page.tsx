"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminProductsPage() {

  const [products, setProducts] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [editingId, setEditingId] =
    useState<string | null>(null);

  const [form, setForm] =
    useState({
      name: "",
      provider: "",
      kuota: "",
      masa_aktif: "",
      price: "",
    });

  useEffect(() => {

    loadProducts();

  }, []);

  async function loadProducts() {

    setLoading(true);

    const { data } =
      await supabase
        const { data, error } = await supabase
  .from("products")
  .select("*")
  .not("name", "ilike", "OLD_AKTIVASI_MEMBER%")
  .order("created_at", {
    ascending: false,
  });

    setProducts(data || []);

    setLoading(false);
  }

  async function saveProduct() {

    if (
      !form.name ||
      !form.provider ||
      !form.kuota ||
      !form.masa_aktif ||
      !form.price
    ) {

      alert("Lengkapi data produk");

      return;
    }

    setSaving(true);

    if (editingId) {

      const { error } =
        await supabase
          .from("products")
          .update({
            name: form.name,
            provider:
              form.provider,
            kuota: form.kuota,
            masa_aktif:
              form.masa_aktif,
            price: Number(
              form.price
            ),
          })
          .eq("id", editingId);

      if (error) {

        alert(error.message);

        setSaving(false);

        return;
      }

      alert(
        "Produk berhasil diperbarui"
      );

    } else {

      const { error } =
        await supabase
          .from("products")
          .insert([
            {
              name: form.name,
              provider:
                form.provider,
              kuota: form.kuota,
              masa_aktif:
                form.masa_aktif,
              price: Number(
                form.price
              ),
              is_active: true,
            },
          ]);

      if (error) {

        alert(error.message);

        setSaving(false);

        return;
      }

      alert(
        "Produk berhasil ditambahkan"
      );

    }

    resetForm();

    loadProducts();

    setSaving(false);
  }

  function editProduct(item: any) {

    setEditingId(item.id);

    setForm({
      name: item.name || "",
      provider:
        item.provider || "",
      kuota: item.kuota || "",
      masa_aktif:
        item.masa_aktif || "",
      price:
        item.price?.toString() ||
        "",
    });
  }

  function resetForm() {

    setEditingId(null);

    setForm({
      name: "",
      provider: "",
      kuota: "",
      masa_aktif: "",
      price: "",
    });
  }

  async function deleteProduct(
    id: string
  ) {

    const confirmDelete =
      confirm(
        "Hapus produk ini?"
      );

    if (!confirmDelete) return;

    await supabase
      .from("products")
      .delete()
      .eq("id", id);

    loadProducts();
  }

  async function toggleStatus(
    id: string,
    status: boolean
  ) {

    await supabase
      .from("products")
      .update({
        is_active: !status,
      })
      .eq("id", id);

    loadProducts();
  }

  const activeProducts =
    products.filter(
      (item) => item.is_active
    ).length;

  const inactiveProducts =
    products.filter(
      (item) => !item.is_active
    ).length;

  if (loading) {

    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center text-xl font-bold">
        Loading...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">

      {/* BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none">

        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-green-500/10 blur-[140px]" />

        <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-green-400/10 blur-[120px]" />

      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-5 py-6 pb-32">

        {/* HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">

          <div>

            <p className="text-green-400 text-sm tracking-[5px] uppercase mb-4">
              Admin Products
            </p>

            <h1 className="text-5xl sm:text-6xl font-black leading-none">
              Kelola Produk
            </h1>

            <p className="text-zinc-500 mt-5 max-w-2xl text-lg leading-relaxed">
              Tambah, edit dan
              kelola produk digital
              realtime platform DAN.
            </p>

          </div>

          <Link
            href="/admin"
            className="h-16 px-7 rounded-3xl border border-zinc-800 bg-zinc-950 flex items-center justify-center font-black hover:border-green-500 transition-all"
          >
            Dashboard
          </Link>

        </div>

        {/* STATS */}
        <div className="grid grid-cols-3 gap-4 mb-10">

          <div className="rounded-[30px] border border-zinc-800 bg-zinc-950 p-5">

            <p className="text-zinc-500 text-sm">
              Total Produk
            </p>

            <h2 className="text-4xl font-black mt-4">
              {products.length}
            </h2>

          </div>

          <div className="rounded-[30px] border border-green-500/20 bg-green-500/10 p-5">

            <p className="text-green-300 text-sm">
              Produk Aktif
            </p>

            <h2 className="text-4xl font-black text-green-400 mt-4">
              {activeProducts}
            </h2>

          </div>

          <div className="rounded-[30px] border border-red-500/20 bg-red-500/10 p-5">

            <p className="text-red-300 text-sm">
              Nonaktif
            </p>

            <h2 className="text-4xl font-black text-red-400 mt-4">
              {inactiveProducts}
            </h2>

          </div>

        </div>

        {/* FORM */}
        <div className="rounded-[35px] border border-zinc-800 bg-zinc-950 p-6 sm:p-7 mb-10">

          <h2 className="text-3xl font-black mb-7">
            {editingId
              ? "Edit Produk"
              : "Tambah Produk"}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <input
              type="text"
              placeholder="Nama Produk"
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name:
                    e.target.value,
                })
              }
              className="h-16 rounded-2xl bg-black border border-zinc-800 px-5 outline-none focus:border-green-500"
            />

            <input
              type="text"
              placeholder="Provider"
              value={form.provider}
              onChange={(e) =>
                setForm({
                  ...form,
                  provider:
                    e.target.value,
                })
              }
              className="h-16 rounded-2xl bg-black border border-zinc-800 px-5 outline-none focus:border-green-500"
            />

            <input
              type="text"
              placeholder="Kuota"
              value={form.kuota}
              onChange={(e) =>
                setForm({
                  ...form,
                  kuota:
                    e.target.value,
                })
              }
              className="h-16 rounded-2xl bg-black border border-zinc-800 px-5 outline-none focus:border-green-500"
            />

            <input
              type="text"
              placeholder="Masa Aktif"
              value={
                form.masa_aktif
              }
              onChange={(e) =>
                setForm({
                  ...form,
                  masa_aktif:
                    e.target.value,
                })
              }
              className="h-16 rounded-2xl bg-black border border-zinc-800 px-5 outline-none focus:border-green-500"
            />

            <input
              type="number"
              placeholder="Harga"
              value={form.price}
              onChange={(e) =>
                setForm({
                  ...form,
                  price:
                    e.target.value,
                })
              }
              className="sm:col-span-2 h-16 rounded-2xl bg-black border border-zinc-800 px-5 outline-none focus:border-green-500"
            />

          </div>

          <div className="grid grid-cols-2 gap-4 mt-6">

            <button
              onClick={saveProduct}
              disabled={saving}
              className="h-16 rounded-3xl bg-green-500 text-black font-black text-xl"
            >
              {saving
                ? "Menyimpan..."
                : editingId
                ? "Update Produk"
                : "Tambah Produk"}
            </button>

            {editingId && (

              <button
                onClick={resetForm}
                className="h-16 rounded-3xl bg-zinc-800 font-black text-xl"
              >
                Batal
              </button>

            )}

          </div>

        </div>

        {/* LIST */}
        <div className="space-y-5">

          {products.map((item) => (

            <div
              key={item.id}
              className="rounded-[35px] border border-zinc-800 bg-zinc-950 p-6"
            >

              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">

                <div className="flex-1">

                  <div className="flex flex-wrap items-center gap-3">

                    <h2 className="text-3xl font-black">
                      {item.name}
                    </h2>

                    <div
                      className={`px-3 py-1 rounded-full text-xs font-black ${
                        item.is_active
                          ? "bg-green-500/20 text-green-400 border border-green-500/30"
                          : "bg-red-500/20 text-red-400 border border-red-500/30"
                      }`}
                    >
                      {item.is_active
                        ? "ACTIVE"
                        : "OFF"}
                    </div>

                  </div>

                  <p className="text-zinc-500 mt-3 text-lg">
                    {
                      item.provider
                    }
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-7">

                    <div>

                      <p className="text-zinc-500 text-sm">
                        Kuota
                      </p>

                      <h3 className="text-2xl font-black mt-2">
                        {item.kuota}
                      </h3>

                    </div>

                    <div>

                      <p className="text-zinc-500 text-sm">
                        Masa Aktif
                      </p>

                      <h3 className="text-2xl font-black mt-2">
                        {
                          item.masa_aktif
                        }
                      </h3>

                    </div>

                    <div>

                      <p className="text-zinc-500 text-sm">
                        Harga
                      </p>

                      <h3 className="text-2xl font-black text-green-400 mt-2 break-words">
                        Rp{" "}
                        {Number(
                          item.price
                        ).toLocaleString(
                          "id-ID"
                        )}
                      </h3>

                    </div>

                  </div>

                </div>

                {/* ACTION */}
                <div className="grid grid-cols-2 gap-3 lg:w-[260px]">

                  <button
                    onClick={() =>
                      editProduct(
                        item
                      )
                    }
                    className="h-14 rounded-2xl bg-green-500 text-black font-black"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      toggleStatus(
                        item.id,
                        item.is_active
                      )
                    }
                    className={`h-14 rounded-2xl font-black ${
                      item.is_active
                        ? "bg-red-500 text-white"
                        : "bg-zinc-700"
                    }`}
                  >
                    {item.is_active
                      ? "OFF"
                      : "ON"}
                  </button>

                  <button
                    onClick={() =>
                      deleteProduct(
                        item.id
                      )
                    }
                    className="col-span-2 h-14 rounded-2xl bg-zinc-800 font-black"
                  >
                    Hapus Produk
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </main>
  );
            }
