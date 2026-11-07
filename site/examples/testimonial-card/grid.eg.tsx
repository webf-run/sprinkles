import { TestimonialCard } from '@webf/sprinkles';

export default function Example() {
  return (
    <div class='@container w-full'>
      <div class='grid gap-4 @lg:grid-cols-2 @3xl:grid-cols-3'>
        <TestimonialCard
          fillStyle='subtle'
          quote='The open day answered every question we had about the course.'
          name='Isabella Rossi'
          role='First-year student'
        />
        <TestimonialCard
          fillStyle='subtle'
          quote='Lecturers who actually reply to email.'
          name='Kenji Sato'
          role='Engineering, 2026'
        />
        <TestimonialCard
          fillStyle='subtle'
          quote='The careers office found me my first internship in the second year.'
          name='Hannah Wright'
          role='Graduate, 2025'
        />
      </div>
    </div>
  );
}
