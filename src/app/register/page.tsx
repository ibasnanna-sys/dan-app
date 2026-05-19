"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"

export default function RegisterPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  async function handleRegister() {
    setLoading(true)
    setMessage("")

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
      },
    })

    if (error) {
      setMessage(error.message)
    } else {
      setMessage("Registrasi berhasil")
    }

    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <div className="max-w-md mx-auto pt-16">
        <h1 className="text-4xl font-bold mb-2">
          Daftar Member
        </h1>

        <p className="text-zinc-400 mb-8">
          Gabung platform DIGITAL AFFILIATE NETWORK
        </p>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Nama Lengkap"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-800"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-800"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-800"
          />

          <button
            onClick={handleRegister}
            disabled={loading}
            className="w-full bg-green-500 text-black font-bold py-4 rounded-xl"
          >
            {loading ? "Loading..." : "Daftar Sekarang"}
          </button>

          {message && (
            <p className="text-center text-sm text-zinc-300">
              {message}
            </p>
          )}
        </div>
      </div>
    </main>
  )
}
