import { Button, EmptyState } from '@webf/sprinkles';
import Image from 'lucide-solid/icons/image';
import Upload from 'lucide-solid/icons/upload';

export default function Example() {
  return (
    <section class='w-full max-w-md rounded-2xl border border-border-muted'>
      <header class='border-b border-border-muted px-4 py-3 text-sm font-semibold text-foreground-strong'>
        Events / 2027
      </header>
      <EmptyState
        size='s'
        icon={Image}
        heading='This folder is empty'
        description='Drop images here, or upload them.'
        actions={
          <Button size='s' variant='secondary' icon={Upload}>
            Upload
          </Button>
        }
      />
    </section>
  );
}
