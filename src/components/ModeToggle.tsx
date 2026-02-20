import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TimerMode } from '../hooks/useTimer';

interface ModeToggleProps {
  mode: TimerMode;
  onChangeMode: (mode: TimerMode) => void;
  disabled: boolean;
}

export function ModeToggle({ mode, onChangeMode, disabled }: ModeToggleProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.tab, mode === 'stopwatch' && styles.activeTab]}
        onPress={() => onChangeMode('stopwatch')}
        disabled={disabled}
      >
        <Text
          style={[styles.tabText, mode === 'stopwatch' && styles.activeTabText]}
        >
          Stopwatch
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tab, mode === 'timer' && styles.activeTab]}
        onPress={() => onChangeMode('timer')}
        disabled={disabled}
      >
        <Text
          style={[styles.tabText, mode === 'timer' && styles.activeTabText]}
        >
          Timer
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#e2e8f0',
    borderRadius: 12,
    padding: 4,
    marginHorizontal: 24,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  activeTab: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#64748b',
  },
  activeTabText: {
    color: '#1a1a2e',
    fontWeight: '700',
  },
});
