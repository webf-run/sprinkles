import { Field as ArkField } from '@ark-ui/solid/field';
import { Field } from '@webf/sprinkles';

export default function Example() {
  return (
    <Field
      class='max-w-sm'
      label='Theme colour'
      description='Used for links and buttons on this site.'
    >
      <ArkField.Input
        type='color'
        value='#5d13b7'
        class='box-border h-8 w-16 cursor-pointer rounded-lg border border-border-strong bg-surface p-1'
      />
    </Field>
  );
}
