export default function Home() {
  const activities = [
    {
      name: "Akbar",
      city: "Surabaya",
      activity: "Aktivasi Member",
      time: "2 menit lalu",
    },
    {
      name: "Dewi",
      city: "Bandung",
      activity: "Belanja Paket Unlimited",
      time: "5 menit lalu",
    },
    {
      name: "Rizky",
      city: "Makassar",
      activity: "Bonus Referral Masuk",
      time: "9 menit lalu",
    },
    {
      name: "Fajar",
      city: "Jakarta",
      activity: "Withdraw Berhasil",
      time: "12 menit lalu",
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white px-5 py-6">
      {/* HEADER */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-zinc-500 text-sm">Halo,</p>

          <h1 className="text-5xl font-black mt-1">Basri</h1>

          <div className="flex items-center gap-2 mt-4">
            <div className="w-4 h-4 rounded-full bg-yellow-400"></div>

            <span className="text-yellow-400 font-bold text-xl">
              FREE
            </span>
          </div>
        </div>

        <button className="bg-red-600 px-5 py-3 rounded-2xl font-bold">
          Logout
        </button>
      </div>

      {/* REFERRAL */}
      <div className="bg-zinc-900 rounded-3xl p-6 mt-8 border border-zinc-800">
        <p className="text-zinc-500 text-sm">Referral Code</p>

        <h2 className="text-5xl font-black mt-3">
          DAN614928
        </h2>

        <div className="flex gap-3 mt-6">
          <button className="flex-1 bg-black border border-zinc-800 py-4 rounded-2xl font-bold">
            Copy Link
          </button>

          <button className="flex-1 bg-black border border-zinc-800 py-4 rounded-2xl font-bold">
            Copy Kode
          </button>
        </div>
      </div>

      {/* INFO */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="bg-zinc-900 rounded-3xl p-5 border border-zinc-800">
          <p className="text-zinc-500 text-sm">
            Saldo Total
          </p>

          <h2 className="text-green-400 text-4xl font-black mt-4">
            Rp 0
          </h2>
        </div>

        <div className="bg-zinc-900 rounded-3xl p-5 border border-zinc-800">
          <p className="text-zinc-500 text-sm">
            Total Referral
          </p>

          <h2 className="text-4xl font-black mt-4">
            0
          </h2>
        </div>

        <div className="bg-zinc-900 rounded-3xl p-5 border border-zinc-800">
          <p className="text-zinc-500 text-sm">
            Bonus Sponsor
          </p>

          <h2 className="text-4xl font-black mt-4">
            Rp 0
          </h2>
        </div>

        <div className="bg-zinc-900 rounded-3xl p-5 border border-zinc-800">
          <p className="text-zinc-500 text-sm">
            Bonus Referral
          </p>

          <h2 className="text-4xl font-black mt-4">
            Rp 0
          </h2>
        </div>
      </div>

      {/* MENU */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        <button className="bg-green-500 text-black font-black py-5 rounded-2xl">
          Aktivasi Member
        </button>

        <button className="bg-zinc-900 border border-zinc-800 py-5 rounded-2xl font-bold">
          Transaksi
        </button>

        <button className="bg-zinc-900 border border-zinc-800 py-5 rounded-2xl font-bold">
          Referral
        </button>

        <button className="bg-zinc-900 border border-zinc-800 py-5 rounded-2xl font-bold">
          Profil
        </button>

        <button className="bg-zinc-900 border border-zinc-800 py-5 rounded-2xl font-bold">
          Bantuan
        </button>

        <button className="bg-zinc-900 border border-zinc-800 py-5 rounded-2xl font-bold">
          Withdraw
        </button>
      </div>

      {/* LIVE AKTIVITAS */}
      <div className="mt-10">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-3xl font-black">
            Aktivitas Member
          </h2>

          <span className="text-green-400 text-sm font-bold">
            LIVE
          </span>
        </div>

        <div className="space-y-4 max-h-[420px] overflow-hidden">
          <div className="animate-pulse space-y-4">
            {activities.map((item, index) => (
              <div
                key={index}
                className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-xl">
                      {item.name}
                    </h3>

                    <p className="text-zinc-500 text-sm mt-1">
                      {item.city}
                    </p>
                  </div>

                  <span className="text-zinc-500 text-sm">
                    {item.time}
                  </span>
                </div>

                <p className="mt-4 text-lg">
                  {item.activity}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
