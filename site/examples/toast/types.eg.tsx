import { Button } from '@webf/sprinkles';

import { toaster } from './toaster';

export default function Example() {
  return (
    <>
      <Button
        variant='secondary'
        onClick={() =>
          toaster.create({ type: 'neutral', title: 'Link copied' })
        }
      >
        Neutral
      </Button>
      <Button
        variant='secondary'
        onClick={() =>
          toaster.info({
            title: 'New version available',
            description: 'Reload to get the latest editor.',
          })
        }
      >
        Info
      </Button>
      <Button
        variant='secondary'
        onClick={() => toaster.success({ title: 'Draft saved' })}
      >
        Success
      </Button>
      <Button
        variant='secondary'
        onClick={() =>
          toaster.warning({
            title: 'Image is large',
            description: 'hero.jpg is 8 MB; pages will load slowly.',
          })
        }
      >
        Warning
      </Button>
      <Button
        variant='secondary'
        onClick={() =>
          toaster.error({
            title: 'Couldn’t upload hero.jpg',
            description: 'Check your connection and try again.',
          })
        }
      >
        Error
      </Button>
    </>
  );
}
