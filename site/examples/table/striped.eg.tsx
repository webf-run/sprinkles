import { TBody, TCell, TH, THead, TRow, Table } from '@webf/sprinkles';
import { For } from 'solid-js';

const redirects = [
  { from: '/admissions-2026', to: '/admissions', hits: '1,204' },
  { from: '/apply', to: '/admissions', hits: '862' },
  { from: '/news', to: '/posts', hits: '340' },
  { from: '/scholarship', to: '/scholarships', hits: '97' },
  { from: '/contact-us', to: '/contact', hits: '45' },
];

export default function Example() {
  return (
    <Table striped aria-label='Redirects'>
      <THead>
        <TRow>
          <TH>From</TH>
          <TH>To</TH>
          <TH align='end'>Hits this month</TH>
        </TRow>
      </THead>
      <TBody>
        <For each={redirects}>
          {(redirect) => (
            <TRow>
              <TCell class='font-mono text-xs'>{redirect.from}</TCell>
              <TCell class='font-mono text-xs'>{redirect.to}</TCell>
              <TCell align='end'>{redirect.hits}</TCell>
            </TRow>
          )}
        </For>
      </TBody>
    </Table>
  );
}
