# Priority C Rules: Recommended {#priority-c-rules-recommended}

Where multiple, equally good options exist, an arbitrary choice can be made to ensure consistency. In these rules, we describe each acceptable option and suggest a default choice. That means you can feel free to make a different choice in your own codebase, as long as you're consistent and have a good reason. Please do have a good reason though! By adapting to the community standard, you will:

1. Train your brain to more easily parse most of the community code you encounter
2. Be able to copy and paste most community code examples without modification
3. Often find new hires are already accustomed to your preferred coding style, at least in regards to Vue

## Component/instance script order {#component-instance-options-order}

**Component/instance script should be ordered consistently.**

```js
// 1 import (dependencies / necessaries)
import { ref, computed, provide, inject } from 'vue'
import ComponentA from '@/components/ComponentA.vue'

// 2 composable (global)
const store = useAppStore()

// 3 provide / inject (ancestor or descendence)
const key = Symbol() as InjectionKey<string>
const provide = provide(key, 'fakeValue')
const value = inject(key)

// 4 props / emits (parent)
const props = defineProps()
const emits = defineEmits()

// 5 data (self)
const counter = ref(0)
const user = reactive({name: 'Dejavu'})
const doubleCounter = computed(()=>counter.value*2)

// 6 watch (self)
watch(counter,()=>{})

// 7 lifecycle (self)
onMounted(()=>{})

// 8 methods (self)
const increment = ()=>{
  counter.value++
}
```

## Element attribute order {#element-attribute-order}

**The attributes of elements (including components) should be ordered consistently.**

This is the default order we recommend for component options. They're split into categories, so you'll know where to add custom attributes and directives.

1. **Definition** (provides the component options)

   - `is`

2. **List Rendering** (creates multiple variations of the same element)

   - `v-for`

3. **Conditionals** (whether the element is rendered/shown)

   - `v-if`
   - `v-else-if`
   - `v-else`
   - `v-show`
   - `v-cloak`

4. **Render Modifiers** (changes the way the element renders)

   - `v-pre`
   - `v-once`
   - `v-memo`

5. **Global Awareness** (requires knowledge beyond the component)

   - `id`

6. **Unique Attributes** (attributes that require unique values)

   - `ref`
   - `key`

7. **Two-Way Binding** (combining binding and events)

   - `v-model`

8. **Other Attributes** (all unspecified bound & unbound attributes)

9. **Events** (component event listeners)

   - `v-on`

10. **Content** (overrides the content of the element)
    - `v-html`
    - `v-text`

## Empty lines in component/instance options {#empty-lines-in-component-instance-options}

**You may want to add one empty line between multi-line properties, particularly if the options can no longer fit on your screen without scrolling.**

When components begin to feel cramped or difficult to read, adding spaces between multi-line properties can make them easier to skim again.

<div class="style-example style-example-bad">
<h3>Bad</h3>

```js
defineProps({
  value: {
    type: String,
    required: true
  },
  focused: {
    type: Boolean,
    default: false
  },
  label: String,
  icon: String
})
const formattedValue = computed(() => {
  // ...
})
const inputClasses = computed(() => {
  // ...
})
```

</div>

<div class="style-example style-example-good">
<h3>Good</h3>

```js
defineProps({
  value: {
    type: String,
    required: true
  },

  focused: {
    type: Boolean,
    default: false
  },

  label: String,
  icon: String
})

const formattedValue = computed(() => {
  // ...
})

const inputClasses = computed(() => {
  // ...
})
```

</div>

## Single-file component top-level element order {#single-file-component-top-level-element-order}

**[Single-File Components](/guide/scaling-up/sfc) should always order `<script>`, `<template>`, and `<style>` tags consistently, with `<style>` last, because at least one of the other two is always necessary.**

<div class="style-example style-example-bad">
<h3>Bad</h3>

```vue-html
<style>/* ... */</style>
<script>/* ... */</script>
<template>...</template>
```

```vue-html
<!-- ComponentA.vue -->
<script>/* ... */</script>
<template>...</template>
<style>/* ... */</style>

<!-- ComponentB.vue -->
<template>...</template>
<script>/* ... */</script>
<style>/* ... */</style>
```

</div>

<div class="style-example style-example-good">
<h3>Good</h3>

```vue-html
<!-- ComponentA.vue -->
<script>/* ... */</script>
<template>...</template>
<style>/* ... */</style>

<!-- ComponentB.vue -->
<script>/* ... */</script>
<template>...</template>
<style>/* ... */</style>
```

</div>
