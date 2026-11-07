import { Button } from '@webf/sprinkles';

import { toaster } from './toaster';

export default function Example() {
  return (
    <>
      <Button
        onClick={() =>
          toaster.error({
            title: 'Couldn’t save settings',
            description:
              'The slug “about” is already used by another page. Choose a different slug in Page settings.',
          })
        }
      >
        Save settings
      </Button>
    </>
  );
}
