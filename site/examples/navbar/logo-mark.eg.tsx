import { Navbar } from '@webf/sprinkles';

const navItems = [
  { label: 'Destinations', href: '#destinations' },
  { label: 'Tours', href: '#tours' },
  { label: 'Contact', href: '#contact' },
];

export default function Example() {
  return (
    <Navbar
      navItems={navItems}
      logo={
        <>
          <svg width='32' height='32' viewBox='0 0 24 24' aria-hidden='true'>
            <rect width='24' height='24' rx='6' class='fill-accent' />
            <path
              d='M6 16l4-8 3 5 2-3 3 6'
              fill='none'
              class='stroke-accent-foreground'
              stroke-width='2'
              stroke-linecap='round'
              stroke-linejoin='round'
            />
          </svg>
          <span class='text-xl font-bold text-foreground-strongest'>
            Wayfarer
          </span>
        </>
      }
    />
  );
}
