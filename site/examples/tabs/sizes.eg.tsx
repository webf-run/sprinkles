import { Tabs } from '@webf/sprinkles';

const items = [
  { value: 'content', label: 'Content' },
  { value: 'seo', label: 'SEO' },
  { value: 'history', label: 'History' },
];

export default function Example() {
  return (
    <div class='flex w-full flex-col gap-6'>
      <Tabs
        size='s'
        aria-label='Small tabs'
        defaultValue='content'
        items={items}
      />
      <Tabs
        size='m'
        aria-label='Medium tabs'
        defaultValue='content'
        items={items}
      />
      <Tabs
        size='l'
        aria-label='Large tabs'
        defaultValue='content'
        items={items}
      />
    </div>
  );
}
