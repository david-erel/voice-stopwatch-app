import { useCallback, useEffect, useRef, useState } from 'react';

export type TimerMode = 'stopwatch' | 'timer';
export type TimerStatus = 'idle' | 'running' | 'paused' | 'finished';

interface UseTimerOptions {
  mode: TimerMode;
  durationMs: number;
}

interface UseTimerReturn {
  elapsedMs: number;
  remainingMs: number;
  status: TimerStatus;
  start: () => void;
  pause: () => void;
  resume: () => void;
  reset: () => void;
}

export function useTimer({ mode, durationMs }: UseTimerOptions): UseTimerReturn {
  const [elapsedMs, setElapsedMs] = useState(0);
  const [status, setStatus] = useState<TimerStatus>('idle');
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<number>(0);
  const accumulatedRef = useRef<number>(0);

  const clearTick = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const tick = useCallback(() => {
    const now = Date.now();
    const total = accumulatedRef.current + (now - startTimeRef.current);
    setElapsedMs(total);

    if (mode === 'timer' && total >= durationMs) {
      setElapsedMs(durationMs);
      setStatus('finished');
    }
  }, [mode, durationMs]);

  useEffect(() => {
    if (status === 'running') {
      intervalRef.current = setInterval(tick, 100);
    } else {
      clearTick();
    }
    return clearTick;
  }, [status, tick, clearTick]);

  useEffect(() => {
    if (status === 'finished') {
      clearTick();
    }
  }, [status, clearTick]);

  const start = useCallback(() => {
    accumulatedRef.current = 0;
    startTimeRef.current = Date.now();
    setElapsedMs(0);
    setStatus('running');
  }, []);

  const pause = useCallback(() => {
    if (status === 'running') {
      accumulatedRef.current += Date.now() - startTimeRef.current;
      setStatus('paused');
    }
  }, [status]);

  const resume = useCallback(() => {
    if (status === 'paused') {
      startTimeRef.current = Date.now();
      setStatus('running');
    }
  }, [status]);

  const reset = useCallback(() => {
    clearTick();
    accumulatedRef.current = 0;
    setElapsedMs(0);
    setStatus('idle');
  }, [clearTick]);

  const remainingMs = mode === 'timer' ? Math.max(0, durationMs - elapsedMs) : 0;

  return { elapsedMs, remainingMs, status, start, pause, resume, reset };
}
