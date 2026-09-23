import { Globe } from 'lucide-solid';

import { Facebook, Footer, Instagram, Linkedin } from '@webf/sprinkles';

export default function Example() {
  return (
    <div class="flex flex-col gap-8">
      {/* Default / Neutral */}
      <Footer
        variant='default'
        size='md'
        effect='none'
        logoText='Astro UI'
        headingVariant='foreground'
        subtitleVariant='muted'
        descriptionVariant='foreground'
        linkVariant='foreground'
        contactVariant='foreground'
        contactIconVariant='primary'
        description='A clean and minimal Footer for documentation, websites, and application pages.'
        address='Astro UI Documentation'
        phone='+1 (000) 000-0000'
        email='hello@astroui.dev'
        phoneVariant='secondary'
        emailVariant='primary'
        ctaTitle='Explore Astro UI.'
        ctaSubtitle='Discover reusable components and examples for your next project.'
        quickLinks={[
          [
            { label: 'Components', href: '#' },
            { label: 'Documentation', href: '#' },
            { label: 'Examples', href: '#' },
          ],
          [
            { label: 'Getting Started', href: '#' },
            { label: 'Guides', href: '#' },
            { label: 'Contact', href: '#' },
          ],
        ]}
        socialLinks={[
          {
            label: 'Website',
            href: '#',
            icon: Globe,
            iconVariant: 'foreground',
          },
          {
            label: 'Instagram',
            href: '#',
            icon: Instagram,
            iconVariant: 'foreground',
          },
          {
            label: 'Facebook',
            href: '#',
            icon: Facebook,
            iconVariant: 'foreground',
          },
        ]}
        copyright='Astro UI. All rights reserved.'
      />

      {/* Muted / Color Accent */}
      <Footer
        variant='muted'
        size='sm'
        effect='shadow'
        logoText='Creative UI'
        headingVariant='blue'
        subtitleVariant='muted'
        descriptionVariant='foreground'
        linkVariant='blue'
        contactVariant='foreground'
        contactIconVariant='success'
        description='A softer Footer style using blue and green accents for a friendly, modern interface.'
        address='Creative UI Studio'
        phone='+1 (000) 000-0000'
        email='hello@creativeui.dev'
        emailLabel='Email'
        phoneVariant='purple'
        emailVariant='primary'
        ctaTitle='Create something unique.'
        ctaSubtitle='Combine reusable components with your own visual style.'
        quickLinks={[
          [
            { label: 'Products', href: '#' },
            { label: 'Features', href: '#' },
            { label: 'Pricing', href: '#' },
          ],
          [
            { label: 'Resources', href: '#' },
            { label: 'Blog', href: '#' },
            { label: 'Contact', href: '#' },
          ],
        ]}
        socialLinks={[
          {
            label: 'Instagram',
            href: '#',
            icon: Instagram,
            iconVariant: 'pink',
          },
          {
            label: 'Facebook',
            href: '#',
            icon: Facebook,
            iconVariant: 'blue',
          },
          {
            label: 'LinkedIn',
            href: '#',
            icon: Linkedin,
            iconVariant: 'blue',
          },
        ]}
        copyright='Creative UI.'
      />

      {/*  green Color  */}
      <Footer
        variant='green'
        size='lg'
        effect='none'
        logoText='Studio'
        headingVariant='foreground'
        subtitleVariant='foreground'
        descriptionVariant='foreground'
        linkVariant='foreground'
        contactVariant='foreground'
        contactIconVariant='primary'
        copyrightVariant='foreground'
        description='A bold Footer using a green background and theme-based text colors to demonstrate a different brand style.'
        address='Design Studio'
        phone='+1 (000) 000-0000'
        email='hello@studio.dev'
        phoneVariant='secondary'
        emailVariant='primary'
        ctaTitle='Design without limits.'
        ctaSubtitle='Use custom color values when your design system needs more control.'
        quickLinks={[
          [
            { label: 'Work', href: '#' },
            { label: 'Services', href: '#' },
            { label: 'About', href: '#' },
          ],
          [
            { label: 'Insights', href: '#' },
            { label: 'Careers', href: '#' },
            { label: 'Contact', href: '#' },
          ],
        ]}
        socialLinks={[
          {
            label: 'Website',
            href: '#',
            icon: Globe,
            iconColor: '#2563EB',
          },
          {
            label: 'Instagram',
            href: '#',
            icon: Instagram,
            iconColor: '#DB2777',
          },
          {
            label: 'LinkedIn',
            href: '#',
            icon: Linkedin,
            iconColor: '#0284C7',
          },
        ]}
        copyright='Studio UI.'
      />
    </div>
  );
}
