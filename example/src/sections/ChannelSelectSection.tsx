import { useEffect } from 'react';

import { StyleProp, ViewStyle } from 'react-native';

import { BPChannel, BPChannelType } from 'expo-brother-printer-sdk';

import { CheckIcon, Row, Section } from '../components';
import { useSearchPrinters } from '../hooks';
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
  // search for printers
  const { channels } = useSearchPrinters();

  // auto-select the first printer
  useEffect(() => {
    if (!selectedChannel && channels.length > 0) {
      onSelectChannel(channels[0]);
    }
  }, [channels, onSelectChannel, selectedChannel]);

  // render
  return (
    <Section style={style} contentStyle={GS.m_0} title='Select Printer'>
      {channels.length === 0 && (
        <Row text='No printers found' subText='Connect to a printer via Bluetooth settings, then restart the app.' />
      )}
      {channels.map((channel) => (
        <Row
          key={channel.address}
          text={
            channel.alias && channel.alias !== channel.modelName ?
              `${channel.modelName} (${channel.alias})`
            : channel.modelName
          }
          subText={`${channel.address} (${ChannelDescription[channel.type]})`}
          accessory={selectedChannel?.address === channel.address ? <CheckIcon /> : undefined}
          onPress={() => onSelectChannel(channel)}
        />
      ))}
    </Section>
  );
}
