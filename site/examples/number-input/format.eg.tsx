import { NumberInput } from '@webf/sprinkles';

export default function Example() {
  return (
    <div class='grid w-full max-w-xs gap-4'>
      <NumberInput
        label='Ticket price'
        defaultValue={25}
        min={0}
        step={0.5}
        formatOptions={{ style: 'currency', currency: 'EUR' }}
      />
      <NumberInput
        label='Early-bird discount'
        defaultValue={0.15}
        min={0}
        max={1}
        step={0.05}
        formatOptions={{ style: 'percent' }}
      />
    </div>
  );
}
