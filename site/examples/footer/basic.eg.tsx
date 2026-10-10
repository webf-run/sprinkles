import { Facebook, Footer, Instagram, Linkedin } from '@webf/sprinkles';

export default function Example() {
  return (
    <Footer
      variant='default'
      size='md'
      effect='none'
      logoText='Sprinkles'
      description='A collection of accessible, reusable, and customizable UI components for building modern web interfaces.'
      address='Sprinkles Documentation'
      phone='+1 (000) 000-0000'
      email='hello@astroui.dev'
      ctaTitle='Need help with Sprinkles?'
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
      copyright='Sprinkles. All rights reserved.'
    />
  );
}
