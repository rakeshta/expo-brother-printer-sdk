import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

import { GS } from '../styles';
import { Divider } from './Divider';

export interface SectionProps {
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  title: string;
  children?: React.ReactNode;
}

export function Section({ style, contentStyle, title, children }: SectionProps) {
  return (
    <View style={[styles.root, style]}>
      <Text style={[styles.title, GS.px_md, GS.py_sm]}>{title}</Text>
      <Divider />
      <View style={[GS.m_md, contentStyle]}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#fff',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#ccc',
    borderRadius: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
