import { TestimonialCard } from '@webf-run/sprinkles';

export default function Example() {
  return (
    <div class='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
      <TestimonialCard
        effect='lift'
        quote='Every component we needed for the marketing site was already here.'
        name='Isabella Rossi'
        role='Web Lead, Portico'
      />
      <TestimonialCard
        effect='lift'
        quote='The variant system made restyling for a client rebrand painless.'
        name='Kenji Sato'
        role='Freelance Developer'
      />
      <TestimonialCard
        effect='lift'
        quote='We reused the same card across three different product themes.'
        name='Hannah Wright'
        role='Design Systems, Vela'
      />
    </div>
  );
}
