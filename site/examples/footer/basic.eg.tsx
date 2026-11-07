import { Facebook, Footer, Instagram } from '@webf/sprinkles';

export default function Example() {
  return (
    <Footer
      logoText='Studio Nine'
      description='Dance classes for all ages, from first steps to stage, in the heart of Riverside.'
      address='12 Mill Lane, Riverside'
      phone='+1 (555) 010-2030'
      email='hello@studionine.example'
      quickLinks={[
        [
          { label: 'Classes', href: '#classes' },
          { label: 'Timetable', href: '#timetable' },
          { label: 'Teachers', href: '#teachers' },
        ],
        [
          { label: 'Pricing', href: '#pricing' },
          { label: 'Private lessons', href: '#private' },
          { label: 'Contact', href: '#contact' },
        ],
      ]}
      socialLinks={[
        { label: 'Instagram', href: '#instagram', icon: Instagram },
        { label: 'Facebook', href: '#facebook', icon: Facebook },
      ]}
      copyright='Studio Nine. All rights reserved.'
    />
  );
}
