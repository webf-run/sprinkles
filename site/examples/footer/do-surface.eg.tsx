import { Footer, Instagram } from '@webf/sprinkles';

export default function Example() {
  return (
    <Footer
      surface='inverse'
      logoText='Studio Nine'
      socialLinks={[
        { label: 'Instagram', href: '#instagram', icon: Instagram },
      ]}
      copyright='Studio Nine'
    />
  );
}
