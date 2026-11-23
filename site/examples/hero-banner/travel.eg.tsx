import { Badge, HeroBanner } from '@webf/sprinkles';
import Compass from 'lucide-solid/icons/compass';

/** A travel hero: copy on the right, a starting-price card over the lake. */
export default function Example() {
  return (
    <HeroBanner
      layout='overlay'
      surface='inverse'
      contentSide='end'
      image='/images/cc/lake-silhouette.jpg'
      imagePosition='left'
      eyebrow='Curated escapes · Thoughtful journeys'
      title='Find a little more blue in your weekend.'
      description='From quiet lakeside stays to guided mountain trails, discover short breaks that make it easy to step away. Local guides handle the details, so you have more time for the landscape and the people you meet.'
      primaryAction={{ label: 'Explore getaways', href: '#destinations' }}
      secondaryAction={{ label: 'Plan your trip', href: '#how-it-works' }}
      note='Free cancellation on most getaways'
      mediaContent={
        <div class='box-border flex w-full max-w-xs flex-col items-start gap-4 rounded-2xl border border-border-inverse bg-surface-inverse/90 p-6 text-foreground-inverse shadow-elevated'>
          <Badge staticColor='white' fillStyle='subtle' size='l' icon={Compass}>
            Weekend escapes
          </Badge>
          <p class='m-0 text-sm font-medium text-foreground-inverse'>
            Getaways from
          </p>
          <p class='m-0 text-4xl font-bold text-foreground-inverse @xl:text-5xl'>
            ₹2,000<span class='text-2xl'>*</span>
          </p>
          <p class='m-0 border-l border-border-inverse pl-3 text-sm text-foreground-inverse'>
            Quiet lakes, open trails and room to reset.
          </p>
          <p class='m-0 text-xs text-foreground-inverse'>
            *Per person · Select getaways
          </p>
        </div>
      }
    />
  );
}
