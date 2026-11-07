import { FileUpload } from '@webf/sprinkles';

export default function Example() {
  const report = () => [
    new File([new Uint8Array(2_450_000)], 'annual-report-2025.pdf', {
      type: 'application/pdf',
    }),
  ];

  return (
    <div class='grid w-full gap-6 sm:grid-cols-2'>
      <FileUpload
        label='Invalid'
        required
        invalid
        errorText='Add the programme brochure.'
        hint='PDF, up to 10 MB'
      />
      <FileUpload label='Disabled' disabled hint='PDF, up to 10 MB' />
      <FileUpload label='With a file' defaultValue={report()} />
      <FileUpload label='Read-only' readOnly defaultValue={report()} />
    </div>
  );
}
