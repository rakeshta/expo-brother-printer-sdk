import { BPChannel, BPHalftone, BPPrintSettings } from '../types';
import { NativeModule } from './native-module';

/**
 * Default printer settings.
 */
export const defaultPrintSettings: BPPrintSettings = {
  autoCutForEachPageCount: 1,
  autoCut: true,
  cutAtEnd: true,
  halftone: BPHalftone.PatternDither,
  halftoneThreshold: 128,
};

/**
 * Print an image from a URL.
 *
 * @param url The image URL.
 * @param channel The printer channel to use.
 * @param settings Optional print settings.
 *
 * @see {@link defaultPrintSettings} for default settings.
 */
export async function printImage(url: string, channel: BPChannel, settings?: BPPrintSettings): Promise<void> {
  await NativeModule.printImageWithURL(url, channel, { ...defaultPrintSettings, ...settings });
}
