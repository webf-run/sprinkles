import { Tabs } from '@webf/sprinkles';

export default function Example() {
  return (
    <Tabs
      class='w-full'
      orientation='vertical'
      aria-label='Project settings'
      defaultValue='general'
      items={[
        {
          value: 'general',
          label: 'General',
          content: (
            <p class='m-0 text-sm'>
              Project name, time zone and default language.
            </p>
          ),
        },
        {
          value: 'domains',
          label: 'Domains',
          content: (
            <p class='m-0 text-sm'>
              foundation.example.org is connected and verified.
            </p>
          ),
        },
        {
          value: 'members',
          label: 'Members',
          content: (
            <p class='m-0 text-sm'>5 editors and 2 admins can sign in.</p>
          ),
        },
        {
          value: 'backups',
          label: 'Backups',
          content: (
            <p class='m-0 text-sm'>The last backup ran at 02:00 today.</p>
          ),
        },
      ]}
    />
  );
}
