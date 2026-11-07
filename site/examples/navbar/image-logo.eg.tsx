import { Navbar } from '@webf/sprinkles';

// Any image URL works; this one is an inline SVG so the example stands alone.
const logoSrc =
  'data:image/svg+xml,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="168" height="40" viewBox="0 0 168 40">
      <rect width="40" height="40" rx="10" fill="#1d4ed8"/>
      <path d="M11 28V12l9 10 9-10v16" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      <text x="50" y="27" font-family="Georgia, serif" font-size="19" font-weight="700" fill="#1e3a8a">Northfield</text>
    </svg>`
  );

const navItems = [
  { label: 'Programmes', href: '#programmes' },
  { label: 'Admissions', href: '#admissions' },
  { label: 'Campus', href: '#campus' },
];

export default function Example() {
  return (
    <Navbar
      logoSrc={logoSrc}
      logoText='Northfield College'
      navItems={navItems}
    />
  );
}
