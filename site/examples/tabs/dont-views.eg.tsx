import { Tabs } from '@webf/sprinkles';

export default function Example() {
  return (
    <Tabs
      aria-label='Sections'
      defaultValue='pages'
      items={[
        { value: 'pages', label: 'Pages' },
        { value: 'posts', label: 'Posts' },
        { value: 'media', label: 'Media' },
        { value: 'settings', label: 'Settings' },
      ]}
    />
  );
}
