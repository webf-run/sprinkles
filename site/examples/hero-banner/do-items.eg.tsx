import { HeroBanner } from '@webf/sprinkles';

export default function Example() {
  return (
    <HeroBanner
      variant='informative'
      image='/images/cc/cool-mountain-lake.jpg'
      imageTone='cool'
      eyebrow='Make your next step count'
      title='Study where you can lead.'
      description='Choose a degree that connects thoughtful teaching with experience beyond the classroom. Learn in focused groups, build practical skills and get guidance as you shape a path that feels right for you.'
      primaryAction={{ label: 'Find your programme', href: '#programmes' }}
      secondaryAction={{ label: 'Explore student support', href: '#support' }}
    />
  );
}
