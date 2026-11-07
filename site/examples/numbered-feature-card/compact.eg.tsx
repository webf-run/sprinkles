import { NumberedFeatureCard } from '@webf/sprinkles';

export default function Example() {
  return (
    <div class='grid w-full max-w-lg gap-2'>
      <NumberedFeatureCard
        variant='compact'
        number={1}
        eyebrow='Step 1'
        title='Fill in the form'
        description='Online, in about ten minutes.'
      />
      <NumberedFeatureCard
        variant='compact'
        number={2}
        eyebrow='Step 2'
        title='Upload documents'
        description='Mark sheets and an ID proof.'
      />
      <NumberedFeatureCard
        variant='compact'
        number={3}
        eyebrow='Step 3'
        title='Pay the fee'
        description='By card, UPI or bank transfer.'
      />
    </div>
  );
}
