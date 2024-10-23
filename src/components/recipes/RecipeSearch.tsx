"use client";

import React, { useState } from "react";
import { Ingredient, Recipe } from "../../lib/types";
import { IngredientForm } from "../forms/IngredientForm";
import { RecipesGrid } from "./RecipesGrid";
import { getRecipes } from "@/app/actions/recipes";

type RecipeSearchProps = {
  ingredients: Ingredient[];
};

export const RecipeSearch = ({ ingredients }: RecipeSearchProps) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const fetchRecipes = async (ingredientId: string) => {
    try {
      const recipes = await getRecipes(ingredientId);
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
