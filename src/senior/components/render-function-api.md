# Render Function APIs {#render-function-apis}

## h() {#h}

Creates virtual DOM nodes (vnodes).

- **Type**

  ```ts
  // full signature
  function h(
    type: string | Component,
    props?: object | null,
    children?: Children | Slot | Slots
  ): VNode

  // omitting props
  function h(type: string | Component, children?: Children | Slot): VNode

  type Children = string | number | boolean | VNode | null | Children[]

  type Slot = () => Children

  type Slots = { [name: string]: Slot }
  ```

  > Types are simplified for readability.

- **Details**

  The first argument can either be a string (for native elements) or a Vue component definition. The second argument is the props to be passed, and the third argument is the children.

  When creating a component vnode, the children must be passed as slot functions. A single slot function can be passed if the component expects only the default slot. Otherwise, the slots must be passed as an object of slot functions.

  For convenience, the props argument can be omitted when the children is not a slots object.

- **Example**

  Creating native elements:

  ```js
  import { h } from 'vue'

  // all arguments except the type are optional
  h('div')
  h('div', { id: 'foo' })

  // both attributes and properties can be used in props
  // Vue automatically picks the right way to assign it
  h('div', { class: 'bar', innerHTML: 'hello' })

  // class and style have the same object / array
  // value support like in templates
  h('div', { class: [foo, { bar }], style: { color: 'red' } })

  // event listeners should be passed as onXxx
  h('div', { onClick: () => {} })

  // children can be a string
  h('div', { id: 'foo' }, 'hello')

  // props can be omitted when there are no props
  h('div', 'hello')
  h('div', [h('span', 'hello')])

  // children array can contain mixed vnodes and strings
  h('div', ['hello', h('span', 'hello')])
  ```

  Creating components:

  ```js
  import Foo from './Foo.vue'

  // passing props
  h(Foo, {
    // equivalent of some-prop="hello"
    someProp: 'hello',
    // equivalent of @update="() => {}"
    onUpdate: () => {}
  })

  // passing single default slot
  h(Foo, () => 'default slot')

  // passing named slots
  // notice the `null` is required to avoid
  // slots object being treated as props
  h(MyComponent, null, {
    default: () => 'default slot',
    foo: () => h('div', 'foo'),
    bar: () => [h('span', 'one'), h('span', 'two')]
  })
  ```

- **See also** [Guide - Render Functions - Creating VNodes](/guide/extras/render-function#creating-vnodes)

## mergeProps() {#mergeprops}

Merge multiple props objects with special handling for certain props.

- **Type**

  ```ts
  function mergeProps(...args: object[]): object
  ```

- **Details**

  `mergeProps()` supports merging multiple props objects with special handling for the following props:

  - `class`
  - `style`
  - `onXxx` event listeners - multiple listeners with the same name will be merged into an array.

  If you do not need the merge behavior and want simple overwrites, native object spread can be used instead.

- **Example**

  ```js
  import { mergeProps } from 'vue'

  const one = {
    class: 'foo',
    onClick: handlerA
  }

  const two = {
    class: { bar: true },
    onClick: handlerB
  }

  const merged = mergeProps(one, two)
  /**
   {
     class: 'foo bar',
     onClick: [handlerA, handlerB]
   }
   */
  ```

## cloneVNode() {#clonevnode}

Clones a vnode.

- **Type**

  ```ts
  function cloneVNode(vnode: VNode, extraProps?: object): VNode
  ```

- **Details**

  Returns a cloned vnode, optionally with extra props to merge with the original.

  Vnodes should be considered immutable once created, and you should not mutate the props of an existing vnode. Instead, clone it with different / extra props.

  Vnodes have special internal properties, so cloning them is not as simple as an object spread. `cloneVNode()` handles most of the internal logic.

- **Example**

  ```js
  import { h, cloneVNode } from 'vue'

  const original = h('div')
  const cloned = cloneVNode(original, { id: 'foo' })
  ```

## isVNode() {#isvnode}

Checks if a value is a vnode.

- **Type**

  ```ts
  function isVNode(value: unknown): boolean
  ```

## resolveComponent() {#resolvecomponent}

For manually resolving a registered component by name.

- **Type**

  ```ts
  function resolveComponent(name: string): Component | string
  ```

- **Details**

  **Note: you do not need this if you can import the component directly.**

  `resolveComponent()` must be called inside either `setup()` or the render function in order to resolve from the correct component context.

  If the component is not found, a runtime warning will be emitted, and the name string is returned.

- **Example**

  ```js
  import { h, resolveComponent } from 'vue'

  export default {
    setup() {
      const ButtonCounter = resolveComponent('ButtonCounter')

      return () => {
        return h(ButtonCounter)
      }
    }
  }
  ```

  ```js
  import { h, resolveComponent } from 'vue'

  export default {
    render() {
      const ButtonCounter = resolveComponent('ButtonCounter')
      return h(ButtonCounter)
    }
  }
  ```

- **See also** [Guide - Render Functions - Components](/guide/extras/render-function#components)

## resolveDirective() {#resolvedirective}

For manually resolving a registered directive by name.

- **Type**

  ```ts
  function resolveDirective(name: string): Directive | undefined
  ```

- **Details**

  **Note: you do not need this if you can import the directive directly.**

  `resolveDirective()` must be called inside either `setup()` or the render function in order to resolve from the correct component context.

  If the directive is not found, a runtime warning will be emitted, and the function returns `undefined`.

- **See also** [Guide - Render Functions - Custom Directives](/guide/extras/render-function#custom-directives)

## withDirectives() {#withdirectives}

For adding custom directives to vnodes.

- **Type**

  ```ts
  function withDirectives(
    vnode: VNode,
    directives: DirectiveArguments
  ): VNode

  // [Directive, value, argument, modifiers]
  type DirectiveArguments = Array<
    | [Directive]
    | [Directive, any]
    | [Directive, any, string]
    | [Directive, any, string, DirectiveModifiers]
  >
  ```

- **Details**

  Wraps an existing vnode with custom directives. The second argument is an array of custom directives. Each custom directive is also represented as an array in the form of `[Directive, value, argument, modifiers]`. Tailing elements of the array can be omitted if not needed.

- **Example**

  ```js
  import { h, withDirectives } from 'vue'

  // a custom directive
  const pin = {
    mounted() {
      /* ... */
    },
    updated() {
      /* ... */
    }
  }

  // <div v-pin:top.animate="200"></div>
  const vnode = withDirectives(h('div'), [
    [pin, 200, 'top', { animate: true }]
  ])
  ```

- **See also** [Guide - Render Functions - Custom Directives](/guide/extras/render-function#custom-directives)

## withModifiers() {#withmodifiers}

For adding built-in [`v-on` modifiers](/guide/essentials/event-handling#event-modifiers) to an event handler function.

- **Type**

  ```ts
  function withModifiers(fn: Function, modifiers: ModifierGuardsKeys[]): Function
  ```

- **Example**

  ```js
  import { h, withModifiers } from 'vue'

  const vnode = h('button', {
    // equivalent of v-on:click.stop.prevent
    onClick: withModifiers(() => {
      // ...
    }, ['stop', 'prevent'])
  })
  ```

- **See also** [Guide - Render Functions - Event Modifiers](/guide/extras/render-function#event-modifiers)

## defineComponent() {#definecomponent}

A type helper for defining a Vue component with type inference.

- **Type**

  ```ts
  // options syntax
  function defineComponent(
    component: ComponentOptions
  ): ComponentConstructor

  // function syntax (requires 3.3+)
  function defineComponent(
    setup: ComponentOptions['setup'],
    extraOptions?: ComponentOptions
  ): () => any
  ```

  > Type is simplified for readability.

- **Details**

  The first argument expects a component options object. The return value will be the same options object, since the function is essentially a runtime no-op for type inference purposes only.

  Note that the return type is a bit special: it will be a constructor type whose instance type is the inferred component instance type based on the options. This is used for type inference when the returned type is used as a tag in TSX.

  You can extract the instance type of a component (equivalent to the type of `this` in its options) from the return type of `defineComponent()` like this:

  ```ts
  const Foo = defineComponent(/* ... */)

  type FooInstance = InstanceType<typeof Foo>
  ```

  ### Function Signature <sup class="vt-badge" data-text="3.3+" /> {#function-signature}

  `defineComponent()` also has an alternative signature that is meant to be used with Composition API and [render functions or JSX](/guide/extras/render-function.html).

  Instead of passing in an options object, a function is expected instead. This function works the same as the Composition API [`setup()`](/api/composition-api-setup.html#composition-api-setup) function: it receives the props and the setup context. The return value should be a render function - both `h()` and JSX are supported:

  ```js
  import { ref, h } from 'vue'

  const Comp = defineComponent(
    (props) => {
      // use Composition API here like in <script setup>
      const count = ref(0)

      return () => {
        // render function or JSX
        return h('div', count.value)
      }
    },
    // extra options, e.g. declare props and emits
    {
      props: {
        /* ... */
      }
    }
  )
  ```

  The main use case for this signature is with TypeScript (and in particular with TSX), as it supports generics:

  ```tsx
  const Comp = defineComponent(
    <T extends string | number>(props: { msg: T; list: T[] }) => {
      // use Composition API here like in <script setup>
      const count = ref(0)

      return () => {
        // render function or JSX
        return <div>{count.value}</div>
      }
    },
    // manual runtime props declaration is currently still needed.
    {
      props: ['msg', 'list']
    }
  )
  ```

  In the future, we plan to provide a Babel plugin that automatically infers and injects the runtime props (like for `defineProps` in SFCs) so that the runtime props declaration can be omitted.
