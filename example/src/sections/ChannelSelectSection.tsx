import { useEffect, useState } from 'react';

import { StyleProp, ViewStyle } from 'react-native';

import { BPChannel, BPChannelType, BrotherPrinterSDK } from 'expo-brother-printer-sdk';

import { CheckIcon, Row, Section } from '../components';
import { GS } from '../styles';

const ChannelDescription: Record<BPChannelType, string> = {
  [BPChannelType.BluetoothMFi]: 'Bluetooth Classic',
  [BPChannelType.WiFi]: 'WiFi',
  [BPChannelType.BluetoothLowEnergy]: 'Bluetooth Low Energy',
};

export interface ChannelSelectSectionProps {
  style?: StyleProp<ViewStyle>;
  selectedChannel?: BPChannel;
  onSelectChannel: (channel: BPChannel) => void;
}

export function ChannelSelectSection({ style, selectedChannel, onSelectChannel }: ChannelSelectSectionProps) {
  // printer list
  const [channels, setChannels] = useState<BPChannel[]>([]);

  // search for printers on mount
  useEffect(() => {
    (async () => {
      // search & save channels
      const channels = await BrotherPrinterSDK.searchBluetoothPrinters();
      setChannels(channels);

      // if no selected channel, select the first one
      if (!selectedChannel && channels.length > 0) {
        onSelectChannel(channels[0]);
      }
    })();
  }, []);

  // render
  return (
    <Section style={style} contentStyle={GS.m_0} title='Select Printer'>
      {channels.length === 0 && (
        <Row text='No printers found' subText='Connect to a printer via Bluetooth settings, then restart the app.' />
      )}
      {channels.map((channel) => (
        <Row
          key={channel.address}
          text={channel.modelName}
          subText={`${channel.address} (${ChannelDescription[channel.type]})`}
          accessory={selectedChannel?.address === channel.address ? <CheckIcon /> : undefined}
          onPress={() => onSelectChannel(channel)}
        />
      ))}
    </Section>
  );
}
