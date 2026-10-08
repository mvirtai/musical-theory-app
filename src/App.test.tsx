/**
 * Smoke test: verifies that the root component renders its heading.
 */
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("renders the main heading", () => {
    render(<App />);
    expect(screen.getByRole("heading", { level: 1, name: "Musical Theory App" })).toBeInTheDocument();
  });
});
