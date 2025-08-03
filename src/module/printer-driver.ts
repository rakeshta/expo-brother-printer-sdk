import { Platform } from 'react-native';

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

/**
 * Request the serial number of the printer specified by the channel.
 *
 * @param channel The printer channel to use.
 * @returns The serial number of the printer.
 */
export async function requestSerialNumber(channel: BPChannel): Promise<string> {
  if (Platform.OS !== 'ios') {
    return `--not supported on ${Platform.OS}--`;
  }
  return NativeModule.requestSerialNumber(channel);
}

/**
 * Print a PDF from a URL. This method prints all pages of the PDF.
 *
 * @param url The PDF URL.
 * @param channel The printer channel to use.
 * @param settings Optional print settings.
 *
 * @see {@link defaultPrintSettings} for default settings.
 */
export async function printPDF(url: string, channel: BPChannel, settings?: BPPrintSettings): Promise<void>;

/**
 * Print the specified pages of a PDF from a URL.
 *
 * @param url The PDF URL.
 * @param pages The pages to print.
 * @param channel The printer channel to use.
 * @param settings Optional print settings.
 *
 * @see {@link defaultPrintSettings} for default settings.
 */
export async function printPDF(
  url: string,
  pages: number[],
  channel: BPChannel,
  settings?: BPPrintSettings,
): Promise<void>;

export async function printPDF(
  url: string,
  pagesOrChannel: number[] | BPChannel,
  channelOrSettings?: BPChannel | BPPrintSettings,
  settings?: BPPrintSettings,
): Promise<void> {
  let pages: number[] = [];
  let channel: BPChannel;
  if (Array.isArray(pagesOrChannel)) {
    pages = pagesOrChannel;
    channel = channelOrSettings as BPChannel;
  } else {
    channel = pagesOrChannel as BPChannel;
    settings = channelOrSettings as BPPrintSettings;
  }
  await NativeModule.printPDFWithURL(url, pages, channel, { ...defaultPrintSettings, ...settings });
}
