import { Navbar } from '@webf/sprinkles';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Classes', href: '#classes', current: true },
  { label: 'Teachers', href: '#teachers' },
  { label: 'Timetable', href: '#timetable' },
  { label: 'Contact', href: '#contact' },
];

export default function Example() {
  return <Navbar logoText='Studio Nine' navItems={navItems} />;
}
