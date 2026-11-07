import { TBody, TCell, TH, THead, TRow, Table } from '@webf/sprinkles';

export default function Example() {
  return (
    <Table density='compact' aria-label='Views'>
      <THead>
        <TRow>
          <TH>Page</TH>
          <TH>Views</TH>
        </TRow>
      </THead>
      <TBody>
        <TRow>
          <TCell>Home</TCell>
          <TCell>18,204</TCell>
        </TRow>
        <TRow>
          <TCell>Contact</TCell>
          <TCell>611</TCell>
        </TRow>
      </TBody>
    </Table>
  );
}
