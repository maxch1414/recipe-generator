"use server";

import { Recipe } from "@/lib/types";

export async function getRecipes(ingredientId: string) {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredientId}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch recipes");
  }

  const meals = await response.json();
  const recipes: Recipe[] = meals.meals;
  return recipes;
}
