"use client";

import { useState } from "react";

import { useFavorites } from "@/hooks/useFavorites";
import { FavoriteIngredient, FavoriteMeal } from "@/types/favorites";

import { FavoriteIngredientCard } from "./FavoriteIngredientCard";
import { FavoriteMealCard } from "./FavoriteMealCard";
import { FavoritesEmpty } from "./FavoritesEmpty";
import { FavoritesHeader } from "./FavoritesHeader";
import { FavoritesSkeleton } from "./FavoritesSkeleton";

type Tab = "ingredients" | "meals";

export function FavoritesContent() {
  const { favorites, mounted } = useFavorites();
  const [activeTab, setActiveTab] = useState<Tab>("ingredients");

  if (!mounted) {
    return <FavoritesSkeleton />;
  }

  const ingredientFavorites = favorites.filter(
    (f): f is FavoriteIngredient => f.type === "ingredient",
  );
  const mealFavorites = favorites.filter((f): f is FavoriteMeal => f.type === "meal");

  const tabs: { key: Tab; label: string; count: number }[] = [
    { key: "ingredients", label: "Ingredients", count: ingredientFavorites.length },
    { key: "meals", label: "Meals", count: mealFavorites.length },
  ];

  return (
    <>
      <FavoritesHeader />

      {favorites.length === 0 ? (
        <FavoritesEmpty />
      ) : (
        <>
          {/* Tab bar */}
          <div className="mb-6 flex gap-2 rounded-2xl border border-stone-200 bg-white p-1.5 shadow-sm">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                  activeTab === tab.key
                    ? "bg-stone-900 text-amber-100 shadow"
                    : "text-stone-600 hover:bg-stone-100 hover:text-stone-900"
                }`}
              >
                {tab.label}
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-bold ${
                    activeTab === tab.key
                      ? "bg-white/20 text-amber-100"
                      : "bg-stone-100 text-stone-500"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Tab panels */}
          {activeTab === "ingredients" ? (
            ingredientFavorites.length === 0 ? (
              <p className="rounded-2xl border border-dashed border-stone-300 bg-white p-8 text-center text-sm text-stone-500">
                Belum ada ingredient yang disimpan.
              </p>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {ingredientFavorites.map((item) => (
                  <FavoriteIngredientCard key={item.id} item={item} />
                ))}
              </div>
            )
          ) : null}

          {activeTab === "meals" ? (
            mealFavorites.length === 0 ? (
              <p className="rounded-2xl border border-dashed border-stone-300 bg-white p-8 text-center text-sm text-stone-500">
                Belum ada meal yang disimpan.
              </p>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {mealFavorites.map((item) => (
                  <FavoriteMealCard key={item.id} item={item} />
                ))}
              </div>
            )
          ) : null}
        </>
      )}
    </>
  );
}
