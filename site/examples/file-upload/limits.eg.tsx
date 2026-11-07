import { FileUpload } from '@webf/sprinkles';

export default function Example() {
  return (
    <FileUpload
      class='max-w-md'
      label='Speaker photo'
      accept={['image/png', 'image/jpeg']}
      maxFileSize={200 * 1024}
      hint='PNG or JPG, up to 200 KB. Try a larger file or a PDF.'
    />
  );
}
