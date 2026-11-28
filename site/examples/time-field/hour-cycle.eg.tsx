import { TimeField } from '@webf/sprinkles';

export default function Example() {
  return (
    <div class='grid w-full max-w-xs gap-4'>
      <TimeField label='12-hour clock' hourCycle={12} defaultValue='14:30' />
      <TimeField label='24-hour clock' hourCycle={24} defaultValue='14:30' />
      <TimeField label='British English' locale='en-GB' defaultValue='14:30' />
      <TimeField label='Korean' locale='ko-KR' defaultValue='14:30' />
    </div>
  );
}
