import { Button, Tooltip } from '@webf/sprinkles';

export default function Example() {
  return (
    <Tooltip
      content='Titles over 60 characters are cut off in search results.'
      trigger={(props) => (
        <Button {...props} variant='secondary'>
          Save title
        </Button>
      )}
    />
  );
}
