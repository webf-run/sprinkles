import { TextArea } from '@webf/sprinkles';

export default function Example() {
  return (
    <div class='grid w-full gap-4 sm:grid-cols-2'>
      <TextArea label='Default' rows={2} placeholder='Describe the image' />
      <TextArea
        label='Invalid'
        rows={2}
        invalid
        errorText='Describe the image for people who can’t see it.'
      />
      <TextArea
        label='Disabled'
        rows={2}
        defaultValue='Students at the spring concert.'
        disabled
      />
      <TextArea
        label='Read-only'
        rows={2}
        defaultValue='Students at the spring concert.'
        readOnly
      />
    </div>
  );
}
