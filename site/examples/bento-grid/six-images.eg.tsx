import { BentoGrid } from '@webf/sprinkles';

/** Amber tone, all photos, mirrored with `layout='end'`. */
export default function Example() {
  return (
    <BentoGrid
      tone='notice'
      layout='end'
      favorites
      label='A day of good food'
      images={[
        {
          src: '/images/cc/restaurant-kitchen.jpg',
          alt: 'A chef preparing vegetables in an open, bright kitchen',
          badge: 'Open kitchen',
          title: 'Meet the kitchen',
          description: 'Watch your dinner come together.',
          checklist: [
            'Seasonal menu',
            'Allergy-friendly',
            'Kitchen tours on Sundays',
          ],
          action: { label: 'Reserve a table', href: '#reserve' },
          credit: {
            text: 'Shixart1985 · CC BY 2.0',
            href: 'https://commons.wikimedia.org/wiki/File:Man_prepares_vegetables_in_a_modern_kitchen.jpg',
          },
        },
        {
          src: '/images/cc/outdoors-lake-wide.jpg',
          alt: 'A meadow beside a calm lake',
          badge: 'New this week',
          title: 'Picnic hampers by the lake',
          description: 'Order by noon and collect on your way.',
          action: { label: 'Order a hamper', href: '#hamper' },
        },
        {
          src: '/images/cc/sourdough.jpg',
          alt: 'A scored sourdough loaf on a cooling rack',
          badge: 'Daily',
          title: 'Bread',
          credit: {
            text: 'Agelaia · CC BY 4.0',
            href: 'https://commons.wikimedia.org/wiki/File:Sourdough_Bread_Loaf.jpg',
          },
        },
        {
          src: '/images/cc/vegetables.jpg',
          position: 'top',
          alt: 'Sunflowers and ripe tomatoes at a farmers market',
          badge: 'Local',
          title: 'From the farm',
          description: 'Picked this morning, a few miles away.',
        },
        {
          src: '/images/cc/cool-restaurant-special.jpg',
          alt: 'A vegetable salad bowl on a wooden board',
          badge: 'Vegan',
          title: 'Bowls',
          credit: {
            text: 'Monstruo Estudio · CC0',
            href: 'https://commons.wikimedia.org/wiki/File:Vegetable_Salad_(Unsplash).jpg',
          },
        },
        {
          src: '/images/cc/forest-lake.jpg',
          alt: 'A forest lake under a blue sky',
          badge: 'Weekends',
          title: 'Foraging walks',
          description: 'Learn what is safe to pick, then cook it.',
          action: { label: 'Join a walk', href: '#walk' },
        },
      ]}
    />
  );
}
