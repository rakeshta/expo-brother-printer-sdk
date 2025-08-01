import { StyleProp, Text, TouchableOpacity, View, ViewStyle } from 'react-native';

import { GS } from '../styles';

export interface RowProps {
  style?: StyleProp<ViewStyle>;
  text?: React.ReactNode;
  subText?: React.ReactNode;
  detail?: React.ReactNode;
  accessory?: React.ReactNode;
  children?: React.ReactNode;
  onPress?: () => void | Promise<void>;
}

export function Row({ style, text, subText, detail, accessory, children, onPress }: RowProps) {
  // contents
  let contents = (
    <View style={[GS.min_h_11, GS.flexRow, GS.itemsCenter, GS.px_md, style]}>
      <View style={[GS.flex1, GS.pt_md, children ? GS.pb_sm : GS.pb_md]}>
        <Text style={[GS.text_md]}>{text}</Text>
        {subText && <Text style={[GS.color_text_secondary, GS.text_sm, GS.mt_xs]}>{subText}</Text>}
      </View>
      {detail && <Text style={[GS.text_md, GS.text_right, GS.font_bold, GS.ml_lg, GS.flex1]}>{detail}</Text>}
      {accessory && <View style={GS.ml_lg}>{accessory}</View>}
    </View>
  );

  // add children below the main content
  if (children) {
    contents = (
      <View style={[GS.flexCol]}>
        {contents}
        <View style={[GS.mx_md, GS.mb_md]}>{children}</View>
      </View>
    );
  }

  // render
  return onPress ? <TouchableOpacity onPress={onPress}>{contents}</TouchableOpacity> : contents;
}
