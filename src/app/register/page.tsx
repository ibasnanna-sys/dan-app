"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { supabase } from "@/lib/supabase";

export default function RegisterPage() {

  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [city, setCity] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [referral, setReferral] =
    useState("");

  /*
  =====================================================
  REGISTER
  =====================================================
  */

  async function handleRegister(
    e: any
  ) {

    e.preventDefault();

    setLoading(true);

    try {

      /*
      =====================================================
      CLEAN DATA
      =====================================================
      */

      const cleanName =
        name.trim();

      const cleanEmail =
        email
          .trim()
          .toLowerCase();

      const cleanPhone =
        phone.trim();

      const cleanCity =
        city.trim();

      /*
      =====================================================
      CHECK EMAIL
      =====================================================
      */

      const {
        data: emailExist,
        error: emailError,
      } =
        await supabase
          .from("members")
          .select("id")
          .eq(
            "email",
            cleanEmail
          )
          .maybeSingle();

      if (emailError) {

        alert(
          emailError.message
        );

        setLoading(false);

        return;
      }

      if (emailExist) {

        alert(
          "Email sudah terdaftar"
        );

        setLoading(false);

        return;
      }

      /*
      =====================================================
      CHECK PHONE
      =====================================================
      */

      const {
        data: phoneExist,
        error: phoneError,
      } =
        await supabase
          .from("members")
          .select("id")
          .eq(
            "phone",
            cleanPhone
          )
          .maybeSingle();

      if (phoneError) {

        alert(
          phoneError.message
        );

        setLoading(false);

        return;
      }

      if (phoneExist) {

        alert(
          "Nomor HP sudah terdaftar"
        );

        setLoading(false);

        return;
      }

      /*
      =====================================================
      CHECK REFERRAL
      =====================================================
      */

      let uplineId =
        null;

      if (
        referral.trim()
      ) {

        const {
          data: referralData,
        } =
          await supabase
            .from("members")
            .select("id")
            .eq(
              "referral_code",
              referral.trim()
            )
            .maybeSingle();

        if (
          !referralData
        ) {

          alert(
            "Kode referral tidak ditemukan"
          );

          setLoading(false);

          return;
        }

        uplineId =
          referralData.id;
      }

      /*
      =====================================================
      CREATE AUTH USER
      =====================================================
      */

      const {
        data: authData,
        error: authError,
      } =
        await supabase.auth.signUp({

          email:
            cleanEmail,

          password:
            password,

        });

      if (authError) {

        alert(
          authError.message
        );

        setLoading(false);

        return;
      }

      const authUser =
        authData.user;

      if (!authUser) {

        alert(
          "Gagal membuat akun"
        );

        setLoading(false);

        return;
      }

      /*
      =====================================================
      GENERATE REFERRAL
      =====================================================
      */

      const referralCode =
        "DAN" +
        Math.floor(
          100000 +
          Math.random() *
            900000
        );

      /*
      =====================================================
      INSERT MEMBER
      =====================================================
      */

      const {
        error: insertError,
      } =
        await supabase
          .from("members")
          .insert({

            user_id:
              authUser.id,

            name:
              cleanName,

            email:
              cleanEmail,

            phone:
              cleanPhone,

            city:
              cleanCity,

            referral_code:
              referralCode,

            upline_id:
              uplineId,

            status_member:
              "free",

            role:
              "member",

            balance:
              0,

            inactive_flag:
              false,

          });

      if (insertError) {

        alert(
          insertError.message
        );

        setLoading(false);

        return;
      }

      /*
      =====================================================
      ACTIVITY LOG
      =====================================================
      */

      await supabase
        .from(
          "activity_logs"
        )
        .insert({

          member_name:
            cleanName,

          city:
            cleanCity,

          activity:
            "Member baru bergabung",

        });

      /*
      =====================================================
      SUCCESS
      =====================================================
      */

      alert(
        "Registrasi berhasil"
      );

      router.push(
        "/login"
      );

    } catch (
      err: any
    ) {

      console.error(
        err
      );

      alert(
        err.message ||
        "Terjadi kesalahan"
      );

    } finally {

      setLoading(false);
    }
  }

  return (

    <main className="min-h-screen bg-black text-white px-6 py-10">

      <div className="max-w-md mx-auto">

        <h1 className="text-5xl font-black leading-tight mb-3">

          DAFTAR
          <br />
          MEMBER

        </h1>

        <p className="text-zinc-400 mb-10">

          Platform paket data modern.

        </p>

        <form
          onSubmit={
            handleRegister
          }
          className="space-y-4"
        >

          <input
            type="text"
            placeholder="Nama Lengkap"
            required
            value={name}
            onChange={(e) =>
              setName(
                e.target.value
              )
            }
            className="w-full bg-zinc-900 border border-zinc-800 rounded-3xl px-5 py-4 outline-none"
          />

          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            className="w-full bg-zinc-900 border border-zinc-800 rounded-3xl px-5 py-4 outline-none"
          />

          <input
            type="text"
            placeholder="Nomor HP"
            required
            value={phone}
            onChange={(e) =>
              setPhone(
                e.target.value
              )
            }
            className="w-full bg-zinc-900 border border-zinc-800 rounded-3xl px-5 py-4 outline-none"
          />

          <input
            type="text"
            placeholder="Kota"
            required
            value={city}
            onChange={(e) =>
              setCity(
                e.target.value
              )
            }
            className="w-full bg-zinc-900 border border-zinc-800 rounded-3xl px-5 py-4 outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            className="w-full bg-zinc-900 border border-zinc-800 rounded-3xl px-5 py-4 outline-none"
          />

          <input
            type="text"
            placeholder="Kode Referral (Opsional)"
            value={referral}
            onChange={(e) =>
              setReferral(
                e.target.value
              )
            }
            className="w-full bg-zinc-900 border border-zinc-800 rounded-3xl px-5 py-4 outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-500 transition rounded-3xl py-4 font-bold text-lg"
          >

            {loading
              ? "Memproses..."
              : "Daftar Sekarang"}

          </button>

        </form>

      </div>

    </main>
  );
}
