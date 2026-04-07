export type Ingredient = {
  idIngredient: string | null;
  strIngredient: string;
  strDescription: string | null;
  strType: string | null;
};

export type MealSummary = {
  strMeal: string;
  strMealThumb: string;
  idMeal: string;
};

export type MealDetail = {
  idMeal: string;
  strMeal: string;
  strCategory: string | null;
  strArea: string | null;
  strInstructions: string | null;
  strMealThumb: string | null;
  strTags: string | null;
  strYoutube: string | null;
} & {
  [key: string]: string | null;
};

export type IngredientListResponse = {
  meals: Ingredient[] | null;
};

export type FilterByIngredientResponse = {
  meals: MealSummary[] | null;
};

export type MealLookupResponse = {
  meals: MealDetail[] | null;
};
