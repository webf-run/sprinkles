import { CtaSection } from '@webf-run/sprinkles';

export default function Example() {
  return (
    <div class='w-full'>
      <CtaSection class='!bg-none !bg-orange-950 [&_h2]:!font-serif' badge='CREATE' title='Bring your boldest ideas to life' description='A little inspiration can lead to something remarkable.' ctaLabel='Find inspiration' ctaHref='/inspiration' />
    </div>
  );
}
