import { createFormHook } from '@tanstack/solid-form';

import { fieldContext, formContext } from './Context.js';

export const { useAppForm, withForm } = createFormHook({
  fieldContext,
  formContext,
  // We'll learn more about these options later
  fieldComponents: {},
  formComponents: {},
});
