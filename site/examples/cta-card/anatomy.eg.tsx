import { CtaCard } from '@webf/sprinkles';

export default function Example() {
  return (
    <CtaCard
      eyebrow='Private lessons'
      title='Prepare for your first performance'
      description='One-to-one coaching with a teacher who knows the stage.'
      primaryLabel='Book a lesson'
      primaryHref='#book'
      secondaryLabel='Prices'
      secondaryHref='#prices'
    />
  );
}
