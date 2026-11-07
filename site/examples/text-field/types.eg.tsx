import { TextField } from '@webf/sprinkles';

export default function Example() {
  return (
    <div class='grid w-full max-w-sm gap-4'>
      <TextField
        type='email'
        label='Contact email'
        placeholder='name@example.org'
        autocomplete='email'
      />
      <TextField type='url' label='Canonical URL' placeholder='https://' />
      <TextField type='tel' label='Phone' autocomplete='tel' />
      <TextField
        type='password'
        label='Preview password'
        autocomplete='new-password'
      />
    </div>
  );
}
