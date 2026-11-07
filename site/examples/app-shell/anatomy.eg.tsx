import { AppShellNavGroup, AppShellNavItem } from '@webf/sprinkles';
import FileText from 'lucide-solid/icons/file-text';
import Image from 'lucide-solid/icons/image';
import Newspaper from 'lucide-solid/icons/newspaper';

/** A wireframe of the shell's wide layout, built from its real nav parts. */
export default function Example() {
  return (
    <div class='flex h-72 w-full overflow-hidden rounded-xl border border-border-muted bg-surface-muted text-xs'>
      <div class='flex w-40 shrink-0 flex-col border-r border-border-muted bg-surface'>
        <div class='flex h-12 items-center border-b border-border-muted px-4 font-semibold text-foreground-strongest'>
          1 · Sidebar
        </div>
        <nav aria-label='Anatomy example' class='px-2 py-3'>
          <AppShellNavGroup label='2 · Nav items'>
            <AppShellNavItem href='#pages' icon={FileText} current>
              Pages
            </AppShellNavItem>
            <AppShellNavItem href='#posts' icon={Newspaper}>
              Posts
            </AppShellNavItem>
            <AppShellNavItem href='#media' icon={Image}>
              Media
            </AppShellNavItem>
          </AppShellNavGroup>
        </nav>
      </div>
      <div class='flex min-w-0 flex-1 flex-col'>
        <div class='flex h-12 items-center justify-between border-b border-border-muted bg-surface px-4 font-semibold text-foreground-strongest'>
          3 · Header
          <span class='flex size-7 items-center justify-center rounded-full bg-accent-subtle text-accent-subtle-foreground'>
            MI
          </span>
        </div>
        <div class='flex flex-1 p-4'>
          <div class='flex flex-1 items-center justify-center rounded-lg border border-dashed border-border font-semibold text-foreground-muted'>
            4 · Main
          </div>
        </div>
      </div>
    </div>
  );
}
