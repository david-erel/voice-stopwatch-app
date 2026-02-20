import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface DelayOverlayProps {
  secondsLeft: number;
  visible: boolean;
}

export function DelayOverlay({ secondsLeft, visible }: DelayOverlayProps) {
  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <Text style={styles.number}>{secondsLeft}</Text>
      <Text style={styles.label}>Get ready...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(26, 26, 46, 0.95)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
  },
  number: {
    fontSize: 160,
    fontWeight: '100',
    color: '#fff',
  },
  label: {
    fontSize: 22,
    color: '#94a3b8',
    marginTop: 16,
    fontWeight: '500',
  },
});
