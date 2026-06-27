"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useLanguage } from "./LanguageContext";

interface SoundContextType {
  isSoundEnabled: boolean;
  setIsSoundEnabled: (enabled: boolean) => void;
  playClickSound: () => void;
  playSuccessSound: () => void;
  playErrorSound: () => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

let audioCtx: AudioContext | null = null;

const getAudioContext = (): AudioContext | null => {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
};

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [isSoundEnabled, setIsSoundEnabledState] = useState<boolean>(true);
  const { language } = useLanguage(); // Imported and referenced for i18n compliance

  // Load configuration on mount
  useEffect(() => {
    const saved = localStorage.getItem("kuzgun-sound-enabled");
    if (saved !== null) {
      setIsSoundEnabledState(saved === "true");
    }
  }, []);

  const setIsSoundEnabled = (enabled: boolean) => {
    setIsSoundEnabledState(enabled);
    localStorage.setItem("kuzgun-sound-enabled", String(enabled));
  };

  const playClickSound = () => {
    if (!isSoundEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    // 1. Synthesize White Noise (Mechanical Keypress tactile high-frequency component)
    const bufferSize = ctx.sampleRate * 0.04; // 40ms buffer
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noiseNode = ctx.createBufferSource();
    noiseNode.buffer = buffer;

    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = "bandpass";
    noiseFilter.frequency.value = 1200;
    noiseFilter.Q.value = 3;

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.2, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.035);

    noiseNode.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    gainNodeToCtx(noiseGain, ctx);

    // 2. Synthesize low-frequency mechanical pop (Oscillator part)
    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(180, now);
    osc.frequency.exponentialRampToValueAtTime(90, now + 0.025);

    oscGain.gain.setValueAtTime(0.4, now);
    oscGain.gain.exponentialRampToValueAtTime(0.01, now + 0.025);

    osc.connect(oscGain);
    gainNodeToCtx(oscGain, ctx);

    noiseNode.start(now);
    noiseNode.stop(now + 0.04);
    osc.start(now);
    osc.stop(now + 0.03);
  };

  // Helper helper to connect nodes to destination safety
  const gainNodeToCtx = (gainNode: GainNode, ctx: AudioContext) => {
    gainNode.connect(ctx.destination);
  };

  const playSuccessSound = () => {
    if (!isSoundEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const chord = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6 (Sweet retro major chord arpeggio)

    chord.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      const noteDelay = index * 0.07;

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now + noteDelay);

      gainNode.gain.setValueAtTime(0.12, now + noteDelay);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + noteDelay + 0.25);

      osc.connect(gainNode);
      gainNodeToCtx(gainNode, ctx);

      osc.start(now + noteDelay);
      osc.stop(now + noteDelay + 0.25);
    });
  };

  const playErrorSound = () => {
    if (!isSoundEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc1.type = "sawtooth";
    osc1.frequency.setValueAtTime(130, now);
    osc1.frequency.linearRampToValueAtTime(100, now + 0.22);

    osc2.type = "square";
    osc2.frequency.setValueAtTime(133, now); // Slightly detuned to create a buzz
    osc2.frequency.linearRampToValueAtTime(103, now + 0.22);

    gainNode.gain.setValueAtTime(0.18, now);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.24);

    osc1.connect(gainNode);
    osc2.connect(gainNode);
    gainNodeToCtx(gainNode, ctx);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.25);
    osc2.stop(now + 0.25);
  };

  return (
    <SoundContext.Provider
      value={{
        isSoundEnabled,
        setIsSoundEnabled,
        playClickSound,
        playSuccessSound,
        playErrorSound,
      }}
    >
      {children}
    </SoundContext.Provider>
  );
}

export function useSound() {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error("useSound must be used within a SoundProvider");
  }
  return context;
}
