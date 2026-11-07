import { Button, Navbar } from '@webf/sprinkles';

export default function Example() {
  return (
    <Navbar
      logoText='Studio Nine'
      actions={
        <Button href='#help' size='l' variant='secondary' fillStyle='outline'>
          Help
        </Button>
      }
    />
  );
}
