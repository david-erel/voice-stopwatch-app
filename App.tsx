import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useKeepAwake } from 'expo-keep-awake';

import { ModeToggle } from './src/components/ModeToggle';
import { TimeDisplay } from './src/components/TimeDisplay';
import { Controls } from './src/components/Controls';
import { DelayOverlay } from './src/components/DelayOverlay';
import { ConfigScreen } from './src/components/ConfigScreen';

import { TimerMode, useTimer } from './src/hooks/useTimer';
import { DelayOption, useDelayCountdown } from './src/hooks/useDelayCountdown';
import { SpeechInterval, useSpeech } from './src/hooks/useSpeech';
import { loadSounds, unloadSounds } from './src/utils/sounds';

export default function App() {
  const [mode, setMode] = useState<TimerMode>('stopwatch');
  const [durationMs, setDurationMs] = useState(60_000);
  const [delaySec, setDelaySec] = useState<DelayOption>(5);
  const [speechInterval, setSpeechInterval] = useState<SpeechInterval>(5);
  const [configVisible, setConfigVisible] = useState(false);

  useKeepAwake();

  const timer = useTimer({ mode, durationMs });
  const delay = useDelayCountdown();

  useSpeech({
    mode,
    status: timer.status,
    elapsedMs: timer.elapsedMs,
    remainingMs: timer.remainingMs,
    intervalSec: speechInterval,
  });

  useEffect(() => {
    loadSounds();
    return () => {
      unloadSounds();
    };
  }, []);

  const displayMs =
    mode === 'stopwatch' ? timer.elapsedMs : timer.remainingMs;

  const handleStart = useCallback(() => {
    delay.startDelay(delaySec, () => {
      timer.start();
    });
  }, [delaySec, delay, timer]);

  const handleReset = useCallback(() => {
    delay.cancelDelay();
    timer.reset();
  }, [delay, timer]);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safe}>
        <StatusBar style="dark" />
        <DelayOverlay secondsLeft={delay.secondsLeft} visible={delay.isActive} />

        <ConfigScreen
          visible={configVisible}
          onClose={() => setConfigVisible(false)}
          mode={mode}
          durationMs={durationMs}
          onChangeDuration={setDurationMs}
          delaySec={delaySec}
          onChangeDelay={setDelaySec}
          speechInterval={speechInterval}
          onChangeSpeechInterval={setSpeechInterval}
        />

        <View style={styles.main}>
          <ModeToggle
            mode={mode}
            onChangeMode={(newMode) => {
              if (timer.status === 'paused' || timer.status === 'finished') {
                timer.reset();
              }
              setMode(newMode);
            }}
            disabled={timer.status === 'running' || delay.isActive}
          />

          <TimeDisplay milliseconds={displayMs} />

          <Controls
            status={delay.isActive ? 'running' : timer.status}
            onStart={handleStart}
            onPause={timer.pause}
            onResume={timer.resume}
            onReset={handleReset}
            onConfig={() => setConfigVisible(true)}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  main: {
    flex: 1,
    justifyContent: 'center',
  },
});
