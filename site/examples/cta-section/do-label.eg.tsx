import { Button } from '@webf/sprinkles';
import ArrowRight from 'lucide-solid/icons/arrow-right';

export default function Example() {
  return (
    <Button size='xl' iconEnd={ArrowRight}>
      Book a free class
    </Button>
  );
}
