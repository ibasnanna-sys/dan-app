"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function RegisterPage() {
  const router = useRouter();

  const [nama, setNama] = useState("");
  const [nomorWhatsapp, setNomorWhatsapp] =
    useState("");
  const [kota, setKota] = useState("");
  const [password, setPassword] =
    useState("");
  const [kodeSponsor, setKodeSponsor] =
    useState("");
  const [loading, setLoading] =
    useState(false);

  function generateReferralCode() {
    return (
      "DAN" +
      Math.floor(
        100000 + Math.random() * 900000
      )
    );
  }

  async function registerMember() {
    if (
      !nama ||
      !nomorWhatsapp ||
      !kota ||
      !password
    ) {
      alert(
        "Lengkapi semua data"
      );
      return;
    }

    setLoading(true);

    let uplineId = null;

    // cek sponsor
    if (kodeSponsor !== "") {
      const { data: sponsorData } =
        await supabase
          .from("members")
          .select("id")
          .eq(
            "referral_code",
            kodeSponsor
          )
          .single();

      if (sponsorData) {
        uplineId = sponsorData.id;
      }
    }

    // cek nomor sudah ada
    const { data: existingMember } =
      await supabase
        .from("members")
        .select("id")
        .eq(
          "phone",
          nomorWhatsapp
        )
        .single();

    if (existingMember) {
      alert(
        "Nomor WhatsApp sudah terdaftar"
      );

      setLoading(false);

      return;
    }

    // simpan member
    const { data, error } =
      await supabase
        .from("members")
        .insert([
          {
            name: nama,
            email:
              nomorWhatsapp +
              "@dan.app",

            phone: nomorWhatsapp,

            city: kota,

            password: password,

            referral_code:
              generateReferralCode(),

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
    <main className="min-h-screen bg-black text-white px-6 py-10 flex items-center">

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
            value={nama}
            onChange={(e) =>
              setNama(e.target.value)
            }
            className="w-full bg-zinc-950 border border-zinc-900 rounded-3xl px-6 py-5 text-xl outline-none"
          />

          <input
            type="text"
            placeholder="Nomor WhatsApp"
            value={nomorWhatsapp}
            onChange={(e) =>
              setNomorWhatsapp(
                e.target.value
              )
            }
            className="w-full bg-zinc-950 border border-zinc-900 rounded-3xl px-6 py-5 text-xl outline-none"
          />

          <input
            type="text"
            placeholder="Kota"
            value={kota}
            onChange={(e) =>
              setKota(e.target.value)
            }
            className="w-full bg-zinc-950 border border-zinc-900 rounded-3xl px-6 py-5 text-xl outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            className="w-full bg-zinc-950 border border-zinc-900 rounded-3xl px-6 py-5 text-xl outline-none"
          />

          <input
            type="text"
            placeholder="Kode Sponsor (Opsional)"
            value={kodeSponsor}
            onChange={(e) =>
              setKodeSponsor(
                e.target.value
              )
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

        </div>

      </div>

    </main>
  );
}
