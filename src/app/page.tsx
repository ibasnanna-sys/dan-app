import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white">

      <section className="px-5 pt-14 pb-10">
        <div className="max-w-md mx-auto">

          <h1 className="text-6xl font-black leading-tight">
            DAN
          </h1>

          <p className="text-green-500 text-xl mt-2 font-bold">
            Paket Data & Referral Premium
          </p>

          <p className="text-zinc-400 mt-5 leading-7">
            Platform modern untuk pembelian paket data
            dengan sistem bonus referral 1 level unlimited.
          </p>

          <div className="grid grid-cols-2 gap-4 mt-10">
            <Link
              href="/register"
              className="bg-green-500 text-black font-bold text-center py-4 rounded-3xl"
            >
              Daftar
            </Link>

            <Link
              href="/login"
              className="bg-zinc-900 border border-zinc-800 text-center py-4 rounded-3xl"
            >
              Login
            </Link>
          </div>
        </div>
      </section>

      <section className="px-5 py-10">
        <div className="max-w-md mx-auto">

          <h2 className="text-3xl font-black">
            Produk Populer
          </h2>

          <div className="space-y-4 mt-6">

            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-xl">
                    Telkomsel 10GB
                  </h3>

                  <p className="text-zinc-400 mt-1">
                    Masa aktif 30 hari
                  </p>
                </div>

                <h3 className="text-green-500 font-black text-2xl">
                  25K
                </h3>
              </div>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-xl">
                    XL 10GB
                  </h3>

                  <p className="text-zinc-400 mt-1">
                    Masa aktif 30 hari
                  </p>
                </div>

                <h3 className="text-green-500 font-black text-2xl">
                  22K
                </h3>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section className="px-5 py-10">
        <div className="max-w-md mx-auto">

          <h2 className="text-3xl font-black">
            Cara Kerja
          </h2>

          <div className="space-y-4 mt-6">

            <div className="bg-zinc-900 rounded-3xl p-5">
              Daftar Member
            </div>

            <div className="bg-zinc-900 rounded-3xl p-5">
              Aktivasi Akun
            </div>

            <div className="bg-zinc-900 rounded-3xl p-5">
              Belanja Paket Data
            </div>

            <div className="bg-zinc-900 rounded-3xl p-5">
              Dapat Bonus Referral
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}
