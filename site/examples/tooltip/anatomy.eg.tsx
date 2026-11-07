import { Button, Tooltip } from '@webf/sprinkles';
import Eye from 'lucide-solid/icons/eye';

export default function Example() {
  return (
    <Tooltip
      content='Preview'
      trigger={(props) => (
        <Button
          {...props}
          variant='secondary'
          fillStyle='outline'
          icon={Eye}
          aria-label='Preview'
        />
      )}
    />
  );
}
