"use client";

import Link from "next/link";

const activities = [
  {
    name: "Andi",
    city: "Makassar",
    activity: "Belanja Paket XL 25GB",
    time: "2 menit lalu",
  },
  {
    name: "Rina",
    city: "Bandung",
    activity: "Aktivasi Member",
    time: "5 menit lalu",
  },
  {
    name: "Fajar",
    city: "Jakarta",
    activity: "Bonus Referral Masuk",
    time: "8 menit lalu",
  },
  {
    name: "Dewi",
    city: "Surabaya",
    activity: "Belanja Paket Telkomsel",
    time: "10 menit lalu",
  },
  {
    name: "Aldi",
    city: "Medan",
    activity: "Referral Baru Bergabung",
    time: "13 menit lalu",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      {/* HERO */}
      <section className="relative px-6 pt-10 pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(132,255,0,0.12),transparent_40%)]" />

        <div className="relative max-w-7xl mx-auto">
          {/* NAVBAR */}
          <div className="flex items-center justify-between mb-20">
            <div>
              <h1 className="text-4xl font-black tracking-tight">
                <span className="text-white">D</span>
                <span className="text-lime-400">A</span>
                <span className="text-white">N</span>
              </h1>

              <p className="text-zinc-500 text-sm mt-1">
                Digital Affiliate Network
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="px-5 py-2 rounded-xl border border-zinc-700 text-zinc-300 text-sm flex items-center justify-center"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="px-5 py-2 rounded-xl bg-lime-400 text-black font-semibold text-sm flex items-center justify-center shadow-[0_0_25px_rgba(132,255,0,0.35)]"
              >
                Daftar Gratis
              </Link>
            </div>
          </div>

          {/* HERO CONTENT */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* LEFT */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-lime-400/20 bg-lime-400/10 text-lime-300 text-sm mb-8">
                Platform Affiliate Digital Modern
              </div>

              <h2 className="text-5xl md:text-7xl font-black leading-tight tracking-tight mb-8">
                Bangun
                <span className="text-lime-400"> Jaringan </span>
                Digital Modern
              </h2>

              <p className="text-zinc-300 text-lg leading-8 mb-6">
                Kini membangun jaringan digital menjadi lebih mudah bersama
                DAN. Nikmati platform affiliate modern dengan produk paket data
                digital yang digunakan setiap hari, tanpa biaya pendaftaran dan
                tanpa deposit.
              </p>

              <p className="text-zinc-500 leading-8 mb-10">
                Cukup daftar, gunakan produk, bangun jaringan, dan mulai
                dapatkan bonus referral langsung dari satu aplikasi modern.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/register"
                  className="bg-lime-400 hover:bg-lime-300 transition text-black font-bold rounded-2xl px-8 py-4 text-lg shadow-[0_0_30px_rgba(132,255,0,0.35)] text-center"
                >
                  Gabung Sekarang
                </Link>

                <Link
                  href="/login"
                  className="border border-zinc-700 hover:border-lime-400 hover:text-lime-400 transition rounded-2xl px-8 py-4 text-lg text-zinc-300 text-center"
                >
                  Login Member
                </Link>
              </div>

              {/* STATS */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
                <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-5">
                  <h3 className="text-3xl font-black text-lime-400">100%</h3>
                  <p className="text-zinc-500 text-sm mt-2">
                    Gratis Daftar
                  </p>
                </div>

                <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-5">
                  <h3 className="text-3xl font-black text-lime-400">0</h3>
                  <p className="text-zinc-500 text-sm mt-2">Tanpa Deposit</p>
                </div>

                <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-5">
                  <h3 className="text-3xl font-black text-lime-400">24/7</h3>
                  <p className="text-zinc-500 text-sm mt-2">
                    Akses Aplikasi
                  </p>
                </div>

                <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-5">
                  <h3 className="text-3xl font-black text-lime-400">
                    Bonus
                  </h3>
                  <p className="text-zinc-500 text-sm mt-2">
                    Referral Modern
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT MOCKUP */}
            <div className="relative">
              <div className="absolute inset-0 bg-lime-400/20 blur-3xl rounded-full" />

              <div className="relative rounded-[40px] border border-lime-400/20 bg-zinc-950 p-6 shadow-[0_0_60px_rgba(132,255,0,0.12)]">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-2xl font-bold">
                      Live Aktivitas Member
                    </h3>

                    <p className="text-zinc-500 text-sm mt-1">
                      Realtime aktivitas member DAN
                    </p>
                  </div>

                  <div className="w-14 h-14 rounded-2xl bg-lime-400 text-black font-black flex items-center justify-center">
                    DAN
                  </div>
                </div>

                {/* CARD */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="rounded-3xl bg-black border border-zinc-800 p-5">
                    <p className="text-zinc-500 text-sm">Bonus Referral</p>

                    <h4 className="text-3xl font-black text-lime-400 mt-2">
                      Rp 520K
                    </h4>
                  </div>

                  <div className="rounded-3xl bg-black border border-zinc-800 p-5">
                    <p className="text-zinc-500 text-sm">Total Referral</p>

                    <h4 className="text-3xl font-black text-lime-400 mt-2">
                      128
                    </h4>
                  </div>
                </div>

                {/* LIVE ACTIVITY */}
                <div className="rounded-3xl border border-zinc-800 bg-black p-5 overflow-hidden">
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-lime-400 animate-pulse" />

                      <h4 className="font-bold">
                        Live Aktivitas Member
                      </h4>
                    </div>

                    <span className="text-lime-400 text-xs font-semibold">
                      REALTIME
                    </span>
                  </div>

                  <div className="h-[320px] overflow-hidden relative">
                    <div className="space-y-3 animate-[scroll_18s_linear_infinite]">
                      {[...activities, ...activities].map(
                        (item, index) => (
                          <div
                            key={index}
                            className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <h5 className="font-semibold">
                                {item.name}
                              </h5>

                              <span className="text-zinc-500 text-xs">
                                {item.time}
                              </span>
                            </div>

                            <p className="text-zinc-400 text-sm mb-1">
                              {item.city}
                            </p>

                            <p className="text-lime-400 text-sm">
                              {item.activity}
                            </p>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* KEUNTUNGAN */}
          <section className="pt-24">
            <div className="text-center mb-14">
              <h2 className="text-4xl md:text-5xl font-black mb-5">
                Kenapa Memilih DAN?
              </h2>

              <p className="text-zinc-400 max-w-2xl mx-auto text-lg leading-8">
                Platform affiliate digital modern dengan produk yang digunakan
                setiap hari dan sistem jaringan yang sederhana.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                "Gratis Pendaftaran",
                "Tanpa Deposit",
                "Bonus Referral",
                "Modern Mobile Platform",
              ].map((item, index) => (
                <div
                  key={index}
                  className="rounded-3xl border border-zinc-800 bg-zinc-950 p-7"
                >
                  <div className="w-14 h-14 rounded-2xl bg-lime-400/10 border border-lime-400/20 flex items-center justify-center text-lime-400 font-black mb-6">
                    0{index + 1}
                  </div>

                  <h3 className="text-xl font-bold">{item}</h3>
                </div>
              ))}
            </div>
          </section>

          {/* CARA KERJA */}
          <section className="pt-24">
            <div className="text-center mb-14">
              <h2 className="text-4xl md:text-5xl font-black mb-5">
                Cara Kerja DAN
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  step: "01",
                  title: "Daftar Gratis",
                },
                {
                  step: "02",
                  title: "Gunakan Produk",
                },
                {
                  step: "03",
                  title: "Bangun Jaringan",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="rounded-3xl border border-zinc-800 bg-zinc-950 p-8"
                >
                  <div className="text-5xl font-black text-lime-400 mb-6">
                    {item.step}
                  </div>

                  <h3 className="text-2xl font-bold">{item.title}</h3>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="pt-24">
            <div className="rounded-[40px] border border-lime-400/20 bg-gradient-to-br from-lime-400/10 to-black p-10 md:p-14 text-center">
              <h2 className="text-4xl md:text-6xl font-black leading-tight mb-8">
                Mulai Bersama DAN Hari Ini
              </h2>

              <p className="text-zinc-300 text-lg leading-8 max-w-2xl mx-auto mb-10">
                Daftar gratis sekarang dan nikmati pengalaman affiliate digital
                modern dengan produk paket data yang digunakan setiap hari.
              </p>

              <Link
                href="/register"
                className="bg-lime-400 hover:bg-lime-300 transition text-black font-bold rounded-2xl px-10 py-5 text-lg shadow-[0_0_30px_rgba(132,255,0,0.35)] inline-block"
              >
                Gabung Sekarang
              </Link>
            </div>
          </section>

          {/* FOOTER */}
          <footer className="py-16 text-center text-zinc-600 text-sm">
            © DAN - Digital Affiliate Network
          </footer>
        </div>
      </section>
    </main>
  );
}
