"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    city: "",
    password: "",
    sponsor: "",
  });

  async function handleRegister(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setLoading(true);

    try {
      const email =
        `${form.phone}@dan.app`;

      // cek member sudah ada
      const {
        data: existingUser,
      } = await supabase
        .from("members")
        .select("id")
        .eq("email", email)
        .single();

      if (existingUser) {
        alert(
          "Nomor WhatsApp sudah terdaftar"
        );

        setLoading(false);

        return;
      }

      // cek sponsor
      let uplineId = null;

      if (form.sponsor !== "") {
        const {
          data: sponsorData,
        } = await supabase
          .from("members")
          .select("id")
          .eq(
            "referral_code",
            form.sponsor
          )
          .single();

        if (sponsorData) {
          uplineId = sponsorData.id;
        }
      }

      // generate referral code
      const referralCode =
        "DAN" +
        Math.floor(
          100000 +
            Math.random() * 900000
        );

      // simpan member
      const { data, error } =
        await supabase
          .from("members")
          .insert([
            {
              name: form.name,
              email: email,
              phone: form.phone,
              city: form.city,
              password:
                form.password,
              referral_code:
                referralCode,
              upline_id: uplineId,
              status_member:
                "inactive",
              balance: 0,
              referral_bonus: 0,
              transaction_bonus: 0,
              inactive_flag: false,
            },
          ])
          .select()
          .single();

      if (error) {
        console.log(error);

        alert(error.message);

        setLoading(false);

        return;
      }

      // simpan session
      localStorage.setItem(
        "dan_member",
        JSON.stringify(data)
      );

      alert(
        "Pendaftaran berhasil 🚀"
      );

      window.location.href =
        "/dashboard";
    } catch (err) {
      console.log(err);

      alert(
        "Terjadi kesalahan"
      );
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-black text-white px-6 py-10">
      <div className="max-w-md mx-auto">

        <h1 className="text-5xl font-bold mb-3">
          DAFTAR MEMBER
        </h1>

        <p className="text-zinc-400 mb-10">
          Platform paket data &
          referral modern.
        </p>

        <form
          onSubmit={handleRegister}
          className="space-y-5"
        >

          <input
            type="text"
            placeholder="Nama Lengkap"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
            className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-5 py-4 outline-none"
            required
          />

          <input
            type="text"
            placeholder="Nomor WhatsApp"
            value={form.phone}
            onChange={(e) =>
              setForm({
                ...form,
                phone: e.target.value,
              })
            }
            className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-5 py-4 outline-none"
            required
          />

          <input
            type="text"
            placeholder="Kota"
            value={form.city}
            onChange={(e) =>
              setForm({
                ...form,
                city: e.target.value,
              })
            }
            className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-5 py-4 outline-none"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) =>
              setForm({
                ...form,
                password:
                  e.target.value,
              })
            }
            className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-5 py-4 outline-none"
            required
          />

          <input
            type="text"
            placeholder="Kode Sponsor (Opsional)"
            value={form.sponsor}
            onChange={(e) =>
              setForm({
                ...form,
                sponsor:
                  e.target.value,
              })
            }
            className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-5 py-4 outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 text-black font-bold py-4 rounded-2xl"
          >
            {loading
              ? "Memproses..."
              : "Daftar Sekarang"}
          </button>

        </form>

      </div>
    </main>
  );
}
