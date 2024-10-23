import React from "react";
import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import About from "@/app/about/page";

test("Renders the About page correctly", () => {
  render(<About />);

  const mainHeading = screen.getByRole("heading", { name: /about us/i });
  expect(mainHeading).toBeInTheDocument();

  const missionHeading = screen.getByRole("heading", { name: /our mission/i });
  expect(missionHeading).toBeInTheDocument();

  const contactHeading = screen.getByRole("heading", { name: /contact us/i });
  expect(contactHeading).toBeInTheDocument();

  const contactLink = screen.getByRole("link", {
    name: /contact@recipefinder.com/i,
  });
  expect(contactLink).toBeInTheDocument();
  expect(contactLink).toHaveAttribute(
    "href",
    "mailto:contact@recipefinder.com"
  );
});
