import { generateModifiersFromObject } from './bem';
import { BemMods, BemModsObject } from './types';

export function useBem(block: string, namespace?: string) {
  if (typeof block !== 'string' || block.length === 0) {
    throw new Error('[vue-use-bem]: Block is not specified');
  }

  const b = () => (namespace ? `${namespace}-${block}` : block);

  const e = (element: string) => `${b()}__${element}`;

  const bm = (modifier: string) => {
    return `${b()}--${modifier}`;
  };

  const em = (element: string, modifier: BemMods) => {
    return `${e(element)}--${modifier}`;
  };

  // Empty string element type is for cases where bem function applies to block
  const bem = (element: string | '', mods: BemModsObject) => {
    const resultEl = element && element !== '' ? e(element) : b();

    return generateModifiersFromObject(resultEl, mods);
  };

  return {
    b,
    bm,
    e,
    em,
    bem,
  };
}
