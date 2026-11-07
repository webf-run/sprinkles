import { Card, CardBody, CardHeader } from '@webf/sprinkles';

const sections = [
  {
    href: '#pages',
    title: 'Pages',
    count: '24 published',
    note: '3 drafts waiting for review',
  },
  {
    href: '#posts',
    title: 'Posts',
    count: '41 published',
    note: '1 scheduled for 15 November',
  },
  {
    href: '#media',
    title: 'Media',
    count: '318 files',
    note: '2.1 GB of 10 GB used',
  },
];

export default function Example() {
  return (
    <ul class='m-0 grid w-full list-none grid-cols-1 gap-4 p-0 sm:grid-cols-3'>
      {sections.map((section) => (
        <li class='flex'>
          <Card href={section.href} class='flex-1'>
            <CardHeader title={section.title} description={section.count} />
            <CardBody class='text-foreground-muted'>{section.note}</CardBody>
          </Card>
        </li>
      ))}
    </ul>
  );
}
