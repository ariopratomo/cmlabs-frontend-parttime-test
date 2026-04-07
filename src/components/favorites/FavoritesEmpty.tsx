import Link from "next/link";

export function FavoritesEmpty() {
  return (
    <div className="rounded-2xl border border-dashed border-stone-300 bg-white p-10 text-center">
      <p className="text-5xl">🤍</p>
      <p className="mt-4 text-base font-semibold text-stone-800">Belum ada favorit.</p>
      <p className="mt-1.5 text-sm text-stone-600">
        Klik ikon hati pada ingredient atau meal untuk menyimpannya di sini.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex rounded-full bg-stone-900 px-5 py-2.5 text-sm font-semibold text-amber-100 transition hover:bg-orange-800"
      >
        Mulai Eksplor
      </Link>
    </div>
  );
}
