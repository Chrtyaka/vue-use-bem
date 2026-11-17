import { ERROR_MESSAGES } from './constants';
import type {
  BemGeneratorArgs,
  BemGeneratorFunction,
  BemModifiers,
} from './types';

import { camelToKebabCase } from './hyphenate';

import { toValue } from 'vue';

export function createBemGenerator(
  config: BemGeneratorArgs,
): BemGeneratorFunction {
  const { delimiters, hyphenate } = config;

  return (element: string, mods?: BemModifiers) => {
    const modsValue = toValue(mods);

    if (!modsValue) {
      return hyphenate ? camelToKebabCase(element) : element;
    }

    const classes = [element];

    for (const [mod, raw] of Object.entries(modsValue)) {
      const value = toValue(raw);

      if (value === null || value === undefined || value === false) {
        continue;
      }

      const base = `${element}${delimiters.modificator}${mod}`;

      switch (typeof value) {
        case 'boolean':
          classes.push(base);
          break;
        case 'string':
          if (value.length) {
            classes.push(`${base}${delimiters.modificatorValue}${value}`);
          }
          break;
        case 'number':
          classes.push(`${base}${delimiters.modificatorValue}${value}`);
          break;
        default:
          console.warn(
            ERROR_MESSAGES.wrongModificatorType(element, typeof value),
          );
      }
    }

    const result = classes.join(' ');

    return hyphenate ? camelToKebabCase(result) : result;
  };
}
