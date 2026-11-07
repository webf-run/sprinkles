import { Toggle } from '@webf/sprinkles';
import Star from 'lucide-solid/icons/star';

export default function Example() {
  return (
    <div class='flex flex-col gap-4'>
      <div class='flex flex-wrap items-center gap-3'>
        <Toggle icon={Star}>Off</Toggle>
        <Toggle icon={Star} class='bg-neutral/12'>
          Off, hover
        </Toggle>
        <Toggle
          icon={Star}
          class='outline-solid outline-2 outline-offset-2 outline-focus-ring'
        >
          Keyboard focus
        </Toggle>
        <Toggle icon={Star} disabled>
          Off, disabled
        </Toggle>
      </div>
      <div class='flex flex-wrap items-center gap-3'>
        <Toggle icon={Star} defaultPressed>
          On
        </Toggle>
        <Toggle
          icon={Star}
          defaultPressed
          class='data-pressed:bg-neutral-hover'
        >
          On, hover
        </Toggle>
        <Toggle
          icon={Star}
          defaultPressed
          class='outline-solid outline-2 outline-offset-2 outline-focus-ring'
        >
          Keyboard focus
        </Toggle>
        <Toggle icon={Star} defaultPressed disabled>
          On, disabled
        </Toggle>
      </div>
    </div>
  );
}
