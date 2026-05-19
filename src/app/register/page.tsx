"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    city: "",
    password: "",
    sponsor: "",
  });

  async function handleRegister(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setLoading(true);

    const email =
      `${form.phone}@dan.app`;

    // cek member sudah ada
    const { data: existingUser } =
      await supabase
        .from("members")
        .select("id")
        .eq("email", email)
        .single();

    if (existingUser) {
      alert("Nomor WhatsApp sudah terdaftar");
      setLoading(false);
      return;
    }

    // cek sponsor
    let uplineId = null;

    if (form.sponsor !== "") {
      const { data: sponsorData } =
        await supabase
          .from("members")
          .select("id")
          .eq(
            "referral_code",
            form.sponsor
          )
          .single();

      if (sponsorData) {
        uplineId = sponsorData.id;
      }
    }

    // generate referral
    const referralCode =
      "DAN" +
      Math.floor(
        100000 + Math.random() * 900000
      );

    // simpan member
    const { error } = await supabase
      .from("members")
      .insert([
        {
          name: form.name,
          email: email,
          phone: form.phone,
          city: form.city,
          password: form.password,
          referral_code: referralCode,
          upline_id: uplineId,
          status_member: "inactive",
          balance: 0,
          referral_bonus: 0,
          transaction_bonus: 0,
          inactive_flag: false,
        },
      ]);

    setLoading(false);

    if (error) {
      console.log(error);

      alert(
        "Pendaftaran gagal"
      );

      return;
    }

    alert(
      "Pendaftaran berhasil 🚀"
    );

    window.location.href =
      "/dashboard";
  }

  return (
    <main className="min-h-screen bg-black text-white px-6 py-10">
      <div className="max-w
