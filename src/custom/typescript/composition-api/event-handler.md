# Typing Event Handlers {#typing-event-handlers}

When dealing with native DOM events, it might be useful to type the argument we pass to the handler correctly.

```vue
<script setup lang="ts">
// bad
function handleChangeBad(event) {
  // `event` implicitly has `any` type
  console.log(event.target.value)
}

// good
function handleChangeGood(event: Event) {
  console.log((event.target as HTMLInputElement).value)
}
</script>

<template>
  <input type="text" @change="handleChangeGood" />
</template>
```

- Without type annotation, the `event` argument will implicitly have a type of `any`. This will also result in a TS error if `"strict": true` or `"noImplicitAny": true` are used in `tsconfig.json`. 
- It is recommended to explicitly annotate the argument of event handlers. 
- In addition use type assertions when accessing the properties of `event`
