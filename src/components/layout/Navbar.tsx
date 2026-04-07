import Link from "next/link";

import { FavoritesLink } from "@/components/layout/FavoritesLink";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-stone-200/70 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
        <Link
          href="/"
          className="rounded-full bg-stone-900 px-3 py-1.5 text-[10px] font-semibold tracking-[0.16em] text-amber-100 uppercase transition hover:bg-orange-800 sm:px-4 sm:py-2 sm:text-xs sm:tracking-[0.18em]"
        >
          CMLABS FE TEST
        </Link>
        <p className="hidden flex-1 text-sm text-stone-500 md:block">TheMealDB Ingredient Explorer</p>
        <FavoritesLink />
      </div>
    </nav>
  );
}
