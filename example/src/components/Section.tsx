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
    <View style={[styles.root, GS.border, GS.rounded_md, style]}>
      <Text style={[styles.title, GS.px_md, GS.py_sm]}>{title}</Text>
      <Divider />
      <View style={[GS.m_md, contentStyle]}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
