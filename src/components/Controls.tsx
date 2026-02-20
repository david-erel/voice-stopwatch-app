import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TimerStatus } from '../hooks/useTimer';

interface ControlsProps {
  status: TimerStatus;
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
  onReset: () => void;
  onConfig: () => void;
}

export function Controls({
  status,
  onStart,
  onPause,
  onResume,
  onReset,
  onConfig,
}: ControlsProps) {
  const isIdle = status === 'idle';
  const isRunning = status === 'running';
  const isPaused = status === 'paused';
  const isFinished = status === 'finished';

  const startPauseDisabled = isFinished;
  const resetDisabled = isIdle;
  const configDisabled = !isIdle;

  const handleStartPause = () => {
    if (isIdle) onStart();
    else if (isRunning) onPause();
    else if (isPaused) onResume();
  };

  const startPauseLabel = isRunning ? 'Pause' : isPaused ? 'Resume' : 'Start';
  const startPauseStyle = isRunning
    ? styles.pauseButton
    : startPauseDisabled
      ? styles.disabledButton
      : styles.startButton;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, startPauseStyle]}
        onPress={handleStartPause}
        disabled={startPauseDisabled}
        activeOpacity={0.7}
      >
        <Text style={[styles.buttonText, startPauseDisabled && styles.disabledText]}>
          {startPauseLabel}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, resetDisabled ? styles.disabledButton : styles.resetButton]}
        onPress={onReset}
        disabled={resetDisabled}
        activeOpacity={0.7}
      >
        <Text style={[styles.buttonText, resetDisabled && styles.disabledText]}>Reset</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, configDisabled ? styles.disabledButton : styles.configButton]}
        onPress={onConfig}
        disabled={configDisabled}
        activeOpacity={0.7}
      >
        <Text style={[styles.buttonText, configDisabled && styles.disabledText]}>Config</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 40,
    alignItems: 'center',
    maxWidth: 140,
  },
  startButton: {
    backgroundColor: '#16a34a',
  },
  pauseButton: {
    backgroundColor: '#d97706',
  },
  resetButton: {
    backgroundColor: '#64748b',
  },
  configButton: {
    backgroundColor: '#3b82f6',
  },
  disabledButton: {
    backgroundColor: '#e2e8f0',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  disabledText: {
    color: '#94a3b8',
  },
});
