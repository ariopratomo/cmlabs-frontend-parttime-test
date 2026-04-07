"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

import { FavoriteButton } from "@/components/ui/FavoriteButton";
import { SearchInput } from "@/components/ui/SearchInput";
import { MealSummary } from "@/types/mealdb";

type MealsExplorerProps = {
  ingredientName: string;
  meals: MealSummary[];
};

export function MealsExplorer({ ingredientName, meals }: MealsExplorerProps) {
  const [query, setQuery] = useState("");

  const filteredMeals = useMemo(() => {
    const normalized = query.toLowerCase().trim();

    if (!normalized) {
      return meals;
    }

    return meals.filter((meal) => meal.strMeal.toLowerCase().includes(normalized));
  }, [meals, query]);

  return (
    <section className="space-y-5">
      <SearchInput
        label={`Search Meal by Name for ${ingredientName}`}
        placeholder="Contoh: pasta, soup, curry"
        value={query}
        onChange={setQuery}
      />

      <p className="text-sm text-stone-700">
        Menampilkan <strong>{filteredMeals.length}</strong> dari {meals.length} menu.
      </p>

      {filteredMeals.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-stone-300 bg-white p-6 text-sm text-stone-600">
          Meal tidak ditemukan untuk pencarian ini.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredMeals.map((meal) => (
            <Link
              key={meal.idMeal}
              href={`/meals/${meal.idMeal}?from=${encodeURIComponent(ingredientName)}`}
              className="group overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-orange-300 hover:shadow-md"
            >
              <div className="relative aspect-[4/3] w-full bg-stone-200">
                <Image
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  fill
                  className="object-cover transition duration-300 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
                <div className="absolute right-2 top-2 z-10">
                  <FavoriteButton
                    item={{ type: "meal", id: meal.idMeal, name: meal.strMeal, thumb: meal.strMealThumb }}
                  />
                </div>
              </div>
              <div className="p-4">
                <p className="text-xs font-semibold tracking-[0.18em] text-orange-700 uppercase">
                  Meal
                </p>
                <h2 className="mt-2 line-clamp-2 text-base font-semibold text-stone-900 group-hover:text-orange-700">
                  {meal.strMeal}
                </h2>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
