"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function RegisterPage() {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] =
    useState("");
  const [phone, setPhone] =
    useState("");
  const [city, setCity] = useState("");
  const [password, setPassword] =
    useState("");
  const [referral, setReferral] =
    useState("");

  async function handleRegister() {
    try {
      setLoading(true);

      if (
        !name ||
        !email ||
        !phone ||
        !city ||
        !password
      ) {
        alert("Semua data wajib diisi");
        return;
      }

      let uplineId = null;

      if (referral) {
        const { data: sponsor } =
          await supabase
            .from("members")
            .select("*")
            .eq(
              "referral_code",
              referral
            )
            .single();

        if (sponsor) {
          uplineId = sponsor.id;
        }
      }

      const referralCode =
        "DAN" +
        Math.floor(
          100000 +
            Math.random() * 900000
        );

      const { error } =
        await supabase
          .from("members")
          .insert([
            {
              name,
              email,
              phone,
              city,
              password,
              referral_code:
                referralCode,
              upline_id: uplineId,
              status_member: "free",
            },
          ]);

      if (error) {
        alert(error.message);
        return;
      }

      alert("Pendaftaran berhasil");

      router.push("/login");
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-black text-white px-5 py-10">
      <div className="max-w-md mx-auto">
        <h1 className="text-5xl font-black">
          DAFTAR
          <br />
          MEMBER
        </h1>

        <p className="text-zinc-400 mt-4">
          Platform paket data modern.
        </p>

        <div className="space-y-4 mt-10">
          <input
            type="text"
            placeholder="Nama Lengkap"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="w-full bg-zinc-900 border border-zinc-800 rounded-3xl px-5 py-4 outline-none"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full bg-zinc-900 border border-zinc-800 rounded-3xl px-5 py-4 outline-none"
          />

          <input
            type="text"
            placeholder="Nomor HP"
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value)
            }
            className="w-full bg-zinc-900 border border-zinc-800 rounded-3xl px-5 py-4 outline-none"
          />

          <input
            type="text"
            placeholder="Kota"
            value={city}
            onChange={(e) =>
              setCity(e.target.value)
            }
            className="w-full bg-zinc-900 border border-zinc-800 rounded-3xl px-5 py-4 outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full bg-zinc-900 border border-zinc-800 rounded-3xl px-5 py-4 outline-none"
          />

          <input
            type="text"
            placeholder="Kode Referral"
            value={referral}
            onChange={(e) =>
              setReferral(e.target.value)
            }
            className="w-full bg-zinc-900 border border-zinc-800 rounded-3xl px-5 py-4 outline-none"
          />

          <button
            onClick={handleRegister}
            disabled={loading}
            className="w-full bg-green-500 text-black font-bold rounded-3xl py-4"
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
