import { TimeField } from '@webf/sprinkles';

export default function Example() {
  return (
    <div class='grid w-full max-w-sm gap-4'>
      <TimeField label='Default appearance' defaultValue='09:30' />
      <TimeField label='Quiet appearance' quiet defaultValue='09:30' />
      <TimeField
        label='Subtle fill with icon'
        fillStyle='subtle'
        icon
        tone='informative'
        defaultValue='09:30'
      />
    </div>
  );
}
