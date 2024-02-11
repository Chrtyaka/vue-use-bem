import { ERROR_MESSAGES } from '../constants';
import { useBem } from '../use-bem';
import { describe, it, expect } from 'vitest';
import { ref } from 'vue-demi';
import { withSetup } from './with-setup';

describe('use-bem', () => {
  it('throw error if block not specified', () => {
    expect(() => useBem('')).toThrowError(ERROR_MESSAGES.emptyBlock);
  });

  describe('namespace', () => {
    it('should not generate block with namespace by default', () => {
      const { b } = useBem('block');

      expect(b()).toEqual('block');
    });

    it('should override namespace', () => {
      const ns = ref('ns');

      const { b } = useBem('block', ns);

      expect(b()).toEqual('ns-block');
    });

    it('should use provided namespace', () => {
      const [composable] = withSetup(() => useBem('block'), {
        namespace: 'namespace',
      });

      expect(composable.b()).toEqual('namespace-block');
    });

    it('should not use inject ns if ns directly provided in composable', () => {
      const ns = ref('el');

      const [composable] = withSetup(() => useBem('block', ns), {
        namespace: 'namespace',
      });

      expect(composable.b()).toEqual('el-block');
    });
  });
});
