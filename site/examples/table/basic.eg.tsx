import { Badge, TBody, TCell, TH, THead, TRow, Table } from '@webf/sprinkles';
import { For } from 'solid-js';

const pages = [
  { title: 'Home', status: 'Published', author: 'Meera Iyer', views: '18,204' },
  {
    title: 'About the Foundation',
    status: 'Published',
    author: 'Arjun Rao',
    views: '2,315',
  },
  {
    title: 'Admissions 2027',
    status: 'Draft',
    author: 'Meera Iyer',
    views: '0',
  },
  {
    title: 'Scholarships',
    status: 'Published',
    author: 'Priya Shah',
    views: '4,982',
  },
  { title: 'Contact', status: 'Archived', author: 'Arjun Rao', views: '611' },
];

const StatusVariant = {
  Published: 'positive',
  Draft: 'notice',
  Archived: 'neutral',
} as const;

export default function Example() {
  return (
    <Table aria-label='Pages'>
      <THead>
        <TRow>
          <TH>Title</TH>
          <TH>Status</TH>
          <TH>Author</TH>
          <TH align='end'>Views</TH>
        </TRow>
      </THead>
      <TBody>
        <For each={pages}>
          {(page) => (
            <TRow>
              <TCell class='font-medium text-foreground-strongest'>
                {page.title}
              </TCell>
              <TCell>
                <Badge
                  variant={
                    StatusVariant[page.status as keyof typeof StatusVariant]
                  }
                >
                  {page.status}
                </Badge>
              </TCell>
              <TCell class='whitespace-nowrap'>{page.author}</TCell>
              <TCell align='end'>{page.views}</TCell>
            </TRow>
          )}
        </For>
      </TBody>
    </Table>
  );
}
