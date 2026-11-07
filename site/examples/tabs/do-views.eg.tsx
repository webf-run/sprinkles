import { Tabs } from '@webf/sprinkles';

export default function Example() {
  return (
    <Tabs
      aria-label='Post'
      defaultValue='content'
      items={[
        { value: 'content', label: 'Content' },
        { value: 'comments', label: 'Comments' },
        { value: 'history', label: 'History' },
      ]}
    />
  );
}
