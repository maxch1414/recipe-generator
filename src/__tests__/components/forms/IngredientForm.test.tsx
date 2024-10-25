import React from "react";
import { expect, test, vi } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { IngredientForm } from "@/components/forms/IngredientForm";
import { mockIngredients } from "@/__tests__/mocks/data/ingredients";
import { mockRecipes } from "@/__tests__/mocks/data/recipes";

test("Renders a ingredient form correctly", async () => {
  const handleSubmit = vi.fn();

  const { container } = render(
    <IngredientForm ingredients={mockIngredients} onSubmit={handleSubmit} />
  );

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

  handleSubmit.mockResolvedValueOnce(mockRecipes);

  expect(handleSubmit).toHaveBeenCalledWith([mockIngredients[0].strIngredient]);

  expect(container).toMatchSnapshot();
});
