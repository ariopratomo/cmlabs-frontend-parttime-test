import { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageShell } from "@/components/layout/PageShell";
import { MealsExplorer } from "@/components/meals/MealsExplorer";
import { FavoriteButton } from "@/components/ui/FavoriteButton";
import { getMealsByIngredient } from "@/lib/api";

type IngredientPageProps = {
  params: Promise<{ ingredient: string }>;
};

export async function generateMetadata({
  params,
}: IngredientPageProps): Promise<Metadata> {
  const { ingredient } = await params;
  const ingredientName = decodeURIComponent(ingredient);

  return {
    title: `${ingredientName} Meals | CMLABS FE Part-time Test`,
    description: `Daftar meal yang menggunakan ingredient ${ingredientName}.`,
    alternates: {
      canonical: `/ingredients/${encodeURIComponent(ingredientName)}`,
    },
  };
}

export default async function IngredientDetailPage({ params }: IngredientPageProps) {
  const { ingredient } = await params;
  const ingredientName = decodeURIComponent(ingredient);
  const meals = await getMealsByIngredient(ingredientName);

  if (!ingredientName.trim()) {
    notFound();
  }

  return (
    <PageShell
      title={`Meals with ${ingredientName}`}
      subtitle="Pilih meal untuk melihat detail resep lengkap, bahan, dan tutorial video."
      breadcrumbs={[
        { label: "Ingredients", href: "/" },
        { label: ingredientName },
      ]}
      backHref="/"
      backLabel="Kembali ke Ingredients"
      actions={
        <FavoriteButton
          item={{ type: "ingredient", id: ingredientName, name: ingredientName }}
          size="lg"
        />
      }
    >
      <MealsExplorer ingredientName={ingredientName} meals={meals} />
    </PageShell>
  );
}
