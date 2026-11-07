import { TBody, TCell, TH, THead, TRow, Table } from '@webf/sprinkles';
import { For, createMemo, createSignal } from 'solid-js';

type Column = 'title' | 'views';
type Direction = 'ascending' | 'descending';

const pages = [
  { title: 'Home', views: 18204 },
  { title: 'About the Foundation', views: 2315 },
  { title: 'Admissions 2027', views: 0 },
  { title: 'Scholarships', views: 4982 },
  { title: 'Contact', views: 611 },
];

export default function Example() {
  const [sort, setSort] = createSignal<{
    column: Column;
    direction: Direction;
  }>({ column: 'views', direction: 'descending' });

  // A new column sorts ascending; the same column flips direction.
  const sortBy = (column: Column) =>
    setSort((current) => ({
      column,
      direction:
        current.column === column && current.direction === 'ascending'
          ? 'descending'
          : 'ascending',
    }));
  const directionOf = (column: Column) =>
    sort().column === column ? sort().direction : 'none';

  const rows = createMemo(() => {
    const { column, direction } = sort();
    const sorted = [...pages].sort((a, b) =>
      column === 'title' ? a.title.localeCompare(b.title) : a.views - b.views
    );
    return direction === 'ascending' ? sorted : sorted.reverse();
  });

  return (
    <Table aria-label='Pages by views' class='max-w-lg'>
      <THead>
        <TRow>
          <TH sort={directionOf('title')} onSort={() => sortBy('title')}>
            Title
          </TH>
          <TH
            align='end'
            sort={directionOf('views')}
            onSort={() => sortBy('views')}
          >
            Views
          </TH>
        </TRow>
      </THead>
      <TBody>
        <For each={rows()}>
          {(page) => (
            <TRow>
              <TCell>{page.title}</TCell>
              <TCell align='end'>{page.views.toLocaleString('en-IN')}</TCell>
            </TRow>
          )}
        </For>
      </TBody>
    </Table>
  );
}
