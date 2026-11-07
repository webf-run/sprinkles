import { TextArea } from '@webf/sprinkles';

export default function Example() {
  return (
    <TextArea
      class='max-w-sm'
      label='Meta description'
      description='Search engines show about 160 characters.'
      maxLength={160}
      showCount
      defaultValue='Dates, documents and fees for the 2027 undergraduate intake, with answers to the questions applicants ask most.'
    />
  );
}
