import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "./App";

describe("learning dashboard", () => {
  it("introduces the app and provides a clear way to find a starting point", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", { name: /music theory, without the mystery/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /find your first idea/i }),
    ).toHaveAttribute("href", "#learning-paths");
  });

  it("shows intervals as the starting path and labels future paths clearly", () => {
    render(<App />);

    const paths = screen.getByRole("region", { name: /pick up a new idea/i });
    expect(
      within(paths).getByRole("link", { name: /play the interval trail/i }),
    ).toHaveAttribute("href", "#interval-trail");
    expect(within(paths).getByText("Harmony")).toBeInTheDocument();
    expect(within(paths).getByText("Rhythm")).toBeInTheDocument();
    expect(within(paths).getAllByText("Coming soon")).toHaveLength(2);
  });

  it("provides landmark navigation and a skip link to the main content", () => {
    render(<App />);

    expect(
      screen.getByRole("link", { name: /skip to content/i }),
    ).toHaveAttribute("href", "#main-content");
    expect(screen.getByRole("navigation", { name: /main navigation/i })).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /overview/i }),
    ).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("main")).toHaveAttribute("id", "main-content");
  });
});
