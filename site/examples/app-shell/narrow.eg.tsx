import {
  AppShell,
  AppShellNavGroup,
  AppShellNavItem,
  Card,
  CardHeader,
} from '@webf/sprinkles';
import FileText from 'lucide-solid/icons/file-text';
import Image from 'lucide-solid/icons/image';
import Newspaper from 'lucide-solid/icons/newspaper';
import Settings from 'lucide-solid/icons/settings';

export default function Example() {
  return (
    <div class='h-96 w-full max-w-sm overflow-hidden rounded-2xl border border-border-muted'>
      <AppShell
        class='h-full'
        brand='webf CMS'
        title='Foundation website'
        sidebar={
          <AppShellNavGroup label='Content'>
            <AppShellNavItem href='#pages' icon={FileText}>
              Pages
            </AppShellNavItem>
            <AppShellNavItem href='#posts' icon={Newspaper} current>
              Posts
            </AppShellNavItem>
            <AppShellNavItem href='#media' icon={Image}>
              Media
            </AppShellNavItem>
            <AppShellNavItem href='#settings' icon={Settings}>
              Settings
            </AppShellNavItem>
          </AppShellNavGroup>
        }
      >
        <ul class='m-0 flex list-none flex-col gap-3 p-0'>
          <Card as='li'>
            <CardHeader
              title='Scholarship results'
              description='Scheduled for 15 November'
            />
          </Card>
          <Card as='li'>
            <CardHeader
              title='Annual report 2026 is out'
              description='Published 1 November'
            />
          </Card>
        </ul>
      </AppShell>
    </div>
  );
}
