import { FileUpload } from '@webf/sprinkles';

export default function Example() {
  return (
    <FileUpload
      class='max-w-md'
      label='Featured image'
      description='Shown at the top of the post and when it is shared.'
      accept='image/*'
      maxFileSize={5 * 1024 * 1024}
      hint='PNG, JPG or WebP, up to 5 MB'
    />
  );
}
