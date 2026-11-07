import { Footer, Instagram } from '@webf/sprinkles';

export default function Example() {
  return (
    <Footer
      class='bg-surface-inverse'
      logoText='Studio Nine'
      socialLinks={[
        { label: 'Instagram', href: '#instagram', icon: Instagram },
      ]}
      copyright='Studio Nine'
    />
  );
}
