import { AppShellNavGroup, AppShellNavItem } from '@webf/sprinkles';
import FileText from 'lucide-solid/icons/file-text';
import Newspaper from 'lucide-solid/icons/newspaper';
import Settings from 'lucide-solid/icons/settings';

export default function Example() {
  return (
    <nav aria-label='Example' class='w-56'>
      <AppShellNavGroup>
        <AppShellNavItem href='#pages' icon={FileText} current>
          Pages
        </AppShellNavItem>
        <AppShellNavItem href='#posts' icon={Newspaper}>
          Posts
        </AppShellNavItem>
        <AppShellNavItem href='#settings' icon={Settings}>
          Settings
        </AppShellNavItem>
      </AppShellNavGroup>
    </nav>
  );
}
