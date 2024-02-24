import { App } from 'vue';
import type { BemPluginOptions } from './types';

import { BEM_METHOD_NAME, DEFAULT_DELIMITERS } from './constants';

import { createBemGenerator } from './bem';

import {
  DELIMITERS_INJECTION_KEY,
  HYPHENATE_INJECTION_KEY,
  NAMESPACE_INJECTION_KEY,
} from './use-bem';

export const VueBem = {
  install(app: App, options?: BemPluginOptions) {
    // Provide default delimiters and BEM-method
    if (!options) {
      app.provide(DELIMITERS_INJECTION_KEY, DEFAULT_DELIMITERS);

      return;
    }

    if (options.namespace) {
      app.provide(NAMESPACE_INJECTION_KEY, options.namespace);
    }

    const delimiters = options.delimiters
      ? { ...DEFAULT_DELIMITERS, ...options.delimiters }
      : DEFAULT_DELIMITERS;

    const hyphenate = options.hyphenate ?? false;

    app.provide(HYPHENATE_INJECTION_KEY, hyphenate);

    app.provide(DELIMITERS_INJECTION_KEY, delimiters);

    if (options.injectGlobalMethod) {
      const bemMethod = options.methodName ?? BEM_METHOD_NAME;

      const bemGenerator = createBemGenerator({ delimiters, hyphenate });

      app.config.globalProperties[bemMethod] = bemGenerator;
    }
  },
};
