import { Button, EmptyState } from '@webf/sprinkles';
import SearchX from 'lucide-solid/icons/search-x';

export default function Example() {
  return (
    <EmptyState
      icon={SearchX}
      heading='No results for “pricing”'
      description='Check the spelling, or search all sites instead of this one.'
      actions={
        <>
          <Button variant='secondary' fillStyle='outline'>
            Clear search
          </Button>
          <Button variant='secondary'>Search all sites</Button>
        </>
      }
      class='w-full'
    />
  );
}
