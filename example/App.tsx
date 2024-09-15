import { StyleSheet, Text, View } from 'react-native';

import * as ExpoBrotherPrinterSdk from 'expo-brother-printer-sdk';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>{ExpoBrotherPrinterSdk.hello()}</Text>
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
});
