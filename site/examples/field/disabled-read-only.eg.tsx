import { TextField } from '@webf/sprinkles';

export default function Example() {
  return (
    <div class='grid w-full max-w-sm gap-4'>
      <TextField
        label='Author'
        defaultValue='Grace Liu'
        disabled
        description='Locked while the page is in review.'
      />
      <TextField
        label='Page ID'
        defaultValue='page_01HZX4K9'
        readOnly
        description='Set by the CMS.'
      />
    </div>
  );
}
