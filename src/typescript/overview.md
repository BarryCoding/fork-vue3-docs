---
# outline: deep
---

# Using Vue with TypeScript {#using-vue-with-typescript}

> In my Vue:
> - No tsx with defineComponent!
> - No runtime type declaration!

- TypeScript can detect many common errors via static analysis at **build time**. 
- TypeScript reduces the chance of **runtime** errors in production, 
- TypeScript allows us to more confidently **refactor** code in large-scale applications. 
- TypeScript improves developer ergonomics via type-based **auto-completion** in IDEs.

## Project Setup {#project-setup}

[`create-vue`](https://github.com/vuejs/create-vue), the official project scaffolding tool, offers the options to scaffold a [Vite](https://vitejs.dev/)-powered, TypeScript-ready Vue project.

### Overview {#overview}

With a Vite-based setup, the **dev server and the bundler** are transpilation-only and **do not** perform any **type-checking**. This ensures the Vite dev server stays blazing fast even when using TypeScript.

- If using SFCs, use the [`vue-tsc`](https://github.com/vuejs/language-tools/tree/master/packages/tsc) utility for command line type checking and type declaration generation. `vue-tsc` is a wrapper around `tsc`. It works largely the same as `tsc` except that it supports Vue SFCs in addition to TypeScript files. 
- You can run `vue-tsc` in watch mode in parallel to the Vite dev server, or use a Vite plugin like [vite-plugin-checker](https://vite-plugin-checker.netlify.app/) which runs the checks in a separate worker thread.

### IDE Support {#ide-support}

- [Visual Studio Code](https://code.visualstudio.com/) (VS Code) is strongly recommended.

- [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar) is the official VS Code extension.

### Configuring `tsconfig.json` {#configuring-tsconfig-json}

Projects scaffolded via `create-vue` include pre-configured `tsconfig.json`. The base config is abstracted in the [`@vue/tsconfig`](https://github.com/vuejs/tsconfig) package. Inside the project, we use [Project References](https://www.typescriptlang.org/docs/handbook/project-references.html) to ensure correct types for code running _in different environments_

When configuring `tsconfig.json` manually, some notable options include:

- [`compilerOptions.isolatedModules`](https://www.typescriptlang.org/tsconfig#isolatedModules) is set to `true` because Vite uses [esbuild](https://esbuild.github.io/) for transpiling TypeScript and is subject to single-file transpile limitations. [`compilerOptions.verbatimModuleSyntax`](https://www.typescriptlang.org/tsconfig#verbatimModuleSyntax) is [a superset of `isolatedModules`](https://github.com/microsoft/TypeScript/issues/53601) and is a good choice, too - it's what [`@vue/tsconfig`](https://github.com/vuejs/tsconfig) uses.

- If you have configured resolver aliases in your build tool, for example the `@/*` alias configured by default in a `create-vue` project in `vite.config.ts`, you need to **also configure** it for TypeScript via [`compilerOptions.paths`](https://www.typescriptlang.org/tsconfig#paths).

See also:

- [Official TypeScript compiler options docs](https://www.typescriptlang.org/docs/handbook/compiler-options.html)
- [esbuild TypeScript compilation caveats](https://esbuild.github.io/content-types/#typescript-caveats)

## General Usage {#general-usage-notes}

### Usage in SFC {#usage-in-single-file-components}

To use TypeScript in SFCs, add the `lang="ts"` attribute to `<script setup>` tags.

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

The `<template>` also supports TypeScript in binding expressions when `<script setup lang="ts">` is used.

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

## Generic Components {#generic-components}

Generic components are supported in two cases:

- In SFCs: [`<script setup>` with the `generic` attribute](/api/sfc-script-setup.html#generics)
