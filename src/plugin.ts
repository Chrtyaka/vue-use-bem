import { App } from 'vue-demi';
import type { BemModsObject, BemPluginOptions } from './types';

import { DEFAULT_DELIMITERS } from './config';

import { generateModifiersFromObject } from './bem';

import { DELIMITERS_INJECTION_KEY, NAMESPACE_INJECTION_KEY } from './use-bem';

export const VueBem = {
  install(app: App, options: BemPluginOptions) {
    if (options.namespace) {
      app.provide(NAMESPACE_INJECTION_KEY, options.namespace);
    }

    const delimiters = options.delimiters
      ? { ...DEFAULT_DELIMITERS, ...options.delimiters }
      : DEFAULT_DELIMITERS;

    if (options.delimiters) {
      app.provide(DELIMITERS_INJECTION_KEY, delimiters);
    }

    const bemMethod = options.methodName ?? 'b';

    app.config.globalProperties[bemMethod] = (
      element: string,
      mods: BemModsObject,
    ) => generateModifiersFromObject(element, mods, delimiters);
  },
};
