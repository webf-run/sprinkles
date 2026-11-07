import { TestimonialCard } from '@webf/sprinkles';

export default function Example() {
  return (
    <div class='@container w-full'>
      <div class='grid items-start gap-4 @3xl:grid-cols-3'>
        <TestimonialCard
          size='s'
          quote='Compact, for dense grids.'
          name='Liam Brooks'
          role='Student'
        />
        <TestimonialCard
          size='m'
          quote='The default, for most grids of quotes.'
          name='Noor Haddad'
          role='Parent'
        />
        <TestimonialCard
          size='l'
          quote='Large, for one quote that carries a section.'
          name='Marcus Feld'
          role='Graduate, 2024'
        />
      </div>
    </div>
  );
}
