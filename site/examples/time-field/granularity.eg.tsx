import { TimeField } from '@webf/sprinkles';

export default function Example() {
  return (
    <div class='grid w-full max-w-sm gap-4'>
      <TimeField label='Hour only' granularity='hour' defaultValue='09:00' />
      <TimeField label='Hours and minutes' defaultValue='09:30' />
      <TimeField label='Hours, minutes and seconds' granularity='second' defaultValue='09:30:15' />
    </div>
  );
}
