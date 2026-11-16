import { HeroBanner } from '@webf/sprinkles';

/** A travel company: a charcoal band that lets the photo glow, with white buttons. */
export default function Example() {
  return (
    <HeroBanner
      layout='split'
      variant='neutral'
      eyebrow='Small-group journeys · Guided locally'
      image='/images/banners/trail.webp'
      title='Find the trail that finds you'
      description='Follow high-country trails with local guides who know the weather, wildlife and quiet routes beyond the crowded viewpoints. We plan each day around the group and the season, arrange the permits and shared gear, and leave room for unhurried stops along the way. Choose a short escape or a multi-day trek.'
      primaryAction={{ label: 'Plan my trip', href: '#plan' }}
      secondaryAction={{ label: 'See itineraries', href: '#trips' }}
    />
  );
}
