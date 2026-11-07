import { Button } from '@webf/sprinkles';
import ArrowRight from 'lucide-solid/icons/arrow-right';
import Plus from 'lucide-solid/icons/plus';

export default function Example() {
  return (
    <Button size='l' icon={Plus} iconEnd={ArrowRight}>
      New page
    </Button>
  );
}
