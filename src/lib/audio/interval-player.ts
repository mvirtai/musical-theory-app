/** Web Audio playback for two-note intervals. Sound only starts from an explicit user action. */

import { midiToFrequency } from "../music/intervals";

const NOTE_SECONDS = 0.7;
const GAP_SECONDS = 0.15;
const PEAK_GAIN = 0.25;

export class AudioUnavailableError extends Error {
  constructor() {
    super("Web Audio is not available in this browser.");
    this.name = "AudioUnavailableError";
  }
}

let context: AudioContext | null = null;
let activeOscillators: OscillatorNode[] = [];

function getContext(): AudioContext {
  if (context) return context;

  const AudioContextConstructor =
    window.AudioContext ??
    (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioContextConstructor) throw new AudioUnavailableError();

  context = new AudioContextConstructor();
  return context;
}

function scheduleNote(audioContext: AudioContext, frequency: number, startTime: number): void {
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  const endTime = startTime + NOTE_SECONDS;

  oscillator.type = "triangle";
  oscillator.frequency.setValueAtTime(frequency, startTime);
  gain.gain.setValueAtTime(0.0001, startTime);
  gain.gain.exponentialRampToValueAtTime(PEAK_GAIN, startTime + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, endTime);

  oscillator.connect(gain).connect(audioContext.destination);
  oscillator.onended = () => {
    activeOscillators = activeOscillators.filter((node) => node !== oscillator);
    gain.disconnect();
  };
  oscillator.start(startTime);
  oscillator.stop(endTime + 0.05);
  activeOscillators.push(oscillator);
}

/** Silences any note that is still playing or scheduled. */
export function stopPlayback(): void {
  for (const oscillator of activeOscillators) {
    try {
      oscillator.stop();
    } catch {
      // A node that has already ended cannot be stopped again.
    }
  }
  activeOscillators = [];
}

/** Plays the start note and then the note `semitones` above it. Must be called from a user gesture. */
export async function playInterval(startMidi: number, semitones: number): Promise<void> {
  const audioContext = getContext();
  await audioContext.resume();
  stopPlayback();

  const firstStart = audioContext.currentTime + 0.05;
  scheduleNote(audioContext, midiToFrequency(startMidi), firstStart);
  scheduleNote(audioContext, midiToFrequency(startMidi + semitones), firstStart + NOTE_SECONDS + GAP_SECONDS);
}
