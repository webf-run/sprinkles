import { CtaSection } from '@webf/sprinkles';

export default function Example() {
  return (
    <CtaSection
      eyebrow='Open days'
      title='See the campus for yourself'
      description='Tour the labs and studios and meet the people who teach there.'
      primaryLabel='Book a visit'
      primaryHref='#visit'
      secondaryLabel='Dates'
      secondaryHref='#dates'
    />
  );
}
