import { CtaBanner } from '@webf-run/sprinkles';

export default function Example() {
  return (
    <div class='w-full'>
      <CtaBanner class='!border-orange-300 !bg-orange-50 [&_p]:!text-orange-950' text='Make room for more creativity.' ctaLabel='See inspiration' ctaHref='/inspiration' />
    </div>
  );
}
