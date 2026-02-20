import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DelayOption } from '../hooks/useDelayCountdown';

interface DelaySelectorProps {
  selected: DelayOption;
  onSelect: (delay: DelayOption) => void;
  disabled: boolean;
}

const OPTIONS: { label: string; value: DelayOption }[] = [
  { label: 'Immediate', value: 0 },
  { label: '5s', value: 5 },
  { label: '10s', value: 10 },
  { label: '30s', value: 30 },
];

export function DelaySelector({
  selected,
  onSelect,
  disabled,
}: DelaySelectorProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Pre-start delay</Text>
      <View style={styles.row}>
        {OPTIONS.map((opt) => (
          <TouchableOpacity
            key={opt.value}
            style={[styles.chip, selected === opt.value && styles.chipActive]}
            onPress={() => onSelect(opt.value)}
            disabled={disabled}
          >
            <Text
              style={[
                styles.chipText,
                selected === opt.value && styles.chipTextActive,
              ]}
            >
              {opt.label}
            </Text>
          </TouchableOpacity>
        ))}
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
    paddingHorizontal: 16,
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
