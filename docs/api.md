# API

## Plugin options

```ts
export interface BemPluginOptions {
  injectGlobalMethod?: boolean;       // inject global bem method in vue instance
  methodName?: string;                // global method name
  namespace?: string;                 // global namespace
  delimiters?: BemDelimitersCustom;   // custom delimiters for generator
}

export interface BemDelimiters {
  namespace: string;
  element: string;
  modificator: string;
  modificatorValue: string;
}

export type BemDelimitersCustom = Partial<BemDelimiters>;

```

## useBem

```ts
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
    bem: (element: string | '', mods?: BemModifiers) => vue.ComputedRef<string>;
};

```