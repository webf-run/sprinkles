import { Badge, Tab, TabList, TabPanel, Tabs } from '@webf/sprinkles';

export default function Example() {
  return (
    <Tabs class='w-full' defaultValue='drafts'>
      <TabList aria-label='Posts'>
        <Tab value='published'>Published</Tab>
        <Tab value='drafts'>
          Drafts
          <Badge size='s'>3</Badge>
        </Tab>
        <Tab value='scheduled'>Scheduled</Tab>
      </TabList>
      <TabPanel value='published'>
        <p class='m-0 text-sm'>41 posts are live on the Foundation website.</p>
      </TabPanel>
      <TabPanel value='drafts'>
        <p class='m-0 text-sm'>
          3 drafts are waiting for review, the oldest from 28 October.
        </p>
      </TabPanel>
      <TabPanel value='scheduled'>
        <p class='m-0 text-sm'>
          “Scholarship results” goes live on 15 November at 09:00.
        </p>
      </TabPanel>
    </Tabs>
  );
}
