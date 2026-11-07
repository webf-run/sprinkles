import { CtaSection } from '@webf/sprinkles';

export default function Example() {
  return (
    <CtaSection
      surface='muted'
      eyebrow='Small groups'
      title='Plan your next journey with us'
      description='Tell us where you want to go; an adviser builds the trip around you.'
      primaryLabel='Start planning'
      primaryHref='#plan'
      secondaryLabel='Browse tours'
      secondaryHref='#tours'
    />
  );
}
