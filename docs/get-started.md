# Get started

## Installation

```bash
npm i vue-use-bem
```

## Usage example

Simply importing composable function from `vue-use-bem`

::: code-group
```vue [setup.vue]
<script setup>
import { useBem } from 'vue-use-bem';

const { b } = useBem('my-block')
</script>

<template>
  <div :class="b()"></div>
</template>

```

```vue [options.vue]
<script>

export default {
  //....

  setup() {
    const { b } = useBem('my-block')

    return { b } 
  }
}

</script>

<template>
  <div :class="b()"></div>
</template>
```
:::

Via `global method`, first install plugin:

```ts [main.ts]
import { createApp } from 'vue'
import { VueBem } from 'vue-use-bem'

import App from './App.vue'

const app = createApp(App)

app.use(VueBem, {
  //..plugin config
})

app.mount('#app')

```

Then you can use **globally** injected method [bem](./api.md#bem):

```vue [component.vue]

<template>
  <div :class="b()"></div>
</template>

```

Refer to [configuration](./configuration.md) for more details


