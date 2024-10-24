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
      const recipes: FullRecipe[] = await fetchFilteredRecipes(ingredientIds);
      setRecipes(recipes);
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
