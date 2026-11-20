import { Timeline } from '@webf/sprinkles';

export default function Example() {
  return (
    <div class='w-full max-w-md'>
      <h3 class='m-0 mb-5 font-heading text-fluid-xl font-semibold text-foreground-strongest'>
        Baking since 1987
      </h3>
      <Timeline
        tone='notice'
        items={[
          {
            label: '1987',
            text: 'Maria bakes her first loaves in a tiny kitchen and sells them from a basket.',
          },
          { label: '1994', text: 'The bakery opens its doors on Mill Street.' },
          {
            label: '2008',
            text: 'Her son Luca joins, and sourdough joins the menu.',
          },
          {
            label: '2024',
            text: 'Still family-run, still baking before sunrise.',
          },
        ]}
      />
    </div>
  );
}
