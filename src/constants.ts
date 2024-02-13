import type { BemDelimiters } from './types';

export const DEFAULT_DELIMITERS: BemDelimiters = {
  namespace: '-',
  element: '__',
  modificator: '--',
  modificatorValue: '-',
};

export const ERROR_MESSAGES = {
  emptyBlock: '[vue-use-bem]: Block is not specified',
  wrongModificatorType: (element: string, value: unknown) =>
    `[vue-bem-cn]: Invalid modificator value type: ${typeof value} for element ${element}`,
};
