import * as vue from 'vue';
import { Ref, reactive, App } from 'vue';

type BemModValue = string | number | boolean;
type BemNamespaceOverrides = Ref<string> | string;
interface BemModsObject {
    [key: string]: BemModValue;
}
type BemModBasic = Exclude<BemModValue, boolean>;
type BemModsReactive = ReturnType<typeof reactive<BemModsObject>>;
interface BemModsWithRefs {
    [key: string]: Ref<BemModValue>;
}
type BemModifiers = BemModsObject | BemModsReactive | BemModsWithRefs;
interface BemDelimiters {
    namespace: string;
    element: string;
    modificator: string;
    modificatorValue: string;
}
type BemDelimitersCustom = Partial<BemDelimiters>;
interface BemPluginOptions {
    injectGlobalMethod?: boolean;
    methodName?: string;
    namespace?: string;
    delimiters?: BemDelimitersCustom;
    hyphenate?: boolean;
}

/**
 * @param block BEM block
 * @param namespaceOverrides custom namespace override
 * @returns object with bem methods
 */
declare function useBem(block: string, namespaceOverrides?: BemNamespaceOverrides): {
    b: () => string;
    bm: (modifier: BemModBasic) => string;
    e: (element: BemModBasic) => string;
    em: (element: string, modifier: BemModBasic) => string;
    bem: (element: string | '', mods: BemModifiers) => vue.ComputedRef<string>;
};

declare const VueBem: {
    install(app: App, options?: BemPluginOptions): void;
};

export { VueBem, useBem };
