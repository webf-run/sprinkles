import { AppShellNavGroup, AppShellNavItem } from '@webf/sprinkles';
import FileText from 'lucide-solid/icons/file-text';
import Image from 'lucide-solid/icons/image';
import Newspaper from 'lucide-solid/icons/newspaper';
import Settings from 'lucide-solid/icons/settings';

export default function Example() {
  return (
    <nav
      aria-label='Nav item states'
      class='w-64 rounded-2xl border border-border-muted bg-surface p-3'
    >
      <AppShellNavGroup label='Content'>
        <AppShellNavItem href='#pages' icon={FileText} current>
          Pages (current)
        </AppShellNavItem>
        <AppShellNavItem
          href='#posts'
          icon={Newspaper}
          end='3'
          class='bg-neutral-subtle text-foreground-strongest'
        >
          Posts (hover)
        </AppShellNavItem>
        <AppShellNavItem
          href='#media'
          icon={Image}
          class='outline-solid outline-2 outline-offset-2 outline-focus-ring'
        >
          Media (focus)
        </AppShellNavItem>
        <AppShellNavItem href='#settings' icon={Settings}>
          Settings
        </AppShellNavItem>
      </AppShellNavGroup>
    </nav>
  );
}
