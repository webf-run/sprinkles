import { Badge } from '@webf/sprinkles';

export default function Example() {
  return (
    <div class='grid w-full gap-4 sm:grid-cols-2'>
      <div class='flex justify-center rounded-2xl bg-surface p-6'>
        <Badge size='l' variant='neutral' fillStyle='subtle' class='uppercase'>
          Accreditations
        </Badge>
      </div>
      <div class='flex justify-center rounded-2xl bg-surface-tint p-6'>
        <Badge
          size='l'
          variant='neutral'
          fillStyle='subtle'
          class='bg-surface text-foreground-muted uppercase'
        >
          Our programs
        </Badge>
      </div>
    </div>
  );
}
