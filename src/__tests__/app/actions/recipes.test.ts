import { expect, test, vi } from "vitest";
import {
  getRecipes,
  getAllRecipes,
  fetchFilteredRecipes,
} from "@/app/actions/recipes";
import { FullRecipe, Recipe } from "@/lib/types";

const mockFetch = vi.fn();

global.fetch = mockFetch;

test("getRecipes fetches recipes for a single ingredient", async () => {
  const mockResponse = {
    meals: [
      { idMeal: "1", strMeal: "Test Meal 1", strMealThumb: "thumb1.jpg" },
      { idMeal: "2", strMeal: "Test Meal 2", strMealThumb: "thumb2.jpg" },
    ],
  };

  mockFetch.mockResolvedValueOnce({
    ok: true,
    json: async () => mockResponse,
  });

  const recipes: Recipe[] = await getRecipes("chicken");
  expect(recipes).toEqual(mockResponse.meals);
  expect(mockFetch).toHaveBeenCalledWith(
    "https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken"
  );
});

test("getAllRecipes fetches and deduplicates recipes for multiple ingredients", async () => {
  const mockResponse1 = {
    meals: [
      { idMeal: "1", strMeal: "Test Meal 1", strMealThumb: "thumb1.jpg" },
    ],
  };
  const mockResponse2 = {
    meals: [
      { idMeal: "2", strMeal: "Test Meal 2", strMealThumb: "thumb2.jpg" },
      { idMeal: "1", strMeal: "Test Meal 1", strMealThumb: "thumb1.jpg" },
    ],
  };

  mockFetch
    .mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse1,
    })
    .mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse2,
    });

  const recipes: Recipe[] = await getAllRecipes(["chicken", "beef"]);
  expect(recipes).toEqual([
    { idMeal: "1", strMeal: "Test Meal 1", strMealThumb: "thumb1.jpg" },
    { idMeal: "2", strMeal: "Test Meal 2", strMealThumb: "thumb2.jpg" },
  ]);
});

test("fetchFilteredRecipes fetches and filters recipes by ingredients", async () => {
  const mockResponse = {
    meals: [
      {
        idMeal: "1",
        strMeal: "Test Meal 1",
        strIngredient1: "Chicken",
        strIngredient2: "Salt",
        strIngredient3: "",
      },
      {
        idMeal: "2",
        strMeal: "Test Meal 2",
        strIngredient1: "Beef",
        strIngredient2: "Pepper",
        strIngredient3: "",
      },
    ],
  };

  mockFetch
    .mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    })
    .mockResolvedValueOnce({
      ok: true,
      json: async () => ({ meals: [mockResponse.meals[0]] }),
    })
    .mockResolvedValueOnce({
      ok: true,
      json: async () => ({ meals: [mockResponse.meals[1]] }),
    });

  const filteredRecipes: FullRecipe[] = await fetchFilteredRecipes([
    "chicken",
    "salt",
  ]);
  expect(filteredRecipes).toEqual([
    {
      idMeal: "1",
      strMeal: "Test Meal 1",
      strIngredient1: "Chicken",
      strIngredient2: "Salt",
      strIngredient3: "",
      ingredients: ["chicken", "salt"],
    },
  ]);
});
