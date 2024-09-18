import * as printerSearcher from './printer-searcher';

/** SDK to connect to & utilize the features of Brother printers. */
export const BrotherPrinterSDK = {
  ...printerSearcher,
} as const;
