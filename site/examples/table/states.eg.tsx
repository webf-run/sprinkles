import { TBody, TCell, TH, THead, TRow, Table } from '@webf/sprinkles';

export default function Example() {
  return (
    <Table aria-label='Row states' class='max-w-lg'>
      <THead>
        <TRow>
          <TH sort='ascending'>Sorted header</TH>
          <TH sort='none'>Sortable header</TH>
        </TRow>
      </THead>
      <TBody>
        <TRow>
          <TCell>Default row</TCell>
          <TCell>Scholarships</TCell>
        </TRow>
        <TRow class='bg-neutral-subtle'>
          <TCell>Hovered row</TCell>
          <TCell>Admissions 2027</TCell>
        </TRow>
        <TRow selected>
          <TCell>Selected row</TCell>
          <TCell>Contact</TCell>
        </TRow>
      </TBody>
    </Table>
  );
}
