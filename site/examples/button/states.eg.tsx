import { Button } from '@webf/sprinkles';

export default function Example() {
  return (
    <>
      <Button>Default</Button>
      <Button class='bg-accent-hover'>Hover</Button>
      <Button class='bg-accent-down'>Pressed</Button>
      <Button class='outline-2 outline-offset-2 outline-solid outline-focus-ring'>
        Keyboard focus
      </Button>
      <Button disabled>Disabled</Button>
      <Button pending>Saving</Button>
    </>
  );
}
