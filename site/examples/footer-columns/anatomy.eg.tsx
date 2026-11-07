import { FooterColumns, Instagram } from '@webf/sprinkles';

export default function Example() {
  return (
    <FooterColumns
      logoText='Wayfarer'
      description='Small-group tours, planned by people who have been there.'
      columns={[
        {
          title: 'Travel',
          links: [
            { label: 'Destinations', href: '#destinations' },
            { label: 'Tours', href: '#tours' },
          ],
        },
        {
          title: 'Visit',
          links: [{ label: '4 Harbour Row' }, { label: 'Bristol BS1 4RW' }],
        },
      ]}
      socialLinks={[
        { label: 'Instagram', href: '#instagram', icon: Instagram },
      ]}
      copyright='Wayfarer Travel Ltd.'
    />
  );
}
