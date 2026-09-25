import { Navbar } from '@webf-run/sprinkles';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Programs', href: '/programs', hasDropdown: true },
  { label: 'Admissions', href: '/admissions', hasDropdown: true },
  { label: 'Contact', href: '/contact' },
];

export default function Example() {
  return <Navbar logoText='Astro UI' navItems={navItems} position='static' />;
}
