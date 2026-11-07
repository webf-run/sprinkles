import { Button, Popover, TextField } from '@webf/sprinkles';
import Share2 from 'lucide-solid/icons/share-2';

export default function Example() {
  return (
    <Popover
      trigger={(props) => (
        <Button {...props} variant='secondary' icon={Share2}>
          Share preview
        </Button>
      )}
      title='Preview link'
      class='w-80'
    >
      <p class='m-0 text-foreground-muted'>
        Anyone with the link can see this draft until it’s published.
      </p>
      <TextField
        aria-label='Preview link'
        readOnly
        defaultValue='https://cms.example.org/preview/7f3a9c'
      />
    </Popover>
  );
}
