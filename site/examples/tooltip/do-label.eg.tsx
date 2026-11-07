import { Button, Tooltip } from '@webf/sprinkles';
import Copy from 'lucide-solid/icons/copy';

export default function Example() {
  return (
    <Tooltip
      content='Duplicate page'
      trigger={(props) => (
        <Button
          {...props}
          variant='secondary'
          fillStyle='outline'
          icon={Copy}
          aria-label='Duplicate page'
        />
      )}
    />
  );
}
