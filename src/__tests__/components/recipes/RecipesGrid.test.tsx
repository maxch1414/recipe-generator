import React from "react";
import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import { mockRecipes } from "@/__tests__/mocks/data/recipes";
import { RecipesGrid } from "@/components/recipes/RecipesGrid";

test("Renders the recipes grid correctly", () => {
  const { container } = render(<RecipesGrid recipes={mockRecipes} />);
  expect(container).toMatchSnapshot();
});
