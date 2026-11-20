import { HeroBanner } from '@webf/sprinkles';

/** A centred technology hero with a short note under the buttons. */
export default function Example() {
  return (
    <HeroBanner
      surface='accent'
      align='center'
      image='/images/cc/code-laptop.jpg'
      eyebrow='New · Build with Sprinkles'
      title='Ship a polished interface in an afternoon.'
      description='Accessible, themeable components that look good from the first line of code. Drop them into your app, re-skin them with a few tokens and spend your time on the product, not the plumbing.'
      primaryAction={{ label: 'Start building', href: '#start' }}
      secondaryAction={{ label: 'Browse components', href: '#components' }}
      note='Free and open source · Works with Astro, SolidStart and Vite'
    />
  );
}
