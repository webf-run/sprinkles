import { Timeline } from '@webf/sprinkles';

export default function Example() {
  return (
    <Timeline
      class='w-full max-w-xl'
      layout='split'
      tone='neutral'
      items={[
        {
          label: '2023 – now',
          text: 'Lead designer at Fernhill Studio, shaping apps for health and education.',
        },
        {
          label: '2020 – 2023',
          text: 'Product designer at Brightpath, where I built the design system.',
        },
        {
          label: '2018 – 2020',
          text: 'Freelance illustrator for magazines and children’s books.',
        },
        {
          label: '2014 – 2018',
          text: 'BA in Visual Communication, University of Leeds.',
        },
      ]}
    />
  );
}
