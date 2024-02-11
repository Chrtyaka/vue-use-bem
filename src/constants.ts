import type { BemDelimiters } from './types';

export const DEFAULT_DELIMITERS: BemDelimiters = {
  namespace: '-',
  element: '__',
  modificator: '--',
  modificatorValue: '-',
};

export const ERROR_MESSAGES = {
  emptyBlock: '[vue-use-bem]: Block is not specified',
};
