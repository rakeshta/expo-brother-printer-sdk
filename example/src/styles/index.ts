import { border } from './border';
import { flex } from './flex';
import { overflow } from './overflow';
import { spacing } from './spacing';
import { typography } from './typography';

/** Global styles */
export const GS = {
  ...flex,
  ...spacing,
  ...border,
  ...overflow,
  ...typography,
} as const;
