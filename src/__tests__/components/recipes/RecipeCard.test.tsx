import React from "react";
import { expect, test } from "vitest";
import { RecipeCard } from "@/components/recipes/RecipeCard";
import { render } from "@testing-library/react";
import { mockRecipes } from "@/__tests__/mocks/data/recipes";

test("Renders a recipe card correctly", () => {
  const { container } = render(<RecipeCard recipe={mockRecipes[0]} />);
  expect(container).toMatchSnapshot();
});
