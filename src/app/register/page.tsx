export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-black text-white p-6">
      <div className="max-w-md mx-auto pt-10">
        <h1 className="text-3xl font-bold mb-6">
          Daftar Member DAN
        </h1>

        <form className="space-y-4">
          <input
            type="text"
            placeholder="Nama Lengkap"
            className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-800"
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-800"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-800"
          />

          <button className="w-full bg-green-500 text-black font-bold p-4 rounded-xl">
            Daftar Sekarang
          </button>
        </form>
      </div>
    </main>
  )
}


