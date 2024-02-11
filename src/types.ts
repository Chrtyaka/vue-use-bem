type BemModValue = string | number | boolean;

export interface BemModsObject {
  [key: string]: BemModValue;
}

export type BemMods = string | number | BemModsObject;

export interface BemDelimiters {
  namespace: string;
  element: string;
  modificator: string;
  modificatorValue: string;
}

export type BemDelimitersCustom = Partial<BemDelimiters>;

export interface BemPluginOptions {
  methodName?: string;
  namespace?: string;
  delimiters?: BemDelimitersCustom;
}
