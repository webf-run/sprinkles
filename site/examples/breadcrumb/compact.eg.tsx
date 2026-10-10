import { Breadcrumb } from '@webf/sprinkles';

export default function Example() {
  return (
    <div class='w-full'>
      <Breadcrumb
        class='text-xs'
        items={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Settings', href: '/settings' },
          { label: 'Profile' },
        ]}
      />
    </div>
  );
}
