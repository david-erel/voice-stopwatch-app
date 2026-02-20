import { useEffect, useRef } from 'react';
import * as Speech from 'expo-speech';
import { spokenTime } from '../utils/formatTime';
import { TimerMode, TimerStatus } from './useTimer';

export type SpeechInterval = 5 | 10;

const SPEECH_OPTIONS: Speech.SpeechOptions = {
  language: 'en-US',
  pitch: 1.0,
  rate: 0.9,
  quality: 'Enhanced' as unknown as Speech.VoiceQuality,
};

interface UseSpeechOptions {
  mode: TimerMode;
  status: TimerStatus;
  elapsedMs: number;
  remainingMs: number;
  intervalSec: SpeechInterval;
}

export function useSpeech({
  mode,
  status,
  elapsedMs,
  remainingMs,
  intervalSec,
}: UseSpeechOptions): void {
  const lastSpokenRef = useRef<number>(-1);

  useEffect(() => {
    if (status !== 'running') return;

    const intervalMs = intervalSec * 1000;

    if (mode === 'stopwatch') {
      const bucket = Math.floor(elapsedMs / intervalMs);
      if (bucket <= 0) return;
      if (bucket === lastSpokenRef.current) return;
      lastSpokenRef.current = bucket;
      Speech.speak(spokenTime(bucket * intervalMs), SPEECH_OPTIONS);
    } else {
      const remainingSec = Math.floor(remainingMs / 1000);
      if (remainingSec <= 0) return;
      if (remainingSec === lastSpokenRef.current) return;

      const isFinalCountdown = remainingSec <= 5;
      const isIntervalHit = remainingSec % intervalSec === 0;

      if (!isFinalCountdown && !isIntervalHit) return;
      if (!isFinalCountdown && elapsedMs < 1000) return;

      lastSpokenRef.current = remainingSec;
      Speech.speak(String(remainingSec), SPEECH_OPTIONS);
    }
  }, [mode, status, elapsedMs, remainingMs, intervalSec]);

  useEffect(() => {
    if (status === 'finished' && mode === 'timer') {
      Speech.speak("Time's up!", SPEECH_OPTIONS);
    }
  }, [status, mode]);

  useEffect(() => {
    if (status === 'idle') {
      lastSpokenRef.current = -1;
    }
  }, [status]);
}
