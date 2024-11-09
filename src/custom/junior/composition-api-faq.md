---
outline: deep
---

# Composition API Locked {#composition-api-faq}

## What is Composition API? {#what-is-composition-api}

Composition API is a set of APIs that allows us to author Vue components using imported functions. It is an umbrella term that covers the following APIs:

- [Reactivity API](/api/reactivity-core), e.g. `ref()` and `reactive()`, that allows us to directly create reactive state, computed state, and watchers.

- [Lifecycle Hooks](/api/composition-api-lifecycle), e.g. `onMounted()` and `onUnmounted()`, that allow us to programmatically hook into the component lifecycle.

- [Dependency Injection](/api/composition-api-dependency-injection), i.e. `provide()` and `inject()`, that allow us to leverage Vue's dependency injection system.

In Vue 3, it is also primarily used together with the [`<script setup>`](/api/sfc-script-setup) syntax in Single-File Components. Here's a basic example of a component using Composition API:

```vue
<script setup lang='ts'>
import { ref, onMounted } from 'vue'

// reactive state
const count = ref(0)

// functions that mutate state and trigger updates
function increment() {
  count.value++
}

// lifecycle hooks
onMounted(() => {
  console.log(`The initial count is ${count.value}.`)
})
</script>

<template>
  <button @click="increment">Count is: {{ count }}</button>
</template>
```

Despite an API style based on function composition, **Composition API is NOT functional programming**. Composition API is based on Vue's mutable, fine-grained reactivity paradigm, whereas functional programming emphasizes immutability.

## Why Composition API? {#why-composition-api}

### 1 Better Logic Reuse {#better-logic-reuse}

The primary advantage of Composition API is that it enables **clean**, efficient logic reuse in the form of [Composable functions](/guide/reusability/composables). It solves [all the drawbacks of mixins](/guide/reusability/composables#vs-mixins).

Composition API's logic reuse capability has given rise to impressive community projects such as [VueUse](https://vueuse.org/), an ever-growing collection of composable utilities. It also serves as a clean mechanism for easily integrating stateful third-party services or libraries into Vue's reactivity system, for example [immutable data](/guide/extras/reactivity-in-depth#immutable-data), [state machines](/guide/extras/reactivity-in-depth#state-machines), and [RxJS](/guide/extras/reactivity-in-depth#rxjs).

### 2 More Flexible Code Organization {#more-flexible-code-organization}

Many users love that we write organized code by default with Options API: everything has its place based on the option it falls under. However, Options API poses serious limitations when a single component's logic grows beyond a certain complexity threshold. This limitation is particularly prominent in components that need to deal with multiple **logical concerns**, which we have witnessed first hand in many production Vue 2 apps.

Take the folder explorer component from Vue CLI's GUI as an example: this component is responsible for the following logical concerns:

- Tracking current folder state and displaying its content
- Handling folder navigation (opening, closing, refreshing...)
- Handling new folder creation
- Toggling show favorite folders only
- Toggling show hidden folders
- Handling current working directory changes

The [original version](https://github.com/vuejs/vue-cli/blob/a09407dd5b9f18ace7501ddb603b95e31d6d93c0/packages/@vue/cli-ui/src/components/folder/FolderExplorer.vue#L198-L404) of the component was written in Options API. If we give each line of code a color based on the logical concern it is dealing with, this is how it looks:

<img alt="folder component before" src="./images/options-api.png" width="129" height="500" style="margin: 1.2em auto">

Notice how code dealing with the same logical concern is forced to be ~~split under different options~~, located in different parts of the file. In a component that is several hundred lines long, understanding and navigating a single logical concern requires constantly scrolling up and down the file, making it much more difficult than it should be. In addition, if we ever intend to extract a logical concern into a reusable utility, it takes quite a bit of work to find and extract the right pieces of code from different parts of the file.

Here's the same component, before and after the [refactor into Composition API](https://gist.github.com/yyx990803/8854f8f6a97631576c14b63c8acd8f2e):

![folder component after](./images/composition-api-after.png)

Notice how the code related to the same logical concern can now be **grouped together**: we no longer need to jump between different options blocks while working on a specific logical concern. Moreover, we can now move a group of code into an external file with minimal effort, since we no longer need to shuffle the code around in order to extract them. This **reduced friction for refactoring** is key to the long-term maintainability in large codebases.

### 3 Better Type Inference {#better-type-inference}

In recent years, more and more frontend developers are adopting [TypeScript](https://www.typescriptlang.org/) as it helps us write more robust code, make changes with more confidence, and provides a great development experience with IDE support. However, the Options API, originally conceived in 2013, was designed without type inference in mind. We had to implement some [absurdly complex type gymnastics](https://github.com/vuejs/core/blob/44b95276f5c086e1d88fa3c686a5f39eb5bb7821/packages/runtime-core/src/componentPublicInstance.ts#L132-L165) to make type inference work with the Options API. Even with all this effort, type inference for Options API can still break down for mixins and dependency injection.

This had led many developers who wanted to use Vue with TS to lean towards Class API powered by `vue-class-component`. However, a class-based API heavily relies on ES decorators, a language feature that was only a stage 2 proposal when Vue 3 was being developed in 2019. We felt it was too risky to base an official API on an unstable proposal. Since then, the decorators proposal has gone through yet another complete overhaul, and finally reached stage 3 in 2022. In addition, class-based API suffers from logic reuse and organization limitations similar to Options API.

In comparison, Composition API utilizes mostly plain variables and functions, which are naturally type friendly. Code written in Composition API can enjoy full type inference with little need for manual type hints. Most of the time, Composition API code will look largely identical in TypeScript and plain JavaScript. This also makes it possible for plain JavaScript users to benefit from partial type inference.

### 4 Smaller Production Bundle and Less Overhead {#smaller-production-bundle-and-less-overhead}

Code written in Composition API and `<script setup lang='ts'>` is also more efficient and minification-friendly than Options API equivalent. This is because the template in a `<script setup lang='ts'>` component is compiled as a function inlined in the same scope of the `<script setup lang='ts'>` code. Unlike property access from `this`, the compiled template code can directly access variables declared inside `<script setup lang='ts'>`, **without an instance proxy** in between. This also leads to better minification because all the variable names can be safely shortened.
