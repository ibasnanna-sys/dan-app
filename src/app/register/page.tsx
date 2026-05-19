"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function RegisterPage() {

  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [city, setCity] =
    useState("");

  const [address, setAddress] =
    useState("");

  const [referral, setReferral] =
    useState("");

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
          .eq("email", email)
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
          .eq("phone", phone)
          .maybeSingle();

      if (phoneCheck.data) {

        alert(
          "Nomor HP sudah terdaftar"
        );

        setLoading(false);
        return;
      }

      let uplineId = null;

      if (referral) {

        const uplineCheck =
          await supabase
            .from("members")
            .select("id")
            .eq(
              "referral_code",
              referral
            )
            .maybeSingle();

        if (uplineCheck.data) {

          uplineId =
            uplineCheck.data.id;
        }
      }

      const insertMember =
        await supabase
          .from("members")
          .insert([
            {
              name: name,
              email: email,
              password: password,
              phone: phone,
              city: city,
              address: address,
              referral_code:
                generateReferralCode(),
              upline_id: uplineId,
              status_member: "free",
              balance: 0,
              role: "member",
              inactive_flag: false,
            },
          ])
          .select()
          .single();

      if (insertMember.error) {

        console.log(
          insertMember.error
        );

        alert(
          "Registrasi gagal"
        );

        setLoading(false);
        return;
      }

      await supabase
        .from("activity_logs")
        .insert([
          {
            member_name: name,
            city: city,
            activity:
              "Member baru bergabung",
          },
        ]);

      localStorage.setItem(
        "member",
        JSON.stringify(
          insertMember.data
        )
      );

      alert(
        "Register berhasil"
      );

      router.push(
        "/member/dashboard"
      );

    } catch (error) {

      console.log(error);

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
            REGISTER
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
              value={name}
              onChange={(e) =>
                setName(
                  e.target.value
                )
              }
              className="w-full bg-black border border-zinc-800 rounded-2xl px-5 py-4 outline-none"
            />

            <input
              type="email"
              required
              placeholder="Email"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              className="w-full bg-black border border-zinc-800 rounded-2xl px-5 py-4 outline-none"
            />

            <input
              type="password"
              required
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              className="w-full bg-black border border-zinc-800 rounded-2xl px-5 py-4 outline-none"
            />

            <input
              type="text"
              required
              placeholder="Nomor HP"
              value={phone}
              onChange={(e) =>
                setPhone(
                  e.target.value
                )
              }
              className="w-full bg-black border border-zinc-800 rounded-2xl px-5 py-4 outline-none"
            />

            <input
              type="text"
              required
              placeholder="Kota"
              value={city}
              onChange={(e) =>
                setCity(
                  e.target.value
                )
              }
              className="w-full bg-black border border-zinc-800 rounded-2xl px-5 py-4 outline-none"
            />

            <textarea
              required
              placeholder="Alamat Lengkap"
              value={address}
              onChange={(e) =>
                setAddress(
                  e.target.value
                )
              }
              className="w-full h-28 bg-black border border-zinc-800 rounded-2xl px-5 py-4 outline-none"
            />

            <input
              type="text"
              placeholder="Kode Referral"
              value={referral}
              onChange={(e) =>
                setReferral(
                  e.target.value
                )
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
