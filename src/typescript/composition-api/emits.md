# Typing Component Emits {#typing-component-emits}

### A type literal <sup class="vt-badge" data-text="3.3+" />

where the keys are the event names, and values are array / tuple types representing the additional accepted parameters for the event.

```vue
<script setup lang="ts">
const emit = defineEmits<{
  change: [id: number]
  update: [value: string]
}>()
</script>
```


### A callable function type <sup class="vt-badge" data-text="3.2-" />

written as a type literal with [Call Signatures](https://www.typescriptlang.org/docs/handbook/2/functions.html#call-signatures).

```vue
<script setup lang="ts">
const emit = defineEmits<{
  (e: 'change', id: number): void
  (e: 'update', value: string): void
}>()
</script>
```
