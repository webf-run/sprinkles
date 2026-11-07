import { FooterColumns } from '@webf/sprinkles';

export default function Example() {
  return (
    <FooterColumns
      logoText='Studio Nine'
      columns={[
        {
          title: 'Links',
          links: [
            { label: 'Ballet', href: '#ballet' },
            { label: 'Contact', href: '#contact' },
            { label: 'Hip hop', href: '#hip-hop' },
            { label: 'Privacy', href: '#privacy' },
            { label: 'Timetable', href: '#timetable' },
          ],
        },
      ]}
      copyright='Studio Nine'
    />
  );
}
