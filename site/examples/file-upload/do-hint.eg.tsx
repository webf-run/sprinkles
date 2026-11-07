import { FileUpload } from '@webf/sprinkles';

export default function Example() {
  return (
    <FileUpload
      class='w-full'
      label='Logo'
      accept='image/svg+xml'
      hint='SVG only, so it stays sharp at any size'
    />
  );
}
