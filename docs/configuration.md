# Configuration

VueUseBem provides different options for customization. 

You can configure:
- `delimiters`
- `BEM method name`
- `namespace`

## Basic configuration

You can customize settings via plugin options

```ts [main.ts]
import { createApp } from 'vue'
import { VueBem } from 'vue-use-bem'

import App from './App.vue'

const app = createApp(App)

app.use(VueBem, {
  namespace: 'ui'
})

app.mount('#app')

```

For more details refer to options [details](./api.md#options)

## Namespace

The namespace is extremely useful for building UI libraries. You can provide custom prefix (namespace) for all your components.

Let's look at example and set namespace to `ui`:

```ts [main.ts]
import { createApp } from 'vue'
import { VueBem } from 'vue-use-bem'

import App from './App.vue'

const app = createApp(App)

app.use(VueBem, { // [!code focus:3]
  namespace: 'ui'
})

app.mount('#app')

```

Than use composable function or global bem mode for define class:

```vue
<script setup>
import { useBem } from 'vue-use-bem';

const { b } = useBem('button')

</script>

<button :class="b()" type="button">
  My button
</button>
```

It will compile to html:

```html
<button class="ui-button"> My Button </button>
```

That's it :fire:

## BEM method name

Via plugin install, package inject global [bem](./api.md#bem) method in Vue instance. 
It provides seamless migration from [vue-bem-cn](https://github.com/c01nd01r/vue-bem-cn)

You can customize method name as well via plugin options:

```ts [main.ts]
import { createApp } from 'vue'
import { VueBem } from 'vue-use-bem'

import App from './App.vue'

const app = createApp(App)

app.use(VueBem, { // [!code focus:3]
  methodName: 'bem'
})

app.mount('#app')

```

And then use your custom method in templates:

```vue
<template>
<div :class="bem()"></div>
</template>
```

## Delimiters

Default delimiters: 

```ts
const delimiters = {
  namespace: '-', // ns-block
  element: '__', // block__element
  modificator: '--', // element--modificator
  modificatorValue: '-', // element--modificator-value
}
```
You can customize delimiters via plugin options `delimiters`:

```ts [main.ts]
import { createApp } from 'vue'
import { VueBem } from 'vue-use-bem'

import App from './App.vue'

const app = createApp(App)

app.use(VueBem, { // [!code focus:6]
  delimiters: {
    namespace: '+',
    modificator: '&'
  }
})

app.mount('#app')

```

It will generate classes like this:
```html
<div class="ns+block">
  <p class="ns+block__element ns+block__element&modificator">
</div>
```


