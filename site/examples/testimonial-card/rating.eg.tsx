import { TestimonialCard } from '@webf/sprinkles';

export default function Example() {
  return (
    <div class='@container w-full'>
      <div class='grid gap-4 @lg:grid-cols-2'>
        <TestimonialCard
          rating={5}
          avatar='https://i.pravatar.cc/96?img=32'
          quote='Booking took two minutes and the guide was wonderful.'
          name='Elena Popescu'
          role='Travelled to Lisbon'
        />
        <TestimonialCard
          rating={4}
          quote='A great week. The hotel on the second night was too far from the old town.'
          name='Tomás Silva'
          role='Travelled to Porto'
        />
      </div>
    </div>
  );
}
