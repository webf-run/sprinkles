import { CtaBanner } from '@webf/sprinkles';

export default function Example() {
  return (
    <div class='w-full'>
      <CtaBanner
        class='[&_p]:text-xl [&_p]:font-semibold'
        text='Build a stronger digital experience.'
        ctaLabel='Get started'
        ctaHref='/start'
      />
    </div>
  );
}
