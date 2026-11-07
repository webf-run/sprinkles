import { FooterColumns, Instagram } from '@webf/sprinkles';

export default function Example() {
  return (
    <FooterColumns
      surface='inverse'
      logoText='Studio Nine'
      description='Dance classes for all ages, from first steps to stage.'
      columns={[
        {
          title: 'Classes',
          links: [
            { label: 'Ballet', href: '#ballet' },
            { label: 'Contemporary', href: '#contemporary' },
            { label: 'Hip hop', href: '#hip-hop' },
          ],
        },
        {
          title: 'Studio',
          links: [
            { label: 'Timetable', href: '#timetable' },
            { label: 'Pricing', href: '#pricing' },
            { label: 'Contact', href: '#contact' },
          ],
        },
      ]}
      socialLinks={[
        { label: 'Instagram', href: '#instagram', icon: Instagram },
      ]}
      copyright='Studio Nine'
    />
  );
}
