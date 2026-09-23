import { Navbar } from '@webf/sprinkles';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Components', href: '/components' },
  { label: 'Docs', href: '/docs' },
];

export default function Example() {
  return (
    <Navbar
      logoText='Astro UI'
      navItems={navItems}
      class='text-purple-700 hover:text-purple-900'
      position='static'
    />
  );
}
