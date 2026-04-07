import { Metadata } from "next";

import { FavoritesContent } from "@/components/favorites/FavoritesContent";

export const metadata: Metadata = {
  title: "Favorit Saya",
  description: "Daftar ingredient dan meal yang telah kamu simpan sebagai favorit.",
};

export default function FavoritesPage() {
  return (
    <main className="min-h-screen bg-[#f8f4ed] pb-16">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <FavoritesContent />
      </div>
    </main>
  );
}
