import { Toggle } from '@webf/sprinkles';
import Pin from 'lucide-solid/icons/pin';

export default function Example() {
  return (
    <Toggle icon={Pin} defaultPressed>
      Unpin
    </Toggle>
  );
}
