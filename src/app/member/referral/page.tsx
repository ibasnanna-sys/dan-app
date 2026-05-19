"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ReferralPage() {

  const [member, setMember] =
    useState<any>(null);

  const [referrals, setReferrals] =
    useState<any[]>([]);

  const [activities, setActivities] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    loadData();

  }, []);

  async function loadData() {

    const memberId =
      localStorage.getItem("member_id");

    if (!memberId) {

      window.location.href =
        "/login";

      return;
    }

    const { data: memberData } =
      await supabase
        .from("members")
        .select("*")
        .eq("id", memberId)
        .single();

    if (!memberData) {

      window.location.href =
        "/login";

      return;
    }

    setMember(memberData);

    const { data: referralData } =
      await supabase
        .from("members")
        .select("*")
        .eq(
          "upline_code",
          memberData.referral_code
        )
        .order("created_at", {
          ascending: false,
        });

    setReferrals(referralData || []);

    const { data: activityData } =
      await supabase
        .from("activity_logs")
        .select("*")
        .order("created_at", {
          ascending: false,
        })
        .limit(10);

    setActivities(activityData || []);

    setLoading(false);
  }

  function copyCode() {

    navigator.clipboard.writeText(
      member.referral_code
    );

    alert("Kode referral disalin");
  }

  function copyLink() {

    const link =
      `${window.location.origin}/register?ref=${member.referral_code}`;

    navigator.clipboard.writeText(
      link
    );

    alert("Link referral disalin");
  }

  function shareWhatsapp() {

    const text =
      `Gabung sekarang di DAN Platform Affiliate Digital Modern 🚀%0A%0AGunakan kode referral saya: ${member.referral_code}%0A%0A${window.location.origin}/register?ref=${member.referral_code}`;

    window.open(
      `https://wa.me/?text=${text}`,
      "_blank"
    );
  }

  if (loading) {

    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  const activeReferral =
    referrals.filter(
      (item) =>
        item.status === "aktif"
    ).length;

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">

      {/* BACKGROUND */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,255,100,0.10),transparent_35%)] pointer-events-none"></div>

      <div className="relative max-w-6xl mx-auto p-5 pb-32">

        {/* HEADER */}
        <div className="flex items-start justify-between gap-4 flex-wrap">

          <div>

            <p className="text-zinc-500 text-sm tracking-[0.2em] uppercase">
              Digital Affiliate Network
            </p>

            <h1 className="text-5xl font-black mt-2 tracking-tight">
              Referral
            </h1>

            <p className="text-zinc-400 mt-4 max-w-xl leading-relaxed text-lg">
              Bangun jaringan affiliate digital modern bersama DAN dan dapatkan penghasilan tanpa batas dari setiap referral yang aktif dan bertransaksi.
            </p>

          </div>

          <div className="inline-flex items-center gap-3 px-5 py-4 rounded-full bg-green-500/10 border border-green-500/20 shadow-[0_0_30px_rgba(0,255,100,0.15)]">

            <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>

            <span className="text-green-400 font-black tracking-wide">
              LIVE NETWORK
            </span>

          </div>

        </div>

        {/* REFERRAL HERO */}
        <div className="relative overflow-hidden rounded-[40px] border border-zinc-800 bg-white/[0.03] backdrop-blur-xl p-7 mt-10 shadow-[0_0_40px_rgba(0,255,100,0.08)]">

          <div className="absolute top-0 right-0 w-56 h-56 bg-green-500/10 blur-3xl rounded-full"></div>

          <div className="relative z-10">

            <p className="text-zinc-500 text-sm">
              Referral Code
            </p>

            <h2 className="text-6xl font-black tracking-tight mt-4 text-green-400 break-words">
              {member.referral_code}
            </h2>

            <p className="text-2xl font-black leading-relaxed mt-8 max-w-3xl">
              Ayo bagikan link referralmu sekarang dan dapatkan penghasilan tanpa batas dari jaringan affiliate digital modern bersama DAN.
            </p>

            {/* BUTTONS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">

              <button
                onClick={copyCode}
                className="h-16 rounded-[24px] bg-zinc-900 border border-zinc-800 hover:border-green-500 transition font-black text-lg"
              >
                Copy Kode
              </button>

              <button
                onClick={copyLink}
                className="h-16 rounded-[24px] bg-zinc-900 border border-zinc-800 hover:border-green-500 transition font-black text-lg"
              >
                Copy Link
              </button>

              <button
                onClick={shareWhatsapp}
                className="h-16 rounded-[24px] bg-green-500 text-black font-black text-lg shadow-[0_0_30px_rgba(0,255,100,0.35)]"
              >
                Share WhatsApp
              </button>

            </div>

          </div>

        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mt-6">

          <div className="rounded-[32px] border border-zinc-800 bg-white/[0.03] backdrop-blur-xl p-5">

            <p className="text-zinc-500 text-sm">
              Total Referral
            </p>

            <h2 className="text-5xl font-black mt-5">
              {referrals.length}
            </h2>

          </div>

          <div className="rounded-[32px] border border-zinc-800 bg-white/[0.03] backdrop-blur-xl p-5">

            <p className="text-zinc-500 text-sm">
              Member Aktif
            </p>

            <h2 className="text-5xl font-black text-green-400 mt-5">
              {activeReferral}
            </h2>

          </div>

          <div className="rounded-[32px] border border-zinc-800 bg-white/[0.03] backdrop-blur-xl p-5">

            <p className="text-zinc-500 text-sm">
              Bonus Sponsor
            </p>

            <h2 className="text-5xl font-black mt-5">
              Rp 0
            </h2>

          </div>

          <div className="rounded-[32px] border border-zinc-800 bg-white/[0.03] backdrop-blur-xl p-5">

            <p className="text-zinc-500 text-sm">
              Bonus Referral
            </p>

            <h2 className="text-5xl font-black mt-5">
              Rp 0
            </h2>

          </div>

        </div>

        {/* REFERRAL LIST */}
        <div className="mt-10">

          <div className="flex items-center justify-between mb-5">

            <h2 className="text-3xl font-black">
              Referral Terbaru
            </h2>

          </div>

          <div className="space-y-4">

            {referrals.length === 0 && (

              <div className="rounded-[32px] border border-zinc-800 bg-white/[0.03] backdrop-blur-xl p-10 text-center">

                <p className="text-zinc-500 text-lg">
                  Belum ada referral
                </p>

              </div>

            )}

            {referrals.map((item) => (

              <div
                key={item.id}
                className="relative overflow-hidden rounded-[32px] border border-zinc-800 bg-white/[0.03] backdrop-blur-xl p-5"
              >

                <div className="absolute top-0 right-0 w-40 h-40 bg-green-500/5 blur-3xl rounded-full"></div>

                <div className="relative z-10 flex items-center justify-between gap-4">

                  <div>

                    <h3 className="text-2xl font-black">
                      {item.name}
                    </h3>

                    <p className="text-zinc-500 mt-2">
                      {item.city}
                    </p>

                  </div>

                  <div className="text-right">

                    <div
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-black ${
                        item.status ===
                        "aktif"
                          ? "bg-green-500/10 text-green-400 border border-green-500/20"
                          : "bg-yellow-500/10 text-yellow-300 border border-yellow-500/20"
                      }`}
                    >

                      <div
                        className={`w-2 h-2 rounded-full ${
                          item.status ===
                          "aktif"
                            ? "bg-green-400"
                            : "bg-yellow-300"
                        }`}
                      />

                      {item.status}

                    </div>

                    <p className="text-zinc-500 text-sm mt-3">
                      {new Date(
                        item.created_at
                      ).toLocaleDateString(
                        "id-ID"
                      )}
                    </p>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* LIVE ACTIVITY */}
        <div className="mt-12">

          <div className="flex items-center justify-between mb-5">

            <h2 className="text-3xl font-black">
              Pertumbuhan Jaringan
            </h2>

            <div className="flex items-center gap-2">

              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>

              <span className="text-green-400 text-sm font-black">
                LIVE
              </span>

            </div>

          </div>

          <div className="relative h-[420px] overflow-hidden rounded-[36px] border border-zinc-800 bg-zinc-950 p-4">

            <div className="animate-scroll space-y-4">

              {[...activities, ...activities].map(
                (item, index) => (

                  <div
                    key={index}
                    className="rounded-[30px] border border-zinc-800 bg-white/[0.03] backdrop-blur-xl p-5"
                  >

                    <div className="flex items-start justify-between gap-4">

                      <div>

                        <h3 className="text-2xl font-black">
                          {item.member_name}
                        </h3>

                        <p className="text-zinc-500 mt-2">
                          {item.city}
                        </p>

                      </div>

                    </div>

                    <p className="text-lg mt-5 leading-relaxed">
                      {item.activity}
                    </p>

                  </div>

                )
              )}

            </div>

          </div>

        </div>

      </div>

      <style jsx>{`
        .animate-scroll {
          animation: scrollUp 25s linear infinite;
        }

        @keyframes scrollUp {
          0% {
            transform: translateY(0%);
          }

          100% {
            transform: translateY(-50%);
          }
        }
      `}</style>

    </div>
  );
                    }
