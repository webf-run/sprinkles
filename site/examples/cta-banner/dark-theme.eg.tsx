import { CtaBanner } from '@webf-run/sprinkles';

export default function Example() {
  return (
    <div class='w-full'>
      <CtaBanner class='!border-slate-700 !bg-slate-950 [&_p]:!text-white' text='Your next big idea starts here.' ctaLabel='Explore' ctaHref='/explore' />
    </div>
  );
}
