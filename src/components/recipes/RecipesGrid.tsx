import { Recipe } from "../../lib/types";
import { RecipeCard } from "./RecipeCard";

type Props = {
  recipes: Recipe[];
};

export function RecipesGrid({ recipes }: Readonly<Props>) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {recipes
        ? recipes.map((recipe) => (
            <RecipeCard key={recipe.idMeal} recipe={recipe} />
          ))
        : ""}
    </div>
  );
}
