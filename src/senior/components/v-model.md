# Component v-model Repeat {#component-v-model}

## Basic Usage <sup class="vt-badge" data-text="3.4+" /> {#basic-usage}

`v-model` can be used on a component to implement a two-way binding.

Starting in Vue 3.4, the recommended approach to achieve this is using the [`defineModel()`](/api/sfc-script-setup#definemodel) macro:

```vue
<!-- Child.vue -->
<script setup>
const model = defineModel()

function update() {
  model.value++
}
</script>

<template>
  <div>Parent bound v-model is: {{ model }}</div>
  <button @click="update">Increment</button>
</template>
```

The parent can then bind a value with `v-model`:

```vue-html
<!-- Parent.vue -->
<Child v-model="countModel" />
```

The value returned by `defineModel()` is a ref. It can be accessed and mutated like any other ref, except that it acts as a two-way binding between a parent value and a local one:

- Its `.value` is synced with the value bound by the parent `v-model`;
- When it is mutated by the child, it causes the parent bound value to be updated as well.

This means you can also bind this ref to a native input element with `v-model`, making it straightforward to wrap native input elements while providing the same `v-model` usage:

```vue
<script setup>
const model = defineModel()
</script>

<template>
  <input v-model="model" />
</template>
```

### Under the Hood {#under-the-hood}

`defineModel` is a convenience **macro**. The compiler expands it to the following:

- A prop named `modelValue`, which the local ref's value is synced with;
- An event named `update:modelValue`, which is emitted when the local ref's value is mutated.

This is how you would implement the same child component shown above prior to 3.4:

```vue
<!-- Child.vue -->
<script setup>
const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <input
    :value="props.modelValue"
    @input="emit('update:modelValue', $event.target.value)"
  />
</template>
```

Then, `v-model="foo"` in the parent component will be compiled to:

```vue-html
<!-- Parent.vue -->
<Child
  :modelValue="foo"
  @update:modelValue="$event => (foo = $event)"
/>
```

As you can see, it is quite a bit more verbose. However, it is helpful to understand what is happening under the hood.

Because `defineModel` declares a prop, you can therefore declare the underlying prop's options by passing it to `defineModel`:

```js
// making the v-model required
const model = defineModel({ required: true })

// providing a default value
const model = defineModel({ default: 0 })
```

:::warning
If you have a `default` value for `defineModel` prop and you don't provide any value for this prop from the parent component, it can cause a de-synchronization between parent and child components. In the example below, the parent's `myRef` is undefined, but the child's `model` is 1:

```js
// child component:
const model = defineModel({ default: 1 })

// parent component:
const myRef = ref()
```

```html
<Child v-model="myRef"></Child>
```

:::

## `v-model` arguments {#v-model-arguments}

`v-model` on a component can also accept an argument:

```vue-html
<MyComponent v-model:title="bookTitle" />
```

In the child component, we can support the corresponding argument by passing a string to `defineModel()` as its first argument:

```vue
<!-- MyComponent.vue -->
<script setup>
const title = defineModel('title')
</script>

<template>
  <input type="text" v-model="title" />
</template>
```

If prop options are also needed, they should be passed after the model name:

```js
const title = defineModel('title', { required: true })
```

<details>
<summary>Pre 3.4 Usage</summary>

```vue
<!-- MyComponent.vue -->
<script setup>
defineProps({
  title: {
    required: true
  }
})
defineEmits(['update:title'])
</script>

<template>
  <input
    type="text"
    :value="title"
    @input="$emit('update:title', $event.target.value)"
  />
</template>
```

[Try it in the Playground](https://play.vuejs.org/#eNp9kE1rwzAMhv+KMIW00DXsGtKyMXYc7D7vEBplM8QfOHJoCfnvk+1QsjJ2svVKevRKk3h27jAGFJWoh7NXjmBACu4kjdLOeoIJPHYwQ+ethoJLi1vq7fpi+WfQ0JI+lCstcrkYQJqzNQMBKeoRjhG4LcYHbVvsofFfQUcCXhrteix20tRl9sIuOCBkvSHkCKD+fjxN04Ka57rkOOlrMwu7SlVHKdIrBZRcWpc3ntiLO7t/nKHFThl899YN248ikYpP9pj1V60o6sG1TMwDU/q/FZRxgeIPgK4uGcQLSZGlamz6sHKd1afUxOoGeeT298A9bHCMKxBfE3mTSNjl1vud5x8qNa76)

</details>

## Multiple `v-model` bindings {#multiple-v-model-bindings}

By leveraging the ability to target a particular prop and event as we learned before with [`v-model` arguments](#v-model-arguments), we can now create multiple `v-model` bindings on a single component instance.

Each `v-model` will sync to a different prop, without the need for extra options in the component:

```vue-html
<UserName
  v-model:first-name="first"
  v-model:last-name="last"
/>
```

```vue
<script setup>
const firstName = defineModel('firstName')
const lastName = defineModel('lastName')
</script>

<template>
  <input type="text" v-model="firstName" />
  <input type="text" v-model="lastName" />
</template>
```

<details>
<summary>Pre 3.4 Usage</summary>

```vue
<script setup>
defineProps({
  firstName: String,
  lastName: String
})

defineEmits(['update:firstName', 'update:lastName'])
</script>

<template>
  <input
    type="text"
    :value="firstName"
    @input="$emit('update:firstName', $event.target.value)"
  />
  <input
    type="text"
    :value="lastName"
    @input="$emit('update:lastName', $event.target.value)"
  />
</template>
```

</details>

## Handling `v-model` modifiers {#handling-v-model-modifiers}

When we were learning about form input bindings, we saw that `v-model` has [built-in modifiers](/guide/essentials/forms#modifiers) - `.trim`, `.number` and `.lazy`. In some cases, you might also want the `v-model` on your custom input component to support custom modifiers.

Let's create an example custom modifier, `capitalize`, that capitalizes the first letter of the string provided by the `v-model` binding:

```vue-html
<MyComponent v-model.capitalize="myText" />
```

Modifiers added to a component `v-model` can be accessed in the child component by destructuring the `defineModel()` return value like this:

```vue{4}
<script setup>
const [model, modifiers] = defineModel()

console.log(modifiers) // { capitalize: true }
</script>

<template>
  <input type="text" v-model="model" />
</template>
```

To conditionally adjust how the value should be read / written based on modifiers, we can pass `get` and `set` options to `defineModel()`. These two options receive the value on get / set of the model ref and should return a transformed value. This is how we can use the `set` option to implement the `capitalize` modifier:

```vue{6-8}
<script setup>
const [model, modifiers] = defineModel({
  set(value) {
    if (modifiers.capitalize) {
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
    return value
  }
})
</script>

<template>
  <input type="text" v-model="model" />
</template>
```

<details>
<summary>Pre 3.4 Usage</summary>

```vue{11-13}
<script setup>
const props = defineProps({
  modelValue: String,
  modelModifiers: { default: () => ({}) }
})

const emit = defineEmits(['update:modelValue'])

function emitValue(e) {
  let value = e.target.value
  if (props.modelModifiers.capitalize) {
    value = value.charAt(0).toUpperCase() + value.slice(1)
  }
  emit('update:modelValue', value)
}
</script>

<template>
  <input type="text" :value="modelValue" @input="emitValue" />
</template>
```

</details>

### Modifiers for `v-model` with arguments {#modifiers-for-v-model-with-arguments}

Here's another example of using modifiers with multiple `v-model` with different arguments:

```vue-html
<UserName
  v-model:first-name.capitalize="first"
  v-model:last-name.uppercase="last"
/>
```

```vue
<script setup>
const [firstName, firstNameModifiers] = defineModel('firstName')
const [lastName, lastNameModifiers] = defineModel('lastName')

console.log(firstNameModifiers) // { capitalize: true }
console.log(lastNameModifiers) // { uppercase: true }
</script>
```

<details>
<summary>Pre 3.4 Usage</summary>

```vue{5,6,10,11}
<script setup>
const props = defineProps({
firstName: String,
lastName: String,
firstNameModifiers: { default: () => ({}) },
lastNameModifiers: { default: () => ({}) }
})
defineEmits(['update:firstName', 'update:lastName'])

console.log(props.firstNameModifiers) // { capitalize: true }
console.log(props.lastNameModifiers) // { uppercase: true }
</script>
```

</details>
