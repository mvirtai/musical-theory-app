import { describe, expect, it } from "vitest";
import { frequencyRatio, midiToFrequency, noteName } from "./intervals";

describe("interval maths", () => {
  it("anchors A4 at 440 Hz and doubles per octave", () => {
    expect(midiToFrequency(69)).toBe(440);
    expect(midiToFrequency(81)).toBeCloseTo(880, 6);
  });

  it("computes the equal-tempered fifth ratio", () => {
    expect(frequencyRatio(7)).toBeCloseTo(1.4983, 4);
    expect(frequencyRatio(12)).toBe(2);
  });

  it("names notes in scientific pitch notation", () => {
    expect(noteName(69)).toBe("A4");
    expect(noteName(76)).toBe("E5");
    expect(noteName(61)).toBe("C#4");
  });
});
