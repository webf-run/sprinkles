import { Card, CardBody, Timeline } from '@webf/sprinkles';

export default function Example() {
  return (
    <Card class='w-full max-w-md' elevated>
      <CardBody>
        <h3 class='m-0 font-heading text-fluid-xl font-semibold text-foreground-strongest'>
          Order #48213
        </h3>
        <p class='m-0 mt-1 mb-5 text-fluid-sm text-foreground-muted'>
          Arriving Thursday, 15 October
        </p>
        <Timeline
          variant='positive'
          items={[
            {
              label: 'Mon 12 Oct',
              text: 'Order placed. We have your payment.',
            },
            { label: 'Tue 13 Oct', text: 'Packed and handed to the courier.' },
            {
              label: 'Wed 14 Oct',
              text: 'At your local depot, out for delivery tomorrow.',
            },
          ]}
        />
      </CardBody>
    </Card>
  );
}
