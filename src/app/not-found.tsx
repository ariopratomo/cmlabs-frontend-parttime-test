import Link from "next/link";

import { PageShell } from "@/components/layout/PageShell";

export default function NotFound() {
  return (
    <PageShell
      title="Halaman Tidak Ditemukan"
      subtitle="Data yang kamu cari tidak tersedia. Coba kembali ke halaman ingredients."
    >
      <div className="rounded-2xl border border-dashed border-stone-300 bg-white p-6">
        <p className="text-sm text-stone-700">URL tidak valid atau data dari API tidak tersedia.</p>
        <Link
          href="/"
          className="mt-4 inline-flex rounded-full bg-stone-900 px-4 py-2 text-sm font-medium text-amber-100 hover:bg-stone-800"
        >
          Kembali ke Ingredients
        </Link>
      </div>
    </PageShell>
  );
}
