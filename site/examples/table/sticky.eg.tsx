import { TBody, TCell, TH, THead, TRow, Table } from '@webf/sprinkles';
import { For } from 'solid-js';

const activity = [
  ['09:42', 'Meera Iyer', 'Published “Admissions 2027”'],
  ['09:30', 'Meera Iyer', 'Edited “Admissions 2027”'],
  ['09:12', 'Arjun Rao', 'Uploaded campus-aerial.jpg'],
  ['08:55', 'Priya Shah', 'Scheduled “Scholarship results”'],
  ['08:41', 'Priya Shah', 'Edited “Scholarship results”'],
  ['08:20', 'Arjun Rao', 'Added a redirect from /apply'],
  ['08:02', 'Meera Iyer', 'Signed in'],
  ['07:58', 'System', 'Backup finished (184 MB)'],
];

export default function Example() {
  return (
    <Table
      stickyHeader
      aria-label='Today’s activity'
      class='max-h-64 rounded-xl border border-border-muted'
    >
      <THead>
        <TRow>
          <TH>Time</TH>
          <TH>Who</TH>
          <TH>What</TH>
        </TRow>
      </THead>
      <TBody>
        <For each={activity}>
          {([time, who, what]) => (
            <TRow>
              <TCell class='tabular-nums'>{time}</TCell>
              <TCell>{who}</TCell>
              <TCell>{what}</TCell>
            </TRow>
          )}
        </For>
      </TBody>
    </Table>
  );
}
