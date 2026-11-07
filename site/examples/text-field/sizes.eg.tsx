import { TextField } from '@webf/sprinkles';

export default function Example() {
  return (
    <div class='grid w-full max-w-sm gap-4'>
      <TextField size='s' label='Small' defaultValue='Campus open day' />
      <TextField size='m' label='Medium' defaultValue='Campus open day' />
      <TextField size='l' label='Large' defaultValue='Campus open day' />
      <TextField size='xl' label='Extra large' defaultValue='Campus open day' />
    </div>
  );
}
