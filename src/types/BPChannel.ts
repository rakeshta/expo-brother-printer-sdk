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
 *
 * @remarks TODO: How to search for printers
 *
 * @remarks TODO: How to reconnect to previously found printers
 */
export interface BPChannel {
  /** Channel type used to connect with printers */
  readonly type: BPChannelType;

  /** Address info used to connect to the printer, such as IP address for WiFi printers
   *  or serial number for Bluetooth classic printers */
  readonly address: string;

  /** Model name of the printer. Example: 'QL-820NWB' */
  readonly modelName: string;

  /** Serial number of the printer */
  readonly serialNumber: string;

  /** MAC address of the printer. Not available for bluetooth printers. */
  readonly macAddress?: string;

  /** Node name of the printer. Not available for bluetooth printers. */
  readonly nodeName?: string;

  /** Location of the printer. Not available for bluetooth printers. */
  readonly location?: string;
}
