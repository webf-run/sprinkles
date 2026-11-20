import { TimeField } from '@webf/sprinkles';

export default function Example() {
  return (
    <div class='grid w-full max-w-sm gap-4'>
      <TimeField
        label='12-hour format'
        hourCycle={12}
        defaultValue='14:30'
      />
      <TimeField
        label='24-hour format'
        hourCycle={24}
        defaultValue='14:30'
      />
      <TimeField
        label='British English locale'
        locale='en-GB'
        defaultValue='14:30'
      />
    </div>
  );
}
