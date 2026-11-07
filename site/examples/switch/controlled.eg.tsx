import { Switch } from '@webf/sprinkles';
import { createSignal } from 'solid-js';

export default function Example() {
  const [indexed, setIndexed] = createSignal(true);

  return (
    <div class='grid gap-1'>
      <Switch
        label='Let search engines index this page'
        checked={indexed()}
        onCheckedChange={setIndexed}
      />
      <p class='m-0 text-sm text-foreground-muted'>
        {indexed()
          ? 'Search engines can list this page.'
          : 'Search engines are asked to skip this page.'}
      </p>
    </div>
  );
}
