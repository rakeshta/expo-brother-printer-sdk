import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

export interface DividerProps {
  style?: StyleProp<ViewStyle>;
}

export function Divider({ style }: DividerProps) {
  return <View style={[styles.root, style]} />;
}

const styles = StyleSheet.create({
  root: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#ccc',
  },
});
