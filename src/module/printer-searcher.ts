import { BPChannel } from '../types';
import { sanitize } from './helpers';
import { NativeModule } from './native-module';

/**
 * Search for Bluetooth classic printers that are already connected to your device.
 *
 * @returns an array of BPChannel objects representing the printers found.
 */
export async function searchBluetoothPrinters(): Promise<BPChannel[]> {
  const results = await NativeModule.searchBluetoothPrinters();
  return sanitize(results) as BPChannel[];
}
