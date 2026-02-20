import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SpeechInterval } from '../hooks/useSpeech';

interface SpeechConfigProps {
  interval: SpeechInterval;
  onChangeInterval: (interval: SpeechInterval) => void;
  disabled: boolean;
}

export function SpeechConfig({
  interval,
  onChangeInterval,
  disabled,
}: SpeechConfigProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Voice every</Text>
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.chip, interval === 5 && styles.chipActive]}
          onPress={() => onChangeInterval(5)}
          disabled={disabled}
        >
          <Text
            style={[styles.chipText, interval === 5 && styles.chipTextActive]}
          >
            5s
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.chip, interval === 10 && styles.chipActive]}
          onPress={() => onChangeInterval(10)}
          disabled={disabled}
        >
          <Text
            style={[styles.chipText, interval === 10 && styles.chipTextActive]}
          >
            10s
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    gap: 8,
  },
  chip: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
  },
  chipActive: {
    backgroundColor: '#1a1a2e',
  },
  chipText: {
    fontSize: 14,
    color: '#475569',
    fontWeight: '500',
  },
  chipTextActive: {
    color: '#fff',
  },
});
