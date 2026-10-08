/** Equal-tempered interval helpers shared by the game logic and the audio player. */

export type IntervalId = "unison" | "octave" | "perfect-fifth";

export interface IntervalDefinition {
  id: IntervalId;
  name: string;
  semitones: number;
  /** Short explanation shown after the learner answers. */
  description: string;
}

export const INTERVALS: Readonly<Record<IntervalId, IntervalDefinition>> = {
  unison: {
    id: "unison",
    name: "Unison",
    semitones: 0,
    description: "Both notes are exactly the same pitch.",
  },
  octave: {
    id: "octave",
    name: "Octave",
    semitones: 12,
    description: "The same note name, one register higher.",
  },
  "perfect-fifth": {
    id: "perfect-fifth",
    name: "Perfect fifth",
    semitones: 7,
    description: "A wide, stable step up that sits between the notes of a chord.",
  },
};

const A4_MIDI = 69;
const A4_FREQUENCY_HZ = 440;
const NOTE_NAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

/** Frequency of a MIDI note in 12-tone equal temperament, with A4 = 440 Hz. */
export function midiToFrequency(midi: number): number {
  return A4_FREQUENCY_HZ * 2 ** ((midi - A4_MIDI) / 12);
}

/** Frequency ratio of an interval spanning the given number of semitones. */
export function frequencyRatio(semitones: number): number {
  return 2 ** (semitones / 12);
}

/** Scientific pitch name of a MIDI note, for example 69 becomes "A4". */
export function noteName(midi: number): string {
  const octave = Math.floor(midi / 12) - 1;
  return `${NOTE_NAMES[((midi % 12) + 12) % 12]}${octave}`;
}
