import { border } from './border';
import { flex } from './flex';
import { overflow } from './overflow';
import { spacing } from './spacing';

/** Global styles */
export const GS = {
  ...flex,
  ...spacing,
  ...border,
  ...overflow,
} as const;
