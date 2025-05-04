import { border } from './border';
import { flex } from './flex';
import { overflow } from './overflow';
import { size } from './size';
import { spacing } from './spacing';
import { typography } from './typography';

/** Global styles */
export const GS = {
  ...flex,
  ...spacing,
  ...border,
  ...overflow,
  ...size,
  ...typography,
} as const;
