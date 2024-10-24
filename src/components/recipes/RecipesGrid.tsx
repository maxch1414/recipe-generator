import React, { useState } from "react";
import { FullRecipe } from "../../lib/types";
import { RecipeCard } from "./RecipeCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { RecipeModal } from "./RecipeModal";

type Props = {
  recipes: FullRecipe[];
};

export function RecipesGrid({ recipes }: Readonly<Props>) {
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<FullRecipe | null>(null);

  if (!recipes.length) return;

  const filteredRecipes = recipes.filter(
    (recipe) =>
      searchQuery === "" ||
      recipe.strMeal.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {filteredRecipes.length ? (
        <div>
          <div className="relative">
            <Input
              type="text"
              placeholder="Search recipes"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
          </div>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.idMeal}
                recipe={recipe}
                setSelectedRecipe={setSelectedRecipe}
                openModal={() => setOpen(true)}
              />
            ))}
          </div>
        </div>
      ) : (
        <p className="text-center text-lg">No recipes found.</p>
      )}
      {selectedRecipe ? (
        <RecipeModal recipe={selectedRecipe} open={open} setOpen={setOpen} />
      ) : null}
    </div>
  );
}
