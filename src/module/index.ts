import * as printerDriver from './printer-driver';
import * as printerSearcher from './printer-searcher';

/** SDK to connect to & utilize the features of Brother printers. */
export const BrotherPrinterSDK = {
  ...printerDriver,
  ...printerSearcher,
} as const;
