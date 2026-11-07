import { TBody, TCell, TH, THead, TRow, Table } from '@webf/sprinkles';
import { For } from 'solid-js';

const files = [
  {
    name: 'campus-aerial.jpg',
    type: 'JPEG',
    size: '2.4 MB',
    added: '6 Nov 2026',
  },
  {
    name: 'annual-report-2026.pdf',
    type: 'PDF',
    size: '8.1 MB',
    added: '1 Nov 2026',
  },
  {
    name: 'scholarship-form.docx',
    type: 'Word',
    size: '96 KB',
    added: '30 Oct 2026',
  },
  {
    name: 'founders-day.mp4',
    type: 'Video',
    size: '148 MB',
    added: '12 Oct 2026',
  },
];

export default function Example() {
  return (
    <Table density='compact' aria-label='Media'>
      <THead>
        <TRow>
          <TH>File</TH>
          <TH>Type</TH>
          <TH align='end'>Size</TH>
          <TH align='end'>Added</TH>
        </TRow>
      </THead>
      <TBody>
        <For each={files}>
          {(file) => (
            <TRow>
              <TCell>{file.name}</TCell>
              <TCell>{file.type}</TCell>
              <TCell align='end'>{file.size}</TCell>
              <TCell align='end'>{file.added}</TCell>
            </TRow>
          )}
        </For>
      </TBody>
    </Table>
  );
}
