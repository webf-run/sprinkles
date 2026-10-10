import { Link, Navbar } from '@webf/sprinkles';

const navItems = [
  { label: 'Product', href: '/product' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Docs', href: '/docs' },
  { label: 'Contact', href: '/contact' },
];

export default function Example() {
  return (
    <Navbar
      logoText='Sprinkles'
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
