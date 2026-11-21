import { BentoGrid } from '@webf/sprinkles';

export default function Example() {
  return (
    <BentoGrid
      label='From our bakery'
      favorites
      items={[
        {
          src: '/images/cc/sourdough.jpg',
          alt: 'A round sourdough loaf with a spiral scoring pattern, cooling on a wire rack',
          badge: 'Fresh daily',
          title: 'Slow-fermented sourdough',
          description: 'Two days of patience in every loaf.',
          checklist: ['Baked at dawn', 'Free local delivery'],
          action: { label: 'Order a loaf', href: '#order' },
          credit: {
            text: 'Agelaia · CC BY 4.0',
            href: 'https://commons.wikimedia.org/wiki/File:Sourdough_Bread_Loaf.jpg',
          },
        },
        {
          src: '/images/cc/vegetables.jpg',
          position: 'top',
          alt: 'Sunflowers in buckets above a farmers market stall of tomatoes and fruit',
          badge: 'Saturdays',
          title: 'Market stall',
          credit: {
            text: 'Alabama Extension · CC0',
            href: 'https://commons.wikimedia.org/wiki/File:Vegetables_at_a_Farmers_Market.jpg',
          },
        },
        {
          variant: 'accent',
          title: 'Join the baking club',
          action: { label: 'Join', href: '#join' },
        },
      ]}
    />
  );
}
