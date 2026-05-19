"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister() {
    setLoading(true);

    const referralCode =
      "DAN" + Math.floor(Math.random() * 100000);

    const { error } = await supabase
      .from("users")
      .insert([
        {
          full_name: fullName,
          phone: phone,
          referral_code: referralCode,
          status: "inactive",
        },
      ]);

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Pendaftaran berhasil!");
    setFullName("");
    setPhone("");
  }

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <div className="max-w-md mx-auto pt-10">
        <h1 className="text-3xl font-bold mb-2">
          Daftar Member DAN
        </h1>

        <p className="text-zinc-400 mb-8">
          Platform paket data & referral modern.
        </p>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Nama Lengkap"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-800"
          />

          <input
            type="text"
            placeholder="Nomor HP"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-800"
          />

          <button
            onClick={handleRegister}
            disabled={loading}
            className="w-full bg-green-500 text-black font-bold py-4 rounded-xl"
          >
            {loading ? "Loading..." : "Daftar Sekarang"}
          </button>
        </div>
      </div>
    </main>
  );
}
