import { Button } from '@webf/sprinkles';
import Plus from 'lucide-solid/icons/plus';

export default function Example() {
  return (
    <>
      <Button size='s' icon={Plus}>
        Small
      </Button>
      <Button size='m' icon={Plus}>
        Medium
      </Button>
      <Button size='l' icon={Plus}>
        Large
      </Button>
      <Button size='xl' icon={Plus}>
        Extra large
      </Button>
    </>
  );
}
