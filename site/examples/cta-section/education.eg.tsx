import { CtaSection } from '@webf/sprinkles';

export default function Example() {
  return (
    <div class='w-full'>
      <CtaSection
        class='[&_h2]:!font-serif'
        badge='YOUR FUTURE'
        title='Learning opens new doors'
        description='Find a program that matches your interests and ambitions.'
        ctaLabel='Explore programs'
        ctaHref='/programs'
      />
    </div>
  );
}
