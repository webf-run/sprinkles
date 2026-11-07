import { Button } from '@webf/sprinkles';

import { toaster } from './toaster';

const saveDraft = () => new Promise((resolve) => setTimeout(resolve, 1500));

export default function Example() {
  return (
    <>
      <Button
        variant='secondary'
        onClick={() =>
          toaster.promise(saveDraft, {
            loading: { title: 'Saving draft…' },
            success: { title: 'Draft saved' },
            error: {
              title: 'Couldn’t save the draft',
              description: 'Your changes are still here; try again.',
            },
          })
        }
      >
        Save draft
      </Button>
    </>
  );
}
