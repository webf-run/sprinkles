import { Tabs } from '@webf/sprinkles';

export default function Example() {
  return (
    <Tabs
      aria-label='Page editor'
      defaultValue='content'
      items={[
        { value: 'content', label: 'Content' },
        { value: 'seo', label: 'SEO' },
        { value: 'history', label: 'History' },
      ]}
    />
  );
}
