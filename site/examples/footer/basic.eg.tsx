import { Facebook, Footer, Instagram, Linkedin } from '@webf-run/sprinkles';

export default function Example() {
  return (
    <Footer
      variant='default'
      size='md'
      effect='none'
      logoText='Astro UI'
      description='A collection of accessible, reusable, and customizable UI components for building modern web interfaces.'
      address='Astro UI Documentation'
      phone='+1 (000) 000-0000'
      email='hello@astroui.dev'
      ctaTitle='Need help with Astro UI?'
      ctaSubtitle='Explore the documentation or reach out to our team for support.'
      quickLinks={[
        [
          { label: 'Components', href: '#' },
          { label: 'Documentation', href: '#' },
          { label: 'Examples', href: '#' },
        ],
        [
          { label: 'Getting Started', href: '#' },
          { label: 'GitHub', href: '#' },
          { label: 'Contact', href: '#' },
        ],
      ]}
      socialLinks={[
        { label: 'Facebook', href: '#', icon: Facebook },
        { label: 'Instagram', href: '#', icon: Instagram },
        { label: 'LinkedIn', href: '#', icon: Linkedin },
      ]}
      copyright='Astro UI. All rights reserved.'
    />
  );
}
