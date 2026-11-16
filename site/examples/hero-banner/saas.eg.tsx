import { HeroBanner } from '@webf/sprinkles';

/** A software product: a deep indigo band, centred text and a white call to action. */
export default function Example() {
  return (
    <HeroBanner
      variant='indigo'
      align='center'
      eyebrow='Work, in one place'
      image='/images/banners/product.webp'
      title='Run your whole team from one workspace'
      description='Give projects, conversations and shared files one clear home, so your team can spend less time switching between tools. Bring colleagues in with familiar workflows, see what is moving and what needs attention, then connect the services your team already uses when you are ready to grow.'
      primaryAction={{ label: 'Start for free', href: '#start' }}
      secondaryAction={{ label: 'Book a demo', href: '#demo' }}
    />
  );
}
