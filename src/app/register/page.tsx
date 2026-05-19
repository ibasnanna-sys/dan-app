"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function RegisterPage() {

  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    address: "",
    password: "",
    referral: "",
  });

  useEffect(() => {

    const params =
      new URLSearchParams(
        window.location.search
      );

    const ref =
      params.get("ref");

    if (ref) {
      setForm((prev) => ({
        ...prev,
        referral: ref,
      }));
    }

  }, []);

  function generateReferralCode() {

    const random =
      Math.floor(
        100000 + Math.random() * 900000
      );

    return `DAN${random}`;
  }

  async function handleRegister(
    e: React.FormEvent
  ) {

    e.preventDefault();

    setLoading(true);

    try {

      const emailCheck =
        await supabase
          .from("members")
          .select("id")
          .eq("email", form.email)
          .maybeSingle();

      if (emailCheck.data) {

        alert(
          "Email sudah terdaftar"
        );

        setLoading(false);
        return;
      }

      const phoneCheck =
        await supabase
          .from("members")
          .select("id")
          .eq("phone", form.phone)
          .maybeSingle();

      if (phoneCheck.data) {

        alert(
          "Nomor HP sudah terdaftar"
        );

        setLoading(false);
        return;
      }

      let uplineId = null;

      if (form.referral) {

        const { data: upline } =
          await supabase
            .from("members")
            .select("*")
            .eq(
              "referral_code",
              form.referral
            )
            .maybeSingle();

        if (upline) {

          uplineId = upline.id;

          await supabase
            .from("members")
            .update({
              total_referral:
                (upline.total_referral || 0) + 1,
            })
            .eq("id", upline.id);
        }
      }

      const referralCode =
        generateReferralCode();

      const { data, error } =
        await supabase
          .from("members")
          .insert([
            {
              name: form.name,
              email: form.email,
              phone: form.phone,
              city: form.city,
              address: form.address,
              password: form.password,
              referral_code:
                referralCode,
              upline_id: uplineId,
              status_member: "free",
              balance: 0,
              total_bonus_sponsor: 0,
              total_bonus_referral: 0,
              total_referral: 0,
              inactive_flag: false,
            },
          ])
          .select()
          .single();

      if (error) {

        alert(
          "Register gagal"
        );

        setLoading(false);
        return;
      }

      await supabase
        .from("activity_logs")
        .insert([
          {
            member_name:
              form.name,
            city: form.city,
            activity:
              "Member baru bergabung",
          },
        ]);

      localStorage.setItem(
        "member",
        JSON.stringify(data)
      );

      alert(
        "Register berhasil"
      );

      router.push(
        "/member/dashboard"
      );

    } catch (error) {

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
            DAFTAR
            <br />
            MEMBER
          </h1>

          <p className="text-zinc-400 mt-4">
            Platform paket data &
            referral modern.
          </p>

          <form
            onSubmit={handleRegister}
            className="space-y-5 mt-10"
          >

            <input
              type="text"
              required
              placeholder="Nama Lengkap"
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
              className="w-full bg-black border border-zinc-800 rounded-2xl px-5 py-4 outline-none"
            />

            <input
              type="email"
              required
              placeholder="Email"
              value={form.email}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
              className="w-full bg-black border border-zinc-800 rounded-2xl px-5 py-4 outline-none"
            />

            <input
              type="text"
              required
              placeholder="Nomor HP"
              value={form.phone}
              onChange={(e) =>
                setForm({
                  ...form,
                  phone: e.target.value,
                })
              }
              className="w-full bg-black border border-zinc-800 rounded-2xl px-5 py-4 outline-none"
            />

            <input
              type="text"
              required
              placeholder="Kota"
              value={form.city}
              onChange={(e) =>
                setForm({
                  ...form,
                  city: e.target.value,
                })
              }
              className="w-full bg-black border border-zinc-800 rounded-2xl px-5 py-4 outline-none"
            />

            <textarea
              required
              placeholder="Alamat Lengkap"
              value={form.address}
              onChange={(e) =>
                setForm({
                  ...form,
                  address:
                    e.target.value,
                })
              }
              className="w-full h-28 bg-black border border-zinc-800 rounded-2xl px-5 py-4 outline-none"
            />

            <input
              type="password"
              required
              placeholder="Password"
              value={form.password}
              onChange={(e) =>
                setForm({
                  ...form,
                  password:
                    e.target.value,
                })
              }
              className="w-full bg-black border border-zinc-800 rounded-2xl px-5 py-4 outline-none"
            />

            <input
              type="text"
              placeholder="Kode Referral"
              value={form.referral}
              onChange={(e) =>
                setForm({
                  ...form,
                  referral:
                    e.target.value,
                })
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
                : "Daftar Sekarang"}
            </button>

          </form>

          <div className="text-center mt-8">

            <p className="text-zinc-400">
              Sudah punya akun?
            </p>

            <Link
              href="/login"
              className="text-green-500 font-bold inline-block mt-2"
            >
              Login di sini
            </Link>

          </div>

        </div>

      </div>

    </main>
  );
}
