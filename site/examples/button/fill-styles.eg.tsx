import { Button } from '@webf/sprinkles';

export default function Example() {
  return (
    <>
      <Button variant='accent' fillStyle='outline'>
        Publish
      </Button>
      <Button variant='primary' fillStyle='outline'>
        Save draft
      </Button>
      <Button variant='secondary' fillStyle='outline'>
        Preview
      </Button>
      <Button variant='negative' fillStyle='outline'>
        Delete
      </Button>
      <Button variant='highlight' fillStyle='outline'>
        Apply now
      </Button>
    </>
  );
}
