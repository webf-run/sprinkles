import { Button, Popover } from '@webf/sprinkles';

export default function Example() {
  return (
    <Popover
      trigger={(props) => (
        <Button {...props} variant='secondary'>
          Last edited
        </Button>
      )}
      title='Last edited'
      class='w-64'
    >
      <p class='m-0'>By Asha Rao, today at 14:32.</p>
    </Popover>
  );
}
