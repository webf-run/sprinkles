import { Navbar } from '@webf/sprinkles';

const navItems = [
  { label: 'Product', href: '/product' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'Docs', href: '/docs' },
];

export default function Example() {
  return (
    <Navbar logoSrc='/favicon.svg' navItems={navItems} position='static' />
  );
}
