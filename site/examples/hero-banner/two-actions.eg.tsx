import { HeroBanner } from '@webf/sprinkles';

export default function Example() {
  return (
    <HeroBanner
      layout='split'
      eyebrow='Northbridge University · Admissions'
      image='/images/northbridge/campus.webp'
      title='Empowering minds. Inspiring futures.'
      description='Find the course that fits your goals, then get practical guidance on applying, funding your studies and preparing for campus life. Our admissions team can answer questions about entry requirements and deadlines, while current students share what it is like to learn and live at Northbridge.'
      primaryAction={{ label: 'Explore programs', href: '#programs' }}
      secondaryAction={{ label: 'Visit campus', href: '#visit' }}
    />
  );
}
