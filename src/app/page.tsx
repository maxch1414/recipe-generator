import { getIngredients } from "./actions/ingredients";
import { RecipeSearch } from "@/components/recipes/RecipeSearch";

export default async function HomePage() {
  const ingredients = await getIngredients();

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Find Recipes with Your Main Ingredient
        </h1>
        <p className="text-muted-foreground">
          Enter the main ingredient you have on hand and discover delicious
          recipes!
        </p>
      </div>

      <RecipeSearch ingredients={ingredients} />

      {/* {recipes.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Found Recipes</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {recipes.map((recipe, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{recipe.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <h4 className="font-semibold">Ingredients:</h4>
                  <ul className="list-disc list-inside">
                    {recipe.ingredients.map((ingredient, idx) => (
                      <li key={idx}>{ingredient}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )} */}
    </main>
  );
}
