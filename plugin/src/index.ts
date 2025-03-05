import { type ConfigPlugin, WarningAggregator, createRunOncePlugin } from '@expo/config-plugins';

import { withAndroidConfig } from './withAndroidConfig';
import { BPiOSConfig, withiOSConfig } from './withiOSConfig';

const PackageName = 'expo-brother-printer-sdk';
const PluginVersion = '1.0.0';

export type BPSDKConfig = BPiOSConfig;

const withBrotherPrinterSDKConfig: ConfigPlugin<BPSDKConfig> = (config, props = {}) => {
  // warn about deprecated ios info plist keys

  if ('bluetoothPeripheralUsageDescription' in props) {
    WarningAggregator.addWarningIOS(
      'bluetoothPeripheralUsageDescription',
      `The iOS permission \`NSBluetoothPeripheralUsageDescription\` is fully deprecated as of iOS 13 (lowest iOS version in Expo SDK 47+). Remove the \`bluetoothPeripheralPermission\` property from the \`${PackageName}\` config plugin.`,
    );
  }

  // ios config
  config = withiOSConfig(config, props);

  // android config
  config = withAndroidConfig(config);

  return config;
};

export default createRunOncePlugin(withBrotherPrinterSDKConfig, PackageName, PluginVersion);
