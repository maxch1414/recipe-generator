import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import { expect, test, vi } from "vitest";
import Home from "@/app/page";
import { mockIngredients } from "@/__tests__/mocks/data/ingredients";
import { mockRecipes } from "../mocks/data/recipes";
import * as ingredientActions from "@/app/actions/ingredients";
import * as recipeActions from "@/app/actions/recipes";

test("Renders the HomePage and interacts with it", async () => {
  vi.spyOn(ingredientActions, "getIngredients").mockResolvedValue(
    mockIngredients
  );

  vi.spyOn(recipeActions, "getRecipes").mockResolvedValue(mockRecipes);

  render(await Home());

  const heading = screen.getByRole("heading", {
    name: /find recipes with your main ingredient/i,
  });
  expect(heading).toBeInTheDocument();

  const ingredientSelect = screen.getByText("Search Ingredient");
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

  await waitFor(() => {
    const gridItems = screen.getAllByRole("griditem");
    expect(gridItems).toHaveLength(2);
  });
});
