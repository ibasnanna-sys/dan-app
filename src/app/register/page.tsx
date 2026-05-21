"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function RegisterPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [password, setPassword] = useState("");
  const [referral, setReferral] = useState("");

  async function handleRegister(e: any) {
    e.preventDefault();

    setLoading(true);

    try {
      // CHECK EMAIL
      const { data: emailExist } = await supabase
        .from("members")
        .select("id")
        .eq("email", email)
        .maybeSingle();

      if (emailExist) {
        alert("Email sudah terdaftar");
        setLoading(false);
        return;
      }

      // CHECK PHONE
      const { data: phoneExist } = await supabase
        .from("members")
        .select("id")
        .eq("phone", phone)
        .maybeSingle();

      if (phoneExist) {
        alert("Nomor HP sudah terdaftar");
        setLoading(false);
        return;
      }

      // CHECK REFERRAL
      let uplineId = null;

      if (referral) {
        const { data: referralData } = await supabase
          .from("members")
          .select("id")
          .eq("referral_code", referral)
          .maybeSingle();

        if (!referralData) {
          alert("Kode referral tidak ditemukan");
          setLoading(false);
          return;
        }

        uplineId = referralData.id;
      }

      // GENERATE REFERRAL CODE
      const referralCode =
        "DAN" + Math.floor(100000 + Math.random() * 900000);

      // GENERATE USER UUID
      const userId = crypto.randomUUID();

      // INSERT MEMBER
      const { error } = await supabase
        .from("members")
        .insert({
          user_id: userId,
          name,
          email,
          password,
          phone,
          city,
          referral_code: referralCode,
          upline_id: uplineId,
          status_member: "free",
          role: "member",
          balance: 0,
          inactive_flag: false,
        });

      if (error) {
        alert(error.message);
        setLoading(false);
        return;
      }

      // INSERT ACTIVITY
      await supabase.from("activity_logs").insert({
        member_name: name,
        city: city,
        activity: "Member baru bergabung",
      });

      alert("Registrasi berhasil");

      router.push("/login");
    } catch (err: any) {
      alert(err.message);
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-black text-white px-6 py-10">
      <div className="max-w-md mx-auto">
        <h1 className="text-5xl font-black leading-tight mb-3">
          DAFTAR
          <br />
          MEMBER
        </h1>

        <p className="text-zinc-400 mb-10">
          Platform paket data modern.
        </p>

        <form onSubmit={handleRegister} className="space-y-4">

          <input
            type="text"
            placeholder="Nama Lengkap"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-3xl px-5 py-4 outline-none"
          />

          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-3xl px-5 py-4 outline-none"
          />

          <input
            type="text"
            placeholder="Nomor HP"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-3xl px-5 py-4 outline-none"
          />

          <input
            type="text"
            placeholder="Kota"
            required
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-3xl px-5 py-4 outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-3xl px-5 py-4 outline-none"
          />

          <input
            type="text"
            placeholder="Kode Referral (Opsional)"
            value={referral}
            onChange={(e) => setReferral(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-3xl px-5 py-4 outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-500 transition rounded-3xl py-4 font-bold text-lg"
          >
            {loading ? "Memproses..." : "Daftar Sekarang"}
          </button>

        </form>
      </div>
    </main>
  );
}
