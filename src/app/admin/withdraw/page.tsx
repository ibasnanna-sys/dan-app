{/* HEADER */}
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6 mb-10">

          <div>

            <Link
              href="/admin"
              className="inline-flex items-center gap-2 h-12 px-5 rounded-2xl border border-zinc-800 bg-zinc-950 hover:border-green-500 transition-all text-sm font-bold mb-5"
            >

              <ArrowLeft size={18} />

              Kembali

            </Link>

            <h1 className="text-4xl md:text-6xl font-black leading-tight">
              Approval
              <span className="text-green-400">
                {" "}
                Withdraw
              </span>
            </h1>

            <p className="text-zinc-500 mt-5 max-w-2xl leading-relaxed">
              Kelola approval withdraw member DAN secara realtime.
            </p>

          </div>

          <div className="h-16 px-6 rounded-3xl border border-green-500/20 bg-green-500/10 flex items-center gap-3 shadow-[0_0_35px_rgba(0,255,120,0.10)]">

            <CircleDollarSign className="text-green-400" />

            <span className="font-black text-green-400 text-lg">
              {stats.pending} Pending
            </span>

          </div>

        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-8">

          <div className="rounded-[30px] border border-zinc-800 bg-zinc-950 p-5">

            <p className="text-zinc-500 text-sm">
              Total Withdraw
            </p>

            <h2 className="text-4xl font-black mt-4">
              {stats.total}
            </h2>

          </div>

          <div className="rounded-[30px] border border-yellow-500/20 bg-yellow-500/10 p-5">

            <p className="text-yellow-200/70 text-sm">
              Pending
            </p>

            <h2 className="text-4xl font-black text-yellow-300 mt-4">
              {stats.pending}
            </h2>

          </div>

          <div className="rounded-[30px] border border-green-500/20 bg-green-500/10 p-5">

            <p className="text-green-200/70 text-sm">
              Approved
            </p>

            <h2 className="text-4xl font-black text-green-400 mt-4">
              {stats.approved}
            </h2>

          </div>

          <div className="rounded-[30px] border border-red-500/20 bg-red-500/10 p-5">

            <p className="text-red-200/70 text-sm">
              Rejected
            </p>

            <h2 className="text-4xl font-black text-red-400 mt-4">
              {stats.rejected}
            </h2>

          </div>

        </div>

        {/* FILTER */}
        <div className="rounded-[35px] border border-zinc-800 bg-zinc-950 p-5 mb-8">

          <div className="flex flex-col lg:flex-row gap-4">

            <div className="relative flex-1">

              <Search
                size={20}
                className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500"
              />

              <input
                type="text"
                placeholder="Cari member / kota / bank"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                className="w-full h-14 rounded-2xl bg-black border border-zinc-800 pl-14 pr-5 outline-none focus:border-green-500 transition"
              />

            </div>

            <select
              value={filter}
              onChange={(e) =>
                setFilter(e.target.value)
              }
              className="h-14 rounded-2xl bg-black border border-zinc-800 px-5 outline-none focus:border-green-500 transition"
            >

              <option value="all">
                Semua Status
              </option>

              <option value="pending">
                Pending
              </option>

              <option value="approved">
                Approved
              </option>

              <option value="rejected">
                Rejected
              </option>

            </select>

          </div>

        </div>

        {/* EMPTY */}
        {filteredWithdraws.length === 0 && (

          <div className="rounded-[35px] border border-zinc-800 bg-zinc-950 p-10 text-center">

            <h2 className="text-2xl font-black">
              Tidak ada withdraw
            </h2>

            <p className="text-zinc-500 mt-3">
              Data withdraw belum tersedia.
            </p>

          </div>

        )}

        {/* LIST */}
        <div className="space-y-5">

          {filteredWithdraws.map((item) => (

            <div
              key={item.id}
              className="rounded-[35px] border border-zinc-800 bg-zinc-950 p-6 hover:border-green-500/30 transition-all duration-300"
            >

              <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6">

                {/* LEFT */}
                <div className="flex-1">

                  <div className="flex flex-wrap items-center gap-3">

                    <h2 className="text-2xl md:text-3xl font-black">
                      {item.members?.name || "-"}
                    </h2>

                    <div
                      className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-[0.15em] ${
                        item.status === "approved"
                          ? "bg-green-500/20 text-green-400"
                          : item.status === "rejected"
                          ? "bg-red-500/20 text-red-400"
                          : "bg-yellow-500/20 text-yellow-300"
                      }`}
                    >

                      {item.status}

                    </div>

                  </div>

                  <div className="flex flex-wrap gap-5 mt-5 text-zinc-400 text-sm">

                    <div className="flex items-center gap-2">

                      <Wallet size={16} />

                      Rp{" "}
                      {Number(item.amount).toLocaleString("id-ID")}

                    </div>

                    <div className="flex items-center gap-2">

                      <Clock3 size={16} />

                      {new Date(item.created_at).toLocaleString("id-ID")}

                    </div>

                  </div>

                  <div className="mt-5 space-y-2 text-zinc-300">

                    <p>
                      Bank: {item.bank_name}
                    </p>

                    <p>
                      Nama: {item.account_name}
                    </p>

                    <p>
                      Rekening: {item.account_number}
                    </p>

                  </div>

                </div>

                {/* RIGHT */}
                {item.status === "pending" && (

                  <div className="flex flex-wrap gap-3">

                    <button
                      onClick={() =>
                        approveWithdraw(item)
                      }
                      className="h-14 px-6 rounded-2xl bg-green-500 hover:bg-green-400 transition-all flex items-center gap-2 font-black text-black shadow-[0_0_30px_rgba(0,255,120,0.18)]"
                    >

                      <ShieldCheck size={20} />

                      Approve

                    </button>

                    <button
                      onClick={() =>
                        rejectWithdraw(item.id)
                      }
                      className="h-14 px-6 rounded-2xl bg-red-600 hover:bg-red-500 transition-all flex items-center gap-2 font-black shadow-[0_0_30px_rgba(255,0,0,0.15)]"
                    >

                      <XCircle size={20} />

                      Reject

                    </button>

                  </div>

                )}

              </div>

            </div>

          ))}

        </div>

      </div>

    </main>
  );
}
