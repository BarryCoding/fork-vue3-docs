# Overview

## Essentials

```bash
pnpm create vue@latest

cd project
pnpm install
pnpm run dev

pnpm run build
```

```js
import { createApp } from 'vue'
import App from './App.vue'
import GlobalComponent from '@/components/GlobalComponent.vue'

const app = createApp(App)
app.config.errorHandler = (err) => { /*handle errors*/ }
app.component('GlobalComponent', GlobalComponent)

app.mount('#app')
```

```js
import { ref, nextTick } from 'vue'

const count = ref(0)
console.log(count)        // { value: 0 }
console.log(count.value)  // 0

count.value++
console.log(count.value)  // 1

function increment() {
  count.value++
}

const obj = ref({
  nested: { count: 0 },
  arr: ['foo', 'bar']
})

function mutateDeeply() {
  // these will work as expected.
  obj.value.nested.count++
  obj.value.arr.push('baz')
}

async function nextTickIncrement() {
  count.value++
  // Before the DOM is not updated
  await nextTick()
  // Now the DOM is updated
}

const raw = {}
const proxy = reactive(raw)

// proxy is NOT equal to the original.
console.log(proxy === raw) // false

// calling reactive() on the same object returns the same proxy
console.log(reactive(raw) === proxy) // true

// calling reactive() on a proxy returns itself
console.log(reactive(proxy) === proxy) // true

const nestedProxy = reactive({})
nestedProxy.nested = raw

console.log(nestedProxy.nested === raw) // false: nested object is a proxy
```

```js
import { ref, computed } from 'vue'

const author = ref({
  name: 'John Doe',
  books: [
    'Vue 2 - Advanced Guide',
    'Vue 3 - Basic Guide',
    'Vue 4 - The Mystery'
  ]
})

// a computed ref
const publishedBooksMessage = computed(() => {
  return author.value.books.length > 0 ? 'Yes' : 'No'
})


const firstName = ref('John')
const lastName = ref('Doe')
const fullName = computed({
  get() {
    return firstName.value + ' ' + lastName.value
  },
  set(newValue) {
    [firstName.value, lastName.value] = newValue.split(' ')
  }
})
```

```js
import { ref, watch, watchPostEffect } from 'vue'
const x = ref(0)
const y = ref(0)

// single ref
watch(x, (newX) => {
  console.log(`x is ${newX}`)
})

// getter
watch(
  () => x.value + y.value,
  (sum) => {
    console.log(`sum of x + y is: ${sum}`)
  }
)

// array of multiple sources
watch([x, () => y.value], ([newX, newY]) => {
  console.log(`x is ${newX} and y is ${newY}`)
})


const obj = reactive({ count: 0 })

// this won't work because we are passing a number to watch()
watch(obj.count, (count) => {
  console.log(`Count is: ${count}`)
})

// instead, use a getter:
watch(() => obj.count, (count) => {
  console.log(`Count is: ${count}`)
})

watch(obj, (newValue, oldValue) => {
  // fires on nested property mutations
  // Note: `newValue` will be equal to `oldValue` here
  // because they both point to the same object!
})

watch(
  () => state.someObject,
  (newValue, oldValue) => {
    // fires only when state.someObject is replaced
  }
)

watch(
  () => state.someObject,
  (newValue, oldValue) => {
    // Note: `newValue` will be equal to `oldValue` here
    // *unless* state.someObject has been replaced
  },
  { deep: true }
)

watch(
  source,
  (newValue, oldValue) => {
    // executed immediately, then again when `source` changes
  },
  { immediate: true }
)

watch(
  source,
  (newValue, oldValue) => {
    // when `source` changes, triggers only once
  },
  { once: true }
)


const todoId = ref(1)
const data = ref(null)

watch(
  todoId,
  async () => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${todoId.value}`
    )
    data.value = await response.json()
  },
  { immediate: true }
)
// simplified
watchEffect(async () => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${todoId.value}`
  )
  data.value = await response.json()
})


watch(source, callback, {
  flush: 'post'
})

watchEffect(callback, {
  flush: 'post'
})

watchPostEffect(() => {
  /* executed after Vue updates */
})

watch(source, callback, {
  flush: 'sync'
})

watchEffect(callback, {
  flush: 'sync'
})

watchSyncEffect(() => {
  /* executed synchronously upon reactive data change */
})


// this one will be automatically stopped
watchEffect(() => {})

// ...this one will not! (asynchronously watchEffect)(bad practice)
setTimeout(() => {
  watchEffect(() => {})
}, 100)

const unwatch = watchEffect(() => {})

// ...later, manually stop when no longer needed
unwatch()

// data to be loaded asynchronously(good practice)
const data = ref(null)

watchEffect(() => {
  if (data.value) {
    // do something when data is loaded
  }
})
```

```vue-html
<span>Message: {{ msg }}</span>

<p>Using text interpolation: {{ rawHtml }}</p>
<p>Using v-html directive: <span v-html="rawHtml"></span></p>

<div v-bind:id="dynamicId"></div>
<div v-bind:[attributeName]="url"> ... </div>
<div :id="dynamicId"></div>
<div :[attributeName]="url"> ... </div>

<div :id></div>
<div v-bind:id></div>

<button :disabled="isButtonDisabled">Button</button>

<div v-bind="objectOfAttrs"></div>

{{ number + 1 }}

{{ ok ? 'YES' : 'NO' }}

{{ message.split('').reverse().join('') }}

<div :id="`list-${id}`"></div>

<time :title="toTitleDate(date)" :datetime="date">
  {{ formatDate(date) }}
</time>

<p v-if="seen">Now you see me</p>

<a v-on:click="doSomething"> ... </a>
<a v-on:[eventName]="doSomething"> ... </a>
<a @click="doSomething"> ... </a>
<a @[eventName]="doSomething"> ... </a>

<form @submit.prevent="onSubmit">...</form>
```

```vue-html
<div :class="{ active: isActive }"></div>
<div :class="classObject"></div>

<div
  class="static"
  :class="{ active: isActive, 'text-danger': hasError }"
></div>

<div :class="[activeClass, errorClass]"></div>
<div :class="[{ [activeClass]: isActive }, errorClass]"></div>

<MyComponent class="baz boo" />
<MyComponent :class="{ active: isActive }" />

<!-- MyComponent template using $attrs for multi roots -->
<p :class="$attrs.class">Hi!</p>
<span>This is a child component</span>

<div :style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
<div :style="styleObject"></div>
<div :style="[baseStyleObj, overridingStyleObj]"></div>
```

```vue-html
<h1 v-if="awesome">Vue is awesome!</h1>
<h1 v-else>Oh no 😢</h1>

<div v-if="type === 'A'">A</div>
<div v-else-if="type === 'B'">B</div>
<div v-else-if="type === 'C'">C</div>
<div v-else>Not A/B/C</div>

<template v-if="ok">
  <h1>Title</h1>
  <p>Paragraph 1</p>
  <p>Paragraph 2</p>
</template>

<h1 v-show="ok">Hello!</h1>
```

```vue-html
<li v-for="item in items">
  {{ item.message }}
</li>
<li v-for="{ message } in items">
  {{ message }}
</li>

<li v-for="(item, index) in items">
  {{ parentMessage }} - {{ index }} - {{ item.message }}
</li>
<li v-for="({ message }, index) in items">
  {{ message }} {{ index }}
</li>

<li v-for="item in items">
  <span v-for="childItem in item.children">
    {{ item.message }} {{ childItem }}
  </span>
</li>

<li v-for="value in myObject">
  {{ value }}
</li>
<li v-for="(value, key) in myObject">
  {{ key }}: {{ value }}
</li>
<li v-for="(value, key, index) in myObject">
  {{ index }}. {{ key }}: {{ value }}
</li>

<span v-for="n in 10">{{ n }}</span>

<template v-for="item in items">
  <li>{{ item.msg }}</li>
  <li class="divider" role="presentation"></li>
</template>

<div v-for="item in items" :key="item.id">
  <!-- content -->
</div>

<template v-for="todo in todos" :key="todo.name">
  <li>{{ todo.name }}</li>
</template>

<MyComponent
  v-for="(item, index) in items"
  :item="item"
  :index="index"
  :key="item.id"
/>
```

```js
// manipulate array
items.value = items.value.filter((item) => item.message.match(/Foo/))

const numbers = ref([1, 2, 3, 4, 5])
const evenNumbers = computed(() => {
  return numbers.value.filter((n) => n % 2 === 0)
})

const reversedNumbers = [...numbers].reverse()
```

```js
const name = ref('Vue.js')

function greet(event) {
  alert(`Hello ${name.value}!`)
  if (event) {
    alert(event.target.tagName)
  }
}

function say(message) {
  alert(message)
}

function warn(message, event) {
  // now we have access to the native event
  if (event) {
    event.preventDefault()
  }
  alert(message)
}
```

```vue-html
<button @click="greet">Greet</button>

<button @click="say('hello')">Say hello</button>

<button @click="(event) => warn('Form cannot be submitted yet.', event)">
  Submit
</button>


<!-- the click event's propagation will be stopped -->
<a @click.stop="doThis"></a>

<!-- the submit event will no longer reload the page -->
<form @submit.prevent="onSubmit"></form>

<!-- modifiers can be chained -->
<a @click.stop.prevent="doThat"></a>

<!-- just the modifier -->
<form @submit.prevent></form>

<!-- only trigger handler if event.target is the element itself -->
<!-- i.e. not from a child element -->
<div @click.self="doThat">...</div>


<!-- use capture mode when adding the event listener     -->
<!-- i.e. an event targeting an inner element is handled -->
<!-- here before being handled by that element           -->
<div @click.capture="doThis">...</div>

<!-- the click event will be triggered at most once -->
<a @click.once="doThis"></a>

<!-- the scroll event's default behavior (scrolling) will happen -->
<!-- immediately, instead of waiting for `onScroll` to complete  -->
<!-- in case it contains `event.preventDefault()`                -->
<div @scroll.passive="onScroll">...</div>


<!-- only call `submit` when the `key` is `Enter` -->
<input @keyup.enter="submit" />

<input @keyup.page-down="onPageDown" />

<!-- Alt + Enter -->
<input @keyup.alt.enter="clear" />

<!-- Ctrl + Click -->
<div @click.ctrl="doSomething">Do something</div>


<!-- this will fire even if Alt or Shift is also pressed -->
<button @click.ctrl="onClick">A</button>

<!-- this will only fire when Ctrl and no other keys are pressed -->
<button @click.ctrl.exact="onCtrlClick">A</button>

<!-- this will only fire when no system modifiers are pressed -->
<button @click.exact="onClick">A</button>
```

```vue-html
<input v-model="message" placeholder="edit me" />

<!-- bad -->
<textarea>{{ text }}</textarea>

<textarea v-model="message" placeholder="add multiple lines"></textarea>

<input type="checkbox" id="checkbox" v-model="checked" />
<label for="checkbox">{{ checked }}</label>

<input type="checkbox" id="jack" value="Jack" v-model="checkedNames" />
<label for="jack">Jack</label>
<input type="checkbox" id="john" value="John" v-model="checkedNames" />
<label for="john">John</label>
<input type="checkbox" id="mike" value="Mike" v-model="checkedNames" />
<label for="mike">Mike</label>

<input type="radio" id="one" value="One" v-model="picked" />
<label for="one">One</label>
<input type="radio" id="two" value="Two" v-model="picked" />
<label for="two">Two</label>

<select v-model="selected">
  <option disabled value="">Please select one</option>
  <option>A</option>
  <option>B</option>
  <option>C</option>
</select>

<select v-model="multiSelected" multiple>
  <option>A</option>
  <option>B</option>
  <option>C</option>
</select>


<input
  type="checkbox"
  v-model="toggle"
  true-value="yes"
  false-value="no" />

<input
  type="checkbox"
  v-model="toggle"
  :true-value="dynamicTrueValue"
  :false-value="dynamicFalseValue" />

<!-- synced after "change" instead of "input" -->
<input v-model.lazy="msg" />

<input v-model.number="age" />
<input v-model.trim="msg" />
```

```vue
<script setup>
import { ref } from 'vue'
defineProps(['title'])
const emit = defineEmits(['enlarge-text'])

const count = ref(0)
</script>

<template>
  <h4>{{ title }}</h4>
  <button @click="emit('enlarge-text')">Enlarge text</button>
  <button @click="count++">You clicked me {{ count }} times.</button>
</template>
```

```vue
<script setup>
import {ref} from 'vue'
import ButtonCounter from './ButtonCounter.vue'

const postFontSize = ref(1)
</script>

<template>
  <div :style="{ fontSize: postFontSize + 'em' }">
    <h1>Here is a child component!</h1>
    <ButtonCounter 
      title="My journey with Vue"
      @enlarge-text="postFontSize += 0.1" 
     />
  </div>
</template>
```

```vue-html
<!-- Component changes when currentTab changes -->
<component :is="tabs[currentTab]"></component>
```

---

```vue-html
<button class="fancy-btn">
  <slot>
    Submit <!-- fallback content -->
  </slot> <!-- slot outlet -->
</button>
```
```vue-html{2}
<FancyButton>
  Click me! <!-- slot content -->
</FancyButton>

<FancyButton>
  <span style="color:red">Click me!</span>
  <AwesomeIcon name="plus" />
</FancyButton>
```

```vue-html
<div class="container">
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <!-- <slot name="default"></slot> -->
    <slot></slot>
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</div>
```

```vue-html
<BaseLayout>
  <template v-slot:header>
    <h1>Here might be a page title</h1>
  </template>

  <template #default>
    <p>A paragraph for the main content.</p>
    <p>And another one.</p>
  </template>

  <template #footer>
    <p>Here's some contact info</p>
  </template>
</BaseLayout>
```

```vue-html
<template>
  <div class="card">
    <div v-if="$slots.header" class="card-header">
      <slot name="header" />
    </div>
    
    <div v-if="$slots.default" class="card-content">
      <slot />
    </div>
    
    <div v-if="$slots.footer" class="card-footer">
      <slot name="footer" />
    </div>
  </div>
</template>
```

```vue-html
<base-layout>
  <template v-slot:[dynamicSlotName]>
    ...
  </template>

  <!-- with shorthand -->
  <template #[dynamicSlotName]>
    ...
  </template>
</base-layout>
```

```vue-html
<!-- <MyComponent> template -->
<div>
  <slot :text="greetingMessage" :count="1"></slot>
</div>
```

```vue-html
<MyComponent v-slot="slotProps">
  {{ slotProps.text }} {{ slotProps.count }}
</MyComponent>
<MyComponent v-slot="{ text, count }">
  {{ text }} {{ count }}
</MyComponent>
```

```vue-html
<!-- <MyComponent> template -->
<div>
  <slot :message="hello"></slot>
  <slot name="footer" />
</div>
```

```vue-html
<MyComponent>
  <!-- Use explicit default slot -->
  <template #default="{ message }">
    <p>{{ message }}</p>
  </template>

  <template #footer>
    <p>Here's some contact info</p>
  </template>
</MyComponent>
```

```vue-html
<!-- <FancyList> template -->
<ul>
  <li v-for="item in items">
    <slot name="item" v-bind="item"></slot>
  </li>
</ul>
```

```vue-html
<FancyList :api-url="url" :per-page="10">
  <template #item="{ body, username, likes }">
    <div class="item">
      <p>{{ body }}</p>
      <p>by {{ username }} | {{ likes }} likes</p>
    </div>
  </template>
</FancyList>
```

```js
import { defineAsyncComponent } from 'vue'

const AsyncComp = defineAsyncComponent(() =>
  import('@/components/MyComponent.vue')
)
```

```js
app.component('MyComponent', defineAsyncComponent(() =>
  import('@/components/MyComponent.vue')
))
```

```vue
<script setup>
import { defineAsyncComponent } from 'vue'

const AdminPage = defineAsyncComponent(() =>
  import('@/components/AdminPageComponent.vue')
)
</script>

<template>
  <AdminPage />
</template>
```

```js
const AsyncComp = defineAsyncComponent({
  // the loader function
  loader: () => import('./Foo.vue'),

  // A component to use while the async component is loading
  loadingComponent: LoadingComponent,
  // Delay before showing the loading component. Default: 200ms.
  delay: 200,

  // A component to use if the load fails
  errorComponent: ErrorComponent,
  // The error component will be displayed if a timeout is
  // provided and exceeded. Default: Infinity.
  timeout: 3000
})
```

---

```vue {6,14}
<script setup>
import { ref, onMounted } from 'vue'

// declare a ref to hold the element reference
// the name must match template ref value
const input = ref(null)

onMounted(() => {
  input.value.focus()
})

watchEffect(() => {
  if (input.value) {
    input.value.focus()
  } else {
    // not mounted yet, or the element was unmounted (e.g. by v-if)
  }
})
</script>

<template>
  <input ref="input" />
</template>
```

```vue-html
<input :ref="(el) => { /* assign el to a property or ref */ }">
```

```vue
<script setup>
import { ref, onMounted } from 'vue'

const list = ref([
  /* ... */
])
const itemRefs = ref([])

onMounted(() => console.log(itemRefs.value))
</script>

<template>
  <ul>
    <li v-for="item in list" ref="itemRefs">
      {{ item }}
    </li>
  </ul>
</template>
```

```vue
<script setup>
import { ref } from 'vue'

const a = 1
const b = ref(2)

// Compiler macros, such as defineExpose, don't need to be imported
defineExpose({
  a,
  b
})
</script>
```

```vue
<script setup>
import { ref, onMounted } from 'vue'
import Child from './Child.vue'

const child = ref(null)

onMounted(() => {
  // child.value will hold an instance of <Child />
  console.log(child.value) // a, b
})
</script>

<template>
  <Child ref="child" />
</template>
```

---

```js
import { createApp } from 'vue'

const app = createApp({})

const i18nPlugin = {
  install(app, options) {
    app.provide('i18n', options)
  }
}

app.use(i18nPlugin, {
  greetings: {
    hello: 'Bonjour!'
  }
})
```

```vue {2,4}
<script setup>
import { inject } from 'vue'
const i18n = inject('i18n')
console.log(i18n.greetings.hello)
</script>
```

---

```vue
<script setup>
// enables v-focus in templates
const vFocus = {
  mounted: (el) => el.focus()
}
</script>

<template>
  <input v-focus />
</template>
```

```js
const app = createApp({})

// make v-focus usable in all components
app.directive('focus', {
  mounted: (el) => el.focus()
})
```

```js
const myDirective = {
  // called before bound element's attributes or event listeners are applied
  created(el, binding, vnode) {},

  // called right before the element is inserted into the DOM.
  beforeMount(el, binding, vnode) {},

  // called when the bound element's parent component and all its children are mounted.
  mounted(el, binding, vnode) {},

  // called before the parent component is updated
  beforeUpdate(el, binding, vnode, prevVnode) {},

  // called after the parent component and all of its children have updated
  updated(el, binding, vnode, prevVnode) {},

  // called before the parent component is unmounted
  beforeUnmount(el, binding, vnode) {},

  // called when the parent component is unmounted
  unmounted(el, binding, vnode) {}
}
```

```vue-html
<div v-color="color"></div>
<div v-demo="{ color: 'white', text: 'hello!' }"></div>
```

```js
app.directive('color', (el, binding) => {
  // this will be called for both `mounted` and `updated`
  el.style.color = binding.value
})

app.directive('demo', (el, binding) => {
  console.log(binding.value.color) // => "white"
  console.log(binding.value.text) // => "hello!"
})
```

```vue-html
<MyComponent v-demo="test" />
```

```vue-html
<!-- template of MyComponent -->

<div> <!-- v-demo directive will be applied here -->
  <span>My component content</span>
</div>
```

---

```vue-html
<Transition>
  <p v-if="show">hello</p>
</Transition>
<Transition name="fade">
  ...
</Transition>
```

```css
/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
```

```vue-html
<Transition name="slide-fade">
  <p v-if="show">hello</p>
</Transition>

<Transition name="bounce">
  <p v-if="show" style="text-align: center;">
    Hello here is some bouncy text!
  </p>
</Transition>
```

```css
/*
  Enter and leave animations can use different
  durations and timing functions.
*/
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
```

```vue-html
<!-- assuming Animate.css is included on the page -->
<Transition
  name="custom-classes"
  enter-active-class="animate__animated animate__tada"
  leave-active-class="animate__animated animate__bounceOutRight"
>
  <p v-if="show">hello</p>
</Transition>

<Transition type="animation">...</Transition>
```

```vue-html
<Transition name="nested" :duration="550">
  <div v-if="show" class="outer">
    <div class="inner">
      Hello
    </div>
  </div>
</Transition>

<Transition :duration="{ enter: 500, leave: 800 }">...</Transition>
```
```css
/* ... other necessary CSS omitted */

/* rules that target nested elements */
.nested-enter-active .inner,
.nested-leave-active .inner {
  transition: all 0.3s ease-in-out;
}

.nested-enter-from .inner,
.nested-leave-to .inner {
  transform: translateX(30px);
  opacity: 0;
}

/* delay enter of nested element for staggered effect */
.nested-enter-active .inner {
  transition-delay: 0.25s;
}
```

```vue{5}
<!-- Reusable MyTransition.vue -->
<script>
// JavaScript hooks logic...
</script>

<template>
  <!-- wrap the built-in Transition component -->
  <Transition
    name="my-transition"
    @enter="onEnter"
    @leave="onLeave">
    <slot></slot> <!-- pass down slot content -->
  </Transition>
</template>

<style>
/*
  Necessary CSS...
  Note: avoid using <style scoped> here since it
  does not apply to slot content.
*/
</style>
```

```vue-html
<Transition appear>
  ...
</Transition>

<Transition>
  <button v-if="docState === 'saved'">Edit</button>
  <button v-else-if="docState === 'edited'">Save</button>
  <button v-else-if="docState === 'editing'">Cancel</button>
</Transition>

<Transition mode="out-in">
  ...
</Transition>

<Transition name="fade" mode="out-in">
  <component :is="activeComponent"></component>
</Transition>

<Transition :name="transitionName">
  <!-- ... -->
</Transition>
```

```vue
<script setup>
import { ref } from 'vue';
const count = ref(0);
let intervalId
onMounted(()=>{
  intervalId = setInterval(() => count.value++, 1000);
})
onUnmounted(()=>{
  clearInterval(intervalId)
})
</script>

<template>
  <Transition>
    <span :key="count">{{ count }}</span>
  </Transition>
</template>
```

---

```vue-html
<TransitionGroup name="list" tag="ul">
  <li v-for="item in items" :key="item">
    {{ item }}
  </li>
</TransitionGroup>
```

```css{1,13-17}
.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}
```

---

```js
import { createWebHistory, createRouter } from 'vue-router'

import HomeView from './HomeView.vue'
import AboutView from './AboutView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/about', component: AboutView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})
```

```js
const app = createApp(App)
app.use(router)
app.mount('#app')
```

```vue
<template>
  <nav>
    <RouterLink to="/">Go to Home</RouterLink>
    <RouterLink to="/about">Go to About</RouterLink>
  </nav>
  <main>
    <RouterView />
  </main>
</template>
```

```vue
<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const search = computed({
  get() {
    return route.query.search ?? ''
  },
  set(search) {
    router.replace({ query: { search } })
  }
})
</script>
```
