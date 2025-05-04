import { useState } from 'react';

import { ScrollView, StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

import { BPChannel, BPPrintSettings, BPQLLabelSize, BrotherPrinterSDK } from 'expo-brother-printer-sdk';

import { Button } from './components';
import { ChannelSelectSection, PreviewSection, PrintSettingsSection } from './sections';
import { MediaService, SampleMedia } from './services';
import { GS } from './styles';

export function HomeScreen() {
  // state
  const [channel, setChannel] = useState<BPChannel>();
  const [settings, setSettings] = useState<BPPrintSettings>(() => ({
    ...BrotherPrinterSDK.defaultPrintSettings,
    labelSize: BPQLLabelSize.RollW62,
  }));
  const [media, setMedia] = useState<SampleMedia>(() => {
    const media = MediaService.sampleMedia;
    return media[media.length - 1]; // select last media by default
  });

  // print callback
  const onPrint = async () => {
    // abort if printer not selected
    if (!channel) return;

    // download media
    const mediaUrl = await MediaService.urlForSampleMedia(media);

    // send print job
    try {
      if (media.mediaExt === 'pdf') {
        await BrotherPrinterSDK.printPDF(mediaUrl, channel, settings);
      } else {
        await BrotherPrinterSDK.printImage(mediaUrl, channel, settings);
      }
    } catch (error) {
      console.error('Print error:', error);
    }
  };

  // safe areas
  const safeAreaInsets = useSafeAreaInsets();

  // render
  return (
    <GestureHandlerRootView style={styles.root}>
      <BottomSheetModalProvider>
        {/* header */}
        <View style={[styles.header, { height: safeAreaInsets.top }]} />

        {/* scroll area */}
        <ScrollView contentContainerStyle={[GS.px_sm, GS.py_md]}>
          <ChannelSelectSection style={GS.mb_md} selectedChannel={channel} onSelectChannel={setChannel} />
          <PrintSettingsSection style={GS.mb_md} settings={settings} onChange={setSettings} />
          <PreviewSection style={GS.mb_md} selectedMedia={media} onSelectMedia={setMedia} />
        </ScrollView>

        {/* footer */}
        <View style={styles.footer}>
          <View style={[GS.px_lg, GS.py_md]}>
            <Button title='Print' disabled={!channel} onPress={onPrint} />
          </View>
          <View style={{ height: safeAreaInsets.bottom }} />
        </View>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
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
