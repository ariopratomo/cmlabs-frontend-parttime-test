"use client";

import Link from "next/link";

import { useFavorites } from "@/hooks/useFavorites";

export function FavoritesLink() {
  const { favorites, mounted } = useFavorites();
  const count = mounted ? favorites.length : 0;

  return (
    <Link
      href="/favorites"
      className="relative flex items-center gap-1.5 rounded-full border border-stone-200 bg-white px-3 py-1.5 text-[10px] font-semibold text-stone-700 transition hover:border-orange-300 hover:text-orange-700 sm:text-xs"
    >
      <svg
        viewBox="0 0 24 24"
        className="h-3.5 w-3.5"
        fill={count > 0 ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
      <span>Favorit</span>
      {count > 0 ? (
        <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
          {count > 99 ? "99+" : count}
        </span>
      ) : null}
    </Link>
  );
}
