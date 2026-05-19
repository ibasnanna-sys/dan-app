"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();

  const [nomorWhatsapp,
    setNomorWhatsapp] =
    useState("");

  const [password,
    setPassword] =
    useState("");

  const [loading,
    setLoading] =
    useState(false);

  async function loginMember() {
    if (
      !nomorWhatsapp ||
      !password
    ) {
      alert(
        "Lengkapi data login"
      );

      return;
    }

    setLoading(true);

    const { data, error } =
      await supabase
        .from("members")
        .select("*")
        .eq(
          "phone",
          nomorWhatsapp
        )
        .eq(
          "password",
          password
        )
        .single();

    setLoading(false);

    if (error || !data) {
      alert(
        "Nomor WhatsApp atau password salah"
      );

      return;
    }

    localStorage.setItem(
      "member",
      JSON.stringify(data)
    );

    alert("Login berhasil 🚀");

    router.push("/dashboard");
  }

  return (
    <main className="min-h-screen bg-black text-white flex items-center px-6 py-10">

      <div className="w-full max-w-md mx-auto">

        <h1 className="text-6xl font-bold leading-none mb-4">
          LOGIN
          <br />
          MEMBER
        </h1>

        <p className="text-zinc-500 text-lg mb-10">
          Masuk ke dashboard member DAN.
        </p>

        <div className="space-y-5">

          <input
            type="text"
            placeholder="Nomor WhatsApp"
            value={
              nomorWhatsapp
            }
            onChange={(e) =>
              setNomorWhatsapp(
                e.target.value
              )
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

          <button
            onClick={loginMember}
            disabled={loading}
            className="w-full bg-green-500 text-black font-bold rounded-3xl py-5 text-2xl"
          >
            {loading
              ? "Memproses..."
              : "Login Sekarang"}
          </button>

        </div>

      </div>

    </main>
  );
}
