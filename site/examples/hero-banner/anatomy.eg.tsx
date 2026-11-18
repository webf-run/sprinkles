import { HeroBanner } from '@webf/sprinkles';

export default function Example() {
  return (
    <HeroBanner
      variant='informative'
      align='center'
      image='/images/cc/cool-forest-lake.jpg'
      imageTone='cool'
      imageCredit={{ text: 'Photo: mirobo · CC0' }}
      eyebrow='A hero with room to breathe'
      title='Let the image set the scene.'
      description='A focused headline and a useful description give visitors a clear first step. This centred composition lets the photograph set the mood while a soft, cool overlay keeps the message easy to read.'
      primaryAction={{ label: 'Explore the collection', href: '#collection' }}
      secondaryAction={{ label: 'How it works', href: '#about' }}
    />
  );
}
