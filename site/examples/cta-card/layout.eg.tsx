import { CtaCard } from '@webf/sprinkles';

export default function Example() {
  return (
    <div class='@container w-full'>
      <div class='grid gap-6 @2xl:grid-cols-2'>
        <CtaCard
          eyebrow='Students'
          title='Join a class'
          description='Weekly classes for children, teens and adults.'
          primaryLabel='See the timetable'
          primaryHref='#timetable'
        />
        <CtaCard
          eyebrow='Teachers'
          title='Teach with us'
          description='We are looking for ballet and hip hop teachers for spring.'
          primaryLabel='See openings'
          primaryHref='#openings'
        />
      </div>
    </div>
  );
}
