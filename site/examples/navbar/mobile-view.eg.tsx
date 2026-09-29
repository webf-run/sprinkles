import { Link, Navbar } from '@webf-run/sprinkles';

const navItems = [
  { label: 'Product', href: '/product' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Docs', href: '/docs' },
  { label: 'Contact', href: '/contact' },
];

export default function Example() {
  return (
    <Navbar
      logoText='Astro UI'
      navItems={navItems}
      position='static'
      actions={
        <Link href='/login' variant='blackwhite' size='sm'>
          Login
        </Link>
      }
    />
  );
}
