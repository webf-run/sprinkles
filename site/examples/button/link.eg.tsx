import { Button } from '@webf/sprinkles';
import ArrowRight from 'lucide-solid/icons/arrow-right';

export default function Example() {
  return (
    <Button href='#programs' variant='highlight' size='xl' iconEnd={ArrowRight}>
      Explore programs
    </Button>
  );
}
