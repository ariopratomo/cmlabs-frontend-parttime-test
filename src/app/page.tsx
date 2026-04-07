import { Metadata } from "next";

import { HeroSection } from "@/components/home/HeroSection";
import { IngredientsExplorer } from "@/components/ingredients/IngredientsExplorer";
import { getIngredients, getMealsByIngredient } from "@/lib/api";

export const metadata: Metadata = {
  title: "Ingredients",
  description:
    "List ingredient dari TheMealDB, dilengkapi fitur search frontend dan navigasi ke detail meal.",
  alternates: {
    canonical: "/",
  },
};

export default async function Home() {
  const [ingredients, featuredMeals] = await Promise.all([
    getIngredients(),
    getMealsByIngredient("Chicken"),
  ]);

  return (
    <main className="min-h-screen bg-[#f8f4ed]">
      <HeroSection totalIngredients={ingredients.length} featuredMeals={featuredMeals} />
      <section id="ingredients" className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-stone-900">Browse All Ingredients</h2>
          <p className="mt-2 text-sm text-stone-600">
            {ingredients.length} ingredients tersedia. Gunakan search atau filter alfabet untuk
            menemukan yang kamu cari.
          </p>
        </div>
        <IngredientsExplorer ingredients={ingredients} />
      </section>
    </main>
  );
}
