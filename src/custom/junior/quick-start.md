<script setup>
import { VTCodeGroup, VTCodeGroupTab } from '@vue/theme'
</script>

# Bootstrap a App

## Creating a Vue Application {#creating-a-vue-application}

:::tip Prerequisites
Install [Node.js](https://nodejs.org/) version 18.3 or higher
:::

In this section we will introduce how to scaffold a Vue [Single Page Application](/guide/extras/ways-of-using-vue#single-page-application-spa) on your local machine. The created project will be using a build setup based on [Vite](https://vitejs.dev) and allow us to use Vue [Single-File Components](/guide/scaling-up/sfc) (SFCs).

Run the following command:

<VTCodeGroup>
  <VTCodeGroupTab label="pnpm">

  ```sh
  pnpm create vue@latest
  ```

  </VTCodeGroupTab>
  <VTCodeGroupTab label="npm">

  ```sh
  npm create vue@latest
  ```

  </VTCodeGroupTab>
</VTCodeGroup>

This command will install and execute [create-vue](https://github.com/vuejs/create-vue), the official Vue project scaffolding tool.

<div class="language-sh"><pre><code><span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Project name: <span style="color:#888;">… <span style="color:#89DDFF;">&lt;</span><span style="color:#888;">your-project-name</span><span style="color:#89DDFF;">&gt;</span></span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add TypeScript? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add JSX Support? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add Vue Router for Single Page Application development? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add Pinia for state management? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add Vitest for Unit testing? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add an End-to-End Testing Solution? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Cypress / Nightwatch / Playwright</span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add ESLint for code quality? <span style="color:#888;">… No / <span style="color:#89DDFF;text-decoration:underline">Yes</span></span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add Prettier for code formatting? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add Vue DevTools 7 extension for debugging? (experimental) <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span></span>
<span></span>
<span style="color:#A6ACCD;">Scaffolding project in ./<span style="color:#89DDFF;">&lt;</span><span style="color:#888;">your-project-name</span><span style="color:#89DDFF;">&gt;</span>...</span>
<span style="color:#A6ACCD;">Done.</span></code></pre></div>

Once the project is created, install dependencies and start the dev server:

<VTCodeGroup>
  <VTCodeGroupTab label="pnpm">

  ```sh
  cd your-project-name
  pnpm install
  pnpm run dev
  ```

  </VTCodeGroupTab>
</VTCodeGroup>

Note that the example components in the generated project are written using the [Composition API](/guide/introduction#composition-api) and `<script setup>`. Here are some additional tips:

- IDE setup [Visual Studio Code](https://code.visualstudio.com/) + [Vue - Official extension](https://marketplace.visualstudio.com/items?itemName=Vue.volar).
- [Tooling Guide](/guide/scaling-up/tooling).
- [Vite docs](https://vitejs.dev).
- [TypeScript Usage Guide](/custom/typescript/overview).

Ship your app to production:

<VTCodeGroup>
  <VTCodeGroupTab label="pnpm">

  ```sh
  $ pnpm run build
  ```

  </VTCodeGroupTab>
</VTCodeGroup>

This will create a production-ready build of your app in the project's `./dist` directory.  
Check out the [Production Deployment Guide](/guide/best-practices/production-deployment).

## The application instance {#the-application-instance}

Every Vue application starts by creating a new **application instance** with the [`createApp`](/api/application#createapp) function:

```ts
import { createApp } from 'vue'

const app = createApp({
  /* root component options */
})
```

### The Root Component {#the-root-component}

The object we are passing into `createApp` is in fact a component. Every app requires a "root component" that can contain other components as its children.

If you are using SFC, we typically import the root component from another file:

```ts
import { createApp } from 'vue'
// import the root component App from a single-file component.
import App from './App.vue'

const app = createApp(App)
```

### Mounting the App {#mounting-the-app}

An application instance won't render anything until its `.mount()` method is called. It expects a **container** argument, which can either be **an actual DOM element or a selector string**:

```html
<div id="app"></div>
```

```ts
app.mount('#app')
```

The content of the app's root component will be rendered inside the container element. 

:::danger
- **The container element itself is not considered part of the app**.  
- The `.mount()` method should always be called **after** all app configurations and asset registrations are done.  
- The `.mount()` **return value**, unlike the asset registration methods, **is the root component instance** instead of the application instance.
:::

### App Configurations {#app-configurations}

The application instance exposes a `.config` object that allows us to configure a few app-level options, for example, defining an app-level error handler that captures errors from all descendant components:

```ts
app.config.errorHandler = (err: unknown) => {
  /* handle error */
}
```

The application instance also provides a few methods for registering **app-scoped** assets. For example, **registering a component**:

```js
app.component('TodoDeleteButton', TodoDeleteButton)
```

This makes the `TodoDeleteButton` available for use anywhere in our app. You can also browse the full list of application instance APIs in its [API reference](/api/application).

:::danger Repeat
Apply all app configurations before mounting the app!
:::

### Multiple application instances {#multiple-application-instances}

You are not limited to a single application instance on the same page. The `createApp` API allows multiple Vue applications to co-exist on the same page, each with its own scope for configuration and global assets:

```js
const app1 = createApp({
  /* ... */
})
app1.mount('#container-1')

const app2 = createApp({
  /* ... */
})
app2.mount('#container-2')
```

If you are using Vue to enhance server-rendered HTML and only need Vue to control specific parts of a large page, avoid mounting a single Vue application instance on the entire page. Instead, create multiple small application instances and mount them on the elements they are responsible for.
