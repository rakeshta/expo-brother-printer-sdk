import { border } from './border';
import { flex } from './flex';
import { spacing } from './spacing';

/** Global styles */
export const GS = {
  ...flex,
  ...spacing,
  ...border,
} as const;
