import { TestimonialCard } from '@webf/sprinkles';

export default function Example() {
  return (
    <TestimonialCard
      class='max-w-sm'
      rating={5}
      quote='My daughter went from shy to the front row in one term.'
      name='Amara Chen'
      role='Parent of a Grade 4 student'
    />
  );
}
