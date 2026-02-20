import { useCallback, useEffect, useRef, useState } from 'react';
import { playBeep, playFinalBeep } from '../utils/sounds';

export type DelayOption = 0 | 5 | 10 | 30;

interface UseDelayCountdownReturn {
  secondsLeft: number;
  isActive: boolean;
  startDelay: (delaySec: DelayOption, onComplete: () => void) => void;
  cancelDelay: () => void;
}

export function useDelayCountdown(): UseDelayCountdownReturn {
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const onCompleteRef = useRef<(() => void) | null>(null);
  const secondsLeftRef = useRef(0);

  const clearCountdown = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const cancelDelay = useCallback(() => {
    clearCountdown();
    setIsActive(false);
    setSecondsLeft(0);
    secondsLeftRef.current = 0;
  }, [clearCountdown]);

  const startDelay = useCallback(
    (delaySec: DelayOption, onComplete: () => void) => {
      if (delaySec === 0) {
        onComplete();
        return;
      }

      onCompleteRef.current = onComplete;
      secondsLeftRef.current = delaySec;
      setSecondsLeft(delaySec);
      setIsActive(true);

      intervalRef.current = setInterval(() => {
        secondsLeftRef.current -= 1;
        const current = secondsLeftRef.current;
        setSecondsLeft(current);

        if (current <= 0) {
          clearCountdown();
          setIsActive(false);
          playFinalBeep();
          onCompleteRef.current?.();
        } else if (current <= 5) {
          playBeep();
        }
      }, 1000);
    },
    [clearCountdown]
  );

  useEffect(() => {
    return clearCountdown;
  }, [clearCountdown]);

  return { secondsLeft, isActive, startDelay, cancelDelay };
}
