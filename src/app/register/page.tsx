"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    nama: "",
    whatsapp: "",
    kota: "",
    password: "",
  });

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    // cek whatsapp sudah ada atau belum
    const { data: cekUser } = await supabase
      .from("members")
      .select("*")
      .eq("whatsapp", form.whatsapp)
      .single();

    if (cekUser) {
      alert("Nomor WhatsApp sudah terdaftar");
      setLoading(false);
      return;
    }

    // simpan member
    const { error } = await supabase.from("members").insert([
      {
        nama: form.nama,
        whatsapp: form.whatsapp,
        kota: form.kota,
        password: form.password,
        status: "inactive",
      },
    ]);

    if (error) {
      alert("Gagal daftar");
      console.log(error);
      setLoading(false);
      return;
    }

    alert("Pendaftaran berhasil");

    setForm({
      nama: "",
      whatsapp: "",
      kota: "",
      password: "",
    });

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-black text-white px-6 py-10">
      <div className="max-w-md mx-auto">
        <h1 className="text-5xl font-bold mb-3">
          DAFTAR MEMBER
        </h1>

        <p className="text-zinc-400 mb-10">
          Platform paket data & referral modern.
        </p>

        <form
          onSubmit={handleRegister}
          className="space-y-6"
        >
          <input
            type="text"
            placeholder="Nama Lengkap"
            value={form.nama}
            onChange={(e) =>
              setForm({
                ...form,
                nama: e.target.value,
              })
            }
            className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-6 py-5 text-lg outline-none"
            required
          />

          <input
            type="text"
            placeholder="Nomor WhatsApp"
            value={form.whatsapp}
            onChange={(e) =>
              setForm({
                ...form,
                whatsapp: e.target.value,
              })
            }
            className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-6 py-5 text-lg outline-none"
            required
          />

          <input
            type="text"
            placeholder="Kota"
            value={form.kota}
            onChange={(e) =>
              setForm({
                ...form,
                kota: e.target.value,
              })
            }
            className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-6 py-5 text-lg outline-none"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) =>
              setForm({
                ...form,
                password: e.target.value,
              })
            }
            className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-6 py-5 text-lg outline-none"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 text-black font-bold text-xl py-5 rounded-2xl"
          >
            {loading ? "Memproses..." : "Daftar Sekarang"}
          </button>
        </form>
      </div>
    </main>
  );
}
