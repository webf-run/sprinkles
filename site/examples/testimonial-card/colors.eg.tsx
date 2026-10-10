import { TestimonialCard } from '@webf/sprinkles';

export default function Example() {
  return (
    <div class='grid gap-4 sm:grid-cols-2 xl:grid-cols-5'>
      <TestimonialCard
        variant='purple'
        quote='Our creative portfolio finally feels as polished as the work in it.'
        name='Reo Tanaka'
        role='Founder, Studio Reo'
      />
      <TestimonialCard
        variant='orange'
        quote='Campaign pages ship in days now instead of weeks.'
        name='Priya Nair'
        role='Growth Lead, Cartly'
      />
      <TestimonialCard
        variant='green'
        quote='Clients notice the polish immediately during onboarding calls.'
        name='Sofia Marín'
        role='Coach, Wellbound'
      />
      <TestimonialCard
        variant='blue'
        quote='The token-based theming let us match our brand in an afternoon.'
        name='Daniel Wu'
        role='CTO, Northline SaaS'
      />
      <TestimonialCard
        variant='neutral'
        quote='Clean, readable, and easy for the whole editorial team to adopt.'
        name='Grace Okafor'
        role='Managing Editor, Fieldnotes'
      />
    </div>
  );
}
