# Error Handling

Errors are an unavoidable part of application development. How you handle those errors makes a big difference.

- Component Level Errors - onErrorCaptured
- App Level Error Handling - app.config.errorHandler

## onErrorCaptured() {#onerrorcaptured}

Registers a hook to be called when an error propagating from a descendant component has been captured.

- **Type**

  ```ts
  function onErrorCaptured(callback: ErrorCapturedHook): void

  type ErrorCapturedHook = (
    err: unknown,
    instance: ComponentPublicInstance | null,
    info: string
  ) => boolean | void
  ```

- **Details**

  Errors can be captured from the following sources:

  - Component renders
  - Event handlers
  - Lifecycle hooks
  - `setup()` function
  - Watchers
  - Custom directive hooks
  - Transition hooks

  The hook receives three arguments: the error, the component instance that triggered the error, and an information string specifying the error source type.


  You can modify component state in `errorCaptured()` to display an error state to the user. However, it is important that the error state should not render the original content that caused the error; otherwise the component will be thrown into an infinite render loop.

  The hook can return `false` to stop the error from propagating further. See error propagation details below.

  **Error Propagation Rules**

  - By default, all errors are still sent to the application-level [`app.config.errorHandler`](/api/application#app-config-errorhandler) if it is defined, so that these errors can still be reported to an analytics service in a single place.

  - If multiple `errorCaptured` hooks exist on a component's inheritance chain or parent chain, all of them will be invoked on the same error, in the order of bottom to top. This is similar to the bubbling mechanism of native DOM events.

  - If the `errorCaptured` hook itself throws an error, both this error and the original captured error are sent to `app.config.errorHandler`.

  - An `errorCaptured` hook can return `false` to prevent the error from propagating further. This is essentially saying "this error has been handled and should be ignored." It will prevent any additional `errorCaptured` hooks or `app.config.errorHandler` from being invoked for this error.

## app.config.errorHandler {#app-config-errorhandler}

:::tip Pro Tip
app.config.errorHandler is a great place to report errors to tracking services like Sentry.
:::

Assign a global handler for uncaught errors propagating from within the application.

- **Type**

  ```ts
  interface AppConfig {
    errorHandler?: (
      err: unknown,
      instance: ComponentPublicInstance | null,
      // `info` is a Vue-specific error info,
      // e.g. which lifecycle hook the error was thrown in
      info: string
    ) => void
  }
  ```

- **Details**

  The error handler receives three arguments: the error, the component instance that triggered the error, and an information string specifying the error source type.

  It can capture errors from the following sources:

  - Component renders
  - Event handlers
  - Lifecycle hooks
  - `setup()` function
  - Watchers
  - Custom directive hooks
  - Transition hooks

- **Example**

  ```js
  app.config.errorHandler = (err, instance, info) => {
    // handle error, e.g. report to a service
  }
  ```

:::tip
In production, the 3rd argument (`info`) will be a shortened code instead of the full information string. You can find the code to string mapping in the [Production Error Code Reference](/error-reference/#runtime-errors).
:::
