"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import { MealSummary } from "@/types/mealdb";

type ThumbnailCarouselProps = {
  tiles: MealSummary[];
};

export function ThumbnailCarousel({ tiles }: ThumbnailCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const next = useCallback(
    () => setCurrent((c) => (c + 1) % tiles.length),
    [tiles.length],
  );

  const prev = () => setCurrent((c) => (c - 1 + tiles.length) % tiles.length);

  // Auto-advance every 3 s, pause on hover / focus
  useEffect(() => {
    if (paused) return;
    timerRef.current = setTimeout(next, 3000);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [current, paused, next]);

  return (
    <div
      className="relative overflow-hidden rounded-2xl shadow-xl lg:hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {/* Track */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {tiles.map((meal) => (
          <div key={meal.idMeal} className="relative h-52 w-full flex-none sm:h-72">
            <Image
              src={meal.strMealThumb}
              alt={meal.strMeal}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 0px"
              priority={false}
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
            {/* Caption */}
            <p className="absolute bottom-4 left-4 right-16 line-clamp-1 text-base font-semibold leading-tight text-white drop-shadow">
              {meal.strMeal}
            </p>
          </div>
        ))}
      </div>

      {/* Prev arrow */}
      <button
        type="button"
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition hover:bg-black/65"
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
          <path
            d="M15 18l-6-6 6-6"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Next arrow */}
      <button
        type="button"
        onClick={next}
        aria-label="Next slide"
        className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition hover:bg-black/65"
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
          <path
            d="M9 18l6-6-6-6"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-3 right-4 flex items-center gap-1.5">
        {tiles.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === current ? "w-5 bg-white" : "w-1.5 bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
