# Typing Template Refs {#typing-template-refs}

## Typing element Template Refs

With Vue <sup class="vt-badge" data-text="3.5+" /> and `@vue/language-tools` 2.1 (powering both the IDE language service and `vue-tsc`), the type of refs created by `useTemplateRef()` in SFCs can be **automatically inferred** for static refs based on what element the matching `ref` attribute is used on.

In cases where auto-inference is not possible, you can still cast the template ref to an explicit type via the generic argument:

```ts
const el = useTemplateRef<HTMLInputElement>(null)
```
<details>
<summary>Usage before Vue<sup class="vt-badge" data-text="3.5" /></summary>

Template refs should be created with an explicit generic type argument and an initial value of `null`:

```vue {4}
<script setup lang="ts">
import { ref, onMounted } from 'vue'

const el = ref<HTMLInputElement | null>(null)

onMounted(() => {
  el.value?.focus()
})
</script>

<template>
  <input ref="el" />
</template>
```

</details>

To get the right DOM interface you can check pages like [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#technical_summary).

Note that for strict type safety, it is necessary to use optional chaining or type guards when accessing `el.value`. This is because the initial ref value is `null` until the component is mounted, and it can also be set to `null` if the referenced element is unmounted by `v-if`.

## Typing Component Template Refs {#typing-component-template-refs}

With Vue<sup class="vt-badge" data-text="3.5+" /> and `@vue/language-tools` 2.1 (powering both the IDE language service and `vue-tsc`), the type of refs created by `useTemplateRef()` in SFCs can be **automatically inferred** for static refs based on what component the matching `ref` attribute is used on.

In cases where auto-inference is not possible (e.g. non-SFC usage or dynamic components), you can still cast the template ref to an explicit type via the generic argument.

In order to get the instance type of an imported component, we need to first get its type via `typeof`, then use TypeScript's built-in `InstanceType` utility to extract its instance type:

```vue{7,8,10}
<!-- App.vue -->
<script setup lang="ts">
import { useTemplateRef } from 'vue'
import Foo from './Foo.vue'
import Bar from './Bar.vue'

type FooType = InstanceType<typeof Foo>
type BarType = InstanceType<typeof Bar>

const compRef = useTemplateRef<FooType | BarType>('comp')
</script>

<template>
  <component :is="Math.random() > 0.5 ? Foo : Bar" ref="comp" />
</template>
```

### unknown component

In cases where the exact type of the component isn't available or isn't important, `ComponentPublicInstance` can be used instead. This will only include properties that are shared by all components, such as `$el`:

```ts
import { useTemplateRef } from 'vue'
import type { ComponentPublicInstance } from 'vue'

const child = useTemplateRef<ComponentPublicInstance | null>(null)
```

### generic component

In cases where the component referenced is a [generic component](/guide/typescript/overview.html#generic-components)

```vue
<!-- MyGenericModal.vue -->
<script setup lang="ts" generic="ContentType extends string | number">
import { ref } from 'vue'

const content = ref<ContentType | null>(null)

const open = (newContent: ContentType) => (content.value = newContent)

defineExpose({ open })
</script>
```

It needs to be referenced using `ComponentExposed` from the [`vue-component-type-helpers`](https://www.npmjs.com/package/vue-component-type-helpers) library as `InstanceType` won't work.

```vue
<!-- App.vue -->
<script setup lang="ts">
import { useTemplateRef } from 'vue'
import MyGenericModal from './MyGenericModal.vue'
import type { ComponentExposed } from 'vue-component-type-helpers'

const modal = useTemplateRef<ComponentExposed<typeof MyGenericModal>>(null)

const openModal = () => {
  modal.value?.open('newValue')
}
</script>
```

::: tip Note
Note that with `@vue/language-tools` 2.1+, static template refs' types can be automatically inferred and the above is only needed in edge cases.
:::
