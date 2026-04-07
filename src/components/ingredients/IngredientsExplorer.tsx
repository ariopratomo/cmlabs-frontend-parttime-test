"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

import { FavoriteButton } from "@/components/ui/FavoriteButton";
import { SearchInput } from "@/components/ui/SearchInput";
import { Ingredient } from "@/types/mealdb";

const PAGE_SIZE = 18;

type IngredientsExplorerProps = {
  ingredients: Ingredient[];
};

export function IngredientsExplorer({ ingredients }: IngredientsExplorerProps) {
  const [query, setQuery] = useState("");
  const [activeLetter, setActiveLetter] = useState("ALL");
  const [page, setPage] = useState(1);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const alphabet = useMemo(() => {
    const letters = new Set<string>();
    ingredients.forEach((ingredient) => {
      const first = ingredient.strIngredient.charAt(0).toUpperCase();
      if (first) letters.add(first);
    });
    return ["ALL", ...Array.from(letters).sort((a, b) => a.localeCompare(b))];
  }, [ingredients]);

  const filteredIngredients = useMemo(() => {
    const normalized = query.toLowerCase().trim();
    return ingredients
      .filter((ingredient) => {
        if (activeLetter === "ALL") return true;
        return ingredient.strIngredient.toUpperCase().startsWith(activeLetter);
      })
      .filter((ingredient) => {
        if (!normalized) return true;
        return ingredient.strIngredient.toLowerCase().includes(normalized);
      })
      .sort((a, b) => a.strIngredient.localeCompare(b.strIngredient));
  }, [activeLetter, ingredients, query]);

  // Reset to page 1 whenever filter/search changes
  useEffect(() => {
    setPage(1);
  }, [query, activeLetter]);

  const visibleIngredients = filteredIngredients.slice(0, page * PAGE_SIZE);
  const hasMore = visibleIngredients.length < filteredIngredients.length;

  // Infinite scroll: observe sentinel div
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && hasMore) {
          setPage((p) => p + 1);
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasMore]);

  return (
    <section className="space-y-6">
      <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
        <SearchInput
          label="Search Ingredients by Name"
          placeholder="Contoh: chicken, lemon, garlic"
          value={query}
          onChange={setQuery}
        />

        <div className="mt-4 flex flex-wrap items-center gap-2">
          {alphabet.map((letter) => {
            const isActive = letter === activeLetter;
            return (
              <button
                key={letter}
                type="button"
                onClick={() => setActiveLetter(letter)}
                className={`rounded-full border px-3 py-1 text-xs font-semibold tracking-[0.12em] uppercase transition ${
                  isActive
                    ? "border-stone-900 bg-stone-900 text-amber-100"
                    : "border-stone-300 bg-white text-stone-700 hover:border-orange-400 hover:text-orange-700"
                }`}
              >
                {letter}
              </button>
            );
          })}
        </div>
      </div>

      <p className="text-sm text-stone-700">
        Menampilkan <strong>{visibleIngredients.length}</strong> dari{" "}
        <strong>{filteredIngredients.length}</strong> ingredient
        {activeLetter !== "ALL" ? ` dengan awalan ${activeLetter}` : ""}.
      </p>

      {filteredIngredients.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-stone-300 bg-white p-8 text-sm text-stone-600">
          Ingredient tidak ditemukan. Coba ubah kata kunci atau klik filter alfabet lain.
        </div>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {visibleIngredients.map((ingredient, index) => (
              <Link
                key={ingredient.strIngredient}
                href={`/ingredients/${encodeURIComponent(ingredient.strIngredient)}`}
                style={{ animationDelay: `${Math.min((index % PAGE_SIZE) * 40, 400)}ms` }}
                className="animate-stagger group overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:border-orange-300 hover:shadow-md"
              >
                {/* Thumbnail */}
                <div className="relative flex h-36 items-center justify-center overflow-hidden bg-gradient-to-br from-orange-50 to-amber-50">
                  <Image
                    src={`https://www.themealdb.com/images/ingredients/${encodeURIComponent(ingredient.strIngredient)}-Small.png`}
                    alt={ingredient.strIngredient}
                    width={100}
                    height={100}
                    className="object-contain drop-shadow-sm transition duration-300 group-hover:scale-110"
                  />
                  <div className="absolute right-2 top-2">
                    <FavoriteButton
                      item={{ type: "ingredient", id: ingredient.strIngredient, name: ingredient.strIngredient }}
                    />
                  </div>
                </div>
                {/* Text */}
                <div className="p-4">
                  <p className="text-xs font-semibold tracking-[0.18em] text-orange-700 uppercase">
                    Ingredient
                  </p>
                  <h2 className="mt-1.5 text-base font-semibold text-stone-900 transition group-hover:text-orange-700">
                    {ingredient.strIngredient}
                  </h2>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-stone-600">
                    {ingredient.strDescription ?? "No description available from API."}
                  </p>
                  <p className="mt-3 text-xs font-semibold tracking-[0.14em] text-stone-400 uppercase transition group-hover:text-orange-700">
                    Explore Meals →
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* Sentinel */}
          <div ref={sentinelRef} />

          {/* Skeleton cards while loading next batch */}
          {hasMore ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
                  <div className="h-36 animate-pulse bg-gradient-to-br from-stone-100 to-stone-200" />
                  <div className="space-y-2.5 p-4">
                    <div className="h-2.5 w-16 animate-pulse rounded-full bg-orange-100" />
                    <div className="h-4 w-3/4 animate-pulse rounded-full bg-stone-200" />
                    <div className="h-3 w-full animate-pulse rounded-full bg-stone-100" />
                    <div className="h-3 w-2/3 animate-pulse rounded-full bg-stone-100" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="py-2 text-center text-sm text-stone-400">
              Semua {filteredIngredients.length} ingredient sudah ditampilkan.
            </p>
          )}
        </>
      )}
    </section>
  );
}
