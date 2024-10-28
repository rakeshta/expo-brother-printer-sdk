import { StyleProp, ViewStyle } from 'react-native';

import Feather from '@expo/vector-icons/Feather';

export interface CheckIconProps {
  style?: StyleProp<ViewStyle>;
}

export function CheckIcon({ style }: CheckIconProps) {
  return <Feather name='check' size={24} style={style} />;
}
