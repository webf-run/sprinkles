import { Facebook, Footer, Instagram, Linkedin } from '@webf/sprinkles';

export default function Example() {
  return (
    <Footer
      surface='inverse'
      ctaTitle='Questions about admission?'
      ctaDescription='The admissions office replies within two working days.'
      phone='+1 (555) 010-4400'
      email='admissions@northfield.example'
      logoText='Northfield College'
      description='A public college of arts, science and engineering, founded in 1962.'
      address='1 College Road, Northfield'
      quickLinks={[
        [
          { label: 'Programmes', href: '#programmes' },
          { label: 'Admissions', href: '#admissions' },
          { label: 'Fees', href: '#fees' },
        ],
        [
          { label: 'Campus', href: '#campus' },
          { label: 'Library', href: '#library' },
          { label: 'Careers', href: '#careers' },
        ],
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
