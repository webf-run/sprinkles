import { CtaSection } from '@webf/sprinkles';

export default function Example() {
  return (
    <CtaSection
      eyebrow='Autumn 2027'
      title='Applications are open'
      description='Apply by 15 January for programmes starting in September.'
      primaryLabel='Apply now'
      primaryHref='#apply'
      secondaryLabel='View programmes'
      secondaryHref='#programmes'
    />
  );
}
