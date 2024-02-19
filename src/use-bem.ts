import { generateModifiersFromObject } from './bem';
import {
  BemDelimiters,
  BemModBasic,
  BemModifiers,
  BemNamespaceOverrides,
} from './types';
import { computed, inject, getCurrentInstance, unref } from 'vue';

import type { InjectionKey } from 'vue';
import { DEFAULT_DELIMITERS, ERROR_MESSAGES } from './constants';

export const NAMESPACE_INJECTION_KEY: InjectionKey<string | undefined> =
  Symbol('bemNamespace');

export const DELIMITERS_INJECTION_KEY: InjectionKey<BemDelimiters> =
  Symbol('bemDelimiters');

function useNamespace(namespaceOverrides?: BemNamespaceOverrides) {
  const injectedNamespace = getCurrentInstance()
    ? inject(NAMESPACE_INJECTION_KEY)
    : undefined;

  const derivedNamespace = namespaceOverrides || injectedNamespace;

  const namespace = computed(() => unref(derivedNamespace));

  return { namespace };
}

function useDelimiters() {
  const injectedDelimiters = getCurrentInstance()
    ? inject(DELIMITERS_INJECTION_KEY)
    : undefined;

  const delimiters = injectedDelimiters || DEFAULT_DELIMITERS;

  return { delimiters };
}

export function useBem(
  block: string,
  namespaceOverrides?: BemNamespaceOverrides,
) {
  if (typeof block !== 'string' || block.length === 0) {
    throw new Error(ERROR_MESSAGES.emptyBlock);
  }

  const { namespace } = useNamespace(namespaceOverrides);

  const { delimiters } = useDelimiters();

  const b = () =>
    namespace.value
      ? `${namespace.value}${delimiters.namespace}${block}`
      : block;

  const e = (element: BemModBasic) => `${b()}${delimiters.element}${element}`;

  const bm = (modifier: BemModBasic) => {
    return `${b()}${delimiters.modificator}${modifier}`;
  };

  const em = (element: string, modifier: BemModBasic) => {
    return `${e(element)}${delimiters.modificator}${modifier}`;
  };

  // Empty string element type is for cases where bem function applies to block
  /**
   * Generate classes using object with modifiers
   * @param element base element or empty string for block
   * @param mods object with modifiers
   * @returns computed property with generated classes
   */
  const bem = (element: string | '', mods?: BemModifiers) => {
    const resultEl = element !== '' ? e(element) : b();

    return computed(() =>
      generateModifiersFromObject(resultEl, delimiters, mods),
    );
  };

  return {
    b,
    bm,
    e,
    em,
    bem,
  };
}
