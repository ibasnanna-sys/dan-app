"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MemberNavbar() {
  const pathname = usePathname();

  const menus = [
    {
      name: "Dashboard",
      href: "/member/dashboard",
    },
    {
      name: "Produk",
      href: "/member/produk",
    },
    {
      name: "Referral",
      href: "/member/referral",
    },
    {
      name: "Profile",
      href: "/member/profile",
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-zinc-950 border-t border-zinc-800">

      <div className="grid grid-cols-4 max-w-md mx-auto">

        {menus.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`text-center py-4 text-sm ${
              pathname === item.href
                ? "text-green-500 font-bold"
                : "text-zinc-400"
            }`}
          >
            {item.name}
          </Link>
        ))}

      </div>

    </div>
  );
}
