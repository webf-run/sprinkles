import { TBody, TCell, TH, THead, TRow, Table } from '@webf/sprinkles';
import { For, createSignal } from 'solid-js';

const posts = [
  { id: 'p1', title: 'Annual report 2026 is out', author: 'Priya Shah' },
  { id: 'p2', title: 'Scholarship results', author: 'Meera Iyer' },
  { id: 'p3', title: 'Founders’ Day photos', author: 'Arjun Rao' },
];

export default function Example() {
  const [selected, setSelected] = createSignal<string[]>(['p2']);
  const isSelected = (id: string) => selected().includes(id);
  const toggle = (id: string) =>
    setSelected((ids) =>
      ids.includes(id) ? ids.filter((other) => other !== id) : [...ids, id]
    );

  return (
    <Table aria-label='Posts' class='max-w-lg'>
      <THead>
        <TRow>
          <TH class='w-10'>
            <span class='sr-only'>Select</span>
          </TH>
          <TH>Title</TH>
          <TH>Author</TH>
        </TRow>
      </THead>
      <TBody>
        <For each={posts}>
          {(post) => (
            <TRow selected={isSelected(post.id)}>
              <TCell>
                <input
                  type='checkbox'
                  class='m-0 size-4 accent-accent'
                  checked={isSelected(post.id)}
                  onChange={() => toggle(post.id)}
                  aria-label={`Select “${post.title}”`}
                />
              </TCell>
              <TCell>{post.title}</TCell>
              <TCell>{post.author}</TCell>
            </TRow>
          )}
        </For>
      </TBody>
    </Table>
  );
}
