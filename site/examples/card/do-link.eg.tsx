import { Card, CardBody, CardHeader } from '@webf/sprinkles';

export default function Example() {
  return (
    <Card href='#posts' class='w-full'>
      <CardHeader title='Posts' description='41 published' />
      <CardBody class='text-foreground-muted'>
        1 scheduled for 15 November
      </CardBody>
    </Card>
  );
}
