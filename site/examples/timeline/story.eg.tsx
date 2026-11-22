import { Timeline } from '@webf/sprinkles';

export default function Example() {
  return (
    <div class='@container w-full'>
      <div class='grid gap-8 @lg:grid-cols-2 @lg:gap-12'>
        <div>
          <p class='m-0 text-fluid-xs font-semibold text-accent uppercase'>
            Our story
          </p>
          <h3 class='m-0 mt-2 font-heading text-fluid-2xl font-semibold text-foreground-strongest'>
            Twenty years of learning in one town
          </h3>
          <p class='m-0 mt-4 text-fluid-md text-foreground-muted'>
            What began as one classroom has grown into a campus with three
            schools. Here are the moments that shaped us.
          </p>
        </div>
        <Timeline
          items={[
            {
              label: '2005',
              text: 'The society is founded and the first classes begin.',
            },
            { label: '2007', text: 'A second institute opens its doors.' },
            {
              label: '2024',
              text: 'The college earns its first national accreditation.',
            },
            { label: '2025', text: 'Postgraduate programs begin.' },
          ]}
        />
      </div>
    </div>
  );
}
