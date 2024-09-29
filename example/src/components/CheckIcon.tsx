import { StyleProp, ViewStyle } from 'react-native';

import AntDesign from '@expo/vector-icons/AntDesign';

export interface CheckIconProps {
  style?: StyleProp<ViewStyle>;
}

export function CheckIcon({ style }: CheckIconProps) {
  return <AntDesign name='check' size={24} style={style} />;
}
