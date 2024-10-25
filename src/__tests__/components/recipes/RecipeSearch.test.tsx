import React from "react";
import { expect, test, vi } from "vitest";
import {
  fireEvent,
  render,
  screen,
  act,
  waitFor,
} from "@testing-library/react";
import { RecipeSearch } from "@/components/recipes/RecipeSearch";
import { mockIngredients } from "@/__tests__/mocks/data/ingredients";
import { mockFullRecipes } from "@/__tests__/mocks/data/recipes";
import * as recipeActions from "@/app/actions/recipes";

test("Renders a recipe search correctly", async () => {
  const fetchRecipes = vi
    .spyOn(recipeActions, "fetchFilteredRecipes")
    .mockResolvedValue(mockFullRecipes);

  const { container } = render(<RecipeSearch ingredients={mockIngredients} />);

  const ingredientSelect = screen.getByText("Search Ingredients");
  fireEvent.click(ingredientSelect);
  fireEvent.keyDown(ingredientSelect, { key: "ArrowDown" });
  fireEvent.keyDown(ingredientSelect, {
    key: "Enter",
    code: "Enter",
    keyCode: 13,
    charCode: 13,
  });

  const submitButton = screen.getByRole("button", { name: /submit/i });
  await act(() => fireEvent.click(submitButton));

  expect(fetchRecipes).toHaveBeenCalledTimes(1);

  await waitFor(() => {
    const gridItems = screen.getAllByRole("griditem");
    expect(gridItems).toHaveLength(2);
  });

  expect(container).toMatchSnapshot();
});
