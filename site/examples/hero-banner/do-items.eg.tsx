import { HeroBanner } from '@webf/sprinkles';

export default function Example() {
  return (
    <HeroBanner
      image='/images/northbridge/campus.webp'
      eyebrow='Make your next step count'
      title='Study where you can lead'
      description='Choose a degree that connects careful teaching with experience beyond the classroom. You will learn in small groups, get regular feedback from your tutors and have the chance to apply for a paid placement that helps you build confidence and useful connections before graduation.'
      primaryAction={{ label: 'Apply now', href: '#apply' }}
    />
  );
}
