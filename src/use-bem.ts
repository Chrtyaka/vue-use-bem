import { createBemGenerator } from './bem';
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

export const HYPHENATE_INJECTION_KEY: InjectionKey<boolean> =
  Symbol('bemHyphenate');

/**
 * Returns namespace for bem generator injected by current instance
 */
function useNamespace(namespaceOverrides?: BemNamespaceOverrides) {
  const injectedNamespace = getCurrentInstance()
    ? inject(NAMESPACE_INJECTION_KEY)
    : undefined;

  const derivedNamespace = namespaceOverrides || injectedNamespace;

  const namespace = computed(() => unref(derivedNamespace));

  return { namespace };
}

/**
 * Returns delimiters for bem generator injected by current instance or default value
 */
function useDelimiters() {
  const injectedDelimiters = getCurrentInstance()
    ? inject(DELIMITERS_INJECTION_KEY)
    : undefined;

  const delimiters = injectedDelimiters || DEFAULT_DELIMITERS;

  return { delimiters };
}

/**
 * @returns injected hyphenate config property or false
 */

function useHyphenate() {
  const injectedHyphenate = getCurrentInstance()
    ? inject(HYPHENATE_INJECTION_KEY)
    : undefined;

  const hyphenate = injectedHyphenate || false;

  return { hyphenate };
}

/**
 * @param block BEM block
 * @param namespaceOverrides custom namespace override
 * @returns object with bem methods
 */

export function useBem(
  block: string,
  namespaceOverrides?: BemNamespaceOverrides,
) {
  if (typeof block !== 'string' || block.length === 0) {
    throw new Error(ERROR_MESSAGES.emptyBlock);
  }

  const { namespace } = useNamespace(namespaceOverrides);

  const { delimiters } = useDelimiters();

  const { hyphenate } = useHyphenate();

  /**
   * Generate block class
   * @returns class for block with namespace if it provided
   */
  const b = () =>
    namespace.value
      ? `${namespace.value}${delimiters.namespace}${block}`
      : block;
  /**
   * Generate new element class
   * @param element element name
   * @returns string class for element inside block. example: block__element
   */
  const e = (element: BemModBasic) => `${b()}${delimiters.element}${element}`;

  /**
   * Generate modifier for block
   * @param modifier modifier for block
   * @returns string class with modifier for block. example: block--modifier
   */
  const bm = (modifier: BemModBasic) => {
    return `${b()}${delimiters.modificator}${modifier}`;
  };

  /**
   * Generate modifier class for element
   * @param element base element
   * @param modifier modifier for element
   * @returns string modifier class for element. example: block__element--modifier
   */

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
  const bem = (element: string | '', mods: BemModifiers) => {
    const resultEl = element !== '' ? e(element) : b();

    const bemGenerator = createBemGenerator({ delimiters, hyphenate });

    return unref(computed(() => bemGenerator(resultEl, mods)));
  };

  return {
    b,
    bm,
    e,
    em,
    bem,
  };
}
