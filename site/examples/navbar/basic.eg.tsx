import { Navbar } from '@webf-run/sprinkles';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Courses', href: '/courses' },
  { label: 'Contact', href: '/contact' },
];

export default function Example() {
  return <Navbar logoText='Astro UI' navItems={navItems} position='static' />;
}
