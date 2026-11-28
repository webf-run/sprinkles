import { TimeField } from '@webf/sprinkles';

export default function Example() {
  return (
    <TimeField
      class='max-w-xs'
      label='Pick-up time'
      description='Pick-ups run from 9:00 AM to 5:00 PM.'
      min='09:00'
      max='17:00'
    />
  );
}
