import { Facebook, Footer, Instagram } from '@webf/sprinkles';

export default function Example() {
  return (
    <Footer
      ctaTitle='Questions about classes?'
      phone='+1 (555) 010-2030'
      email='hello@studionine.example'
      logoText='Studio Nine'
      description='Dance classes for all ages, from first steps to stage.'
      address='12 Mill Lane, Riverside'
      quickLinks={[
        [
          { label: 'Classes', href: '#classes' },
          { label: 'Timetable', href: '#timetable' },
        ],
      ]}
      socialLinks={[
        { label: 'Instagram', href: '#instagram', icon: Instagram },
        { label: 'Facebook', href: '#facebook', icon: Facebook },
      ]}
      copyright='Studio Nine'
    />
  );
}
