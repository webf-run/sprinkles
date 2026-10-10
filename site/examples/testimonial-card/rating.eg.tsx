import { TestimonialCard } from '@webf/sprinkles';

export default function Example() {
  return (
    <div class='grid gap-4 sm:grid-cols-2'>
      <TestimonialCard
        variant='accent'
        rating={5}
        avatar='https://i.pravatar.cc/100?img=32'
        quote='Five stars end to end — support, docs, and the components themselves.'
        name='Elena Popescu'
        role='Verified Customer'
      />
      <TestimonialCard
        rating={4}
        avatar='https://i.pravatar.cc/100?img=15'
        quote='Solid product overall, a couple of edge cases needed workarounds.'
        name='Tomás Silva'
        role='Verified Customer'
      />
    </div>
  );
}
