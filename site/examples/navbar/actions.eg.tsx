import { Button, Navbar } from '@webf/sprinkles';

const navItems = [
  { label: 'Destinations', href: '#destinations' },
  { label: 'Tours', href: '#tours' },
  { label: 'About', href: '#about' },
];

export default function Example() {
  return (
    <Navbar
      logoText='Wayfarer'
      navItems={navItems}
      actions={
        <>
          <Button
            href='#sign-in'
            size='l'
            variant='secondary'
            fillStyle='outline'
            class='max-sm:hidden'
          >
            Sign in
          </Button>
          <Button href='#plan' size='l'>
            Plan a trip
          </Button>
        </>
      }
    />
  );
}
