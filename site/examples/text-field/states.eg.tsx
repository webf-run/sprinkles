import { TextField } from '@webf/sprinkles';

export default function Example() {
  return (
    <div class='grid w-full gap-4 sm:grid-cols-2'>
      <TextField label='Default' placeholder='Untitled page' />
      <TextField
        label='Invalid'
        defaultValue=''
        invalid
        errorText='Enter a title.'
      />
      <TextField label='Disabled' defaultValue='Annual report 2025' disabled />
      <TextField label='Read-only' defaultValue='Annual report 2025' readOnly />
    </div>
  );
}
