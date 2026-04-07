import {
  FilterByIngredientResponse,
  Ingredient,
  IngredientListResponse,
  MealDetail,
  MealLookupResponse,
  MealSummary,
} from "@/types/mealdb";

const BASE_URL = process.env.MEALDB_BASE_URL ?? "https://www.themealdb.com/api/json/v1/1";

async function fetchJson<T>(path: string): Promise<T> {
  const response = await fetch(`${BASE_URL}/${path}`, {
    next: { revalidate: 1800 },
  });

  if (!response.ok) {
    throw new Error(`MealDB request failed: ${response.status}`);
  }

  return (await response.json()) as T;
}

export async function getIngredients(): Promise<Ingredient[]> {
  const data = await fetchJson<IngredientListResponse>("list.php?i=list");
  return data.meals ?? [];
}

export async function getMealsByIngredient(
  ingredientName: string,
): Promise<MealSummary[]> {
  const encoded = encodeURIComponent(ingredientName);
  const data = await fetchJson<FilterByIngredientResponse>(
    `filter.php?i=${encoded}`,
  );
  return data.meals ?? [];
}

export async function getMealById(mealId: string): Promise<MealDetail | null> {
  const encoded = encodeURIComponent(mealId);
  const data = await fetchJson<MealLookupResponse>(`lookup.php?i=${encoded}`);
  return data.meals?.[0] ?? null;
}

export function extractRecipeItems(meal: MealDetail): string[] {
  return Array.from({ length: 20 }, (_, index) => {
    const ingredient = meal[`strIngredient${index + 1}`]?.trim();
    const measure = meal[`strMeasure${index + 1}`]?.trim();

    if (!ingredient) {
      return null;
    }

    return measure ? `${measure} ${ingredient}` : ingredient;
  }).filter((entry): entry is string => Boolean(entry));
}

export function toYoutubeEmbedUrl(youtubeUrl: string): string {
  try {
    const parsed = new URL(youtubeUrl);
    const videoId = parsed.searchParams.get("v");

    if (!videoId) {
      return youtubeUrl;
    }

    return `https://www.youtube.com/embed/${videoId}`;
  } catch {
    return youtubeUrl;
  }
}
