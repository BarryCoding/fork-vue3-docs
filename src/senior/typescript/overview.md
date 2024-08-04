---
outline: deep
---

# Using Vue with TypeScript {#using-vue-with-typescript}

A type system like TypeScript can detect many common errors via static analysis at build time. This reduces the chance of runtime errors in production, and also allows us to more confidently refactor code in large-scale applications. TypeScript also improves developer ergonomics via type-based auto-completion in IDEs.

Vue is written in TypeScript itself and provides first-class TypeScript support. All official Vue packages come with bundled type declarations that should work out-of-the-box.

## Project Setup {#project-setup}

[`create-vue`](https://github.com/vuejs/create-vue), the official project scaffolding tool, offers the options to scaffold a [Vite](https://vitejs.dev/)-powered, TypeScript-ready Vue project.

### Overview {#overview}

With a Vite-based setup, the dev server and the bundler are transpilation-only and do not perform any type-checking. This ensures the Vite dev server stays blazing fast even when using TypeScript.

- During development, we recommend relying on a good [IDE setup](#ide-support) for instant feedback on type errors.

- If using SFCs, use the [`vue-tsc`](https://github.com/vuejs/language-tools/tree/master/packages/tsc) utility for command line type checking and type declaration generation. `vue-tsc` is a wrapper around `tsc`, TypeScript's own command line interface. It works largely the same as `tsc` except that it supports Vue SFCs in addition to TypeScript files. You can run `vue-tsc` in watch mode in parallel to the Vite dev server, or use a Vite plugin like [vite-plugin-checker](https://vite-plugin-checker.netlify.app/) which runs the checks in a separate worker thread.

### IDE Support {#ide-support}

- [Visual Studio Code](https://code.visualstudio.com/) (VS Code) is strongly recommended for its great out-of-the-box support for TypeScript.

- [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (previously Volar) is the official VS Code extension that provides TypeScript support inside Vue SFCs, along with many other great features.

### Configuring `tsconfig.json` {#configuring-tsconfig-json}

Projects scaffolded via `create-vue` include pre-configured `tsconfig.json`. The base config is abstracted in the [`@vue/tsconfig`](https://github.com/vuejs/tsconfig) package. Inside the project, we use [Project References](https://www.typescriptlang.org/docs/handbook/project-references.html) to ensure correct types for code running in different environments (e.g. app code and test code should have different global variables).

When configuring `tsconfig.json` manually, some notable options include:

- [`compilerOptions.isolatedModules`](https://www.typescriptlang.org/tsconfig#isolatedModules) is set to `true` because Vite uses [esbuild](https://esbuild.github.io/) for transpiling TypeScript and is subject to single-file transpile limitations. [`compilerOptions.verbatimModuleSyntax`](https://www.typescriptlang.org/tsconfig#verbatimModuleSyntax) is [a superset of `isolatedModules`](https://github.com/microsoft/TypeScript/issues/53601) and is a good choice, too - it's what [`@vue/tsconfig`](https://github.com/vuejs/tsconfig) uses.

- If you're using Options API, you need to set [`compilerOptions.strict`](https://www.typescriptlang.org/tsconfig#strict) to `true` (or at least enable [`compilerOptions.noImplicitThis`](https://www.typescriptlang.org/tsconfig#noImplicitThis), which is a part of the `strict` flag) to leverage type checking of `this` in component options. Otherwise `this` will be treated as `any`.

- If you have configured resolver aliases in your build tool, for example the `@/*` alias configured by default in a `create-vue` project, you need to also configure it for TypeScript via [`compilerOptions.paths`](https://www.typescriptlang.org/tsconfig#paths).

- If you intend to use TSX with Vue, set [`compilerOptions.jsx`](https://www.typescriptlang.org/tsconfig#jsx) to `"preserve"`, and set [`compilerOptions.jsxImportSource`](https://www.typescriptlang.org/tsconfig#jsxImportSource) to `"vue"`.

See also:

- [Official TypeScript compiler options docs](https://www.typescriptlang.org/docs/handbook/compiler-options.html)
- [esbuild TypeScript compilation caveats](https://esbuild.github.io/content-types/#typescript-caveats)

## General Usage Notes {#general-usage-notes}

### Usage in Single-File Components {#usage-in-single-file-components}

To use TypeScript in SFCs, add the `lang="ts"` attribute to `<script setup>` tags. When `lang="ts"` is present, all template expressions also enjoy stricter type checking.

```vue
<script setup lang="ts">
// TypeScript enabled
import { ref } from 'vue'

const count = ref(1)
</script>

<template>
  <!-- type checking and auto-completion enabled -->
  {{ count.toFixed(2) }}
</template>
```

### TypeScript in Templates {#typescript-in-templates}

The `<template>` also supports TypeScript in binding expressions when `<script setup lang="ts">` is used. This is useful in cases where you need to perform type casting in template expressions.

Here's a contrived example:

```vue
<script setup lang="ts">
let x: string | number = 1
</script>

<template>
  <!-- error because x could be a string -->
  {{ x.toFixed(2) }}
</template>
```

This can be worked around with an inline type cast:

```vue{6}
<script setup lang="ts">
let x: string | number = 1
</script>

<template>
  {{ (x as number).toFixed(2) }}
</template>
```

### Usage with TSX {#usage-with-tsx}

Vue also supports authoring components with JSX / TSX. Details are covered in the [Render Function & JSX](/guide/extras/render-function.html#jsx-tsx) guide.

<details>
<summary>defineComponent()</summary>

To let TypeScript properly infer types inside component options, we need to define components with [`defineComponent()`](/api/general#definecomponent):

```ts
import { defineComponent } from 'vue'

export default defineComponent({
  // type inference enabled
  props: {
    name: String,
    msg: { type: String, required: true }
  },
  data() {
    return {
      count: 1
    }
  },
  mounted() {
    this.name // type: string | undefined
    this.msg // type: string
    this.count // type: number
  }
})
```

`defineComponent()` also supports inferring the props passed to `setup()` when using Composition API without `<script setup>`:

```ts
import { defineComponent } from 'vue'

export default defineComponent({
  // type inference enabled
  props: {
    message: String
  },
  setup(props) {
    props.message // type: string | undefined
  }
})
```

:::tip
`defineComponent()` also enables type inference for components defined in plain JavaScript.
:::

</details>

## Generic Components {#generic-components}

Generic components are supported in two cases:

- In SFCs: [`<script setup>` with the `generic` attribute](/api/sfc-script-setup.html#generics)
- Render function / JSX components: [`defineComponent()`'s function signature](/api/general.html#function-signature)
