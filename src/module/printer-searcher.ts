import { Permission, PermissionsAndroid, Platform } from 'react-native';

import { BPChannel, BPNetworkSearchOptions } from '../types';
import { sanitize } from './helpers';
import { NativeModule } from './native-module';

/** Helper function to check and request the required permissions on Android. */
const checkAndRequestAndroidPermissions = Platform.select({
  android: async (): Promise<boolean> => {
    // Ensure Bluetooth permissions are granted on Android
    const permissions: Permission[] = [
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
    ];
    for (const permission of permissions) {
      let hasPermission = await PermissionsAndroid.check(permission);
      if (!hasPermission) {
        console.info(`Requesting Bluetooth permission - ${permission}`);
        const status = await PermissionsAndroid.request(permission, {
          title: 'Connect via Bluetooth',
          message: 'This app needs access to Bluetooth to connect to printers.',
          buttonPositive: 'Allow',
          buttonNegative: 'Deny',
        });

        if (status !== PermissionsAndroid.RESULTS.GRANTED) {
          console.warn(`${permission} permission denied`);
          return false;
        }
      }
    }

    return true;
  },
  default: async (): Promise<boolean> => true, // no-op for non-Android platforms
});

/**
 * Enumerate Bluetooth classic printers that are already connected to your device.
 *
 * @returns an array of BPChannel objects representing the printers found.
 */
export async function searchBluetoothPrinters(): Promise<BPChannel[]> {
  // on Android, request bluetooth permissions if not already granted
  if (Platform.OS === 'android') {
    const hasPermissions = await checkAndRequestAndroidPermissions();
    if (!hasPermissions) {
      return [];
    }
  }

  // search printers using the native module
  const results = await NativeModule.searchBluetoothPrinters();
  return sanitize(results) as BPChannel[];
}

/**
 * Search for WiFi printers on the network.
 *
 * @param options options to specify the printer models to search for and the search duration.
 * @returns an array of BPChannel objects representing the printers found.
 */
export async function searchNetworkPrinters(options: BPNetworkSearchOptions): Promise<BPChannel[]> {
  const results = await NativeModule.searchNetworkPrinters(options);
  return sanitize(results) as BPChannel[];
}
