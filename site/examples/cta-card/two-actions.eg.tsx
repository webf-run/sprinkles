import { CtaCard } from '@webf/sprinkles';

export default function Example() {
  return (
    <CtaCard
      eyebrow='Scholarships'
      title='Funding for your first year'
      description='Merit and need-based scholarships cover up to the full tuition fee.'
      primaryLabel='Check eligibility'
      primaryHref='#eligibility'
      secondaryLabel='Read the guide'
      secondaryHref='#guide'
    />
  );
}
