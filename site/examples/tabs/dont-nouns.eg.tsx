import { Tabs } from '@webf/sprinkles';

export default function Example() {
  return (
    <Tabs
      aria-label='Page editor'
      defaultValue='content'
      size='s'
      items={[
        { value: 'content', label: 'Edit the content' },
        { value: 'seo', label: 'Change SEO settings' },
        { value: 'history', label: 'See older versions' },
      ]}
    />
  );
}
