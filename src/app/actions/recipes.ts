"use server";

import { FullRecipe, Recipe } from "@/lib/types";

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

export async function getAllRecipes(ingredientIds: string[]) {
  const recipePromises = ingredientIds.map((ingredientId) =>
    fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredientId}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Failed to fetch recipes for ingredient: ${ingredientId}`
          );
        }
        return response.json();
      })
      .then((meals) => meals.meals)
  );

  const allRecipes = await Promise.all(recipePromises);

  const recipes: Recipe[] = allRecipes
    .flat()
    .reduce((recipes: Recipe[], recipe: Recipe) => {
      if (!recipes.find((r) => r.idMeal === recipe.idMeal)) {
        recipes.push(recipe);
      }
      return recipes;
    }, []);

  return recipes;
}

export const fetchFilteredRecipes = async (ingredientList: string[]) => {
  try {
    const response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/search.php?s="
    );
    if (!response.ok) {
      throw new Error("Failed to fetch recipes");
    }
    const meals = await response.json();
    const recipes: FullRecipe[] = meals.meals;

    const recipesWithIngredients = await Promise.all(
      recipes.map(async (recipe) => {
        const recipeDetailsResponse = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipe.idMeal}`
        );
        const recipeDetails = await recipeDetailsResponse.json();
        const meal: FullRecipe = recipeDetails.meals[0];

        const ingredients = Object.keys(meal)
          .filter(
            (key) =>
              key.startsWith("strIngredient") && meal[key as keyof FullRecipe]
          )
          .map((key) =>
            meal[key as keyof FullRecipe]?.toString().toLowerCase()
          );

        return { ...recipe, ingredients };
      })
    );

    // const filteredRecipes = recipesWithIngredients.filter((recipe) =>
    //   ingredientList.every((ingredient) =>
    //     recipe.ingredients.includes(ingredient.toLowerCase())
    //   )
    // );

    const filteredRecipes = recipesWithIngredients.filter((recipe) =>
      recipe.ingredients.every((ingredient) =>
        ingredientList
          .map((i) => i.toLowerCase())
          .includes(ingredient!.toLowerCase())
      )
    );

    console.log(filteredRecipes);
    return filteredRecipes;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return [];
  }
};
