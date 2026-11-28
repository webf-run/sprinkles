import { TimeField } from '@webf/sprinkles';

export default function Example() {
  return (
    <div class='grid w-full max-w-xs gap-4'>
      <TimeField
        label='Appointment time'
        description='Open 9:00 AM to 5:00 PM, every 15 minutes.'
        errorText='Choose a time between 9:00 AM and 5:00 PM.'
        min='09:00'
        max='17:00'
        minuteStep={15}
        defaultValue='08:30'
      />
      <TimeField
        label='Night shift starts'
        description='Between 10:00 PM and 6:00 AM.'
        errorText='Choose a time between 10:00 PM and 6:00 AM.'
        min='22:00'
        max='06:00'
        placeholderValue='22:00'
      />
    </div>
  );
}
