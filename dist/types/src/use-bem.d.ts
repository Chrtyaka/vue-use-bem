import { BemDelimiters, BemModBasic, BemModifiers, BemNamespaceOverrides } from './types';
import type { InjectionKey } from 'vue';
export declare const NAMESPACE_INJECTION_KEY: InjectionKey<string | undefined>;
export declare const DELIMITERS_INJECTION_KEY: InjectionKey<BemDelimiters>;
export declare const HYPHENATE_INJECTION_KEY: InjectionKey<boolean>;
/**
 * @param block BEM block
 * @param namespaceOverrides custom namespace override
 * @returns object with bem methods
 */
export declare function useBem(block: string, namespaceOverrides?: BemNamespaceOverrides): {
    b: () => string;
    bm: (modifier: BemModBasic) => string;
    e: (element: BemModBasic) => string;
    em: (element: string, modifier: BemModBasic) => string;
    bem: (element: string | '', mods: BemModifiers) => import("vue").ComputedRef<string>;
};
