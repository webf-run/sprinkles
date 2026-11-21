import { BentoGrid } from '@webf/sprinkles';

/** Amber (`notice`), all photos, with the lead tile on the end side. */
export default function Example() {
  return (
    <BentoGrid
      variant='notice'
      leadSide='end'
      favorites
      label='A day of good food'
      items={[
        {
          src: '/images/cc/restaurant.jpg',
          alt: 'A table laid with colourful salads and shared plates in a bright dining room',
          badge: 'Open daily',
          title: 'Sit down to supper',
          description: 'Seasonal plates, made to share.',
          checklist: ['Seasonal menu', 'Allergy-friendly', 'Tables for groups'],
          action: { label: 'Reserve a table', href: '#reserve' },
          credit: {
            text: 'Pexels · Pexels License',
            href: 'https://www.pexels.com/photo/foods-served-on-the-table-8585881/',
          },
        },
        {
          src: '/images/cc/cool-forest-lake.jpg',
          alt: 'A grassy lakeshore with tall pines under a blue sky with scattered clouds',
          badge: 'New this week',
          title: 'Picnic hampers by the lake',
          description: 'Order by noon and collect on your way.',
          action: { label: 'Order a hamper', href: '#hamper' },
          credit: {
            text: 'mirobo · CC0 · colour-graded',
            href: 'https://commons.wikimedia.org/wiki/File:View_of_lake_in_forest.jpg',
          },
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
          credit: {
            text: 'Alabama Extension · CC0',
            href: 'https://commons.wikimedia.org/wiki/File:Vegetables_at_a_Farmers_Market.jpg',
          },
        },
        {
          src: '/images/cc/event-audience.jpg',
          alt: 'Silhouettes of a crowd with their hands raised toward bright stage lights',
          badge: 'Fridays',
          title: 'Music with supper',
          credit: {
            text: 'Chad Kirchoff · CC0',
            href: 'https://commons.wikimedia.org/wiki/File:Houston_audience_lifting_up_hands_(Unsplash).jpg',
          },
        },
        {
          src: '/images/cc/dolomites-hiker.jpg',
          alt: 'A hiker standing on a grassy ridge, looking out at jagged mountain peaks',
          badge: 'Weekends',
          title: 'Foraging walks',
          description: 'Learn what is safe to pick, then cook it.',
          action: { label: 'Join a walk', href: '#walk' },
          credit: {
            text: 'Joshua Earle · CC0',
            href: 'https://commons.wikimedia.org/wiki/File:Hiking_in_the_Dolomites_(Unsplash).jpg',
          },
        },
      ]}
    />
  );
}
