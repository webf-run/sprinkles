import { Facebook, FooterColumns, Instagram, Linkedin } from '@webf/sprinkles';

export default function Example() {
  return (
    <FooterColumns
      logoText='Northfield College'
      description='A public college of arts, science and engineering, founded in 1962.'
      columns={[
        {
          title: 'Study',
          links: [
            { label: 'Undergraduate', href: '#undergraduate' },
            { label: 'Postgraduate', href: '#postgraduate' },
            { label: 'Short courses', href: '#short-courses' },
          ],
        },
        {
          title: 'Admissions',
          links: [
            { label: 'How to apply', href: '#apply' },
            { label: 'Fees and funding', href: '#fees' },
            { label: 'Open days', href: '#open-days' },
          ],
        },
        {
          title: 'College',
          links: [
            { label: 'About us', href: '#about' },
            { label: 'News', href: '#news' },
            { label: 'Careers', href: '#careers' },
          ],
        },
        {
          title: 'Visit',
          links: [
            { label: '1 College Road' },
            { label: 'Northfield NF1 2CR' },
            { label: 'Directions', href: '#directions' },
          ],
        },
      ]}
      socialLinks={[
        { label: 'Instagram', href: '#instagram', icon: Instagram },
        { label: 'Facebook', href: '#facebook', icon: Facebook },
        { label: 'LinkedIn', href: '#linkedin', icon: Linkedin },
      ]}
      copyright='Northfield College'
    />
  );
}
