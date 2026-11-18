import { Badge, HeroBanner } from '@webf/sprinkles';
import Compass from 'lucide-solid/icons/compass';

/** A full-photo travel hero with the copy on the right and an easy-to-scan starting price. */
export default function Example() {
  return (
    <HeroBanner
      layout='overlay'
      variant='neutral'
      contentSide='end'
      image='/images/cc/cool-mountain-lake.jpg'
      imageTone='cool'
      imagePosition='left'
      imageCredit={{
        text: 'Photo: AS Photography · CC BY 4.0',
        href: 'https://commons.wikimedia.org/wiki/File:Mountain_lake_and_a_clear_blue_sky_(54844909972).jpg',
      }}
      eyebrow='Curated escapes · Thoughtful journeys'
      title='Find a little more blue in your weekend.'
      description='From quiet lakeside stays to guided mountain trails, discover short breaks that make it easy to step away. Local guides handle the details, so you have more time for the landscape and the people you meet.'
      primaryAction={{ label: 'Explore getaways', href: '#destinations' }}
      secondaryAction={{ label: 'Plan your trip', href: '#how-it-works' }}
      note='Free cancellation on most getaways'
      mediaContent={
        <div class='w-full max-w-xs space-y-4 rounded-2xl border border-neutral-foreground/25 bg-neutral-foreground/10 p-6 text-neutral-foreground shadow-xl backdrop-blur-md'>
          <Badge
            staticColor='white'
            fillStyle='subtle'
            size='l'
            icon={Compass}
            class='border-neutral-foreground/30 bg-neutral-foreground/10 text-neutral-foreground'
          >
            Weekend escapes
          </Badge>
          <p class='m-0 text-sm font-medium tracking-wide text-neutral-foreground/85'>
            Getaways from
          </p>
          <p class='m-0 text-4xl font-bold tracking-tight text-neutral-foreground sm:text-5xl'>
            ₹2,000<span class='text-2xl'>*</span>
          </p>
          <p class='m-0 border-l border-neutral-foreground/50 pl-3 text-sm leading-relaxed text-neutral-foreground/85'>
            Quiet lakes, open trails and room to reset.
          </p>
          <p class='m-0 text-xs text-neutral-foreground/75'>
            *Per person · Select getaways
          </p>
        </div>
      }
    />
  );
}
