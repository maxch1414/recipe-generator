import React from "react";
import { expect, test } from "vitest";
import { render } from "@testing-library/react";

import { Navbar } from "@/components/navigation/Navbar";

test("Renders a ingredient form correctly", async () => {
  const { container } = render(<Navbar />);

  expect(container).toMatchSnapshot();
});
