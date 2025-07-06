import { StyleProp, View, ViewStyle } from 'react-native';

import { GS } from '../styles';

export interface DividerProps {
  style?: StyleProp<ViewStyle>;
}

export function Divider({ style }: DividerProps) {
  return <View style={[GS.h_hairline, GS.bg_separator_primary, style]} />;
}
