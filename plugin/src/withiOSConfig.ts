import { type ConfigPlugin, withInfoPlist } from '@expo/config-plugins';

const NSLocalNetworkUsageDescription = 'Allow $(PRODUCT_NAME) to connect to Brother printers on your WiFi';
const NSBluetoothPeripheralUsageDescription = 'Allow $(PRODUCT_NAME) to connect to Brother printers using Bluetooth';
const NSBluetoothAlwaysUsageDescription = 'Allow $(PRODUCT_NAME) to connect to Brother printers using Bluetooth';
const UISupportedExternalAccessoryProtocols = ['com.brother.ptcbp'];
const NSBonjourServices = ['_ipp._tcp', '_pdl-datastream._tcp', '_printer._tcp'];

export interface BPiOSConfig {
  localNetworkUsageDescription?: string | false;
  bluetoothPeripheralUsageDescription?: string | false;
  bluetoothAlwaysUsageDescription?: string | false;
  supportedExternalAccessoryProtocols?: string[] | false;
  bonjourServices?: string[] | false;
}

export const withiOSConfig: ConfigPlugin<BPiOSConfig> = (
  config,
  {
    localNetworkUsageDescription,
    bluetoothPeripheralUsageDescription,
    bluetoothAlwaysUsageDescription,
    supportedExternalAccessoryProtocols,
    bonjourServices,
  },
) => {
  return withInfoPlist(config, (config) => {
    if (localNetworkUsageDescription !== false) {
      config.modResults['NSLocalNetworkUsageDescription'] =
        localNetworkUsageDescription || NSLocalNetworkUsageDescription;
    }
    if (bluetoothPeripheralUsageDescription !== false) {
      config.modResults['NSBluetoothPeripheralUsageDescription'] =
        bluetoothPeripheralUsageDescription || NSBluetoothPeripheralUsageDescription;
    }
    if (bluetoothAlwaysUsageDescription !== false) {
      config.modResults['NSBluetoothAlwaysUsageDescription'] =
        bluetoothAlwaysUsageDescription || NSBluetoothAlwaysUsageDescription;
    }
    if (supportedExternalAccessoryProtocols !== false) {
      config.modResults['UISupportedExternalAccessoryProtocols'] =
        supportedExternalAccessoryProtocols || UISupportedExternalAccessoryProtocols;
    }
    if (bonjourServices !== false) {
      config.modResults['NSBonjourServices'] = bonjourServices || NSBonjourServices;
    }
    return config;
  });
};
