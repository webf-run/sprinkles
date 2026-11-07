import { Toggle } from '@webf/sprinkles';
import MessageSquare from 'lucide-solid/icons/message-square';
import { createSignal } from 'solid-js';

export default function Example() {
  const [comments, setComments] = createSignal(true);

  return (
    <div class='flex items-center gap-4'>
      <Toggle
        icon={MessageSquare}
        pressed={comments()}
        onPressedChange={setComments}
      >
        Comments
      </Toggle>
      <p class='m-0 text-sm text-foreground-muted'>
        Readers {comments() ? 'can' : 'can’t'} comment on this post.
      </p>
    </div>
  );
}
