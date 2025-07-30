import { AndroidConfig, ConfigPlugin, withAndroidManifest } from '@expo/config-plugins';

type ManifestUsesPermission = AndroidConfig.Manifest.ManifestUsesPermission;

export const withAndroidConfig: ConfigPlugin = (config) => {
  return withAndroidManifest(config, async (config) => {
    // add xmlns:tools="http://schemas.android.com/tools" to manifest tag
    if (!config.modResults.manifest.$.hasOwnProperty('xmlns:tools')) {
      config.modResults.manifest.$['xmlns:tools'] = 'http://schemas.android.com/tools';
    }

    // ensure 'uses-permission' array exists
    if (!config.modResults.manifest['uses-permission']) {
      config.modResults.manifest['uses-permission'] = [];
    }

    // add permissions required for the SDK
    // https://support.brother.com/g/s/es/htmldoc/mobilesdk/guide/getting-started/getting-started-android.html#add-permissions
    const manifestUsesPermissions = config.modResults.manifest['uses-permission'];
    addUsesPermission(manifestUsesPermissions, 'android.permission.INTERNET');
    addUsesPermission(manifestUsesPermissions, 'android.permission.ACCESS_NETWORK_STATE');
    addUsesPermission(manifestUsesPermissions, 'android.permission.BLUETOOTH');
    addUsesPermission(manifestUsesPermissions, 'android.permission.BLUETOOTH_ADMIN');
    addUsesPermission(manifestUsesPermissions, 'android.permission.BLUETOOTH_SCAN', {
      'android:usesPermissionFlags': 'neverForLocation',
      'tools:targetApi': 's',
    });
    addUsesPermission(manifestUsesPermissions, 'android.permission.BLUETOOTH_CONNECT');
    addUsesPermission(manifestUsesPermissions, 'android.permission.ACCESS_FINE_LOCATION', {
      'android:maxSdkVersion': '30',
    });
    addUsesPermission(manifestUsesPermissions, 'android.permission.WRITE_EXTERNAL_STORAGE');

    return config;
  });
};

function addUsesPermission(
  manifestUsesPermissions: ManifestUsesPermission[],
  permission: string,
  attribs: Record<string, string> = {},
): void {
  // skip if permission already exists
  if (manifestUsesPermissions.some((item) => item.$['android:name'] === permission)) {
    return;
  }

  // add permission
  manifestUsesPermissions.push({
    $: { 'android:name': permission, ...attribs },
  });
}
