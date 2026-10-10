import { Breadcrumb } from '@webf/sprinkles';

export default function Example() {
  return (
    <div class='w-full'>
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Academics', href: '/academics' },
          { label: 'Health Sciences', href: '/health' },
          { label: 'Pharmacy' },
        ]}
      />
    </div>
  );
}
