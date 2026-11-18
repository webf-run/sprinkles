import { BentoGrid } from '@webf/sprinkles';
import Star from 'lucide-solid/icons/star';

/**
 * Photos, coloured sections and content together: a call-to-action card, a
 * card with a photo set into it, and a stat card, each in its own colour. The grid has no `tone`, so photo badges and buttons stay basic white.
 */
export default function Example() {
  return (
    <BentoGrid
      label='The baking club'
      images={[
        {
          src: '/images/cc/sourdough.jpg',
          alt: 'A scored sourdough loaf on a cooling rack',
          badge: 'Beginner friendly',
          title: 'Learn to bake sourdough',
          description: 'From starter to crust, in one relaxed morning.',
          checklist: [
            'All ingredients provided',
            'Take your loaf home',
            'Small groups of eight',
          ],
          action: { label: 'See dates', href: '#dates' },
          credit: {
            text: 'Agelaia · CC BY 4.0',
            href: 'https://commons.wikimedia.org/wiki/File:Sourdough_Bread_Loaf.jpg',
          },
        },
        {
          tone: 'informative',
          badge: 'Workshop',
          title: 'Join the Saturday baking club',
          description: 'Bake, taste and swap recipes with neighbours.',
          action: { label: 'Join the club', href: '#join' },
        },
        {
          src: '/images/cc/cool-restaurant-special.jpg',
          alt: 'A clay bowl of vegetable salad on a wooden board',
          title: 'Bowls',
          credit: {
            text: 'Monstruo Estudio · CC0',
            href: 'https://commons.wikimedia.org/wiki/File:Vegetable_Salad_(Unsplash).jpg',
          },
        },
        {
          tone: 'highlight',
          fillStyle: 'subtle',
          badge: 'Local',
          title: 'Fresh from the market',
          description: 'Sunflowers, tomatoes and fruit, picked this morning.',
          media: {
            src: '/images/cc/vegetables.jpg',
            alt: 'Sunflowers above a farmers market stall of tomatoes',
            position: 'top',
          },
          credit: {
            text: 'Alabama Extension · CC0',
            href: 'https://commons.wikimedia.org/wiki/File:Vegetables_at_a_Farmers_Market.jpg',
          },
        },
        {
          tone: 'seafoam',
          icon: Star,
          stat: '4.9',
          title: 'Average rating',
        },
        {
          src: '/images/cc/restaurant-kitchen.jpg',
          alt: 'A chef preparing vegetables in an open, bright kitchen',
          title: 'An open kitchen',
          description: 'Watch every bake from the counter.',
          action: { label: 'Visit us', href: '#visit' },
          credit: {
            text: 'Shixart1985 · CC BY 2.0',
            href: 'https://commons.wikimedia.org/wiki/File:Man_prepares_vegetables_in_a_modern_kitchen.jpg',
          },
        },
      ]}
    />
  );
}
