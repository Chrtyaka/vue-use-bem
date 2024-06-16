'use strict';

var vue = require('vue');

const DEFAULT_DELIMITERS = {
    namespace: '-',
    element: '__',
    modificator: '--',
    modificatorValue: '-',
};
const ERROR_MESSAGES = {
    emptyBlock: '[vue-use-bem]: Block is not specified',
    wrongModificatorType: (element, value) => `[vue-bem-cn]: Invalid modificator value type: ${typeof value} for element ${element}`,
};
const BEM_METHOD_NAME = 'b';

/**
 * Convert string in camelCase to kebab-case
 * @param value string for convertion
 * @returns string
 * */
function camelToKebabCase(value) {
    return value.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

const EMPTY_SPACE = ' ';
function createBemGenerator(config) {
    return (element, mods) => {
        let result = element;
        if (!mods) {
            return element;
        }
        const { delimiters, hyphenate } = config;
        Object.entries(mods).forEach(([mod, value]) => {
            const modValue = vue.unref(value);
            switch (typeof modValue) {
                case 'boolean':
                    result += modValue
                        ? `${EMPTY_SPACE}${element}${delimiters.modificator}${mod}`
                        : '';
                    break;
                case 'string':
                    result += modValue.length
                        ? `${EMPTY_SPACE}${element}${delimiters.modificator}${mod}${delimiters.modificatorValue}${modValue}`
                        : '';
                    break;
                case 'number':
                    result += `${EMPTY_SPACE}${element}${delimiters.modificator}${mod}${delimiters.modificatorValue}${modValue}`;
                    break;
                default: {
                    console.warn(ERROR_MESSAGES.wrongModificatorType(element, typeof value));
                    // @ts-expect-error setup exhaustiveCheck
                    const exhaustiveCheck = typeof modValue;
                    return exhaustiveCheck;
                }
            }
        });
        return hyphenate ? camelToKebabCase(result) : result;
    };
}

const NAMESPACE_INJECTION_KEY = Symbol('bemNamespace');
const DELIMITERS_INJECTION_KEY = Symbol('bemDelimiters');
const HYPHENATE_INJECTION_KEY = Symbol('bemHyphenate');
/**
 * Returns namespace for bem generator injected by current instance
 */
function useNamespace(namespaceOverrides) {
    const injectedNamespace = vue.getCurrentInstance()
        ? vue.inject(NAMESPACE_INJECTION_KEY, '')
        : undefined;
    const derivedNamespace = namespaceOverrides || injectedNamespace;
    const namespace = vue.computed(() => vue.unref(derivedNamespace));
    return { namespace };
}
/**
 * Returns delimiters for bem generator injected by current instance or default value
 */
function useDelimiters() {
    const injectedDelimiters = vue.getCurrentInstance()
        ? vue.inject(DELIMITERS_INJECTION_KEY, DEFAULT_DELIMITERS)
        : undefined;
    const delimiters = injectedDelimiters || DEFAULT_DELIMITERS;
    return { delimiters };
}
/**
 * @returns injected hyphenate config property or false
 */
function useHyphenate() {
    const injectedHyphenate = vue.getCurrentInstance()
        ? vue.inject(HYPHENATE_INJECTION_KEY, false)
        : undefined;
    const hyphenate = injectedHyphenate || false;
    return { hyphenate };
}
/**
 * @param block BEM block
 * @param namespaceOverrides custom namespace override
 * @returns object with bem methods
 */
function useBem(block, namespaceOverrides) {
    if (typeof block !== 'string' || block.length === 0) {
        throw new Error(ERROR_MESSAGES.emptyBlock);
    }
    const { namespace } = useNamespace(namespaceOverrides);
    const { delimiters } = useDelimiters();
    const { hyphenate } = useHyphenate();
    /**
     * Generate block class
     * @returns class for block with namespace if it provided
     */
    const b = () => namespace.value
        ? `${namespace.value}${delimiters.namespace}${block}`
        : block;
    /**
     * Generate new element class
     * @param element element name
     * @returns string class for element inside block. example: block__element
     */
    const e = (element) => `${b()}${delimiters.element}${element}`;
    /**
     * Generate modifier for block
     * @param modifier modifier for block
     * @returns string class with modifier for block. example: block--modifier
     */
    const bm = (modifier) => {
        return `${b()}${delimiters.modificator}${modifier}`;
    };
    /**
     * Generate modifier class for element
     * @param element base element
     * @param modifier modifier for element
     * @returns string modifier class for element. example: block__element--modifier
     */
    const em = (element, modifier) => {
        return `${e(element)}${delimiters.modificator}${modifier}`;
    };
    // Empty string element type is for cases where bem function applies to block
    /**
     * Generate classes using object with modifiers
     * @param element base element or empty string for block
     * @param mods object with modifiers
     * @returns computed property with generated classes
     */
    const bem = (element, mods) => {
        const resultEl = element !== '' ? e(element) : b();
        const bemGenerator = createBemGenerator({ delimiters, hyphenate });
        return vue.computed(() => bemGenerator(resultEl, mods));
    };
    return {
        b,
        bm,
        e,
        em,
        bem,
    };
}

const VueBem = {
    install(app, options) {
        // Provide default delimiters and BEM-method
        if (!options) {
            app.provide(DELIMITERS_INJECTION_KEY, DEFAULT_DELIMITERS);
            app.provide(NAMESPACE_INJECTION_KEY, '');
            app.provide(HYPHENATE_INJECTION_KEY, false);
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

exports.VueBem = VueBem;
exports.useBem = useBem;
