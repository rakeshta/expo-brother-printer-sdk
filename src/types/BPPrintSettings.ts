/**
 * Settings for printing an image or PDF.
 *
 * @remarks
 * Only QL series printers are supported at the moment.
 */
export interface BPPrintSettings {
  /** Size of the label loaded in the printer. */
  labelSize?: BPQLLabelSize;

  /**
   * A number of pages to cut. Defaults to `1`.
   *
   * If set `1`, printer cut the paper each print a page.
   * If set `3`, printer cut the paper every print three pages.
   *
   * This setting only takes effect when {@link autoCut} is set to `true`.
   */
  autoCutForEachPageCount?: number;

  /**
   * Auto-cut after each page or as configured in {@link autoCutForEachPageCount}.
   * Defaults to `false`.
   *
   * @see {@link autoCutForEachPageCount}
   */
  autoCut?: boolean;

  /**
   * Auto-cut at the end of the print job. Defaults to `false`.
   */
  cutAtEnd?: boolean;

  /**
   * The print resolution. This may not be available for all printers.
   */
  resolution?: BPResolution;
}

/** Label sizes for QL series printers. */
export enum BPQLLabelSize {
  DieCutW17H54 = 0,
  DieCutW17H87 = 1,
  DieCutW23H23 = 2,
  DieCutW29H42 = 3,
  DieCutW29H90 = 4,
  DieCutW38H90 = 5,
  DieCutW39H48 = 6,
  DieCutW52H29 = 7,
  DieCutW62H29 = 8,
  /** @remarks QL-8xx series only */
  DieCutW62H60 = 9,
  /** @remarks QL-8xx series only */
  DieCutW62H75 = 10,
  DieCutW62H100 = 11,
  DieCutW60H86 = 12,
  DieCutW54H29 = 13,
  DieCutW102H51 = 14,
  DieCutW102H152 = 15,
  DieCutW103H164 = 16,
  RollW12 = 17,
  RollW29 = 18,
  RollW38 = 19,
  RollW50 = 20,
  RollW54 = 21,
  RollW62 = 22,
  RollW62RB = 23,
  RollW102 = 24,
  RollW103 = 25,
  DTRollW90 = 26,
  DTRollW102 = 27,
  DTRollW102H51 = 28,
  DTRollW102H152 = 29,
  RoundW12DIA = 30,
  RoundW24DIA = 31,
  RoundW58DIA = 32,
}

/** The print resolution. */
export enum BPResolution {
  Low = 0,
  Normal = 1,
  High = 2,
}
