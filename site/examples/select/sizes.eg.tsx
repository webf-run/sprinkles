import { Select } from '@webf/sprinkles';

const Languages = [
  { label: 'English', value: 'en' },
  { label: 'Hindi', value: 'hi' },
  { label: 'Marathi', value: 'mr' },
];

export default function Example() {
  return (
    <div class='grid w-full max-w-xs gap-4'>
      <Select size='s' label='Small' items={Languages} defaultValue='en' />
      <Select size='m' label='Medium' items={Languages} defaultValue='en' />
      <Select size='l' label='Large' items={Languages} defaultValue='en' />
      <Select
        size='xl'
        label='Extra large'
        items={Languages}
        defaultValue='en'
      />
    </div>
  );
}
