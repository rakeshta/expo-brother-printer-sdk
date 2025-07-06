import { StyleSheet } from 'react-native';

import { round } from 'lodash';

import { Color } from './colors';

const ROUNDING_XS = 4;
const ROUNDING_SM = 8;
const ROUNDING_MD = 16;
const ROUNDING_LG = 24;

export const border = StyleSheet.create({
  rounded_xs: { borderRadius: ROUNDING_XS },
  rounded_sm: { borderRadius: ROUNDING_SM },
  rounded_md: { borderRadius: ROUNDING_MD },
  rounded_lg: { borderRadius: ROUNDING_LG },
  rounded_full: { borderRadius: 9999 },

  border: { borderWidth: StyleSheet.hairlineWidth, borderColor: Color.Separator.Primary },
  border_b: { borderBottomWidth: StyleSheet.hairlineWidth, borderColor: Color.Separator.Primary },
  border_t: { borderTopWidth: StyleSheet.hairlineWidth, borderColor: Color.Separator.Primary },
  border_l: { borderLeftWidth: StyleSheet.hairlineWidth, borderColor: Color.Separator.Primary },
  border_r: { borderRightWidth: StyleSheet.hairlineWidth, borderColor: Color.Separator.Primary },

  border_debug1: { borderWidth: 1, borderColor: 'red' },
  border_debug2: { borderWidth: 1, borderColor: 'green' },
  border_debug3: { borderWidth: 1, borderColor: 'blue' },
});
