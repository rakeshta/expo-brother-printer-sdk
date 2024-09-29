import { StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';

import { GS } from '../styles';

export interface RowProps {
  style?: StyleProp<ViewStyle>;
  text?: string;
  subText?: string;
  accessory?: React.ReactNode;
  onPress?: () => void | Promise<void>;
}

export function Row({ style, text, subText, accessory, onPress }: RowProps) {
  // contents
  const contents = (
    <View style={[styles.root, GS.flexRow, GS.itemsCenter, GS.px_md, style]}>
      <View style={[GS.flex1, GS.py_md]}>
        <Text style={styles.text}>{text}</Text>
        {subText && <Text style={[styles.subText, GS.mt_xs]}>{subText}</Text>}
      </View>
      {accessory && <View style={GS.ml_lg}>{accessory}</View>}
    </View>
  );

  // render
  return onPress ? <TouchableOpacity onPress={onPress}>{contents}</TouchableOpacity> : contents;
}

const styles = StyleSheet.create({
  root: {
    minHeight: 44,
  },
  text: {
    fontSize: 16,
  },
  subText: {
    fontSize: 13,
    color: '#666',
  },
});
