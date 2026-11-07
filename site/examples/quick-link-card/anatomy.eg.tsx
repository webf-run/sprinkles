import { QuickLinkCard } from '@webf/sprinkles';

export default function Example() {
  return (
    <QuickLinkCard
      class='max-w-xs'
      step='1'
      title='Choose a programme'
      description='Compare courses, entry requirements and fees.'
      href='#programmes'
    />
  );
}
