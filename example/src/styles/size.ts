import { StyleSheet } from 'react-native';

export const UNIT_SPACE = 4;

export const size = StyleSheet.create({
  aspect_square: {
    aspectRatio: 1,
  },

  h_1: { height: UNIT_SPACE * 1 },
  h_2: { height: UNIT_SPACE * 2 },
  h_3: { height: UNIT_SPACE * 3 },
  h_4: { height: UNIT_SPACE * 4 },
  h_5: { height: UNIT_SPACE * 5 },
  h_6: { height: UNIT_SPACE * 6 },
  h_7: { height: UNIT_SPACE * 7 },
  h_8: { height: UNIT_SPACE * 8 },
  h_9: { height: UNIT_SPACE * 9 },
  h_10: { height: UNIT_SPACE * 10 },
  h_11: { height: UNIT_SPACE * 11 },
  h_12: { height: UNIT_SPACE * 12 },

  w_1: { width: UNIT_SPACE * 1 },
  w_2: { width: UNIT_SPACE * 2 },
  w_3: { width: UNIT_SPACE * 3 },
  w_4: { width: UNIT_SPACE * 4 },
  w_5: { width: UNIT_SPACE * 5 },
  w_6: { width: UNIT_SPACE * 6 },
  w_7: { width: UNIT_SPACE * 7 },
  w_8: { width: UNIT_SPACE * 8 },
  w_9: { width: UNIT_SPACE * 9 },
  w_10: { width: UNIT_SPACE * 10 },
  w_11: { width: UNIT_SPACE * 11 },
  w_12: { width: UNIT_SPACE * 12 },

  min_w_11: {
    minWidth: UNIT_SPACE * 11,
  },
  min_h_11: {
    minHeight: UNIT_SPACE * 11,
  },

  w_hairline: {
    width: StyleSheet.hairlineWidth,
  },
  h_hairline: {
    height: StyleSheet.hairlineWidth,
  },

  w_full: {
    width: '100%',
  },
  h_full: {
    height: '100%',
  },
});
