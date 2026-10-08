/** Pure game state for the interval trail: levels, rounds, scoring, and progress. */

import type { IntervalId } from "../music/intervals";

export type LevelId = 1 | 2 | 3;
export type Stars = 0 | 1 | 2 | 3;

export interface LevelDefinition {
  id: LevelId;
  title: string;
  description: string;
  /** Intervals that can appear as answers in this level. */
  pool: readonly IntervalId[];
  /** Whether the starting note varies from round to round. */
  transposed: boolean;
}

export const LEVELS: readonly LevelDefinition[] = [
  {
    id: 1,
    title: "Same or higher?",
    description: "Tell a repeated note from an octave.",
    pool: ["unison", "octave"],
    transposed: false,
  },
  {
    id: 2,
    title: "Meet the fifth",
    description: "Hear how a perfect fifth differs from an octave.",
    pool: ["octave", "perfect-fifth"],
    transposed: false,
  },
  {
    id: 3,
    title: "Any starting note",
    description: "The same intervals, starting from different notes.",
    pool: ["unison", "octave", "perfect-fifth"],
    transposed: true,
  },
];

export const ROUNDS_PER_LEVEL = 5;
export const XP_PER_CORRECT = 10;

const REFERENCE_START_MIDI = 69;
const TRANSPOSED_START_MIDI = 60;
const TRANSPOSED_START_COUNT = 8;

export function getLevel(levelId: LevelId): LevelDefinition {
  return LEVELS[levelId - 1];
}

/** Three stars for a perfect level, one fewer for each miss, none below two correct answers short. */
export function starsFor(correct: number): Stars {
  if (correct >= ROUNDS_PER_LEVEL) return 3;
  if (correct === ROUNDS_PER_LEVEL - 1) return 2;
  if (correct === ROUNDS_PER_LEVEL - 2) return 1;
  return 0;
}

export interface Round {
  startMidi: number;
  intervalId: IntervalId;
}

function shuffle<T>(items: readonly T[], random: () => number): T[] {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }
  return result;
}

/** Builds a balanced, shuffled set of rounds; `random` is injected so the result is testable. */
export function buildRounds(level: LevelDefinition, random: () => number): Round[] {
  const intervals = shuffle(
    Array.from({ length: ROUNDS_PER_LEVEL }, (_, index) => level.pool[index % level.pool.length]),
    random,
  );

  return intervals.map((intervalId) => ({
    intervalId,
    startMidi: level.transposed
      ? TRANSPOSED_START_MIDI + Math.floor(random() * TRANSPOSED_START_COUNT)
      : REFERENCE_START_MIDI,
  }));
}

export interface Session {
  levelId: LevelId;
  rounds: readonly Round[];
  index: number;
  correct: number;
  /** The learner's answer to the current round, or null while it is unanswered. */
  answer: IntervalId | null;
}

export interface GameState {
  stars: Readonly<Record<LevelId, Stars>>;
  xp: number;
  session: Session | null;
}

export const initialGameState: GameState = {
  stars: { 1: 0, 2: 0, 3: 0 },
  xp: 0,
  session: null,
};

export type GameAction =
  | { type: "start"; levelId: LevelId; rounds: readonly Round[] }
  | { type: "answer"; choice: IntervalId }
  | { type: "next" }
  | { type: "exit" };

export function isLevelUnlocked(stars: GameState["stars"], levelId: LevelId): boolean {
  return levelId === 1 || stars[(levelId - 1) as LevelId] > 0;
}

export function isSessionFinished(session: Session): boolean {
  return session.index >= session.rounds.length;
}

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "start": {
      if (!isLevelUnlocked(state.stars, action.levelId)) return state;
      return {
        ...state,
        session: { levelId: action.levelId, rounds: action.rounds, index: 0, correct: 0, answer: null },
      };
    }
    case "answer": {
      const session = state.session;
      if (!session || session.answer !== null || isSessionFinished(session)) return state;
      const isCorrect = session.rounds[session.index].intervalId === action.choice;
      return {
        ...state,
        xp: state.xp + (isCorrect ? XP_PER_CORRECT : 0),
        session: { ...session, answer: action.choice, correct: session.correct + (isCorrect ? 1 : 0) },
      };
    }
    case "next": {
      const session = state.session;
      if (!session || session.answer === null) return state;
      const index = session.index + 1;
      const advanced: Session = { ...session, index, answer: null };
      if (index < session.rounds.length) return { ...state, session: advanced };

      const earned = starsFor(session.correct);
      return {
        ...state,
        stars: { ...state.stars, [session.levelId]: Math.max(state.stars[session.levelId], earned) as Stars },
        session: advanced,
      };
    }
    case "exit":
      return { ...state, session: null };
  }
}

const RANKS = [
  { minXp: 0, title: "Curious ear" },
  { minXp: 50, title: "Attentive listener" },
  { minXp: 150, title: "Interval spotter" },
] as const;

export interface ListenerRank {
  title: string;
  nextTitle: string | null;
  nextMinXp: number | null;
  /** Progress toward the next rank from 0 to 1; 1 at the top rank. */
  progress: number;
}

export function listenerRank(xp: number): ListenerRank {
  let rankIndex = 0;
  RANKS.forEach((rank, index) => {
    if (xp >= rank.minXp) rankIndex = index;
  });
  const current = RANKS[rankIndex];
  const next = RANKS[rankIndex + 1];

  if (!next) {
    return { title: current.title, nextTitle: null, nextMinXp: null, progress: 1 };
  }
  return {
    title: current.title,
    nextTitle: next.title,
    nextMinXp: next.minXp,
    progress: (xp - current.minXp) / (next.minXp - current.minXp),
  };
}
