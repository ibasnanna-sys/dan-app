"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleLogin(e: any) {
    e.preventDefault();

    setLoading(true);

    try {
      const { data, error } = await supabase
        .from("members")
        .select("*")
        .eq("email", email)
        .eq("password", password)
        .single();

      if (error || !data) {
        alert("Email atau password salah");
        setLoading(false);
        return;
      }

      localStorage.setItem("member_id", data.id);

      router.push("/member/dashboard");
    } catch (err: any) {
      alert(err.message);
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <h1 className="text-6xl font-black leading-none">
        LOGIN
        <br />
        MEMBER
      </h1>

      <p className="text-zinc-500 mt-5">
        Platform paket data modern.
      </p>

      <form
        onSubmit={handleLogin}
        className="mt-12"
      >
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="w-full bg-zinc-800 text-white rounded-3xl px-6 py-5 outline-none mb-5"
        />

        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="w-full bg-zinc-800 text-white rounded-3xl px-6 py-5 outline-none mb-5"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-black font-bold rounded-3xl py-5 text-xl"
        >
          {loading ? "Memproses..." : "Login"}
        </button>
      </form>
    </div>
  );
}
