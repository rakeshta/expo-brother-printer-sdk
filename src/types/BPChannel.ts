/** Channel type used to connect with printers */
export enum BPChannelType {
  /** Bluetooth Classic */
  BluetoothMFi = 0,

  /** WiFi */
  WiFi = 1,

  /** Bluetooth Low Energy */
  BluetoothLowEnergy = 2,
}

/**
 * Channel information for a Brother Printer.
 */
export interface BPChannel {
  /** Channel type used to connect with printers */
  readonly type: BPChannelType;

  /** Address info used to connect to the printer, such as IP address for WiFi printers
   *  or serial number for Bluetooth classic printers */
  readonly address: string;

  /** Model name of the printer. Example: 'QL-820NWB' */
  readonly modelName: string;

  /** Serial number of the printer.
   *  @remarks WiFi printers only. */
  readonly serialNumber?: string;

  /** MAC address of the printer.
   *  @remarks WiFi printers only. */
  readonly macAddress?: string;

  /** Node name of the printer.
   *  @remarks WiFi printers only. */
  readonly nodeName?: string;

  /** Location of the printer.
   *  @remarks WiFi printers only. */
  readonly location?: string;

  /** Alias of the printer.
   *  @remarks Bluetooth Classic printers only. */
  readonly alias?: string;
}
