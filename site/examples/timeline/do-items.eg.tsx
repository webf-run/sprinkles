import { Timeline } from '@webf/sprinkles';

export default function Example() {
  return (
    <Timeline
      class='w-full max-w-xs'
      items={[
        { label: '2019', text: 'Our first shop opens.' },
        { label: '2021', text: 'We start delivering across the city.' },
        { label: '2024', text: 'A second shop opens.' },
      ]}
    />
  );
}
