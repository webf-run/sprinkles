import { Badge, TBody, TCell, TH, THead, TRow, Table } from '@webf/sprinkles';

export default function Example() {
  return (
    <Table aria-label='Pages' class='max-w-lg'>
      <THead>
        <TRow>
          <TH sort='ascending'>Title</TH>
          <TH>Status</TH>
          <TH align='end'>Views</TH>
        </TRow>
      </THead>
      <TBody>
        <TRow>
          <TCell>About the Foundation</TCell>
          <TCell>
            <Badge variant='positive'>Published</Badge>
          </TCell>
          <TCell align='end'>2,315</TCell>
        </TRow>
        <TRow selected>
          <TCell>Admissions 2027</TCell>
          <TCell>
            <Badge variant='notice'>Draft</Badge>
          </TCell>
          <TCell align='end'>0</TCell>
        </TRow>
      </TBody>
    </Table>
  );
}
