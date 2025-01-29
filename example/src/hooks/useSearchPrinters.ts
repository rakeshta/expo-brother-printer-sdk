import { useCallback, useEffect, useState } from 'react';

import { BPChannel, BPNetworkSearchOptions, BrotherPrinterSDK } from 'expo-brother-printer-sdk';

const NETWORK_SEARCH_OPTIONS: BPNetworkSearchOptions = {
  printerList: ['QL-820NWB'],
  searchDuration: 2000,
};

export interface UseSearchPrintersResult {
  channels: BPChannel[];
  refresh: () => Promise<void>;
}

/**
 * Search for printers and return the list of channels & a callback to refresh the list.
 *
 * @returns the list of channels & a callback to refresh the list
 */
export function useSearchPrinters(): UseSearchPrintersResult {
  // channels state
  const [channels, setChannels] = useState<BPChannel[]>([]);

  // method to refresh the list of channels
  const refresh = useCallback(async () => {
    // helper to add channels without duplicates
    const addChannels = (newChannels: BPChannel[]) => {
      setChannels((prevChannels) => {
        const newChannelAddresses = newChannels.map((channel) => channel.address);
        return prevChannels.filter((channel) => !newChannelAddresses.includes(channel.address)).concat(newChannels);
      });
    };

    // bluetooth search
    console.log('Searching for BLE printers...');
    const blChannels = await BrotherPrinterSDK.searchBluetoothPrinters();
    addChannels(blChannels);

    // wifi search
    console.log('Searching for WiFi printers...');
    const wifiChannels = await BrotherPrinterSDK.searchNetworkPrinters(NETWORK_SEARCH_OPTIONS);
    addChannels(wifiChannels);
  }, []);

  // initial search on mount
  useEffect(() => {
    refresh();
  }, [refresh]);

  // results
  return { channels, refresh };
}
