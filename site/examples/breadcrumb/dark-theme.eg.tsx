import { Breadcrumb } from '@webf-run/sprinkles';

export default function Example() {
  return (
    <div class='w-full'>
      <div class='rounded-xl bg-slate-950 p-6 text-white'><Breadcrumb class='[&_ol]:text-slate-300 [&_a:hover]:text-amber-300' items={[{ label: 'Home', href: '/' }, { label: 'Products', href: '/products' }, { label: 'Analytics' }]} /></div>
    </div>
  );
}
