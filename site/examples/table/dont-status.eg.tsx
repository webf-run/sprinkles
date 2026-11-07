import { TBody, TCell, TH, THead, TRow, Table } from '@webf/sprinkles';

export default function Example() {
  return (
    <Table density='compact' aria-label='Pages'>
      <THead>
        <TRow>
          <TH>Page</TH>
          <TH>Updated</TH>
        </TRow>
      </THead>
      <TBody>
        <TRow>
          <TCell>Home</TCell>
          <TCell>6 Nov 2026</TCell>
        </TRow>
        <TRow class='bg-negative-subtle text-negative'>
          <TCell>Old campus tour</TCell>
          <TCell>3 Sep 2024</TCell>
        </TRow>
      </TBody>
    </Table>
  );
}
