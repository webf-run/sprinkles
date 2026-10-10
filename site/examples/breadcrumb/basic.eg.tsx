import { Breadcrumb } from '@webf/sprinkles';

export default function Example() {
  return (
    <div class='w-full'>
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Programs', href: '/programs' },
          { label: 'B.Pharm' },
        ]}
      />
    </div>
  );
}
