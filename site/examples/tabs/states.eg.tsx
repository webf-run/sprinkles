import { Tab, TabList, TabPanel, Tabs } from '@webf/sprinkles';

export default function Example() {
  return (
    <Tabs class='w-full' defaultValue='selected'>
      <TabList aria-label='Tab states'>
        <Tab value='selected'>Selected</Tab>
        <Tab value='default'>Default</Tab>
        <Tab
          value='hover'
          class='text-foreground-strongest after:border-border'
        >
          Hover
        </Tab>
        <Tab
          value='focus'
          class='before:absolute before:-inset-x-2 before:inset-y-1 before:rounded-md before:border-2 before:border-focus-ring'
        >
          Keyboard focus
        </Tab>
        <Tab value='disabled' disabled>
          Disabled
        </Tab>
      </TabList>
      <TabPanel value='selected'>
        <p class='m-0 text-sm'>The selected tab is darker and underlined.</p>
      </TabPanel>
    </Tabs>
  );
}
