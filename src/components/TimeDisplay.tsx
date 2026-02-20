import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { formatTimeWithTenths } from '../utils/formatTime';

interface TimeDisplayProps {
  milliseconds: number;
}

export function TimeDisplay({ milliseconds }: TimeDisplayProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.time} adjustsFontSizeToFit numberOfLines={1}>
        {formatTimeWithTenths(milliseconds)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  time: {
    fontSize: 120,
    fontVariant: ['tabular-nums'],
    fontWeight: '200',
    letterSpacing: 2,
    color: '#1a1a2e',
  },
});
