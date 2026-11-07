import { FileUpload } from '@webf/sprinkles';

export default function Example() {
  return (
    <FileUpload
      class='max-w-md'
      label='Attachments'
      accept={['application/pdf', '.docx']}
      maxFiles={5}
      maxFileSize={20 * 1024 * 1024}
      hint='Up to 5 PDF or Word files, 20 MB each'
      name='attachments'
    />
  );
}
