interface BemMods {
  [key: string]: unknown;
}

export function useBem(block: string) {
  if (typeof block !== 'string' || block.length === 0) {
    throw new Error('[vue-use-bem]: Block is not specified');
  }

  const generateMods = (element: string, mods: BemMods) => {
    return Object.entries(mods).map(([key, value]) => {
      if (typeof value === 'boolean' && value) {
        return `${block}__${element}--${key}`;
      }

      if (typeof value === 'string' && value.length) {
        return `${block}__${element}--${key}-${value}`;
      }

      if (typeof value === 'number') {
        return `${block}__${element}--${key}-${value}`;
      }

      if (typeof value === 'object') {
        return `${block}__${element}--${key}`;
      }
    });
  };

  const bem = (element: string, mods?: BemMods) => {
    const getElement = () => `${block}__${element}`;

    if (typeof mods === 'undefined') {
      return getElement();
    }

    return [getElement(), ...generateMods(element, mods)].join(' ').trim();
  };

  return {
    bem,
  };
}
