import { TextArea } from '@webf/sprinkles';

const Text =
  'Join us on the main lawn for music, food stalls and a tour of the new library.';

export default function Example() {
  return (
    <div class='grid w-full max-w-sm gap-4'>
      <TextArea size='s' label='Small' rows={2} defaultValue={Text} />
      <TextArea size='m' label='Medium' rows={2} defaultValue={Text} />
      <TextArea size='l' label='Large' rows={2} defaultValue={Text} />
      <TextArea size='xl' label='Extra large' rows={2} defaultValue={Text} />
    </div>
  );
}
