import { useState } from "react";
import { Recipe } from "../../lib/types";
import { RecipeCard } from "./RecipeCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

type Props = {
  recipes: Recipe[];
};

export function RecipesGrid({ recipes }: Readonly<Props>) {
  //   const [selectedArea, setSelectedArea] = useState("all");
  //   const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRecipes = recipes.filter(
    (recipe) =>
      searchQuery === "" ||
      recipe.strMeal.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {filteredRecipes ? (
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
              <RecipeCard key={recipe.idMeal} recipe={recipe} />
            ))}
          </div>
        </div>
      ) : (
        <p>No recipes found.</p>
      )}
    </div>
  );
}
