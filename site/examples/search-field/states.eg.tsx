import { SearchField } from '@webf/sprinkles';

export default function Example() {
  return (
    <div class='grid w-full gap-4 sm:grid-cols-2'>
      <SearchField label='Default' placeholder='Search pages' />
      <SearchField
        label='Invalid'
        defaultValue='a'
        invalid
        errorText='Enter at least 3 characters.'
      />
      <SearchField label='Disabled' defaultValue='Annual report' disabled />
      <SearchField label='Read-only' defaultValue='Annual report' readOnly />
    </div>
  );
}
