import { HeroBanner } from '@webf/sprinkles';
import CreditCard from 'lucide-solid/icons/credit-card';
import FileCheck from 'lucide-solid/icons/file-check';
import HeartHandshake from 'lucide-solid/icons/heart-handshake';
import { For } from 'solid-js';

const services = [
  {
    icon: CreditCard,
    title: 'Payments & accounts',
    text: 'Pay bills, check balances and manage everyday transactions.',
    href: '#payments',
  },
  {
    icon: FileCheck,
    title: 'Applications & permits',
    text: 'Apply online and follow every request from start to finish.',
    href: '#applications',
  },
  {
    icon: HeartHandshake,
    title: 'Community support',
    text: 'Find local programmes, advice and a real person to ask.',
    href: '#community',
  },
];

/** A full-width finance hero with service cards over the photo. */
export default function Example() {
  return (
    <HeroBanner
      fullWidth
      class='w-full'
      layout='overlay'
      surface='inverse'
      image='/images/cc/cool-finance.jpg'
      imagePosition='center'
      imageCredit={{
        text: 'Photo: Brian Papantonio · CC BY 2.0 · colour-graded',
        href: 'https://commons.wikimedia.org/wiki/File:Denver_Skyline_at_Blue_Hour.jpg',
      }}
      eyebrow='Finance & public services · One secure place'
      title='Everyday services, made simpler.'
      description='Take care of payments, applications and local support from one clear starting point. Find the right service, see what happens next and pick up where you left off, on any device.'
      primaryAction={{ label: 'Access your account', href: '#account' }}
      secondaryAction={{ label: 'Browse all services', href: '#services' }}
      note='Secure sign-in · Available 24/7'
      bottomContent={
        <nav
          id='services'
          aria-label='Popular services'
          class='grid gap-4 @3xl:grid-cols-3'
        >
          <For each={services}>
            {(service) => (
              <a
                href={service.href}
                class='group flex items-start gap-4 rounded-2xl border border-border-inverse bg-surface-inverse/90 p-5 text-foreground-inverse no-underline shadow-elevated motion-safe:transition-colors hover:bg-surface-inverse'
              >
                <span class='grid size-11 shrink-0 place-items-center rounded-xl bg-foreground-inverse/20'>
                  <service.icon class='size-5' aria-hidden='true' />
                </span>
                <span class='block'>
                  <span class='block text-lg font-semibold'>
                    {service.title}
                  </span>
                  <span class='mt-1 block text-sm text-foreground-inverse'>
                    {service.text}
                  </span>
                </span>
              </a>
            )}
          </For>
        </nav>
      }
    />
  );
}
