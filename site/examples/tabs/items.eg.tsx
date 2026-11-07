import { Tabs } from '@webf/sprinkles';

export default function Example() {
  return (
    <Tabs
      class='w-full'
      aria-label='Page editor'
      defaultValue='content'
      items={[
        {
          value: 'content',
          label: 'Content',
          content: (
            <p class='m-0 text-sm'>
              Admissions 2027 has 6 blocks: a hero, three feature cards, an FAQ
              and a call to action.
            </p>
          ),
        },
        {
          value: 'seo',
          label: 'SEO',
          content: (
            <p class='m-0 text-sm'>
              “Apply for the 2027 intake: dates, eligibility and fees.” (58
              characters)
            </p>
          ),
        },
        {
          value: 'history',
          label: 'History',
          content: (
            <p class='m-0 text-sm'>
              Published by Meera Iyer on 4 November 2026. 12 earlier versions.
            </p>
          ),
        },
      ]}
    />
  );
}
