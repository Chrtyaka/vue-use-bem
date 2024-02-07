import { generateModifiersFromObject } from './bem';
import { BemMods, BemModsObject } from './types';
import { computed, inject, getCurrentInstance, unref } from 'vue-demi';
import type { Ref } from 'vue-demi';

import type { InjectionKey } from 'vue-demi';

export const NAMESPACE_INJECTION_KEY: InjectionKey<string | undefined> =
  Symbol('bemNamespace');

function useNamespace(namespaceOverrides?: Ref<string>) {
  const injectedNamespace = getCurrentInstance()
    ? inject(NAMESPACE_INJECTION_KEY)
    : undefined;

  const derivedNamespace = namespaceOverrides || injectedNamespace;

  const namespace = computed(() => unref(derivedNamespace));

  return { namespace };
}

export function useBem(block: string, namespaceOverrides?: Ref<string>) {
  if (typeof block !== 'string' || block.length === 0) {
    throw new Error('[vue-use-bem]: Block is not specified');
  }

  const { namespace } = useNamespace(namespaceOverrides);

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

    return computed(() => generateModifiersFromObject(resultEl, mods));
  };

  return {
    b,
    bm,
    e,
    em,
    bem,
  };
}
