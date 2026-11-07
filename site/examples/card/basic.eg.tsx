import { Card, CardBody, CardHeader } from '@webf/sprinkles';

export default function Example() {
  return (
    <Card class='w-full max-w-sm'>
      <CardHeader title='Site traffic' description='Last 7 days' />
      <CardBody>
        <p class='m-0 text-3xl font-semibold text-foreground-strongest'>
          12,480
        </p>
        <p class='m-0 text-sm text-foreground-muted'>
          visits, up 8% on the week before
        </p>
      </CardBody>
    </Card>
  );
}
