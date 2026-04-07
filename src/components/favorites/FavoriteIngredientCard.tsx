import Image from "next/image";
import Link from "next/link";

import { FavoriteButton } from "@/components/ui/FavoriteButton";
import { FavoriteIngredient } from "@/types/favorites";

type FavoriteIngredientCardProps = {
  item: FavoriteIngredient;
};

export function FavoriteIngredientCard({ item }: FavoriteIngredientCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-orange-300 hover:shadow-md">
      <Link href={`/ingredients/${encodeURIComponent(item.name)}`} className="block">
        <div className="flex h-32 items-center justify-center bg-gradient-to-br from-orange-50 to-amber-50">
          <Image
            src={`https://www.themealdb.com/images/ingredients/${encodeURIComponent(item.name)}-Small.png`}
            alt={item.name}
            width={80}
            height={80}
            className="object-contain drop-shadow-sm transition duration-300 group-hover:scale-110"
          />
        </div>
        <div className="p-4">
          <p className="text-xs font-semibold tracking-[0.16em] text-orange-700 uppercase">
            Ingredient
          </p>
          <p className="mt-1.5 font-semibold text-stone-900 transition group-hover:text-orange-700">
            {item.name}
          </p>
          <p className="mt-1 text-xs text-stone-500">Klik untuk lihat meals →</p>
        </div>
      </Link>
      <div className="absolute right-3 top-3">
        <FavoriteButton item={item} />
      </div>
    </div>
  );
}
