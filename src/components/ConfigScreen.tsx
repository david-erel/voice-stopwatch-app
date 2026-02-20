import React from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TimerMode } from '../hooks/useTimer';
import { DelayOption } from '../hooks/useDelayCountdown';
import { SpeechInterval } from '../hooks/useSpeech';
import { DelaySelector } from './DelaySelector';
import { SpeechConfig } from './SpeechConfig';
import { DurationPicker } from './DurationPicker';

interface ConfigScreenProps {
  visible: boolean;
  onClose: () => void;
  mode: TimerMode;
  durationMs: number;
  onChangeDuration: (ms: number) => void;
  delaySec: DelayOption;
  onChangeDelay: (delay: DelayOption) => void;
  speechInterval: SpeechInterval;
  onChangeSpeechInterval: (interval: SpeechInterval) => void;
}

export function ConfigScreen({
  visible,
  onClose,
  mode,
  durationMs,
  onChangeDuration,
  delaySec,
  onChangeDelay,
  speechInterval,
  onChangeSpeechInterval,
}: ConfigScreenProps) {
  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      <SafeAreaView style={styles.safe}>
        <View style={styles.header}>
          <Text style={styles.title}>Configuration</Text>
          <TouchableOpacity onPress={onClose} style={styles.doneButton}>
            <Text style={styles.doneText}>Done</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          {mode === 'timer' && (
            <View style={styles.section}>
              <DurationPicker
                durationMs={durationMs}
                onChangeDuration={onChangeDuration}
                disabled={false}
              />
            </View>
          )}

          <View style={styles.section}>
            <DelaySelector
              selected={delaySec}
              onSelect={onChangeDelay}
              disabled={false}
            />
          </View>

          <View style={styles.section}>
            <SpeechConfig
              interval={speechInterval}
              onChangeInterval={onChangeSpeechInterval}
              disabled={false}
            />
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1a1a2e',
  },
  doneButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#3b82f6',
    borderRadius: 20,
  },
  doneText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingTop: 24,
    gap: 16,
  },
  section: {
    marginTop: 8,
  },
});
