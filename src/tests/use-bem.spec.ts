import { ERROR_MESSAGES } from '../constants';
import { useBem } from '../use-bem';
import { describe, it, expect, vi } from 'vitest';
import { computed, reactive, ref } from 'vue';
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
    it('test is-state helper', () => {
      const [{ is }] = withSetup(() => useBem('block'));

      expect(is('active')).toBe('is-active');
      expect(is('active', true)).toBe('is-active');
      expect(is('active', false)).toBe('');
    });

    it('is-state accepts ref and getter', () => {
      const [{ is }] = withSetup(() => useBem('block'));

      const active = ref(false);

      expect(is('active', active)).toBe('');
      expect(is('active', () => active.value)).toBe('');

      active.value = true;

      expect(is('active', active)).toBe('is-active');
      expect(is('active', () => active.value)).toBe('is-active');
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

    describe('nullish modifier values', () => {
      it('skips undefined and null without warning', () => {
        const consoleWarningSpy = vi.spyOn(console, 'warn');
        consoleWarningSpy.mockClear();

        const [{ bem }] = withSetup(() => useBem('block'));

        const element = bem('element', { size: undefined, dark: null });

        expect(element.value).toBe('block__element');
        expect(consoleWarningSpy).not.toHaveBeenCalled();
      });
    });

    describe('getters and computed as modifier values', () => {
      it('accepts getter function as value', () => {
        const [{ bem }] = withSetup(() => useBem('block'));

        const size = ref('large');

        const element = bem('element', { size: () => size.value });

        expect(element.value).toBe('block__element block__element--size-large');

        size.value = 'small';

        expect(element.value).toBe('block__element block__element--size-small');
      });

      it('accepts computed as whole modifiers object', () => {
        const [{ bem }] = withSetup(() => useBem('block'));

        const dark = ref(false);
        const mods = computed(() => ({ dark: dark.value }));

        const element = bem('element', mods);

        expect(element.value).toBe('block__element');

        dark.value = true;

        expect(element.value).toBe('block__element block__element--dark');
      });

      it('accepts getter as whole modifiers object', () => {
        const [{ bem }] = withSetup(() => useBem('block'));

        const size = ref(1);

        const element = bem('element', () => ({ size: size.value }));

        expect(element.value).toBe('block__element block__element--size-1');
      });
    });

    describe('bem(mods) shorthand for block', () => {
      it('applies modifiers to block when first arg is object', () => {
        const [{ bem }] = withSetup(() => useBem('block'));

        const element = bem({ size: 'large', dark: true });

        expect(element.value).toBe('block block--size-large block--dark');
      });

      it('applies modifiers to block when first arg is ref', () => {
        const [{ bem }] = withSetup(() => useBem('block'));

        const mods = ref({ dark: true });

        const element = bem(mods);

        expect(element.value).toBe('block block--dark');
      });
    });

    it('should return element if no mods provided', () => {
      const [{ bem }] = withSetup(() => useBem('block'));

      expect(bem('').value).toBe('block');
    });

    it('should log warning if wrong type provided', () => {
      const consoleWarningSpy = vi.spyOn(console, 'warn');

      const mods = reactive({ size: ['wrong size'] });

      const [{ bem }] = withSetup(() => useBem('block'));

      //@ts-expect-error test cases with wrong type
      const classes = bem('element', mods);

      expect(classes.value).toBe('block__element');

      expect(consoleWarningSpy).toHaveBeenCalledWith(
        ERROR_MESSAGES.wrongModificatorType('block__element', 'object'),
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

    it('should provide custom state prefix', () => {
      const [{ is }] = withSetup(() => useBem('block'), {
        delimiters: { state: 'has-' },
      });

      expect(is('error')).toBe('has-error');
    });
  });
});
