import { BPChannel, BPPrintSettings } from '../types';
import { NativeModule } from './native-module';

/**
 * Print an image from a URL.
 *
 * @param url The image URL.
 * @param channel The printer channel to use.
 * @param settings Optional print settings.
 */
export async function printImage(url: string, channel: BPChannel, settings: BPPrintSettings = {}): Promise<void> {
  await NativeModule.printImageWithURL(url, channel, settings);
}
