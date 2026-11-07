import { Button } from '@webf/sprinkles';

import { toaster } from './toaster';

export default function Example() {
  return (
    <>
      <Button
        onClick={() =>
          toaster.success({
            title: 'Page published',
            description: '“Admissions 2027” is live at /admissions-2027.',
            action: { label: 'View page', onClick: () => {} },
            // Success toasts last 2 s; give one with an action time to be read.
            duration: 6000,
          })
        }
      >
        Publish
      </Button>
    </>
  );
}
