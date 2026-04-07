import Image from "next/image";

import { ThumbnailCarousel } from "@/components/home/ThumbnailCarousel";
import { MealSummary } from "@/types/mealdb";

type HeroSectionProps = {
  totalIngredients: number;
  featuredMeals: MealSummary[];
};

// Literal class strings are here so Tailwind v4 scanner detects and includes them.
const TILE_CONFIG: { cls: string; delay: string }[] = [
  { cls: "rotate-[-2deg] scale-105 z-10", delay: "0ms" },
  { cls: "rotate-[1.5deg] translate-y-6 z-20", delay: "100ms" },
  { cls: "rotate-[1deg] -translate-y-3 z-10", delay: "200ms" },
  { cls: "rotate-[-1.5deg] translate-y-4 z-20", delay: "300ms" },
  { cls: "rotate-[-1deg] z-10", delay: "400ms" },
  { cls: "rotate-[2deg] -translate-y-2 z-20", delay: "500ms" },
];

export function HeroSection({ totalIngredients, featuredMeals }: HeroSectionProps) {
  const tiles = featuredMeals.slice(0, 6);

  return (
    <section className="relative overflow-hidden bg-[#f8f4ed] px-4 pb-14 pt-10 sm:px-6 sm:pb-20 sm:pt-14 lg:px-8 lg:pb-24">
      {/* Decorative gradient blobs */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -left-32 -top-20 h-[520px] w-[520px] rounded-full bg-orange-200/45 blur-3xl" />
        <div className="absolute -right-20 top-0 h-96 w-96 rounded-full bg-amber-100/65 blur-2xl" />
        <div className="absolute bottom-0 left-1/2 h-72 w-[480px] -translate-x-1/2 rounded-full bg-emerald-100/35 blur-3xl" />
      </div>

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        {/* ── LEFT: copy ── */}
        <div className="flex flex-col gap-7">
          <span className="w-fit rounded-full border border-orange-200 bg-orange-50 px-4 py-1.5 text-xs font-semibold tracking-[0.2em] text-orange-700 uppercase">
            TheMealDB Explorer
          </span>

          <h1 className="text-3xl font-semibold leading-[1.14] tracking-tight text-stone-900 sm:text-[2.6rem] lg:text-5xl xl:text-[3.25rem]">
            From{" "}
            <span className="text-orange-600">Ingredients</span>
            <span className="hidden sm:inline">
              <br />
              to Your Next
              <br />
              Favourite Dish.
            </span>
            <span className="sm:hidden"> to Your Next Favourite Dish.</span>
          </h1>

          <p className="max-w-[27rem] text-base leading-7 text-stone-600">
            Pilih ingredient favoritmu, eksplorasi ribuan resep dari seluruh dunia, lalu pelajari
            cara lengkap memasaknya — lengkap dengan video tutorial.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 sm:gap-x-8">
            <div>
              <p className="text-2xl font-semibold tracking-tight text-stone-900 sm:text-3xl">
                {totalIngredients}
              </p>
              <p className="mt-0.5 text-[10px] font-medium uppercase tracking-widest text-stone-500 sm:text-xs">
                Ingredients
              </p>
            </div>
            <div className="hidden h-10 w-px bg-stone-300 sm:block" />
            <div>
              <p className="text-2xl font-semibold tracking-tight text-stone-900 sm:text-3xl">1,000+</p>
              <p className="mt-0.5 text-[10px] font-medium uppercase tracking-widest text-stone-500 sm:text-xs">
                Meals
              </p>
            </div>
            <div className="hidden h-10 w-px bg-stone-300 sm:block" />
            <div>
              <p className="text-2xl font-semibold tracking-tight text-stone-900 sm:text-3xl">Global</p>
              <p className="mt-0.5 text-[10px] font-medium uppercase tracking-widest text-stone-500 sm:text-xs">
                Cuisine
              </p>
            </div>
          </div>

          {/* CTA */}
          <a
            href="#ingredients"
            className="group w-fit inline-flex items-center gap-3 rounded-full bg-stone-900 px-7 py-3.5 text-sm font-semibold text-amber-100 transition hover:bg-orange-700"
          >
            Mulai Eksplorasi
            <svg
              className="h-4 w-4 transition group-hover:translate-y-0.5"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M12 5v14M5 12l7 7 7-7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>

          {/* Mobile / tablet: carousel */}
          {tiles.length > 0 ? <ThumbnailCarousel tiles={tiles} /> : null}
        </div>

        {/* ── RIGHT: floating mosaic (desktop only) ── */}
        {tiles.length > 0 ? (
          <div className="relative hidden grid-cols-2 gap-4 lg:grid">
            {tiles.map((meal, index) => {
              const cfg = TILE_CONFIG[index];
              return (
                <div
                  key={meal.idMeal}
                  className={`animate-stagger relative overflow-hidden rounded-2xl shadow-lg transition-transform duration-300 hover:scale-[1.04] ${cfg?.cls ?? ""}`}
                  style={{ animationDelay: cfg?.delay ?? "0ms" }}
                >
                  <div className="relative aspect-square">
                    <Image
                      src={meal.strMealThumb}
                      alt={meal.strMeal}
                      fill
                      className="object-cover"
                      sizes="240px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                    <p className="absolute bottom-2.5 left-2.5 right-2.5 line-clamp-1 text-[11px] font-semibold leading-tight text-white drop-shadow">
                      {meal.strMeal}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
    </section>
  );
}
