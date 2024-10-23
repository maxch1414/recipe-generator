"use server";

import { Recipe } from "@/lib/types";

const apiUrl = process.env.API_URL;

export async function getRecipes(ingredientId: string) {
  const response = await fetch(`${apiUrl}/filter.php?i=${ingredientId}`);

  if (!response.ok) {
    throw new Error("Failed to fetch recipes");
  }

  const meals = await response.json();
  const recipes: Recipe[] = meals.meals;
  return recipes;
}
