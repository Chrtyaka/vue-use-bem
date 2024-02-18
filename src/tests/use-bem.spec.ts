import { ERROR_MESSAGES } from '../constants';
import { useBem } from '../use-bem';
import { describe, it, expect } from 'vitest';
import { reactive, ref } from 'vue';
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

  describe('test basic functions', () => {
    it('test block', () => {
      const [{ b }] = withSetup(() => useBem('block'));

      expect(b()).toEqual('block');
    });

    it('test block--modifier', () => {
      const [{ bm }] = withSetup(() => useBem('block'));

      expect(bm('modifier')).toEqual('block--modifier');
    });

    it('test block__element', () => {
      const [{ e }] = withSetup(() => useBem('block'));

      expect(e('element')).toEqual('block__element');
    });

    it('test block-element--modifier', () => {
      const [{ em }] = withSetup(() => useBem('block'));

      expect(em('element', 'modifier')).toBe('block__element--modifier');
    });
  });

  describe('test bem function', () => {
    describe('plain modifier values: string, boolean, number', () => {
      it('test use block element if actual element is not provided', () => {
        const [{ bem }] = withSetup(() => useBem('block'));

        const element = bem('', {});

        expect(element.value).toBe('block');
      });

      it('test boolean modifier boolean --true', () => {
        const [{ bem }] = withSetup(() => useBem('block'));

        const element = bem('element', { size: true });

        expect(element.value).toBe('block__element block__element--size');
      });

      it('test boolean modifier boolean --false', () => {
        const [{ bem }] = withSetup(() => useBem('block'));

        const element = bem('element', { size: false });

        expect(element.value).toBe('block__element');
      });

      it('test string modifier', () => {
        const [{ bem }] = withSetup(() => useBem('block'));

        const element = bem('element', { size: 'large' });

        expect(element.value).toBe('block__element block__element--size-large');
      });

      it('test string modifier --empty', () => {
        const [{ bem }] = withSetup(() => useBem('block'));

        const element = bem('element', { size: '' });

        expect(element.value).toBe('block__element');
      });

      it('test number modifier', () => {
        const [{ bem }] = withSetup(() => useBem('block'));

        const element = bem('element', { size: 1 });

        expect(element.value).toBe('block__element block__element--size-1');
      });
    });

    describe('vue refs as modifier value', () => {
      it('test boolean modifier boolean', () => {
        const [{ bem }] = withSetup(() => useBem('block'));

        const modifier = ref(false);

        const element = bem('element', { size: modifier });

        expect(element.value).toBe('block__element');

        modifier.value = true;

        expect(element.value).toBe('block__element block__element--size');
      });

      it('test string modifier', () => {
        const [{ bem }] = withSetup(() => useBem('block'));

        const modifier = ref('large');

        const element = bem('element', { size: modifier });

        expect(element.value).toBe('block__element block__element--size-large');

        modifier.value = 'small';

        expect(element.value).toBe('block__element block__element--size-small');
      });

      it('test number modifier', () => {
        const [{ bem }] = withSetup(() => useBem('block'));

        const modifier = ref(1);

        const element = bem('element', { size: modifier });

        expect(element.value).toBe('block__element block__element--size-1');

        modifier.value = 2;

        expect(element.value).toBe('block__element block__element--size-2');
      });
    });

    it('modifiers are reactive object', () => {
      const mods = reactive({
        size: 'large',
        dark: true,
        state: 1,
      });

      const [{ bem }] = withSetup(() => useBem('block'));

      const element = bem('element', mods);

      expect(element.value).toBe(
        'block__element block__element--size-large block__element--dark block__element--state-1',
      );

      mods.dark = false;

      expect(element.value).toBe(
        'block__element block__element--size-large block__element--state-1',
      );
    });
  });

  describe('test install plugin', () => {
    it('should provide default values if plugin options no specified', () => {
      const [, app] = withSetup(() => useBem('block'), {
        injectGlobalMethod: true,
      });

      expect(app.config.globalProperties.b).toBeDefined();
    });

    it('should provide custom bem method', () => {
      const [, app] = withSetup(() => useBem('block'), {
        injectGlobalMethod: true,
        methodName: 'bem',
      });

      expect(app.config.globalProperties.bem).toBeDefined();
    });

    it('should provide custom delimiters', () => {
      const [{ bm }] = withSetup(() => useBem('block'), {
        methodName: 'bem',
        delimiters: { modificator: '&&' },
      });

      expect(bm('modifier')).toBe('block&&modifier');
    });
  });
});
