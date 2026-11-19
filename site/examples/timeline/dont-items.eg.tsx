import { Timeline } from '@webf/sprinkles';

export default function Example() {
  return (
    <Timeline
      class='w-full max-w-xs'
      items={[
        {
          label: 'In the early days of the business, around the time we began',
          text: 'We opened our first shop after many months of planning, talking to suppliers and neighbours, and saving up enough money to sign the lease.',
        },
        { label: 'Last year', text: 'A second shop opened.' },
        { label: '12/03', text: 'New logo.' },
      ]}
    />
  );
}
