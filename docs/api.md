# API

## Plugin options

```ts
export interface BemPluginOptions {
  injectGlobalMethod?: boolean; // inject global bem method in vue instance
  methodName?: string; // global method name
  namespace?: string; // global namespace
  delimiters?: BemDelimitersCustom; // custom delimiters for generator
  hyphenate?: boolean; // convert generated classes from camelCase to kebab-case
}

export interface BemDelimiters {
  namespace: string;
  element: string;
  modificator: string;
  modificatorValue: string;
  state: string; // prefix for is() classes, default 'is-'
}

export type BemDelimitersCustom = Partial<BemDelimiters>;
```

## useBem

```ts
type BemModValue = string | number | boolean | null | undefined;
type BemNamespaceOverrides = Ref<string> | string;
interface BemModsObject {
  [key: string]: MaybeRefOrGetter<BemModValue>;
}
type BemModBasic = string | number;
type BemModifiers = MaybeRefOrGetter<BemModsObject>;

/**
 * @param block BEM block
 * @param namespaceOverrides custom namespace override
 * @returns object with bem methods
 */
declare function useBem(
  block: string,
  namespaceOverrides?: BemNamespaceOverrides,
): {
  b: () => string;
  bm: (modifier: BemModBasic) => string;
  e: (element: BemModBasic) => string;
  em: (element: string, modifier: BemModBasic) => string;
  is: (name: string, state?: MaybeRefOrGetter<boolean>) => string;
  bem: {
    (mods?: BemModifiers): ComputedRef<string>;
    (element: string, mods?: BemModifiers): ComputedRef<string>;
  };
};
```
