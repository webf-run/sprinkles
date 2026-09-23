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
      logoText='Astro UI'
      navItems={navItems}
      position='static'
      actions={
        <div class='flex items-center gap-2'>
          <Link href='/login' variant='blackwhite' size='sm'>
            Log in
          </Link>
          <Link href='/signup' variant='purple' size='sm'>
            Get started
          </Link>
        </div>
      }
    />
  );
}
