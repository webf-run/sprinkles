import { CtaBanner } from '@webf-run/sprinkles';

export default function Example() {
  return (
    <div class='w-full'>
      <CtaBanner class='!p-4 [&_p]:text-sm' text='Need help choosing a plan?' ctaLabel='Talk to sales' ctaHref='/contact' />
    </div>
  );
}
