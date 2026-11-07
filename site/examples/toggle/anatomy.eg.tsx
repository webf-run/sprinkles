import { Toggle } from '@webf/sprinkles';
import Pin from 'lucide-solid/icons/pin';

export default function Example() {
  return (
    <Toggle size='l' icon={Pin} defaultPressed>
      Pin to top
    </Toggle>
  );
}
