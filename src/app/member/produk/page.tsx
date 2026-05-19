"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ProdukPage() {
  const [products, setProducts] =
    useState<any[]>([]);

  useEffect(() => {
    getProducts();
  }, []);

  async function getProducts() {
    const { data } = await supabase
      .from("products")
      .select("*")
      .eq("status", true);

    if (data) {
      setProducts(data);
    }
  }

  return (
    <main className="min-h-screen bg-black text-white px-5 py-8">
      <h1 className="text-4xl font-black">
        Produk
      </h1>

      <div className="space-y-4 mt-8">

        {products.map((item) => (
          <div
            key={item.id}
            className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">
                  {item.name}
                </h2>

                <p className="text-zinc-400 mt-1">
                  {item.kuota} • {item.masa_aktif}
                </p>

                {item.is_activation && (
                  <div className="bg-green-500 text-black text-xs font-bold inline-block px-3 py-1 rounded-full mt-3">
                    Aktivasi
                  </div>
                )}
              </div>

              <div className="text-right">
                <h2 className="text-2xl font-black text-green-500">
                  Rp {item.price}
                </h2>

                <button className="bg-green-500 text-black px-5 py-2 rounded-2xl font-bold mt-3">
                  Beli
                </button>
              </div>
            </div>
          </div>
        ))}

      </div>
    </main>
  );
}
