import React from "react";
import { getIngredients } from "./actions/ingredients";
import { RecipeSearch } from "@/components/recipes/RecipeSearch";

export default async function Home() {
  const ingredients = await getIngredients();

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Find Recipes</h1>
        <h3 className="text-muted-foreground">
          Enter the ingredients in your fridge and discover delicious recipes!
        </h3>
      </div>
      <RecipeSearch ingredients={ingredients} />
    </main>
  );
}
