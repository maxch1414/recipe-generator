"use server";

import { Ingredient } from "@/lib/types";

export async function getIngredients() {
  const response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/list.php?i=list"
  );

  if (!response.ok) {
    throw new Error("Failed to fetch ingredients");
  }

  const meals = await response.json();
  const ingredients: Ingredient[] = meals.meals;
  return ingredients;
}
