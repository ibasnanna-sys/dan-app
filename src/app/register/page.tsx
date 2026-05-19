"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function RegisterPage() {
  const router = useRouter();

  const [nama, setNama] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [kota, setKota] = useState("");
  const [password, setPassword] = useState("");
  const [sponsor, setSponsor] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister() {
    try {
      setLoading(true);

      if (!nama || !whatsapp || !kota || !password) {
        alert("Semua data wajib diisi");
        return;
      }

      const referralCode =
        "DAN" +
        Math.floor(
          100000 + Math.random() * 900000
        );

      let uplineId = null;

      if (sponsor) {
        const { data: sponsorData } = await supabase
          .from("members")
          .select("*")
          .eq("referral_code", sponsor)
          .single();

        if (sponsorData) {
          uplineId = sponsorData.id;
        }
      }

      const { error } = await supabase
        .from("members")
        .insert([
          {
            name: nama,
            whatsapp: whatsapp,
            city: kota,
            password: password,
            referral_code: referralCode,
            upline_id: uplineId,
            status_member: "inactive",
            balance: 0,
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
        <h1 className="text-5xl font-black leading-tight">
          DAFTAR
          <br />
          MEMBER
        </h1>

        <p className="text-zinc-400 mt-5 text-lg">
          Platform paket data & referral modern.
        </p>

        <div className="space-y-5 mt-10">
          <input
            type="text"
            placeholder="Nama Lengkap"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-3xl px-5 py-5 outline-none"
          />

          <input
            type="text"
            placeholder="Nomor WhatsApp"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-3xl px-5 py-5 outline-none"
          />

          <input
            type="text"
            placeholder="Kota"
            value={kota}
            onChange={(e) => setKota(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-3xl px-5 py-5 outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-3xl px-5 py-5 outline-none"
          />

          <input
            type="text"
            placeholder="Kode Sponsor (Opsional)"
            value={sponsor}
            onChange={(e) => setSponsor(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-3xl px-5 py-5 outline-none"
          />

          <button
            onClick={handleRegister}
            disabled={loading}
            className="w-full bg-green-500 text-black font-bold rounded-3xl py-5 text-xl"
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
