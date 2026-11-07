import { Card, CardBody, CardHeader, Separator } from '@webf/sprinkles';

export default function Example() {
  return (
    <Card class='w-full'>
      <CardHeader title='Publishing' />
      <CardBody class='flex flex-col gap-3'>
        <p class='m-0'>Pages: reviewed before publishing</p>
        <Separator />
        <p class='m-0'>Posts: published straight away</p>
      </CardBody>
    </Card>
  );
}
