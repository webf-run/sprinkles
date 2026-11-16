import { HeroBanner } from '@webf/sprinkles';

export default function Example() {
  return (
    <HeroBanner
      image='/images/northbridge/campus.webp'
      eyebrow='Northbridge University · Student life'
      title='Empowering minds. Inspiring futures.'
      description='Join a learning community that makes room for questions, new ideas and practical experience. Across our campus, students work closely with teachers, explore their interests with support and build the confidence to make a meaningful contribution after graduation.'
      primaryAction={{ label: 'Apply now', href: '#apply' }}
      secondaryAction={{ label: 'Learn more', href: '#about' }}
    />
  );
}
