"use client";

import React, { useState } from "react";
import { FullRecipe, Ingredient } from "../../lib/types";
import { IngredientForm } from "../forms/IngredientForm";
import { RecipesGrid } from "./RecipesGrid";
import { fetchFilteredRecipes } from "@/app/actions/recipes";

type RecipeSearchProps = {
  ingredients: Ingredient[];
};

export const RecipeSearch = ({ ingredients }: RecipeSearchProps) => {
  const [recipes, setRecipes] = useState<FullRecipe[]>([]);

  const fetchRecipes = async (ingredientIds: string[]) => {
    try {
      const recipes = await fetchFilteredRecipes(ingredientIds);
      const validRecipes: FullRecipe[] = recipes.map((recipe) => ({
        ...recipe,
        ingredients: recipe.ingredients.filter(
          (ingredient): ingredient is string => ingredient !== undefined
        ),
      }));
      setRecipes(validRecipes);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  return (
    <div>
      <IngredientForm ingredients={ingredients} onSubmit={fetchRecipes} />
      <div className="mt-4">
        <RecipesGrid recipes={recipes} />
      </div>
    </div>
  );
};
