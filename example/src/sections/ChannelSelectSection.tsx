import { useEffect, useState } from 'react';

import { BPChannel, BrotherPrinterSDK } from 'expo-brother-printer-sdk';

import { CheckIcon, Row, Section } from '../components';
import { GS } from '../styles';

export interface ChannelSelectSectionProps {
  selectedChannel?: BPChannel;
  onSelectChannel: (channel: BPChannel) => void;
}

export function ChannelSelectSection({ selectedChannel, onSelectChannel }: ChannelSelectSectionProps) {
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
    <Section contentStyle={GS.m_0} title='Select Printer'>
      {channels.map((channel) => (
        <Row
          key={channel.address}
          text={channel.modelName}
          accessory={selectedChannel?.address === channel.address ? <CheckIcon /> : undefined}
          onPress={() => onSelectChannel(channel)}
        />
      ))}
    </Section>
  );
}
