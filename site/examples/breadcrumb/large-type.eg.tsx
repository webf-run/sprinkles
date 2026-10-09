import { Breadcrumb } from '@webf-run/sprinkles';

export default function Example() {
  return (
    <div class='w-full'>
      <Breadcrumb class='text-base font-semibold' items={[{ label: 'Home', href: '/' }, { label: 'Resources', href: '/resources' }, { label: 'Design system' }]} />
    </div>
  );
}
