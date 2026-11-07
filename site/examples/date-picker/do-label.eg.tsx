import { DatePicker } from '@webf/sprinkles';

export default function Example() {
  return (
    <DatePicker
      class='max-w-xs'
      label='Hide from the site after'
      description='The page is unpublished at midnight.'
    />
  );
}
