import { Button } from '@webf/sprinkles';

import { toaster } from './toaster';

export default function Example() {
  return (
    <>
      <Button onClick={() => toaster.success({ title: 'Settings saved' })}>
        Save settings
      </Button>
    </>
  );
}
