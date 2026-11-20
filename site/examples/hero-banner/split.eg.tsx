import { HeroBanner } from '@webf/sprinkles';

/** A split hero: copy on a dark band, the photo in its own column. */
export default function Example() {
  return (
    <HeroBanner
      layout='split'
      surface='inverse'
      image='/images/cc/dolomites-hiker.jpg'
      eyebrow='Summit Weekends · Small groups'
      title='Reach the view, and bring a friend.'
      description='Two-day guided hikes in the mountains, with a hut stay, a packed lunch and a guide who knows the way. Pick a route that suits your pace and leave the planning to us.'
      primaryAction={{ label: 'Choose a route', href: '#routes' }}
      secondaryAction={{ label: 'See what is included', href: '#included' }}
      note='Groups of up to eight · Gear list sent after booking'
    />
  );
}
