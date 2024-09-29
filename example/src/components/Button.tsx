import { StyleProp, StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';

import { GS } from '../styles';

export interface ButtonProps {
  style?: StyleProp<ViewStyle>;
  title: string;
  disabled?: boolean;
  onPress: () => void | Promise<void>;
}

export function Button({ style, title, disabled, onPress }: ButtonProps) {
  return (
    <TouchableOpacity style={[styles.root, GS.p_sm, style]} disabled={disabled} onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  root: {
    minWidth: 44,
    minHeight: 44,
    borderRadius: 6,
    backgroundColor: '#ccccff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
