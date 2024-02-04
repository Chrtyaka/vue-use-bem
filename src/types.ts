type BemModValue = string | number | boolean;

export interface BemModsObject {
  [key: string]: BemModValue;
}

export type BemMods = string | number | BemModsObject;
