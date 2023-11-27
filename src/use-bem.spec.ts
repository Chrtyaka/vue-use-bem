import { expect, test } from 'vitest';

import { useBem } from './use-bem';

const BLOCK = 'block';

const ELEMENT = 'element';

const MODIFICATOR = 'modificator';

const MOD_VALUE_STR = 'value';

const MOD_VALUE_NUMBER = 1;

test('should throw error when block not specified', () => {
  expect(() => useBem('')).toThrow();
});

test('should make valid element without mods', () => {
  const { bem } = useBem(BLOCK);

  const cls = bem(ELEMENT);

  expect(cls).toBe(`${BLOCK}__${ELEMENT}`);
});

test('should make valid element without mods', () => {
  const { bem } = useBem(BLOCK);

  const cls = bem(ELEMENT);

  expect(cls).toBe(`${BLOCK}__${ELEMENT}`);
});

test('should generate valid mods classes for boolean', () => {
  const { bem } = useBem(BLOCK);

  let cls = bem(ELEMENT, { [MODIFICATOR]: true });

  expect(cls).toBe(`${BLOCK}__${ELEMENT} ${BLOCK}__${ELEMENT}--${MODIFICATOR}`);

  cls = bem(ELEMENT, { [MODIFICATOR]: false });

  expect(cls).toBe(`${BLOCK}__${ELEMENT}`);
});

test('should generate valid mods classes for string', () => {
  const { bem } = useBem(BLOCK);

  let cls = bem(ELEMENT, { [MODIFICATOR]: MOD_VALUE_STR });

  expect(cls).toBe(
    `${BLOCK}__${ELEMENT} ${BLOCK}__${ELEMENT}--${MODIFICATOR}-${MOD_VALUE_STR}`,
  );

  cls = bem(ELEMENT, { [MODIFICATOR]: '' });

  expect(cls).toBe(`${BLOCK}__${ELEMENT}`);
});

test('should generate valid mods classes for number', () => {
  const { bem } = useBem(BLOCK);

  let cls = bem(ELEMENT, { [MODIFICATOR]: MOD_VALUE_NUMBER });

  expect(cls).toBe(
    `${BLOCK}__${ELEMENT} ${BLOCK}__${ELEMENT}--${MODIFICATOR}-${MOD_VALUE_NUMBER}`,
  );

  cls = bem(ELEMENT, { [MODIFICATOR]: 0 });

  expect(cls).toBe(
    `${BLOCK}__${ELEMENT} ${BLOCK}__${ELEMENT}--${MODIFICATOR}-0`,
  );
});

test('should generate valid mods classes for object and arrays', () => {
  const { bem } = useBem(BLOCK);

  let cls = bem(ELEMENT, { [MODIFICATOR]: { some: 'some' } });

  expect(cls).toBe(`${BLOCK}__${ELEMENT} ${BLOCK}__${ELEMENT}--${MODIFICATOR}`);

  cls = bem(ELEMENT, { [MODIFICATOR]: [1, 2, 3] });

  expect(cls).toBe(`${BLOCK}__${ELEMENT} ${BLOCK}__${ELEMENT}--${MODIFICATOR}`);
});
