import { StyleSheet } from 'react-native';

export const typography = StyleSheet.create({
  text_left: { textAlign: 'left' },
  text_center: { textAlign: 'center' },
  text_right: { textAlign: 'right' },
  text_justify: { textAlign: 'justify' },

  text_xs: { fontSize: 12 },
  text_sm: { fontSize: 14 },
  text_md: { fontSize: 16 },
  text_lg: { fontSize: 18 },
  text_xl: { fontSize: 22 },

  font_bold: { fontWeight: 'bold' },
  font_normal: { fontWeight: 'normal' },

  italic: { fontStyle: 'italic' },
});
