import { afterEach, describe, expect, it, vi } from "vitest";

interface FakeOscillator {
  frequencyValues: number[];
  stopped: boolean;
}

function installFakeAudio() {
  const oscillators: FakeOscillator[] = [];
  const created = { contexts: 0 };

  class FakeAudioContext {
    currentTime = 0;
    destination = {};
    constructor() {
      created.contexts += 1;
    }
    resume() {
      return Promise.resolve();
    }
    createGain() {
      const param = { setValueAtTime() {}, exponentialRampToValueAtTime() {} };
      const node = { gain: param, connect: () => node, disconnect() {} };
      return node;
    }
    createOscillator() {
      const record: FakeOscillator = { frequencyValues: [], stopped: false };
      oscillators.push(record);
      const node = {
        type: "",
        onended: null,
        frequency: { setValueAtTime: (value: number) => record.frequencyValues.push(value) },
        connect: () => node.gainNode,
        gainNode: { connect: () => ({}) },
        start() {},
        stop() {
          record.stopped = true;
        },
      };
      return node;
    }
  }

  vi.stubGlobal("AudioContext", FakeAudioContext);
  return { oscillators, created };
}

afterEach(() => {
  vi.unstubAllGlobals();
  vi.resetModules();
});

describe("interval player", () => {
  it("creates the audio context only when an interval is played", async () => {
    const { created, oscillators } = installFakeAudio();
    const player = await import("./interval-player");
    expect(created.contexts).toBe(0);

    await player.playInterval(69, 7);
    expect(created.contexts).toBe(1);
    expect(oscillators[0].frequencyValues[0]).toBeCloseTo(440, 6);
    expect(oscillators[1].frequencyValues[0]).toBeCloseTo(659.2551, 3);
  });

  it("stops scheduled notes", async () => {
    const { oscillators } = installFakeAudio();
    const player = await import("./interval-player");
    await player.playInterval(69, 12);
    player.stopPlayback();
    expect(oscillators.every((oscillator) => oscillator.stopped)).toBe(true);
  });

  it("throws when Web Audio is missing", async () => {
    vi.stubGlobal("AudioContext", undefined);
    const player = await import("./interval-player");
    await expect(player.playInterval(69, 7)).rejects.toBeInstanceOf(player.AudioUnavailableError);
  });
});
