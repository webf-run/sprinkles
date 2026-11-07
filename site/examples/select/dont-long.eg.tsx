import { Select } from '@webf/sprinkles';

const Countries = [
  'Afghanistan',
  'Albania',
  'Algeria',
  'Andorra',
  'Angola',
  'Argentina',
  'Armenia',
  'Australia',
  'Austria',
  'Azerbaijan',
  'Bahamas',
  'Bahrain',
  'Bangladesh',
  'Barbados',
  'Belarus',
  'Belgium',
].map((name) => ({ label: name, value: name.toLowerCase() }));

export default function Example() {
  return (
    <Select
      class='max-w-xs'
      label='Country'
      placeholder='Choose one of 195 countries'
      items={Countries}
    />
  );
}
