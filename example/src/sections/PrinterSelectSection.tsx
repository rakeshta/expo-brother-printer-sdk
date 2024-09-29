import { useEffect, useState } from 'react';

import { BPChannel, BrotherPrinterSDK } from 'expo-brother-printer-sdk';

import { CheckIcon, Row, Section } from '../components';
import { GS } from '../styles';

export interface PrinterSelectSectionProps {
  selectedChannel?: BPChannel;
  onSelectChannel: (channel: BPChannel) => void;
}

export function PrinterSelectSection({ selectedChannel, onSelectChannel }: PrinterSelectSectionProps) {
  // printer list
  const [channels, setChannels] = useState<BPChannel[]>([]);

  // search for printers on mount
  useEffect(() => {
    BrotherPrinterSDK.searchBluetoothPrinters().then(setChannels);
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
