import { Breadcrumb } from '@webf/sprinkles';

export default function Example() {
  return (
    <Breadcrumb
      items={[
        { label: 'Home', href: '#' },
        { label: 'Programmes', href: '#' },
        { label: 'Bachelor of Pharmacy' },
      ]}
    />
  );
}
