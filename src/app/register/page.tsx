"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function RegisterPage() {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] = useState({
    nama: "",
    whatsapp: "",
    kota: "",
    password: "",
    sponsor: "",
  });

  function generateReferral() {
    return (
      "DAN" +
      Math.floor(
        100000 + Math.random() * 900000
      )
    );
  }

  async function registerMember() {
    if (
      !form.nama ||
      !form.whatsapp ||
      !form.kota ||
      !form.password
    ) {
      alert(
        "Lengkapi semua data"
      );
      return;
    }

    setLoading(true);

    // cek member
    const { data: existingMember } =
      await supabase
        .from("members")
        .select("id")
        .eq(
          "phone",
          form.whatsapp
        )
        .single();

    if (existingMember) {
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

    // insert member
    const { data, error } =
      await supabase
        .from("members")
        .insert([
          {
            name: form.nama,

            email:
              form.whatsapp +
              "@dan.app",

            phone:
              form.whatsapp,

            city: form.kota,

            password:
              form.password,

            referral_code:
              generateReferral(),

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

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    localStorage.setItem(
      "member",
      JSON.stringify(data)
    );

    alert(
      "Pendaftaran berhasil 🚀"
    );

    router.push("/dashboard");
  }

  return (
    <main className="min-h-screen bg-black text-white flex items-center px-6 py-10">

      <div className="w-full max-w-md mx-auto">

        <h1 className="text-6xl font-bold leading-none mb-4">
          DAFTAR
          <br />
          MEMBER
        </h1>

        <p className="text-zinc-500 text-lg mb-10">
          Platform paket data &
          referral modern.
        </p>

        <div className="space-y-5">

          <input
            type="text"
            placeholder="Nama Lengkap"
            value={form.nama}
            onChange={(e) =>
              setForm({
                ...form,
                nama:
                  e.target.value,
              })
            }
            className="w-full bg-zinc-950 border border-zinc-900 rounded-3xl px-6 py-5 text-xl outline-none"
          />

          <input
            type="text"
            placeholder="Nomor WhatsApp"
            value={form.whatsapp}
            onChange={(e) =>
              setForm({
                ...form,
                whatsapp:
                  e.target.value,
              })
            }
            className="w-full bg-zinc-950 border border-zinc-900 rounded-3xl px-6 py-5 text-xl outline-none"
          />

          <input
            type="text"
            placeholder="Kota"
            value={form.kota}
            onChange={(e) =>
              setForm({
                ...form,
                kota:
                  e.target.value,
              })
            }
            className="w-full bg-zinc-950 border border-zinc-900 rounded-3xl px-6 py-5 text-xl outline-none"
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
            className="w-full bg-zinc-950 border border-zinc-900 rounded-3xl px-6 py-5 text-xl outline-none"
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
            className="w-full bg-zinc-950 border border-zinc-900 rounded-3xl px-6 py-5 text-xl outline-none"
          />

          <button
            onClick={registerMember}
            disabled={loading}
            className="w-full bg-green-500 text-black font-bold rounded-3xl py-5 text-2xl"
          >
            {loading
              ? "Memproses..."
              : "Daftar Sekarang"}
          </button>

          <button
            onClick={() =>
              router.push("/login")
            }
            className="w-full border border-zinc-800 rounded-3xl py-5 text-lg"
          >
            Sudah punya akun? Login
          </button>

        </div>

      </div>

    </main>
  );
}
