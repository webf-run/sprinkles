import { StatCard } from '@webf/sprinkles';

export default function Example() {
  return (
    <div class='flex w-full flex-wrap items-start gap-4'>
      <StatCard size='s' value='A+' label='NAAC grade' />
      <StatCard size='m' value='A+' label='NAAC grade' />
      <StatCard
        size='l'
        value='A+'
        label='NAAC grade'
        variant='accent'
        fillStyle='subtle'
      />
    </div>
  );
}
