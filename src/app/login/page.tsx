"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");

  const [password, setPassword] =
    useState("");

  async function handleLogin(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setLoading(true);

    try {
      const { data } =
        await supabase
          .from("members")
          .select("*")
          .eq("email", email)
          .eq("password", password)
          .maybeSingle();

      if (!data) {
        alert(
          "Email atau password salah"
        );

        setLoading(false);
        return;
      }

      localStorage.setItem(
        "member",
        JSON.stringify(data)
      );

      alert("Login berhasil");

      router.push(
        "/member/dashboard"
      );

    } catch {
      alert(
        "Terjadi kesalahan sistem"
      );
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-black text-white px-5 py-10">
      <div className="max-w-md mx-auto">

        <div className="bg-zinc-900 border border-zinc-800 rounded-[40px] p-8">

          <h1 className="text-5xl font-black leading-tight">
            LOGIN
            <br />
            MEMBER
          </h1>

          <p className="text-zinc-400 mt-4">
            Masuk ke dashboard DAN.
          </p>

          <form
            onSubmit={handleLogin}
            className="space-y-5 mt-10"
          >

            <input
              type="email"
              required
              placeholder="Email"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              className="w-full bg-black border border-zinc-800 rounded-2xl px-5 py-4 outline-none"
            />

            <input
              type="password"
              required
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              className="w-full bg-black border border-zinc-800 rounded-2xl px-5 py-4 outline-none"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-500 text-black rounded-2xl py-4 font-black text-lg"
            >
              {loading
                ? "Memproses..."
                : "Login Sekarang"}
            </button>

          </form>

          <div className="text-center mt-8">

            <p className="text-zinc-400">
              Belum punya akun?
            </p>

            <Link
              href="/register"
              className="text-green-500 font-bold inline-block mt-2"
            >
              Daftar di sini
            </Link>

          </div>

        </div>

      </div>
    </main>
  );
}
