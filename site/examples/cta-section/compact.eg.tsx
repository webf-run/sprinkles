import { CtaSection } from '@webf-run/sprinkles';

export default function Example() {
  return (
    <div class='w-full'>
      <CtaSection class='[&>div>div]:!gap-5 [&>div>div]:!py-8 [&_h2]:!text-3xl [&_p]:!text-base' badge='QUICK START' title='Start with one small step' description='Simple tools help your team move forward.' ctaLabel='Start now' ctaHref='/start' />
    </div>
  );
}
