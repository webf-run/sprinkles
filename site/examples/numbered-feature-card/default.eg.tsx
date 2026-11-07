import { NumberedFeatureCard } from '@webf/sprinkles';

export default function Example() {
  return (
    <div class='grid w-full gap-4 @md:grid-cols-2'>
      <NumberedFeatureCard
        number={1}
        title='Experienced faculty'
        description='Teachers with industry and research experience.'
      />
      <NumberedFeatureCard
        number={2}
        title='Modern labs'
        description='Equipment students use in hospitals and industry.'
      />
    </div>
  );
}
