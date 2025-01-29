/**
 * Options when searching for a printer on the same network.
 */
export interface BPNetworkSearchOptions {
  /**
   * Printer models to search for.
   *
   * @example
   * ```ts
   * ['QL-1110NWB', 'QL-820NWB']
   * ```
   */
  printerList: string[];

  /**
   * Search duration in milliseconds.
   *
   * @default 1000
   */
  searchDuration?: number;
}
