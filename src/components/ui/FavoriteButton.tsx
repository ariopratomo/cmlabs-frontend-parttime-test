"use client";

import { MouseEvent } from "react";

import { useFavorites } from "@/hooks/useFavorites";
import { FavoriteItem } from "@/types/favorites";

type FavoriteButtonProps = {
  item: FavoriteItem;
  className?: string;
  size?: "sm" | "lg";
};

export function FavoriteButton({ item, className = "", size = "sm" }: FavoriteButtonProps) {
  const { toggle, isFavorited, mounted } = useFavorites();
  const active = mounted && isFavorited(item.id, item.type);

  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggle(item);
  };

  const sizeClasses = size === "lg"
    ? "h-10 w-10 gap-2 px-3 rounded-full text-sm font-medium"
    : "h-8 w-8 rounded-full";

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={active ? "Hapus dari favorit" : "Tambah ke favorit"}
      className={`flex items-center justify-center shadow-sm backdrop-blur-sm transition duration-200 ${sizeClasses} ${
        active
          ? "bg-red-50 text-red-500 hover:bg-red-100"
          : "bg-white/80 text-stone-400 hover:bg-white hover:text-red-400"
      } ${className}`}
    >
      <svg
        viewBox="0 0 24 24"
        className={size === "lg" ? "h-5 w-5" : "h-4 w-4"}
        fill={active ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    </button>
  );
}
