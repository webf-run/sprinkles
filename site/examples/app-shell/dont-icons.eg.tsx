import { AppShellNavGroup, AppShellNavItem } from '@webf/sprinkles';
import FileText from 'lucide-solid/icons/file-text';

export default function Example() {
  return (
    <nav aria-label='Example' class='w-56'>
      <AppShellNavGroup>
        <AppShellNavItem href='#pages' icon={FileText} current>
          Pages
        </AppShellNavItem>
        <AppShellNavItem href='#posts'>Posts</AppShellNavItem>
        <AppShellNavItem href='#settings'>Settings</AppShellNavItem>
      </AppShellNavGroup>
    </nav>
  );
}
