import { BentoGrid } from '@webf/sprinkles';

/** Seafoam, all photos: every badge and check mark shares the grid's `variant`. */
export default function Example() {
  return (
    <BentoGrid
      variant='seafoam'
      label='Weekend escapes'
      items={[
        {
          src: '/images/cc/lake-silhouette.jpg',
          alt: 'A hiker silhouetted beside a still mountain lake under a bright sun',
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
            text: 'Mathias Herheim · CC0',
            href: 'https://commons.wikimedia.org/wiki/File:Hiking_along_the_sea_(Unsplash).jpg',
          },
        },
        {
          src: '/images/cc/cool-forest-lake.jpg',
          alt: 'A forest lake edged with tall pines and reeds under a blue sky with scattered clouds',
          badge: 'Quiet',
          title: 'Clear skies, coffee, nobody else',
          description: 'Mornings you will want to bottle.',
          credit: {
            text: 'mirobo · CC0 · colour-graded',
            href: 'https://commons.wikimedia.org/wiki/File:View_of_lake_in_forest.jpg',
          },
        },
        {
          src: '/images/cc/cool-mountain-lake.jpg',
          alt: 'A calm blue lake lined with autumn-coloured trees under a clear sky',
          badge: '120 pitches',
          title: 'Open sky',
          credit: {
            text: 'AS Photography · CC BY 4.0 · colour-graded',
            href: 'https://commons.wikimedia.org/wiki/File:Mountain_lake_and_a_clear_blue_sky_(54844909972).jpg',
          },
        },
        {
          src: '/images/cc/modern-home-cool.jpg',
          alt: 'White single-storey cabins beside the water, reflected in its surface',
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
