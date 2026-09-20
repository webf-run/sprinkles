import { type Ref, createRenderEffect } from 'solid-js';

/** A type-safe helper to create a component ref. */
export function createRef<T extends Exclude<unknown, Function>>(
  ref: Ref<T>,
  createRef: () => T
) {
  createRenderEffect(() => {
    if (typeof ref !== 'function') {
      throw new Error(
        'Should never happen, as solid always passes refs as functions'
      );
    }

    let refFunc = ref as (value: T) => void;

    refFunc(createRef());
  });
}
