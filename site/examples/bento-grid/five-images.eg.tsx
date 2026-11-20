import { BentoGrid } from '@webf/sprinkles';

/** Blue tone, all photos, with a panoramic banner along the bottom. */
export default function Example() {
  return (
    <BentoGrid
      tone='indigo'
      label='Campus life'
      images={[
        {
          src: '/images/cc/cool-campus.jpg',
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
            text: 'Julian Lupyan · CC0 · colour-graded',
            href: 'https://commons.wikimedia.org/wiki/File:Ivy_Covered_Building_in_the_Princeton_University_Campus,_New_Jersey.jpg',
          },
        },
        {
          src: '/images/cc/students-reading.jpg',
          alt: 'Students reading and taking notes together at a wooden picnic table',
          badge: 'Open daily',
          title: 'Study spaces',
          credit: {
            text: 'Alexis Brown · CC0',
            href: 'https://commons.wikimedia.org/wiki/File:Students_learning_together_(Unsplash).jpg',
          },
        },
        {
          src: '/images/cc/clinic-doorway.jpg',
          alt: 'A doctor in a white coat and stethoscope greeting someone in a clinic corridor',
          badge: 'Free',
          title: 'Health centre',
          description: 'Friendly check-ups, no appointment needed.',
          credit: {
            text: 'Shixart1985 · CC BY 2.0 · cropped',
            href: 'https://commons.wikimedia.org/wiki/File:Doctor_greeting_a_patient_in_clinic_room_two.jpg',
          },
        },
        {
          src: '/images/cc/code-laptop.jpg',
          alt: 'A laptop screen filled with lines of code',
          title: 'Computer labs',
          credit: {
            text: 'Marc Mueller · CC0',
            href: 'https://commons.wikimedia.org/wiki/File:Macro_laptop_coding_(Unsplash).jpg',
          },
        },
        {
          src: '/images/cc/event-audience.jpg',
          alt: 'Silhouettes of a crowd with their hands raised toward bright stage lights',
          badge: 'Every Friday',
          title: 'Live nights on campus',
          description: 'Bands, talks and society showcases.',
          action: { label: 'See what’s on', href: '#events' },
          credit: {
            text: 'Chad Kirchoff · CC0',
            href: 'https://commons.wikimedia.org/wiki/File:Houston_audience_lifting_up_hands_(Unsplash).jpg',
          },
        },
      ]}
    />
  );
}
