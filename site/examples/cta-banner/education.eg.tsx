import { CtaBanner } from '@webf/sprinkles';

export default function Example() {
  return (
    <div class='w-full'>
      <CtaBanner
        text='Take the next step in your learning journey.'
        ctaLabel='Apply now'
        ctaHref='/apply'
      />
    </div>
  );
}
