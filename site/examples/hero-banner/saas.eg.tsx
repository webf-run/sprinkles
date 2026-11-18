import { HeroBanner } from '@webf/sprinkles';

/** A centred technology hero: deep indigo band, cool photo wash and a reassuring note. */
export default function Example() {
  return (
    <HeroBanner
      variant='indigo'
      align='center'
      image='/images/cc/cool-workspace.jpg'
      imageTone='cool'
      imageCredit={{
        text: 'Photo: Shixart1985 · CC BY 2.0',
        href: 'https://commons.wikimedia.org/wiki/File:Modern_office_workspace_featuring_a_computer.jpg',
      }}
      eyebrow='New · Build with Sprinkles'
      title='Ship a polished interface in an afternoon.'
      description='Accessible, themeable components that look good from the first line of code. Drop them into your app, re-skin them with a few tokens and spend your time on the product, not the plumbing.'
      primaryAction={{ label: 'Start building', href: '#start' }}
      secondaryAction={{ label: 'Browse components', href: '#components' }}
      note='Free and open source · Works with Astro, SolidStart and Vite'
    />
  );
}
