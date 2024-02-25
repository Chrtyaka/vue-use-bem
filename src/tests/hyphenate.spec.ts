import { describe, it, expect } from 'vitest';
import { reactive } from 'vue';
import { withSetup } from './with-setup';
import { useBem } from '../use-bem';

describe('hyphenate feature', () => {
  it('should not convert camel case to kebab case by default', () => {
    const mods = reactive({ someMod: 'valueMethod' });

    const [{ bem }] = withSetup(() => useBem('block'));

    expect(bem('', mods).value).toEqual('block block--someMod-valueMethod');
  });

  it('should convert modifier classes to kebab-case', () => {
    const mods = reactive({ someMod: 'valueMethod' });

    const [{ bem }] = withSetup(() => useBem('block'), {
      hyphenate: true,
    });

    expect(bem('', mods).value).toEqual('block block--some-mod-value-method');
  });
});
