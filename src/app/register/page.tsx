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
          .eq("
