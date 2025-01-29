import { BPChannel, BPNetworkSearchOptions } from '../types';
import { sanitize } from './helpers';
import { NativeModule } from './native-module';

/**
 * Enumerate Bluetooth classic printers that are already connected to your device.
 *
 * @returns an array of BPChannel objects representing the printers found.
 */
export async function searchBluetoothPrinters(): Promise<BPChannel[]> {
  const results = await NativeModule.searchBluetoothPrinters();
  return sanitize(results) as BPChannel[];
}

/**
 * Search for WiFi printers on the network.
 *
 * @param options options to specify the printer models to search for and the search duration.
 * @returns an array of BPChannel objects representing the printers found.
 */
export async function searchNetworkPrinters(options: BPNetworkSearchOptions): Promise<BPChannel[]> {
  const results = await NativeModule.searchNetworkPrinters(options);
  return sanitize(results) as BPChannel[];
}
