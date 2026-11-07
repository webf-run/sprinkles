import { Tabs } from '@webf/sprinkles';
import FileText from 'lucide-solid/icons/file-text';
import Image from 'lucide-solid/icons/image';
import Newspaper from 'lucide-solid/icons/newspaper';

export default function Example() {
  return (
    <Tabs
      class='w-full'
      aria-label='Search results'
      defaultValue='pages'
      items={[
        {
          value: 'pages',
          label: 'Pages',
          icon: FileText,
          content: <p class='m-0 text-sm'>4 pages mention “scholarship”.</p>,
        },
        {
          value: 'posts',
          label: 'Posts',
          icon: Newspaper,
          content: <p class='m-0 text-sm'>9 posts mention “scholarship”.</p>,
        },
        {
          value: 'media',
          label: 'Media',
          icon: Image,
          content: (
            <p class='m-0 text-sm'>2 images are tagged “scholarship”.</p>
          ),
        },
      ]}
    />
  );
}
