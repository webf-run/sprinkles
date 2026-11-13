import { Badge } from '@webf/sprinkles';

export default function Example() {
  return (
    <div class='grid w-full gap-4 sm:grid-cols-2'>
      <div class='flex justify-center rounded-2xl bg-surface p-6'>
        <Badge size='l' labelTone='muted' class='uppercase'>
          Accreditations
        </Badge>
      </div>
      <div class='flex justify-center rounded-2xl bg-surface-tint p-6'>
        <Badge size='l' labelTone='surface' class='uppercase'>
          Our programs
        </Badge>
      </div>
    </div>
  );
}
