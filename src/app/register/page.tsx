"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"

export default function RegisterPage() {
  const [nama, setNama] = useState("")
  const [nomorHp, setNomorHp] = useState("")
  const [kota, setKota] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [pesan, setPesan] = useState("")

  async function handleRegister(
    e: React.FormEvent
  ) {
    e.preventDefault()

    setLoading(true)
    setPesan("")

    const kodeReferral =
      "DAN" + Math.floor(Math.random() * 100000)

    const { error } = await supabase
      .from("users")
      .insert([
        {
          full_name: nama,
          phone: nomorHp,
          city: kota,
          referral_code: kodeReferral,
          status: "inactive",
        },
      ])

    setLoading(false)

    if (error) {
      setPesan(error.message)
    } else {
      setPesan("Pendaftaran berhasil 🚀")

      setTimeout(() => {
        window.location.href = "/dashboard"
      }, 1000)
    }
  }

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <div className="max-w-md mx-auto pt-16">
        <h1 className="text-4xl font-bold mb-2">
          DAFTAR MEMBER
        </h1>

        <p className="text-zinc-400 mb-10">
          Platform paket data & referral modern.
        </p>

        <form
          onSubmit={handleRegister}
          className="space-y-5"
        >
          <input
            type="text"
            placeholder="Nama Lengkap"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4 outline-none"
            required
          />

          <input
            type="text"
            placeholder="Nomor WhatsApp"
            value={nomorHp}
            onChange={(e) => setNomorHp(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4 outline-none"
            required
          />

          <input
            type="text"
            placeholder="Kota"
            value={kota}
            onChange={(e) => setKota(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4 outline-none"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4 outline-none"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 text-black font-bold py-4 rounded-xl"
          >
            {loading ? "Loading..." : "Daftar Sekarang"}
          </button>
        </form>

        {pesan && (
          <p className="mt-6 text-center text-sm text-zinc-300">
            {pesan}
          </p>
        )}
      </div>
    </main>
  )
}
