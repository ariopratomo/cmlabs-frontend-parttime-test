export type FavoriteIngredient = {
  type: "ingredient";
  id: string;
  name: string;
};

export type FavoriteMeal = {
  type: "meal";
  id: string;
  name: string;
  thumb: string;
};

export type FavoriteItem = FavoriteIngredient | FavoriteMeal;
