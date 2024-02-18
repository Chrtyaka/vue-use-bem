import { Ref, reactive } from 'vue';

type BemModValue = string | number | boolean;

export type BemNamespaceOverrides = Ref<string> | string;

export interface BemModsObject {
  [key: string]: BemModValue;
}

export type BemModBasic = Exclude<BemModValue, boolean>;

type BemModsReactive = ReturnType<typeof reactive<BemModsObject>>;

interface BemModsWithRefs {
  [key: string]: Ref<BemModValue>;
}

export type BemModifiers = BemModsObject | BemModsReactive | BemModsWithRefs;
export interface BemDelimiters {
  namespace: string;
  element: string;
  modificator: string;
  modificatorValue: string;
}

export type BemDelimitersCustom = Partial<BemDelimiters>;

export interface BemPluginOptions {
  injectGlobalMethod?: boolean;
  methodName?: string;
  namespace?: string;
  delimiters?: BemDelimitersCustom;
}
