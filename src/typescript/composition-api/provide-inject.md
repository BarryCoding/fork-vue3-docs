# Typing Provide / Inject {#typing-provide-inject}

Provide and inject are usually performed in separate components. To properly type injected values, Vue provides an `InjectionKey` interface, which is a generic type that extends `Symbol`. It can be used to sync the type of the injected value between the provider and the consumer:

```ts
import { provide, inject } from 'vue'
import type { InjectionKey } from 'vue'

const key = Symbol() as InjectionKey<string> // string is the 'value' type

provide(key, 'foo') // providing non-string value will result in error

const foo = inject(key) // type of foo: string | undefined
```

:::tip Best Practice
It's recommended to place the injection key in a separate file  
so that it can be imported in multiple components.
:::

When using string injection keys, the type of the injected value will be `unknown`, and needs to be explicitly declared via a generic type argument:

```ts
// bad 
const fooUnknown = inject('foo') // type: unknown

// good
const foo = inject<string>('foo') // type: string | undefined

// ok: If you are sure that the value is always provided, you can also force cast the value:
const fooString = inject('foo') as string

// safe: set a default value in the 2nd argument
const foo = inject<string>('foo', 'bar') // type: string
```
