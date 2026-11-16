import { HeroBanner } from '@webf/sprinkles';

export default function Example() {
  return (
    <HeroBanner
      image='/images/northbridge/campus.webp'
      eyebrow='A promise without the detail'
      title='A brighter future is waiting'
      description='Your future can be amazing, exciting and full of possibilities. We believe in helping every student become the very best version of themselves, with an inspiring experience that opens doors and makes dreams come true. Take the first step toward a wonderful new chapter with a community that believes in you.'
      primaryAction={{ label: 'Apply now', href: '#apply' }}
    />
  );
}
