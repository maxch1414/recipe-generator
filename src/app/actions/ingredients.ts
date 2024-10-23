"use server";

import { Ingredient } from "@/lib/types";

const apiUrl = process.env.API_URL;

export async function getIngredients() {
  const response = await fetch(`${apiUrl}/list.php?i=list`);

  if (!response.ok) {
    throw new Error("Failed to fetch ingredients");
  }

  const meals = await response.json();
  const ingredients: Ingredient[] = meals.meals;
  return ingredients;
}
