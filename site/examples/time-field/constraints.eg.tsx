import { TimeField } from '@webf/sprinkles';

export default function Example() {
  return (
    <div class='grid w-full max-w-sm gap-4'>
      <TimeField
        label='Appointment time'
        min='09:00'
        max='17:00'
        description='Choose a time between 9:00 AM and 5:00 PM.'
        defaultValue='08:30'
        errorText='The selected time is outside the allowed range.'
      />
      <TimeField
        label='15-minute increments'
        minuteStep={15}
        placeholderValue='09:00'
        description='When empty, stepping starts from 9:00 AM.'
      />
    </div>
  );
}
