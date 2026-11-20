import { Timeline } from '@webf/sprinkles';

export default function Example() {
  return (
    <Timeline
      class='w-full max-w-md'
      items={[
        {
          label: '2005',
          text: 'The society is founded and the pharmacy college begins its B.Pharm program.',
        },
        {
          label: '2007',
          text: 'The institute of pharmacy starts the D.Pharm program.',
        },
        {
          label: '2024',
          text: 'The college is accredited by NAAC with a B+ grade.',
        },
        {
          label: '2025',
          text: 'M.Pharm begins in Pharmaceutics and Pharmaceutical Quality Assurance.',
        },
      ]}
    />
  );
}
