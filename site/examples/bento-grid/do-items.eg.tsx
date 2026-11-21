import { BentoGrid } from '@webf/sprinkles';

export default function Example() {
  return (
    <BentoGrid
      items={[
        {
          src: '/images/cc/sourdough.jpg',
          alt: 'A round sourdough loaf cooling on a wire rack',
          title: 'Sourdough',
          credit: { text: 'Agelaia · CC BY 4.0' },
        },
        {
          src: '/images/cc/vegetables.jpg',
          position: 'top',
          alt: 'Sunflowers above a farmers market stall of tomatoes',
          title: 'Market stall',
          credit: { text: 'Alabama Extension · CC0' },
        },
        { variant: 'seafoam', stat: '4.9', title: 'Rating' },
      ]}
    />
  );
}
