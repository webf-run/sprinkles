import { Button, Navbar } from '@webf/sprinkles';

const navItems = [
  { label: 'Classes', href: '#classes', current: true },
  { label: 'Timetable', href: '#timetable' },
  { label: 'Contact', href: '#contact' },
];

export default function Example() {
  return (
    <Navbar
      logoText='Studio Nine'
      navItems={navItems}
      actions={
        <Button href='#book' size='l'>
          Book a class
        </Button>
      }
    />
  );
}
