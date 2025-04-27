import { StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';

import { GS } from '../styles';
import { Divider } from './Divider';

export interface SectionProps {
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  title: string;
  titleAccessory?: React.ReactNode;
  children?: React.ReactNode;
  onPress?: () => void | Promise<void>;
}

export function Section({ style, contentStyle, title, titleAccessory, children, onPress }: SectionProps) {
  // contents
  const contents = (
    <View style={[styles.root, GS.border, GS.rounded_md, GS.overflow_hidden, style]}>
      <View style={[GS.flexRow, GS.itemsCenter, GS.justifyBetween, GS.px_md]}>
        <Text style={[styles.title, GS.py_md]}>{title}</Text>
        {titleAccessory}
      </View>
      <Divider />
      <View style={[GS.m_md, contentStyle]}>{children}</View>
    </View>
  );

  // render
  return onPress ? <TouchableOpacity onPress={onPress}>{contents}</TouchableOpacity> : contents;
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
