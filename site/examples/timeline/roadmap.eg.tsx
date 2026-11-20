import { Timeline } from '@webf/sprinkles';

export default function Example() {
  return (
    <div class='w-full'>
      <h3 class='m-0 mb-6 font-heading text-fluid-xl font-semibold text-foreground-strongest'>
        What we are building next
      </h3>
      <Timeline
        layout='horizontal'
        tone='informative'
        items={[
          {
            label: 'Now',
            text: 'Dark mode and faster search for every account.',
          },
          {
            label: 'Next month',
            text: 'Shared folders for your whole team.',
          },
          { label: 'This summer', text: 'An offline mode for the mobile app.' },
          {
            label: 'Later this year',
            text: 'Links to the tools you already use.',
          },
        ]}
      />
    </div>
  );
}
