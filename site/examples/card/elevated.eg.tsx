import { Card, CardBody, CardHeader } from '@webf/sprinkles';

export default function Example() {
  return (
    <div class='flex w-full flex-wrap gap-6 rounded-2xl bg-surface-muted p-6'>
      <Card class='min-w-56 flex-1'>
        <CardHeader title='Flat' description='Sits on the page.' />
        <CardBody>Most cards: dashboards, settings, lists.</CardBody>
      </Card>
      <Card elevated class='min-w-56 flex-1'>
        <CardHeader title='Elevated' description='Lifted off the page.' />
        <CardBody>
          One card that should stand out, such as a welcome panel.
        </CardBody>
      </Card>
    </div>
  );
}
