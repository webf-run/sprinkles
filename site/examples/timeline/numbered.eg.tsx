import { Timeline } from '@webf/sprinkles';

export default function Example() {
  return (
    <Timeline
      class='w-full max-w-md'
      marker='number'
      tone='informative'
      items={[
        {
          label: 'Create your account',
          text: 'It takes a minute and needs only your email.',
        },
        {
          label: 'Add your first project',
          text: 'Start from a template or from a blank page.',
        },
        {
          label: 'Invite your team',
          text: 'Share a link, and everyone joins in one click.',
        },
      ]}
    />
  );
}
