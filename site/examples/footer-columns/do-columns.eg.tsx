import { FooterColumns } from '@webf/sprinkles';

export default function Example() {
  return (
    <FooterColumns
      logoText='Studio Nine'
      columns={[
        {
          title: 'Classes',
          links: [
            { label: 'Ballet', href: '#ballet' },
            { label: 'Hip hop', href: '#hip-hop' },
          ],
        },
        {
          title: 'Studio',
          links: [
            { label: 'Timetable', href: '#timetable' },
            { label: 'Contact', href: '#contact' },
          ],
        },
      ]}
      copyright='Studio Nine'
    />
  );
}
