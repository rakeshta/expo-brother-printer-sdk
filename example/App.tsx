import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { BrotherPrinterSDK } from 'expo-brother-printer-sdk';

export default function App() {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.actionButton}
        onPress={async () => {
          const channels = await BrotherPrinterSDK.searchBluetoothPrinters();
          console.log('--debug channels:', channels);
        }}
      >
        <Text>Start Bluetooth Search</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButton: {
    padding: 12,
    marginTop: 16,
    borderRadius: 6,
    backgroundColor: '#ccccff',
  },
});
