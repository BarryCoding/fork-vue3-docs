# Lifecycle Hooks {#lifecycle-hooks}

Each Vue component instance goes through a series of initialization steps when it's created - for example, it needs to set up data observation, compile the template, mount the instance to the DOM, and update the DOM when data changes. Along the way, it also runs functions called lifecycle hooks, giving users the opportunity to add their own code at specific stages.

## Registering Lifecycle Hooks {#registering-lifecycle-hooks}

For example, the `onMounted` hook can be used to run code after the component has finished the initial rendering and created the DOM nodes:

```vue
<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  console.log(`the component is now mounted.`)
})
</script>
```

There are also other hooks which will be called at different stages of the instance's lifecycle, with the most commonly used being [`onMounted`](/api/composition-api-lifecycle#onmounted), [`onUpdated`](/api/composition-api-lifecycle#onupdated), and [`onUnmounted`](/api/composition-api-lifecycle#onunmounted).

:::tip
The `onUnmounted` hook is great for cleaning up intervals and event listeners manually applied via vanilla JavaScript. This is essential to preventing memory leaks.
:::

When calling `onMounted`, Vue automatically associates the registered callback function with the current active component instance. This requires these hooks to be registered **synchronously** during component setup. For example, do not do this:

```js
setTimeout(() => {
  onMounted(() => {
    // this won't work.
  })
}, 100)
```

Do note this doesn't mean that the call must be placed lexically inside `setup()` or `<script setup>`. `onMounted()` can be called in an external function as long as the call stack is synchronous and originates from within `setup()`.

## Lifecycle Diagram {#lifecycle-diagram}

Below is a diagram for the instance lifecycle.

![Component lifecycle diagram](./images/lifecycle.png)

<!-- https://www.figma.com/file/Xw3UeNMOralY6NV7gSjWdS/Vue-Lifecycle -->

Consult the [Lifecycle Hooks API reference](/api/composition-api-lifecycle) for details on all lifecycle hooks and their respective use cases.

- 
