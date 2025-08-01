import { useEffect, useState } from 'react';

import { StyleProp, Text, ViewStyle } from 'react-native';

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

  // additional details about the selected channel
  const [selectedChannelInfo, setSelectedChannelInfo] = useState<{ serialNumber: string } | undefined>(undefined);

  useEffect(() => {
    if (selectedChannel) {
      setSelectedChannelInfo({
        serialNumber: selectedChannel.serialNumber || 'N/A',
      });
    } else {
      setSelectedChannelInfo(undefined);
    }
  }, [selectedChannel]);

  // render
  return (
    <Section style={style} contentStyle={GS.m_0} title='Select Printer'>
      {channels.length === 0 && (
        <Row text='No printers found' subText='Connect to a printer via Bluetooth settings, then restart the app.' />
      )}
      {channels.map((channel) => {
        const isSelected = selectedChannel?.address === channel.address;
        return (
          <Row
            key={channel.address}
            text={
              <>
                {channel.modelName}
                <Text style={[GS.color_text_secondary]}>{` (${channel.serialNumber})`}</Text>
              </>
            }
            subText={`${channel.address} (${ChannelDescription[channel.type]})`}
            accessory={isSelected ? <CheckIcon /> : undefined}
            onPress={() => onSelectChannel(channel)}
          />
        );
      })}
    </Section>
  );
}
