import { CtaSection } from '@webf/sprinkles';

export default function Example() {
  return (
    <div class='w-full'>
      <CtaSection
        badge='LET’S BUILD'
        title='Make your next move count'
        description='Everything you need to turn a promising idea into a real result.'
        ctaLabel='Get started'
        ctaHref='/start'
      />
    </div>
  );
}
