import { Timeline } from '@webf/sprinkles';

export default function Example() {
  return (
    <div class='w-full rounded-2xl bg-surface-inverse p-8'>
      <h3 class='m-0 mb-6 font-heading text-fluid-2xl font-semibold text-foreground-inverse'>
        Our year at a glance
      </h3>
      <Timeline
        layout='cards'
        variant='inverse'
        items={[
          {
            label: 'Spring',
            text: 'We open registration and welcome 300 new members.',
          },
          {
            label: 'Summer',
            text: 'Weekend workshops run in every neighbourhood.',
          },
          {
            label: 'Autumn',
            text: 'The harvest festival brings the whole town together.',
          },
          {
            label: 'Winter',
            text: 'Our winter fund helps 120 families stay warm.',
          },
        ]}
      />
    </div>
  );
}
