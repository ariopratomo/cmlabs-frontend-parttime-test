import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageShell } from "@/components/layout/PageShell";
import { FavoriteButton } from "@/components/ui/FavoriteButton";
import { extractRecipeItems, getMealById, toYoutubeEmbedUrl } from "@/lib/api";

type MealDetailPageProps = {
  params: Promise<{ mealId: string }>;
  searchParams: Promise<{ from?: string }>;
};

export async function generateMetadata({ params }: MealDetailPageProps): Promise<Metadata> {
  const { mealId } = await params;
  const meal = await getMealById(mealId);

  if (!meal) {
    return {
      title: "Meal Not Found | CMLABS FE Part-time Test",
      description: "Data meal tidak ditemukan.",
    };
  }

  return {
    title: `${meal.strMeal} | CMLABS FE Part-time Test`,
    description:
      meal.strInstructions?.slice(0, 160) || `Detail recipe dan tutorial untuk ${meal.strMeal}.`,
    alternates: {
      canonical: `/meals/${meal.idMeal}`,
    },
    openGraph: {
      title: meal.strMeal,
      description:
        meal.strInstructions?.slice(0, 180) || `Detail recipe dan tutorial untuk ${meal.strMeal}.`,
      images: meal.strMealThumb ? [{ url: meal.strMealThumb, alt: meal.strMeal }] : [],
      type: "article",
    },
  };
}

export default async function MealDetailPage({ params, searchParams }: MealDetailPageProps) {
  const { mealId } = await params;
  const { from } = await searchParams;
  const ingredientName = from ? decodeURIComponent(from) : null;
  const meal = await getMealById(mealId);

  if (!meal) {
    notFound();
  }

  const recipeItems = extractRecipeItems(meal);
  const youtubeEmbed = meal.strYoutube ? toYoutubeEmbedUrl(meal.strYoutube) : null;

  return (
    <PageShell
      title={meal.strMeal}
      subtitle="Detail meal: gambar, instruksi, recipe, dan video tutorial dari YouTube."
      breadcrumbs={
        ingredientName
          ? [
              { label: "Ingredients", href: "/" },
              { label: ingredientName, href: `/ingredients/${encodeURIComponent(ingredientName)}` },
              { label: meal.strMeal },
            ]
          : [
              { label: "Ingredients", href: "/" },
              { label: meal.strMeal },
            ]
      }
    >
      <article className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm">
          <div className="relative aspect-[4/3] w-full bg-stone-200">
            {meal.strMealThumb ? (
              <Image
                src={meal.strMealThumb}
                alt={meal.strMeal}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 66vw"
              />
            ) : null}
            <div className="absolute right-3 top-3 z-10">
              <FavoriteButton
                item={{ type: "meal", id: meal.idMeal, name: meal.strMeal, thumb: meal.strMealThumb ?? "" }}
              />
            </div>
          </div>
          <div className="space-y-4 p-6">
            <div className="flex flex-wrap gap-2 text-xs font-medium text-stone-600">
              {meal.strCategory ? (
                <span className="rounded-full bg-orange-100 px-3 py-1 text-orange-800">
                  {meal.strCategory}
                </span>
              ) : null}
              {meal.strArea ? (
                <span className="rounded-full bg-stone-100 px-3 py-1 text-stone-700">{meal.strArea}</span>
              ) : null}
            </div>
            <h2 className="text-2xl font-semibold text-stone-900">Tutorial</h2>
            <p className="whitespace-pre-line text-sm leading-7 text-stone-700">
              {meal.strInstructions || "No instructions available from API."}
            </p>
          </div>
        </section>

        <section className="space-y-6">
          <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-stone-900">Recipe</h3>
            {recipeItems.length === 0 ? (
              <p className="mt-3 text-sm text-stone-600">No recipe item available.</p>
            ) : (
              <ul className="mt-3 space-y-2 text-sm text-stone-700">
                {recipeItems.map((item) => (
                  <li key={item} className="rounded-xl bg-stone-50 px-3 py-2">
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
            <div className="mb-3 flex items-center justify-between gap-4">
              <h3 className="text-xl font-semibold text-stone-900">Youtube Embedded</h3>
              {meal.strYoutube ? (
                <Link
                  href={meal.strYoutube}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-medium text-orange-700 hover:text-orange-800"
                >
                  Buka di YouTube
                </Link>
              ) : null}
            </div>

            {youtubeEmbed ? (
              <div className="overflow-hidden rounded-2xl border border-stone-200">
                <iframe
                  title={`Youtube video for ${meal.strMeal}`}
                  src={youtubeEmbed}
                  className="aspect-video w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <p className="text-sm text-stone-600">Video tutorial tidak tersedia.</p>
            )}
          </div>
        </section>
      </article>
    </PageShell>
  );
}
