# Typing `reactive()` {#typing-reactive}

`reactive()` also implicitly infers the type from its argument:

```ts
import { reactive } from 'vue'

// inferred type: { title: string }
const book = reactive({ title: 'Vue 3 Guide' })
```

To explicitly type a `reactive` property, we can use interfaces:

```ts
import { reactive } from 'vue'

interface Book {
  title: string
  year?: number
}

// Good
const book: Book = reactive({ title: 'Vue 3 Guide' })

// Bad
// const book = reactive<Book>({ title: 'Vue 3 Guide' })
```

:::warning
It's **not recommended to use the generic** argument of `reactive()` because the returned type, which handles nested ref unwrapping, is different from the generic argument type.
:::
