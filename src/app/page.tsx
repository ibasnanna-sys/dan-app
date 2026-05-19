import Link from "next/link";

const activities = [
  {
    nama: "Andi",
    kota: "Makassar",
    aktivitas: "Beli paket data",
    waktu: "2 menit lalu",
  },
  {
    nama: "Budi",
    kota: "Bone",
    aktivitas: "Aktivasi member",
    waktu: "5 menit lalu",
  },
  {
    nama: "Salsa",
    kota: "Jakarta",
    aktivitas: "Dapat bonus referral",
    waktu: "8 menit lalu",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white px-5 py-8 pb-28">
      <section className="pt-10">
        <div className="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-full px-4 py-2 mb-6">
          <div className="w-2 h-2 rounded-full bg-green-500" />
          <span className="text-sm text-zinc-300">
            Platform Referral Modern
          </span>
        </div>

        <h1 className="text-5xl font-black leading-tight">
          DIGITAL
          <br />
          AFFILIATE
          <br />
          NETWORK
        </h1>

        <p className="text-zinc-400 text-lg mt-5 leading-relaxed">
          Platform paket data modern dengan sistem referral
          otomatis dan bonus sponsor unlimited.
        </p>

        <div className="grid grid-cols-2 gap-4 mt-8">
          <Link
            href="/register"
            className="bg-green-500 text-black font-bold rounded-2xl py-4 text-center text-lg"
          >
            Daftar
          </Link>

          <Link
            href="/login"
            className="bg-zinc-900 border border-zinc-800 rounded-2xl py-4 text-center text-lg"
          >
            Login
          </Link>
        </div>
      </section>

      <section className="mt-14">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-2xl font-bold">
            Aktivitas Member Hari Ini
          </h2>

          <div className="text-green-500 text-sm">
            LIVE
          </div>
        </div>

        <div className="space-y-4">
          {activities.map((item, index) => (
            <div
              key={index}
              className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-lg">
                    {item.nama}
                  </h3>

                  <p className="text-zinc-400 mt-1">
                    {item.kota}
                  </p>
                </div>

                <span className="text-xs text-zinc-500">
                  {item.waktu}
                </span>
              </div>

              <div className="mt-4 text-green-500 font-semibold">
                {item.aktivitas}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-2xl font-bold mb-6">
          Keuntungan Member
        </h2>

        <div className="space-y-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5">
            <h3 className="font-bold text-xl">
              Bonus Sponsor
            </h3>

            <p className="text-zinc-400 mt-2">
              Dapat bonus otomatis dari referral langsung.
            </p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5">
            <h3 className="font-bold text-xl">
              Bonus Transaksi
            </h3>

            <p className="text-zinc-400 mt-2">
              Bonus masuk dari transaksi member jaringan.
            </p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5">
            <h3 className="font-bold text-xl">
              1 Level Unlimited
            </h3>

            <p className="text-zinc-400 mt-2">
              Tidak ada batas referral langsung.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-2xl font-bold mb-6">
          Cara Kerja
        </h2>

        <div className="space-y-4">
          <div className="bg-zinc-900 rounded-3xl p-5 border border-zinc-800">
            <div className="text-green-500 font-black text-2xl">
              01
            </div>

            <h3 className="font-bold text-xl mt-3">
              Daftar Member
            </h3>

            <p className="text-zinc-400 mt-2">
              Buat akun member DAN dalam hitungan detik.
            </p>
          </div>

          <div className="bg-zinc-900 rounded-3xl p-5 border border-zinc-800">
            <div className="text-green-500 font-black text-2xl">
              02
            </div>

            <h3 className="font-bold text-xl mt-3">
              Aktivasi Member
            </h3>

            <p className="text-zinc-400 mt-2">
              Aktivasi akun menggunakan produk aktivasi.
            </p>
          </div>

          <div className="bg-zinc-900 rounded-3xl p-5 border border-zinc-800">
            <div className="text-green-500 font-black text-2xl">
              03
            </div>

            <h3 className="font-bold text-xl mt-3">
              Belanja Paket Data
            </h3>

            <p className="text-zinc-400 mt-2">
              Mulai transaksi dan dapat bonus otomatis.
            </p>
          </div>
        </div>
      </section>

      <footer className="mt-16 text-center text-zinc-500 text-sm">
        © 2026 DIGITAL AFFILIATE NETWORK
      </footer>
    </main>
  );
}
