import { BentoGrid } from '@webf/sprinkles';

/** Green tone, all photos. Every badge, check mark and button shares the tone. */
export default function Example() {
  return (
    <BentoGrid
      tone='seafoam'
      label='Weekend escapes'
      images={[
        {
          src: '/images/cc/forest-lake.jpg',
          alt: 'A calm lake framed by pine forest under a bright blue sky',
          badge: 'Top pick',
          title: 'Lakeside camping',
          description: 'Wake up to still water and birdsong.',
          checklist: [
            'Pitches by the water',
            'Fire pits and firewood',
            'Kayaks to borrow',
          ],
          action: { label: 'Plan your stay', href: '#plan' },
          credit: {
            text: 'mirobo · CC0',
            href: 'https://commons.wikimedia.org/wiki/File:View_of_lake_in_forest.jpg',
          },
        },
        {
          src: '/images/cc/mountain-lake.jpg',
          alt: 'A mountain lake with a line of trees and a clear blue sky',
          badge: 'Quiet',
          title: 'Mist, coffee, nobody else',
          description: 'Mornings you will want to bottle.',
          credit: {
            text: 'AS Photography · CC BY 4.0',
            href: 'https://commons.wikimedia.org/wiki/File:Mountain_lake_and_a_clear_blue_sky_(54844909972).jpg',
          },
        },
        {
          src: '/images/cc/outdoors-lake-wide.jpg',
          alt: 'A wide meadow meeting a lake under scattered clouds',
          badge: '120 pitches',
          title: 'Open sky',
          credit: {
            text: 'mirobo · CC0 · extended',
            href: 'https://commons.wikimedia.org/wiki/File:View_of_lake_in_forest.jpg',
          },
        },
        {
          src: '/images/cc/modern-home-cool.jpg',
          alt: 'White single-storey cabins beside the water',
          badge: '12 cabins',
          title: 'Stay in a cabin',
          credit: {
            text: 'Frans van Heerden · Pexels',
            href: 'https://www.pexels.com/photo/white-single-story-houses-beside-body-of-water-1438832/',
          },
        },
      ]}
    />
  );
}
