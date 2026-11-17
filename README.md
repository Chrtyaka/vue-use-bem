<p align="center">
  <img width="300px" height="300px" src="./docs/logo.webp">
</p>

<p align="center">VueUseBem - Vue.js 3 BEM classes generator</p>

<p align="center">
  <a href="https://www.npmjs.com/package/vue-use-bem"><img src="https://img.shields.io/npm/v/vue-use-bem.svg" alt="npm version"></a>
  <a href="https://github.com/Chrtyaka/vue-use-bem/actions/workflows/test.yml"><img src="https://github.com/Chrtyaka/vue-use-bem/actions/workflows/test.yml/badge.svg" alt="CI"></a>
  <a href="https://bundlephobia.com/package/vue-use-bem"><img src="https://img.shields.io/bundlephobia/minzip/vue-use-bem" alt="bundle size"></a>
  <a href="./LICENSE"><img src="https://img.shields.io/npm/l/vue-use-bem.svg" alt="license"></a>
</p>

# Description

This project is simple [BEM](https://getbem.com/)-style classnames generator for Vue.js 3.

- 💪 Vue 3 Composition API
- 🔥 Written in TypeScript
- 🦄 Configurable

Inspired by:

- [vue-bem-cn](https://github.com/c01nd01r/vue-bem-cn/tree/master)
- [element-plus](https://github.com/element-plus/element-plus/blob/dev/packages/hooks/use-namespace/index.ts)

# 📦 Install

```sh
pnpm add vue-use-bem
```

# 🦄 Quick example

Button.vue

```vue
<template>
  <button :class="[b(), bm(size)]">
    <slot />
  </button>
</template>

<script lang="ts" setup>
import { useBem } from 'vue-use-bem';

const props = defineProps({
  size: {
    type: String,
  },
});

const { b, bm } = useBem('ui-button');
</script>
```

Page.vue

```vue
<template>
  <div class="example">
    <ui-button type="button" class="mix-any-class" size="large">
      I am BEM button!
    </ui-button>
  </div>
</template>

<script lang="ts" setup>
import UiButton from 'components/UI/Button.vue';
</script>
```

Compiles to:

```html
<div class="example">
  <button class="mix-any-class ui-button ui-button--large" type="button">
    I am BEM button!
  </button>
</div>
```

Refer to [documentation](https://vue-use-bem.netlify.app/) for more details.
