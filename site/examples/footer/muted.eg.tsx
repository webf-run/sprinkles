import { Footer, Linkedin } from '@webf/sprinkles';

export default function Example() {
  return (
    <Footer
      surface='muted'
      logoText='Wayfarer'
      description='Small-group tours, planned by people who have been there.'
      quickLinks={[
        [
          { label: 'Destinations', href: '#destinations' },
          { label: 'Tours', href: '#tours' },
        ],
        [
          { label: 'Travel insurance', href: '#insurance' },
          { label: 'Booking terms', href: '#terms' },
        ],
      ]}
      socialLinks={[{ label: 'LinkedIn', href: '#linkedin', icon: Linkedin }]}
      copyright='Wayfarer Travel Ltd.'
    />
  );
}
