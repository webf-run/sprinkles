import { Breadcrumb } from '@webf-run/sprinkles';

export default function Example() {
  return (
    <div class='w-full'>
      <div class='rounded-xl bg-violet-50 p-6'><Breadcrumb class='[&_ol]:text-violet-800 [&_a:hover]:text-fuchsia-700' items={[{ label: 'Home', href: '/' }, { label: 'Community', href: '/community' }, { label: 'Events' }]} /></div>
    </div>
  );
}
