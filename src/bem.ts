import { ERROR_MESSAGES } from './constants';
import type {
  BemGeneratorArgs,
  BemGeneratorFunction,
  BemModifiers,
} from './types';

import { camelToKebabCase } from './hyphenate';

import { unref } from 'vue';

const EMPTY_SPACE = ' ';

export function createBemGenerator(
  config: BemGeneratorArgs,
): BemGeneratorFunction {
  return (element: string, mods: BemModifiers) => {
    let result = element;

    if (!mods) {
      return element;
    }

    const { delimiters, hyphenate } = config;

    Object.entries(mods).forEach(([mod, value]) => {
      const modValue = unref(value);

      switch (typeof modValue) {
        case 'boolean':
          result += modValue
            ? `${EMPTY_SPACE}${element}${delimiters.modificator}${mod}`
            : '';
          break;
        case 'string':
          result += modValue.length
            ? `${EMPTY_SPACE}${element}${delimiters.modificator}${mod}${delimiters.modificatorValue}${modValue}`
            : '';
          break;
        case 'number':
          result += `${EMPTY_SPACE}${element}${delimiters.modificator}${mod}${delimiters.modificatorValue}${modValue}`;
          break;
        default: {
          console.warn(
            ERROR_MESSAGES.wrongModificatorType(element, typeof value),
          );
          // @ts-expect-error setup exhaustiveCheck
          const exhaustiveCheck: never = typeof modValue;

          return exhaustiveCheck;
        }
      }
    });

    return hyphenate ? camelToKebabCase(result) : result;
  };
}
