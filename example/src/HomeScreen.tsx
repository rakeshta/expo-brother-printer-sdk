import { useState } from 'react';

import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BPChannel, BPPrintSettings, BPQLLabelSize, BrotherPrinterSDK } from 'expo-brother-printer-sdk';

import { Button } from './components';
import { ChannelSelectSection, PrintSettingsSection } from './sections';
import { GS } from './styles';

const sampleImage = require('../assets/Sample-Image.png');

export function HomeScreen() {
  // state
  const [channel, setChannel] = useState<BPChannel>();
  const [settings, setSettings] = useState<BPPrintSettings>({
    labelSize: BPQLLabelSize.RollW62,
    autoCut: true,
  });

  // print callback
  const onPrint = async () => {
    // abort if printer not selected
    if (!channel) return;

    // send print job
    const imageUri = Image.resolveAssetSource(sampleImage).uri;
    await BrotherPrinterSDK.printImage(imageUri, channel, settings);
  };

  // safe areas
  const safeAreaInsets = useSafeAreaInsets();

  // render
  return (
    <View style={styles.root}>
      {/* header */}
      <View style={[styles.header, { height: safeAreaInsets.top }]} />

      {/* scroll area */}
      <ScrollView
        contentContainerStyle={[GS.px_sm, GS.py_md]}
        contentInset={{ bottom: safeAreaInsets.bottom }}
        scrollIndicatorInsets={{ bottom: safeAreaInsets.bottom }}
      >
        <ChannelSelectSection style={GS.mb_md} selectedChannel={channel} onSelectChannel={setChannel} />
        <PrintSettingsSection />
      </ScrollView>

      {/* footer */}
      <View style={styles.footer}>
        <View style={[GS.px_lg, GS.py_md]}>
          <Button title='Print' disabled={!channel} onPress={onPrint} />
        </View>
        <View style={{ height: safeAreaInsets.bottom }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  header: {
    backgroundColor: '#fff',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#ccc',
  },
  footer: {
    backgroundColor: '#fff',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: '#ccc',
  },
});
