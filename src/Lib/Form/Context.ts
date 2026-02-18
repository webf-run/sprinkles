import { createFormHookContexts } from '@tanstack/solid-form';

// export useFieldContext for use in your custom components
export const { fieldContext, formContext, useFieldContext } =
  createFormHookContexts();
