import { Badge, Button, Popover, TextField } from '@webf/sprinkles';
import Plus from 'lucide-solid/icons/plus';
import { For, createSignal } from 'solid-js';

export default function Example() {
  const [tags, setTags] = createSignal(['Admissions', 'Scholarships']);
  const [draft, setDraft] = createSignal('');

  return (
    <div class='flex flex-wrap items-center gap-2'>
      <For each={tags()}>{(tag) => <Badge>{tag}</Badge>}</For>
      <Popover
        trigger={(props) => (
          <Button {...props} size='s' variant='secondary' icon={Plus}>
            Add tag
          </Button>
        )}
        title='Add a tag'
        class='w-72'
      >
        {(close) => (
          <form
            class='flex flex-col gap-3'
            onSubmit={(event) => {
              event.preventDefault();
              if (draft().trim()) setTags([...tags(), draft().trim()]);
              setDraft('');
              close();
            }}
          >
            <TextField
              label='Tag'
              value={draft()}
              onValueChange={setDraft}
              placeholder='Hostel life'
            />
            <Button type='submit' class='self-end'>
              Add tag
            </Button>
          </form>
        )}
      </Popover>
    </div>
  );
}
