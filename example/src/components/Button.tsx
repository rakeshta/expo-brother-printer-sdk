import { StyleProp, Text, TouchableOpacity, ViewStyle } from 'react-native';

import { GS } from '../styles';

export interface ButtonProps {
  style?: StyleProp<ViewStyle>;
  title: string;
  disabled?: boolean;
  onPress: () => void | Promise<void>;
}

export function Button({ style, title, disabled, onPress }: ButtonProps) {
  return (
    <TouchableOpacity
      style={[
        GS.min_w_11,
        GS.min_h_11,
        GS.rounded_md,
        GS.bg_brand_primary,
        GS.p_sm,
        GS.itemsCenter,
        GS.justifyCenter,
        style,
      ]}
      disabled={disabled}
      onPress={onPress}
    >
      <Text style={[GS.color_text_reverse, GS.text_md, GS.font_bold]}>{title}</Text>
    </TouchableOpacity>
  );
}
