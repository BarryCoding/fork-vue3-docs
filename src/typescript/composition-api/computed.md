# Typing `computed()` {#typing-computed}

`computed()` infers its type based on the getter's return value:

```ts
import { ref, computed } from 'vue'

const count = ref(0)

// inferred type: ComputedRef<number>
const double = computed(() => count.value * 2)

// => TS Error: Property 'split' does not exist on type 'number'
const result = double.value.split('')
```

You can also specify an explicit type via a generic argument:

```ts
const double = computed<number>(() => {
  // type error if this doesn't return a number
})
```
