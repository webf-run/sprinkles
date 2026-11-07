import { Badge, TBody, TCell, TH, THead, TRow, Table } from '@webf/sprinkles';

export default function Example() {
  return (
    <Table density='compact' aria-label='Pages'>
      <THead>
        <TRow>
          <TH>Page</TH>
          <TH>Status</TH>
        </TRow>
      </THead>
      <TBody>
        <TRow>
          <TCell>Home</TCell>
          <TCell>
            <Badge variant='positive' size='s'>
              Published
            </Badge>
          </TCell>
        </TRow>
        <TRow>
          <TCell>Old campus tour</TCell>
          <TCell>
            <Badge variant='negative' size='s'>
              Broken link
            </Badge>
          </TCell>
        </TRow>
      </TBody>
    </Table>
  );
}
