import { HeroBanner } from '@webf/sprinkles';

export default function Example() {
  return (
    <HeroBanner
      variant='indigo'
      align='center'
      image='/images/cc/cool-campus.jpg'
      imageTone='cool'
      eyebrow='A clear promise, with a real next step'
      title='A brighter future begins with a good choice.'
      description='Explore practical courses, supportive people and opportunities to try new things. Get to know the learning environment, compare your options and find the information you need to take your next step with confidence.'
      primaryAction={{ label: 'Browse courses', href: '#courses' }}
      secondaryAction={{ label: 'Talk to an adviser', href: '#advisers' }}
    />
  );
}
