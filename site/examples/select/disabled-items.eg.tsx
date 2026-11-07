import { Select } from '@webf/sprinkles';

const Visibility = [
  { label: 'Public', value: 'public' },
  { label: 'Signed-in members', value: 'members' },
  { label: 'Editors only', value: 'editors' },
  { label: 'Password protected (Pro plan)', value: 'password', disabled: true },
];

export default function Example() {
  return (
    <Select
      class='max-w-xs'
      label='Visibility'
      items={Visibility}
      defaultValue='public'
    />
  );
}
