# Component Props

### Typing Component Props {#typing-component-props}

define props with pure types via a generic type argument:

```vue
<script setup lang="ts">
const props = defineProps<{
  foo: string
  bar?: number
}>()
</script>
```

We can also move the props types into a separate interface:

```vue
<script setup lang="ts">
interface Props {
  foo: string
  bar?: number
}

const props = defineProps<Props>()
</script>
```

This also works if `Props` is imported from an external source. This feature requires **TypeScript** to be a **peer dependency** of Vue.

```vue
<script setup lang="ts">
import type { Props } from './foo'

const props = defineProps<Props>()
</script>
```

### Syntax Limitations {#syntax-limitations}

In Vue<span class="vt-badge" data-text="3.2" /> and below, the generic type parameter for `defineProps()` were limited to a type literal or a reference to a local interface.

This limitation has been resolved in Vue<span class="vt-badge" data-text="3.3" />. The latest version of Vue supports referencing imported and a limited set of complex types in the type parameter position. However, because the type to runtime conversion is still **AST-based**, some complex types that require actual type analysis, e.g. _conditional types_, are not supported. You can use _conditional types_ for the type of _a single prop_, but not the entire props object.

### Props Default Values {#props-default-values}

Declare default values for the props by using [Reactive Props Destructure](/guide/components/props#reactive-props-destructure) in Vue<sup class="vt-badge" data-text="3.5+" />:

```ts
interface Props {
  msg?: string
  labels?: string[]
}
const { msg = 'hello', labels = ['one', 'two'] } = defineProps<Props>()
```
<details>
  <summary>Usage before 3.5</summary>

Reactive Props Destructure is not enabled by default. An alternative is to use the `withDefaults` compiler macro:
```ts
interface Props {
  msg?: string
  labels?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  msg: 'hello',
  labels: () => ['one', 'two']
})
```

This will be compiled to equivalent runtime props `default` options. In addition, the `withDefaults` helper provides type checks for the default values, and ensures the returned `props` type has the optional flags removed for properties that do have default values declared.

:::danger default values for mutable reference types
(like arrays or objects) should be wrapped in functions when using `withDefaults` to avoid accidental modification and external side effects. This ensures each component instance gets its own copy of the default value. This is **not** necessary when using default values with destructure.
:::

</details>
 
### Complex prop types {#complex-prop-types}

With type-based declaration, a prop can use a complex type much like any other type:

```vue
<script setup lang="ts">
interface Book {
  title: string
  author: string
  year: number
}

const props = defineProps<{
  book: Book
}>()
</script>
```
