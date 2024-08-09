# Component Registration {#component-registration}

A Vue component needs to be "registered" so that Vue knows where to locate its implementation when it is encountered in a template.

## Global Registration {#global-registration}

We can make components available globally in the current [Vue application](/guide/essentials/application) using the `.component()` method:

```js
import { createApp } from 'vue'

const app = createApp({})

app.component(
  // the registered name
  'MyComponent',
  // the implementation
  {
    /* ... */
  }
)
```

If using SFCs, you will be registering the imported `.vue` files:

```js
import MyComponent from './App.vue'

app.component('MyComponent', MyComponent)
```

The `.component()` method can be chained:

```js
app
  .component('ComponentA', ComponentA)
  .component('ComponentB', ComponentB)
  .component('ComponentC', ComponentC)
```

Globally registered components can be used in the template of any component within this application:

```vue-html
<!-- this will work in any component inside the app -->
<ComponentA/>
<ComponentB/>
<ComponentC/>
```

This even applies to all subcomponents, meaning all three of these components will also be available _inside each other_.

## Local Registration {#local-registration}

While convenient, global registration has a few drawbacks:

1. Global registration prevents build systems from removing unused components (a.k.a "tree-shaking"). If you globally register a component but end up not using it anywhere in your app, it will still be included in the final bundle.

2. Global registration makes dependency relationships less explicit in large applications. It makes it difficult to locate a child component's implementation from a parent component using it. This can affect long-term maintainability similar to using too many global variables.

Local registration scopes the availability of the registered components to the current component only. It makes the dependency relationship more explicit, and is more tree-shaking friendly.

When using SFC with `<script setup>`, imported components can be locally used without registration:

```vue
<script setup>
import ComponentA from './ComponentA.vue'
</script>

<template>
  <ComponentA />
</template>
```

## Component Name Casing {#component-name-casing}

Throughout the guide, we are using **PascalCase** names when registering components. This is because:

1. PascalCase names are valid JavaScript identifiers. This makes it easier to import and register components in JavaScript. It also helps IDEs with auto-completion.

2. `<PascalCase />` makes it more obvious that this is a Vue component instead of a native HTML element in templates. It also differentiates Vue components from custom elements (web components).
