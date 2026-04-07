import Image from "next/image";
import Link from "next/link";

import { FavoriteButton } from "@/components/ui/FavoriteButton";
import { FavoriteMeal } from "@/types/favorites";

type FavoriteMealCardProps = {
  item: FavoriteMeal;
};

export function FavoriteMealCard({ item }: FavoriteMealCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-orange-300 hover:shadow-md">
      <Link href={`/meals/${item.id}`} className="block">
        <div className="relative aspect-[4/3] w-full bg-stone-200">
          <Image
            src={item.thumb}
            alt={item.name}
            fill
            className="object-cover transition duration-300 group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 33vw"
          />
        </div>
        <div className="p-4">
          <p className="text-xs font-semibold tracking-[0.16em] text-orange-700 uppercase">
            Meal
          </p>
          <p className="mt-1.5 line-clamp-2 font-semibold text-stone-900 transition group-hover:text-orange-700">
            {item.name}
          </p>
        </div>
      </Link>
      <div className="absolute right-3 top-3">
        <FavoriteButton item={item} />
      </div>
    </div>
  );
}
