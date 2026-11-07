import { TestimonialCard } from '@webf/sprinkles';

export default function Example() {
  return (
    <div class='@container w-full'>
      <div class='grid gap-4 @lg:grid-cols-2 @5xl:grid-cols-4'>
        <TestimonialCard
          variant='accent'
          quote='The teachers know every student by name.'
          name='Priya Nair'
          role='Parent'
        />
        <TestimonialCard
          variant='positive'
          quote='I passed my grade exam on the first try.'
          name='Leo Martin'
          role='Student'
        />
        <TestimonialCard
          variant='highlight'
          quote='The best-run tour we have ever been on.'
          name='Sofia Marín'
          role='Travelled to Peru'
        />
        <TestimonialCard
          variant='seafoam'
          quote='Small classes, and real attention.'
          name='Grace Okafor'
          role='Graduate, 2025'
        />
      </div>
    </div>
  );
}
