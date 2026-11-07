import { Badge } from '@webf/sprinkles';
import CircleCheck from 'lucide-solid/icons/circle-check';

export default function Example() {
  return (
    <Badge variant='positive' size='l' icon={CircleCheck}>
      Published
    </Badge>
  );
}
