import { BentoGrid } from '@webf/sprinkles';

/** The basic look: no tone, so badges and buttons are white and sit quietly on any photo. */
export default function Example() {
  return (
    <BentoGrid
      label='From our market table'
      favorites
      images={[
        {
          src: '/images/cc/sourdough.jpg',
          alt: 'A round sourdough loaf with a spiral scoring pattern, cooling on a wire rack',
          badge: 'Fresh daily',
          title: 'Slow-fermented sourdough',
          description: 'Two days of patience in every loaf.',
          checklist: [
            'Baked at dawn',
            'Organic stoneground flour',
            'Free local delivery',
          ],
          action: { label: 'Order a loaf', href: '#order' },
          credit: {
            text: 'Agelaia · CC BY 4.0',
            href: 'https://commons.wikimedia.org/wiki/File:Sourdough_Bread_Loaf.jpg',
          },
        },
        {
          src: '/images/cc/cool-restaurant-special.jpg',
          alt: 'A clay bowl of colourful vegetable salad on a wooden board',
          badge: 'Vegan',
          title: 'Garden bowls',
          description: 'Seasonal vegetables, ready in five minutes.',
          credit: {
            text: 'Monstruo Estudio · CC0',
            href: 'https://commons.wikimedia.org/wiki/File:Vegetable_Salad_(Unsplash).jpg',
          },
        },
        {
          src: '/images/cc/vegetables.jpg',
          position: 'top',
          alt: 'Sunflowers in buckets above a farmers market stall of tomatoes and fruit',
          badge: 'Saturdays',
          title: 'Flowers & fruit stall',
          description: 'Pick up sunflowers with your tomatoes.',
          credit: {
            text: 'Alabama Extension · CC0',
            href: 'https://commons.wikimedia.org/wiki/File:Vegetables_at_a_Farmers_Market.jpg',
          },
        },
      ]}
    />
  );
}
