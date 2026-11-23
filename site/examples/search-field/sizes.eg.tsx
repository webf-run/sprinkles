import { SearchField } from '@webf/sprinkles';

export default function Example() {
  return (
    <div class='grid w-full max-w-sm gap-4'>
      <SearchField size='s' label='Small' defaultValue='Campus open day' />
      <SearchField size='m' label='Medium' defaultValue='Campus open day' />
      <SearchField size='l' label='Large' defaultValue='Campus open day' />
      <SearchField
        size='xl'
        label='Extra large'
        defaultValue='Campus open day'
      />
    </div>
  );
}
