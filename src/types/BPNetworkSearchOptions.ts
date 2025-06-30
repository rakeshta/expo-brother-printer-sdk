/**
 * Options when searching for a printer on the same network.
 */
export interface BPNetworkSearchOptions {
  /**
   * Search duration in milliseconds.
   *
   * @default 1000
   */
  searchDuration?: number;

  /**
   * Printer models to search for.
   *
   * @remarks iOS only.
   *
   * @example
   * ```ts
   * ['QL-1110NWB', 'QL-820NWB']
   * ```
   */
  printerList?: string[];

  /**
   * Whether to find printers shared via tethering.
   *
   * @remarks Android only.
   *
   * @default false
   */
  isTethering?: boolean;
}
