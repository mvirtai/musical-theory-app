import { describe, expect, it } from "vitest";
import {
  buildRounds,
  gameReducer,
  getLevel,
  initialGameState,
  isLevelUnlocked,
  listenerRank,
  starsFor,
  type GameState,
  type Round,
} from "./interval-game";

function seeded(seed: number): () => number {
  let value = seed;
  return () => {
    value = (value * 16807) % 2147483647;
    return value / 2147483647;
  };
}

function playLevel(state: GameState, rounds: Round[], wrongAnswers: number): GameState {
  let current = gameReducer(state, { type: "start", levelId: 1, rounds });
  rounds.forEach((round, index) => {
    const choice = index < wrongAnswers ? (round.intervalId === "unison" ? "octave" : "unison") : round.intervalId;
    current = gameReducer(current, { type: "answer", choice });
    current = gameReducer(current, { type: "next" });
  });
  return current;
}

describe("starsFor", () => {
  it("maps correct answers to stars", () => {
    expect([5, 4, 3, 2, 0].map(starsFor)).toEqual([3, 2, 1, 0, 0]);
  });
});

describe("buildRounds", () => {
  it("builds five rounds drawn from the level pool", () => {
    const rounds = buildRounds(getLevel(2), seeded(7));
    expect(rounds).toHaveLength(5);
    expect(new Set(rounds.map((round) => round.intervalId))).toEqual(new Set(["octave", "perfect-fifth"]));
  });

  it("keeps A4 fixed unless the level is transposed", () => {
    expect(buildRounds(getLevel(1), seeded(3)).every((round) => round.startMidi === 69)).toBe(true);
    const transposed = buildRounds(getLevel(3), seeded(3));
    expect(transposed.every((round) => round.startMidi >= 60 && round.startMidi <= 67)).toBe(true);
  });
});

describe("gameReducer", () => {
  const rounds = buildRounds(getLevel(1), seeded(11));

  it("ignores locked levels and unlocks the next one after a star", () => {
    expect(isLevelUnlocked(initialGameState.stars, 2)).toBe(false);
    expect(gameReducer(initialGameState, { type: "start", levelId: 2, rounds }).session).toBeNull();

    const finished = playLevel(initialGameState, rounds, 0);
    expect(finished.stars[1]).toBe(3);
    expect(isLevelUnlocked(finished.stars, 2)).toBe(true);
  });

  it("awards XP only for correct answers and ignores a second answer", () => {
    let state = gameReducer(initialGameState, { type: "start", levelId: 1, rounds });
    const correct = rounds[0].intervalId;
    state = gameReducer(state, { type: "answer", choice: correct });
    state = gameReducer(state, { type: "answer", choice: correct });
    expect(state.xp).toBe(10);
    expect(state.session?.correct).toBe(1);
  });

  it("never lowers an earned star count on a worse replay", () => {
    const best = playLevel(initialGameState, rounds, 0);
    const worse = playLevel(best, rounds, 3);
    expect(worse.stars[1]).toBe(3);
  });
});

describe("listenerRank", () => {
  it("reports rank and progress", () => {
    expect(listenerRank(0).title).toBe("Curious ear");
    expect(listenerRank(25).progress).toBeCloseTo(0.5);
    expect(listenerRank(50).title).toBe("Attentive listener");
    expect(listenerRank(200)).toMatchObject({ title: "Interval spotter", nextTitle: null, progress: 1 });
  });
});
