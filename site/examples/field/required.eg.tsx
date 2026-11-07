import { DatePicker, TextField } from '@webf/sprinkles';

export default function Example() {
  return (
    <div class='grid w-full max-w-sm gap-4'>
      <TextField label='Title' required />
      <DatePicker label='Publish date' required />
      <TextField label='Subtitle' description='Optional.' />
    </div>
  );
}
