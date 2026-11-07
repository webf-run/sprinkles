import { QuickLinkCard } from '@webf/sprinkles';

export default function Example() {
  return (
    <div class='@container w-full'>
      <div class='grid gap-4 @2xl:grid-cols-3'>
        <QuickLinkCard
          step='1'
          title='Choose a programme'
          description='Compare courses, entry requirements and fees.'
          href='#programmes'
        />
        <QuickLinkCard
          step='2'
          title='Apply online'
          description='One form, about twenty minutes. Save it and come back.'
          href='#apply'
        />
        <QuickLinkCard
          step='3'
          title='Book a visit'
          description='Meet your future teachers and see the campus.'
          href='#visit'
        />
      </div>
    </div>
  );
}
