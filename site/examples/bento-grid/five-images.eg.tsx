import { BentoGrid } from '@webf/sprinkles';

/** Blue tone, all photos, with a panoramic banner along the bottom. */
export default function Example() {
  return (
    <BentoGrid
      tone='indigo'
      label='Campus life'
      images={[
        {
          src: '/images/cc/campus.jpg',
          alt: 'Ivy-covered stone campus buildings',
          badge: 'Open day · 14 March',
          title: 'Walk the ivy halls',
          description: 'See where your next chapter could begin.',
          checklist: [
            'Guided campus tour',
            'Meet the faculty',
            'Free lunch for visitors',
          ],
          action: { label: 'Book a tour', href: '#tour' },
          credit: {
            text: 'Julian Lupyan · CC0',
            href: 'https://commons.wikimedia.org/wiki/File:Ivy_Covered_Building_in_the_Princeton_University_Campus,_New_Jersey.jpg',
          },
        },
        {
          src: '/images/cc/restaurant-kitchen.jpg',
          alt: 'A cook preparing vegetables in a bright kitchen',
          badge: 'Open daily',
          title: 'Canteen',
          credit: {
            text: 'Shixart1985 · CC BY 2.0',
            href: 'https://commons.wikimedia.org/wiki/File:Man_prepares_vegetables_in_a_modern_kitchen.jpg',
          },
        },
        {
          src: '/images/cc/clinic-consultation-web.jpg',
          position: 'right',
          alt: 'A doctor helping a young boy drink a glass of water',
          badge: 'Free',
          title: 'Health centre',
          description: 'Friendly check-ups, no appointment needed.',
          credit: {
            text: 'Shixart1985 · CC BY 2.0',
            href: 'https://commons.wikimedia.org/wiki/File:Doctor_gives_a_seated_boy_a_glass_of_water_during_a_clinic_visit.jpg',
          },
        },
        {
          src: '/images/cc/workspace.jpg',
          alt: 'A bright study desk with a monitor and a small plant',
          title: 'Study spaces',
          credit: {
            text: 'Shixart1985 · CC BY 2.0',
            href: 'https://commons.wikimedia.org/wiki/File:Modern_office_workspace_featuring_a_computer.jpg',
          },
        },
        {
          src: '/images/cc/cool-learning-workspace.jpg',
          alt: 'A tidy desk with a laptop against a plain wall',
          badge: 'Open until midnight',
          title: 'Quiet rooms for long revision nights',
          description: 'Reserve a room in under a minute.',
          action: { label: 'Reserve a room', href: '#rooms' },
          credit: {
            text: 'Shixart1985 · CC BY 2.0 · extended',
            href: 'https://commons.wikimedia.org/wiki/File:Modern_office_workspace_featuring_a_computer.jpg',
          },
        },
      ]}
    />
  );
}
