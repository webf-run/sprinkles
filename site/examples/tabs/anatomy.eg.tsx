import { Tabs } from '@webf/sprinkles';
import FileText from 'lucide-solid/icons/file-text';
import History from 'lucide-solid/icons/history';
import Search from 'lucide-solid/icons/search';

export default function Example() {
  return (
    <Tabs
      class='w-full'
      aria-label='Page editor'
      defaultValue='content'
      items={[
        {
          value: 'content',
          label: 'Content',
          icon: FileText,
          content: 'The page’s blocks, in order.',
        },
        {
          value: 'seo',
          label: 'SEO',
          icon: Search,
          content: 'Title, description and social image.',
        },
        {
          value: 'history',
          label: 'History',
          icon: History,
          content: 'Every published version.',
        },
      ]}
    />
  );
}
