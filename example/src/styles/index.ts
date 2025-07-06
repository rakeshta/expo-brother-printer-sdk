import { border } from './border';
import { colors } from './colors';
import { flex } from './flex';
import { overflow } from './overflow';
import { size } from './size';
import { spacing } from './spacing';
import { typography } from './typography';

/** Global styles */
export const GS = {
  ...colors,
  ...flex,
  ...spacing,
  ...border,
  ...overflow,
  ...size,
  ...typography,
} as const;
