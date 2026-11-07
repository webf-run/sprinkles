import { Button, Card, CardFooter, CardHeader } from '@webf/sprinkles';

export default function Example() {
  return (
    <Card href='#posts' class='w-full'>
      <CardHeader title='Posts' description='41 published' />
      <CardFooter>
        <Button size='s' variant='secondary'>
          New post
        </Button>
      </CardFooter>
    </Card>
  );
}
