import { Select } from '@webf/sprinkles';

const Sections = [
  { label: 'About', value: 'about' },
  { label: 'Programs', value: 'programs' },
  { label: 'News', value: 'news' },
];

export default function Example() {
  return (
    <div class='grid w-full gap-4 sm:grid-cols-2'>
      <Select label='Default' placeholder='Choose a section' items={Sections} />
      <Select
        label='Invalid'
        placeholder='Choose a section'
        items={Sections}
        invalid
        errorText='Choose where the page lives.'
      />
      <Select label='Disabled' items={Sections} defaultValue='news' disabled />
      <Select label='Read-only' items={Sections} defaultValue='news' readOnly />
    </div>
  );
}
