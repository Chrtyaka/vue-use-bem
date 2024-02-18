# Composable

## Usage

VueUseBem provides `useBem` composable function. Simple example:

```vue
<script lang="ts" setup>
import { useBem } from 'vue-use-bem';

const { b, bm, e, em } = useBem('block');

</script>

<template>
  <div :class="[b(), bm('lg')]">
    <p :class="[e('element'), e('element', 'dark')]"> 
      Some element 
    </p>
    <p :class="e('element2')"> Some element 2 </p>
  </div>
</template>
```
Step by step explanation:
- `b()` generate class `block`
- `bm('lg')` - generate modifier class for block -- `block--lg`
- `e('element')` - generate class for element -- `block__element`
- `e('element', 'dark')` - generate modifier class for element `block__element--dark`
- `e('element2')` - generate class `block__element2`

Result HTML:

```html
 <div class="block block--lg">
    <p class="block__element block__element--dark"> 
      Some element 
    </p>
    <p class="block__element2"> Some element 2 </p>
  </div>
```

## Namespace



## Methods

::: tip Delimiters config

Composable function catch delimiters provided via [plugin configuration](./configuration.md)

::: 

### Non reactive

:::warning Reactivity

Methods in this section generate classes by string concatenation without any reactivity. It won't accept reactive values as arguments (refs, reactive, etc.)

For reactive values please use [bem method](#bem)

:::

#### `b`

Generate class for block. Usage:

::: code-group

```vue [component.vue]

<script setup lang="ts">
import { useBem } from 'vue-use-bem';

const { b } =  useBem('block')

</script>

<template>
  <div :class="b()">
  </div>
</template>

```

```html [result.html]
  <div class="block">
  </div>
```

:::

#### `bm`

Generate modifier for block. Usage:

::: code-group

```vue [component.vue]

<script setup lang="ts">
import { useBem } from 'vue-use-bem';

const { b } =  useBem('block')

</script>

<template>
  <div :class="[b(), bm('lg')]">
  </div>
</template>

```

```html [result.html]
  <div class="block block--lg"></div>
```

:::

#### `e`

Generate class for element inside block. Usage

::: code-group

```vue [component.vue]

<script setup lang="ts">
import { useBem } from 'vue-use-bem';

const { b, e } =  useBem('block')

</script>

<template>
  <div :class="b()">
    <p :class="e('element')"></p>
  </div>
</template>

```

```html [result.html]
  <div class="block">
    <p class="block__element"></p>
  </div>
```
:::

#### `e`

Generate modifier class for element inside block. Usage

::: code-group

```vue [component.vue]

<script setup lang="ts">
import { useBem } from 'vue-use-bem';

const { b, e, em } =  useBem('block')

</script>

<template>
  <div :class="b()">
    <p :class="[e('element'), em('element', 'lg')]"></p>
  </div>
</template>

```

```html [result.html]
  <div class="block">
    <p class="block__element block__element--lg"></p>
  </div>
```
:::


### Reactive

#### bem

