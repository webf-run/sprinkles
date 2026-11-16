import { HeroBanner } from '@webf/sprinkles';

export default function Example() {
  return (
    <HeroBanner
      image='/images/northbridge/campus.webp'
      title='Empowering minds. Inspiring futures.'
      description='At Northbridge University, we nurture curiosity, encourage leadership and prepare students to make a meaningful impact in the world.'
      items={[
        'Small classes taught by working experts',
        'A paid placement in every degree',
        'Scholarships for one in three students',
      ]}
      primaryAction={{ label: 'Explore programs', href: '#programs' }}
    />
  );
}
