import { Navbar } from '@webf/sprinkles';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Programs', href: '/programs', hasDropdown: true },
  { label: 'Admissions', href: '/admissions', hasDropdown: true },
  { label: 'Contact', href: '/contact' },
];

export default function Example() {
  return <Navbar logoText='Sprinkles' navItems={navItems} position='static' />;
}
