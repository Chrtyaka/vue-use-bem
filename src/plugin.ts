import { App } from 'vue-demi';
import type { BemPluginOptions } from './types';

import { NAMESPACE_INJECTION_KEY } from './use-bem';

export const VueBem = {
  install(app: App, options: BemPluginOptions) {
    if (options.namespace) {
      app.provide(NAMESPACE_INJECTION_KEY, options.namespace);
    }
  },
};
