import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import App from "../../App";

describe("IntervalGame", () => {
  it("plays a round, shows feedback, and keeps locked levels disabled", async () => {
    const user = userEvent.setup();
    render(<App />);

    expect(screen.getByRole("button", { name: /meet the fifth/i })).toHaveAttribute("aria-disabled", "true");

    await user.click(screen.getByRole("button", { name: /same or higher/i }));
    expect(screen.getByText(/round 1 of 5/i)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Unison" }));
    expect(screen.getByRole("status")).toHaveTextContent(/semitones/i);
    expect(screen.getByRole("button", { name: /next round/i })).toBeInTheDocument();
  });

  it("explains when sound is unavailable", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: /same or higher/i }));
    await user.click(screen.getByRole("button", { name: /listen to the two notes/i }));
    expect(await screen.findByRole("alert")).toHaveTextContent(/sound is not available/i);
  });
});
