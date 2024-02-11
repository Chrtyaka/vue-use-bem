import type { BemDelimiters, BemModsObject } from './types';

const EMPTY_SPACE = ' ';

export function generateModifiersFromObject(
  element: string,
  mods: BemModsObject,
  delimiters: BemDelimiters,
) {
  let result = element;

  Object.entries(mods).forEach(([mod, value]) => {
    switch (typeof value) {
      case 'boolean':
        result += value
          ? `${EMPTY_SPACE}${element}${delimiters.modificator}${mod}`
          : '';
        break;
      case 'string':
        result += value.length
          ? `${EMPTY_SPACE}${element}${delimiters.modificator}${mod}${delimiters.modificatorValue}${value}`
          : '';
        break;
      case 'number':
        result += `${EMPTY_SPACE}${element}${delimiters.modificator}${mod}${delimiters.modificatorValue}${value}`;
        break;
      default: {
        console.warn(
          `[vue-bem-cn]: Invalid modificator value type: ${typeof value} for element ${element}`,
        );
        // @ts-expect-error setup exhaustiveCheck
        const exhaustiveCheck: never = typeof value;

        return exhaustiveCheck;
      }
    }
  });

  return result;
}
