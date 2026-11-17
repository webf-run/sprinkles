import { HeroBanner } from '@webf/sprinkles';

export default function Example() {
  return (
    <HeroBanner
      image='/images/northbridge/campus.webp'
      title='Empowering minds. Inspiring futures.'
      description='At Northbridge University, we nurture curiosity, encourage leadership and prepare students to make a meaningful impact in the world.'
      primaryAction={{ label: 'Explore programs', href: '#programs' }}
    />
  );
}
