import { useState } from 'react';

import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BPChannel } from 'expo-brother-printer-sdk';

import { PrinterSelectSection } from './sections';
import { GS } from './styles';

export function HomeScreen() {
  // state
  const [channel, setChannel] = useState<BPChannel>();

  // safe areas
  const safeAreaInsets = useSafeAreaInsets();

  // render
  return (
    <View style={styles.root}>
      <View style={[styles.titleBar, { height: safeAreaInsets.top }]} />
      <ScrollView
        contentContainerStyle={[GS.p_sm]}
        contentInset={{ bottom: safeAreaInsets.bottom }}
        scrollIndicatorInsets={{ bottom: safeAreaInsets.bottom }}
      >
        <PrinterSelectSection selectedChannel={channel} onSelectChannel={setChannel} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  titleBar: {
    backgroundColor: '#fff',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#ccc',
  },
  root: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
});
