import { Toggle } from '@webf/sprinkles';
import Pin from 'lucide-solid/icons/pin';

export default function Example() {
  return (
    <>
      <Toggle size='s' icon={Pin} defaultPressed>
        Pinned
      </Toggle>
      <Toggle size='m' icon={Pin} defaultPressed>
        Pinned
      </Toggle>
      <Toggle size='l' icon={Pin} defaultPressed>
        Pinned
      </Toggle>
      <Toggle size='xl' icon={Pin} defaultPressed>
        Pinned
      </Toggle>
    </>
  );
}
