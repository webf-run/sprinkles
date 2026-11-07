import { TestimonialCard } from '@webf/sprinkles';

export default function Example() {
  return (
    <div class='@container w-full'>
      <div class='grid gap-4 @2xl:grid-cols-3'>
        <TestimonialCard
          fillStyle='outline'
          quote='Clear, friendly and always on time.'
          name='Reo Tanaka'
          role='Adult beginner'
        />
        <TestimonialCard
          fillStyle='subtle'
          quote='Clear, friendly and always on time.'
          name='Reo Tanaka'
          role='Adult beginner'
        />
        <TestimonialCard
          fillStyle='bold'
          quote='Clear, friendly and always on time.'
          name='Reo Tanaka'
          role='Adult beginner'
        />
      </div>
    </div>
  );
}
