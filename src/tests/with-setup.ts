import type { App } from 'vue';
import { createApp } from 'vue';
import { BemPluginOptions } from '../types';
import { VueBem } from '../plugin';

export function withSetup<T>(
  composable: () => T,
  pluginOptions?: BemPluginOptions,
): [T, App] {
  let result: T;
  const app = createApp({
    setup() {
      result = composable();
      return () => {};
    },
  });

  app.use(VueBem, pluginOptions);

  app.mount(document.createElement('div'));
  return [result, app];
}
