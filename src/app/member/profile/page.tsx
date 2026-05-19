"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();

  const [member, setMember] =
    useState<any>(null);

  useEffect(() => {
    const data =
      localStorage.getItem("member");

    if (data) {
      setMember(JSON.parse(data));
    }
  }, []);

  function logout() {
    localStorage.removeItem("member");

    router.push("/login");
  }

  if (!member) return null;

  return (
    <main className="min-h-screen bg-black text-white px-5 py-8">

      <h1 className="text-4xl font-black">
        Profile
      </h1>

      <div className="space-y-4 mt-8">

        <div className="bg-zinc-900 rounded-3xl p-5">
          <p className="text-zinc-400">
            Nama
          </p>

          <h2 className="text-2xl font-bold mt-2">
            {member.name}
          </h2>
        </div>

        <div className="bg-zinc-900 rounded-3xl p-5">
          <p className="text-zinc-400">
            Email
          </p>

          <h2 className="text-2xl font-bold mt-2">
            {member.email}
          </h2>
        </div>

        <button
          onClick={logout}
          className="w-full bg-red-500 text-white font-bold py-4 rounded-3xl"
        >
          Logout
        </button>

      </div>

    </main>
  );
}
