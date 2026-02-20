import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

interface DurationPickerProps {
  durationMs: number;
  onChangeDuration: (ms: number) => void;
  disabled: boolean;
}

const PRESETS = [
  { label: '30s', ms: 30_000 },
  { label: '1m', ms: 60_000 },
  { label: '2m', ms: 120_000 },
  { label: '5m', ms: 300_000 },
  { label: '10m', ms: 600_000 },
];

export function DurationPicker({
  durationMs,
  onChangeDuration,
  disabled,
}: DurationPickerProps) {
  const [customMin, setCustomMin] = useState('');
  const [customSec, setCustomSec] = useState('');

  const applyCustom = () => {
    const mins = parseInt(customMin, 10) || 0;
    const secs = parseInt(customSec, 10) || 0;
    const total = (mins * 60 + secs) * 1000;
    if (total > 0) {
      onChangeDuration(total);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Duration</Text>
      <View style={styles.presets}>
        {PRESETS.map((p) => (
          <TouchableOpacity
            key={p.ms}
            style={[styles.chip, durationMs === p.ms && styles.chipActive]}
            onPress={() => onChangeDuration(p.ms)}
            disabled={disabled}
          >
            <Text
              style={[
                styles.chipText,
                durationMs === p.ms && styles.chipTextActive,
              ]}
            >
              {p.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.customRow}>
        <TextInput
          style={styles.input}
          placeholder="min"
          placeholderTextColor="#94a3b8"
          keyboardType="number-pad"
          value={customMin}
          onChangeText={setCustomMin}
          editable={!disabled}
        />
        <Text style={styles.colon}>:</Text>
        <TextInput
          style={styles.input}
          placeholder="sec"
          placeholderTextColor="#94a3b8"
          keyboardType="number-pad"
          value={customSec}
          onChangeText={setCustomSec}
          editable={!disabled}
        />
        <TouchableOpacity
          style={styles.setButton}
          onPress={applyCustom}
          disabled={disabled}
        >
          <Text style={styles.setButtonText}>Set</Text>
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
  presets: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
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
  customRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    gap: 8,
  },
  input: {
    width: 60,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    textAlign: 'center',
    color: '#1a1a2e',
  },
  colon: {
    fontSize: 20,
    fontWeight: '600',
    color: '#64748b',
  },
  setButton: {
    backgroundColor: '#1a1a2e',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  setButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
