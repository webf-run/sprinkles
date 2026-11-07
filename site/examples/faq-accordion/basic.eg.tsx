import { FaqAccordion } from '@webf/sprinkles';

export default function Example() {
  return (
    <FaqAccordion
      class='w-full max-w-2xl'
      items={[
        {
          question: 'Who can apply?',
          answer:
            'Anyone who has passed class 12 with physics, chemistry and biology or mathematics.',
        },
        {
          question: 'Is there an entrance exam?',
          answer:
            'Admission follows the state CET merit list; there is no separate exam.',
        },
        {
          question: 'Are scholarships available?',
          answer: 'Yes, for merit and need. Apply with your admission form.',
        },
      ]}
    />
  );
}
