"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function handleLogin() {
    try {
      setLoading(true);

      const { data, error } =
        await supabase
          .from("members")
          .select("*")
          .eq("email", email)
          .eq("password", password)
          .single();

      if (error || !data) {
        alert(
          "Email atau password salah"
        );
        return;
      }

      localStorage.setItem(
        "member",
        JSON.stringify(data)
      );

      router.push(
        "/member/dashboard"
      );
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
          LOGIN
          <br />
          MEMBER
        </h1>

        <p className="text-zinc-400 mt-4">
          Masuk ke dashboard DAN.
        </p>

        <div className="space-y-4 mt-10">
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
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full bg-zinc-900 border border-zinc-800 rounded-3xl px-5 py-4 outline-none"
          />

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-green-500 text-black font-bold rounded-3xl py-4"
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
