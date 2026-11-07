import { Card, CardBody, CardHeader } from '@webf/sprinkles';

export default function Example() {
  return (
    <Card class='w-full'>
      <CardHeader title='Publishing' />
      <CardBody class='flex flex-col gap-3'>
        <Card class='py-3'>
          <CardBody>Pages: reviewed before publishing</CardBody>
        </Card>
        <Card class='py-3'>
          <CardBody>Posts: published straight away</CardBody>
        </Card>
      </CardBody>
    </Card>
  );
}
